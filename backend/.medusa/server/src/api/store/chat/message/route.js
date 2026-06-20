"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
const agentic_commerce_1 = require("../../../../modules/agentic-commerce");
/**
 * POST /store/chat/message
 *
 * Send a user message and get the assistant's reply.
 *
 * Body: { session_id, content, page_url?, cart_id? }
 *
 * SECURITY:
 *   - The session is re-resolved server-side. We refuse to operate on
 *     a session whose `customer_id` doesn't match the authed user, so
 *     a leaked session_id can't be used to inject messages into
 *     someone else's chat. Anonymous sessions get adopted (their
 *     customer_id set) on the first authed call so a guest who signs
 *     in keeps a single thread.
 *   - The body's `cart_id` is BOUND-CHECKED: we look the cart up
 *     server-side and only forward it to AI tools if it's anonymous
 *     OR owned by the authed user. Anything else → tools see
 *     `cartId = null`.
 *   - Per-session+IP rate limit: 60 messages / hour, in-memory token
 *     bucket. Trade up to Redis when REDIS_URL + multi-node arrives.
 *   - `content` is length-capped at 2000 chars; `page_url` is
 *     character-class-filtered before going into the system prompt
 *     so a crafted URL can't smuggle a prompt-injection payload.
 */
const MAX_MESSAGES_PER_HOUR = 60;
const RATE_BUCKETS = globalThis.__chatRateBuckets__ || new Map();
globalThis.__chatRateBuckets__ = RATE_BUCKETS;
function rateLimitKey(req, sessionId) {
    const ip = req.headers["cf-connecting-ip"] ||
        req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
        req.ip ||
        "";
    return `${sessionId}::${ip}`;
}
function tryConsumeRateBudget(key) {
    const now = Date.now();
    const bucket = RATE_BUCKETS.get(key);
    if (!bucket || bucket.resetAt < now) {
        RATE_BUCKETS.set(key, { count: 1, resetAt: now + 60 * 60 * 1000 });
        return { ok: true };
    }
    if (bucket.count >= MAX_MESSAGES_PER_HOUR) {
        return { ok: false, retryInSeconds: Math.ceil((bucket.resetAt - now) / 1000) };
    }
    bucket.count += 1;
    return { ok: true };
}
function sanitizePageUrl(raw) {
    if (!raw || typeof raw !== "string")
        return null;
    if (raw.length > 256)
        return null;
    if (!/^[A-Za-z0-9._\-~:/?#[\]@!$&'()*+,;=%]+$/.test(raw))
        return null;
    return raw;
}
async function POST(req, res) {
    const svc = req.scope.resolve(agentic_commerce_1.AGENTIC_COMMERCE_MODULE);
    const body = (req.body || {});
    const session_id = (body.session_id || "").toString().trim();
    const content = (body.content || "").toString().trim();
    const rawCartId = (body.cart_id || "").toString().trim() || null;
    const images = Array.isArray(body.images) ? body.images : [];
    const files = Array.isArray(body.files) ? body.files : [];
    if (!session_id)
        return res.status(400).json({ error: "session_id required" });
    if (!content && !images.length && !files.length) {
        return res.status(400).json({ error: "content or attachments required" });
    }
    if (content.length > 2000) {
        return res.status(400).json({ error: "Message is too long (max 2000 chars)" });
    }
    const authedCustomerId = req.auth_context?.actor_id || null;
    // ── Rate limit ─────────────────────────────────────────────────
    const rl = tryConsumeRateBudget(rateLimitKey(req, session_id));
    if (!rl.ok) {
        res.setHeader("Retry-After", String(rl.retryInSeconds || 60));
        return res.status(429).json({
            error: "Too many messages. Take a break and try again in a bit.",
            retry_in_seconds: rl.retryInSeconds || 60,
        });
    }
    // ── Session ownership ──────────────────────────────────────────
    let session = null;
    try {
        session = await svc.retrieveChatSession(session_id);
    }
    catch {
        /* invalid id rejected below */
    }
    if (!session) {
        return res.status(404).json({ error: "Session not found" });
    }
    if (authedCustomerId &&
        session.customer_id &&
        session.customer_id !== authedCustomerId) {
        return res.status(403).json({ error: "Forbidden" });
    }
    if (authedCustomerId && !session.customer_id) {
        try {
            await svc.updateChatSessions({
                id: session_id,
                customer_id: authedCustomerId,
            });
        }
        catch { }
    }
    // ── Cart ownership ─────────────────────────────────────────────
    let safeCartId = null;
    if (rawCartId) {
        try {
            const cartModule = req.scope.resolve("cart");
            const cart = await cartModule.retrieveCart(rawCartId);
            const ownedByAuth = authedCustomerId && cart?.customer_id === authedCustomerId;
            const anonymousCart = !cart?.customer_id;
            if (ownedByAuth || anonymousCart) {
                safeCartId = cart.id;
            }
        }
        catch {
            safeCartId = null;
        }
    }
    // ── Site context for the system prompt ─────────────────────────
    // We pass `siteContext` (structured) so the service can build a
    // vertical-aware base prompt (grocery / pharmacy / general). The
    // free-form `extraSystem` only carries per-request bits like the
    // current page URL and auth state.
    let siteContext = {};
    try {
        const settingsModule = req.scope.resolve("site_settings");
        const settings = (await settingsModule.getAll?.()) || {};
        siteContext = {
            siteName: settings.site_name?.trim() || null,
            tagline: settings.site_tagline?.trim() || null,
            description: settings.site_description?.trim() || null,
            businessType: settings.business_type?.trim() ||
                // Back-compat: pre-grocery installs only had `pharmacy_*` keys.
                (settings.pharmacy_license_number ? "pharmacy" : null) ||
                "electronics",
            businessCountry: settings.business_country?.trim() ||
                settings.pharmacy_country?.trim() ||
                null,
        };
    }
    catch { }
    let extraSystem = "";
    const safePageUrl = sanitizePageUrl(body.page_url);
    if (safePageUrl) {
        extraSystem += `The user is currently viewing: ${safePageUrl}\n`;
    }
    if (authedCustomerId) {
        extraSystem += `The user is signed in. You may use signed-in tools (get_my_orders, get_loyalty, prepare_order_for_confirmation).`;
    }
    else {
        extraSystem += `The user is browsing as a guest. Recommend they sign in at /account when they want to place an order, see past orders, or redeem loyalty points.`;
    }
    try {
        const { assistantMessage, userMessage } = await svc.sendUserMessage({
            sessionId: session_id,
            content,
            extraSystem,
            siteContext,
            cartId: safeCartId,
            authedCustomerId,
            container: req.scope,
            images,
            files,
        });
        res.json({ message: assistantMessage, user_message: userMessage });
    }
    catch (err) {
        res.status(500).json({ error: err?.message || "Failed to generate reply" });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL2NoYXQvbWVzc2FnZS9yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQW1FQSxvQkFvSUM7QUF0TUQsMkVBQThFO0FBRTlFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUVILE1BQU0scUJBQXFCLEdBQUcsRUFBRSxDQUFBO0FBRWhDLE1BQU0sWUFBWSxHQUNmLFVBQWtCLENBQUMsbUJBQW1CLElBQUksSUFBSSxHQUFHLEVBQWtCLENBQ3JFO0FBQUMsVUFBa0IsQ0FBQyxtQkFBbUIsR0FBRyxZQUFZLENBQUE7QUFFdkQsU0FBUyxZQUFZLENBQUMsR0FBa0IsRUFBRSxTQUFpQjtJQUN6RCxNQUFNLEVBQUUsR0FDTCxHQUFHLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFZO1FBQzFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQVksRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFO1FBQ2hFLEdBQVcsQ0FBQyxFQUFFO1FBQ2YsRUFBRSxDQUFBO0lBQ0osT0FBTyxHQUFHLFNBQVMsS0FBSyxFQUFFLEVBQUUsQ0FBQTtBQUM5QixDQUFDO0FBRUQsU0FBUyxvQkFBb0IsQ0FBQyxHQUFXO0lBSXZDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQTtJQUN0QixNQUFNLE1BQU0sR0FBRyxZQUFZLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ3BDLElBQUksQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLE9BQU8sR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNwQyxZQUFZLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLEdBQUcsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFH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