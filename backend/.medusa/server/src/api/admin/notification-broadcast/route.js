"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
const utils_1 = require("@medusajs/framework/utils");
const push_notifications_1 = require("../../../modules/push-notifications");
const web_push_client_1 = require("../../../modules/push-notifications/lib/web-push-client");
const theme_from_settings_1 = require("../../../modules/email-notifications/util/theme-from-settings");
/**
 * Customer-Group-targeted broadcast endpoint.
 *
 * The marketer picks one or more customer groups (Medusa's built-in
 * `customer_group` resource) plus a channel ("email" or "push") and
 * we resolve the membership, fan out the message, and report stats.
 *
 * Why a separate route from `/admin/push-campaigns`:
 *   - Push campaigns target *push subscribers* (which include
 *     anonymous visitors). Customer groups target *customers*
 *     (logged-in only). Different audience source = different
 *     resolution path.
 *   - Push campaigns persist a `PushCampaign` row for stats history.
 *     Group broadcasts are intentionally one-off and don't need
 *     their own model — keeps migrations small.
 *
 * Body:
 *   {
 *     channel: "email" | "push",
 *     customer_group_ids: string[],
 *
 *     // Email fields
 *     subject?: string,
 *     html?: string,            // Inline HTML (optional)
 *     message?: string,         // Plain text fallback / generic body
 *
 *     // Push fields
 *     title?: string,
 *     body?: string,
 *     icon_url?: string,
 *     image_url?: string,
 *     action_url?: string,
 *
 *     // Common
 *     dry_run?: boolean,
 *   }
 */
async function POST(req, res) {
    const body = (req.body || {});
    const channel = (body.channel || "").toString();
    const groupIds = Array.isArray(body.customer_group_ids)
        ? body.customer_group_ids.filter(Boolean).map(String)
        : [];
    const dryRun = body.dry_run === true;
    const logger = req.scope.resolve(utils_1.ContainerRegistrationKeys.LOGGER);
    if (!groupIds.length) {
        return res
            .status(400)
            .json({ ok: false, error: "customer_group_ids is required" });
    }
    if (channel !== "email" && channel !== "push") {
        return res
            .status(400)
            .json({ ok: false, error: "channel must be 'email' or 'push'" });
    }
    // Resolve customers in the chosen groups. Medusa's customer-group
    // module exposes the m2m relation through the query graph; we
    // pull only the fields we actually use to keep the SQL light.
    const query = req.scope.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const { data: groups } = await query.graph({
        entity: "customer_group",
        fields: ["id", "name", "customers.id", "customers.email"],
        filters: { id: groupIds },
    });
    // De-dupe customers across overlapping groups by id
    const customers = new Map();
    for (const g of groups || []) {
        for (const c of g.customers || []) {
            if (c?.id && !customers.has(c.id)) {
                customers.set(c.id, { id: c.id, email: c.email || null });
            }
        }
    }
    if (customers.size === 0) {
        return res.json({
            ok: true,
            total_resolved: 0,
            sent: 0,
            failed: 0,
            note: "Selected groups contain no customers.",
        });
    }
    if (channel === "email") {
        return res.json(await broadcastEmail(req, body, [...customers.values()], dryRun, logger));
    }
    return res.json(await broadcastPush(req, body, [...customers.values()], dryRun, logger));
}
/**
 * Email broadcast. Skips customers without an email (they'd just
 * fail silently). Routes through the Notification Module so the
 * SMTP provider, logging, and from-address rules are identical
 * to transactional emails.
 */
async function broadcastEmail(req, body, customers, dryRun, logger) {
    const subject = (body.subject || "").toString().trim();
    const message = (body.message || body.html || "").toString().trim();
    if (!subject)
        return { ok: false, error: "subject is required for email" };
    if (!message)
        return { ok: false, error: "message (or html) is required" };
    const recipients = customers.filter((c) => !!c.email);
    if (dryRun) {
        return {
            ok: true,
            dry_run: true,
            total_resolved: customers.length,
            total_with_email: recipients.length,
            sample: recipients.slice(0, 5).map((r) => maskEmail(r.email)),
        };
    }
    // Pull branding once so each email looks identical to transactional
    // emails the customer already trusts.
    let settings = {};
    try {
        const settingsModule = req.scope.resolve("site-settings");
        if (settingsModule?.getAll)
            settings = await settingsModule.getAll();
    }
    catch {
        // optional
    }
    const brand = {
        store_name: settings.site_name ||
            process.env.STORE_NAME ||
            process.env.MEDUSA_STORE_NAME ||
            "Welcome",
        logo_url: settings.site_logo_url || undefined,
        copyright: settings.footer_copyright || undefined,
        theme: (0, theme_from_settings_1.buildEmailThemeFromSettings)(settings),
    };
    const notificationService = req.scope.resolve(utils_1.Modules.NOTIFICATION);
    let sent = 0;
    let failed = 0;
    const errors = [];
    // Fan out sequentially with a small concurrency window so we don't
    // hammer Gmail's rate limit (it caps at ~100 sends / 60s for
    // free accounts).
    const CONCURRENCY = 5;
    for (let i = 0; i < recipients.length; i += CONCURRENCY) {
        const batch = recipients.slice(i, i + CONCURRENCY);
        const results = await Promise.allSettled(batch.map((c) => notificationService.createNotifications({
            to: c.email,
            channel: "email",
            // Re-uses the contact-received template since it accepts
            // arbitrary subject/message and is already branded.
            // For richer templates, add a dedicated "broadcast" template
            // to the SMTP service in a follow-up.
            template: "contact-received",
            data: {
                ...brand,
                name: brand.store_name,
                email: process.env.SMTP_FROM || "no-reply",
                phone: "",
                subject,
                message,
            },
        })));
        results.forEach((r, idx) => {
            if (r.status === "fulfilled")
                sent++;
            else {
                failed++;
                errors.push({
                    email: maskEmail(batch[idx].email),
                    error: r.reason?.message || String(r.reason),
                });
            }
        });
    }
    logger?.info?.(`[NotificationBroadcast] email: resolved=${customers.length} eligible=${recipients.length} sent=${sent} failed=${failed}`);
    return {
        ok: failed === 0,
        total_resolved: customers.length,
        total_with_email: recipients.length,
        sent,
        failed,
        errors: errors.slice(0, 10), // cap so the response stays small
    };
}
/**
 * Push broadcast. Resolves each customer's active push
 * subscriptions and fans out via web-push. Customers who never
 * granted push permission are skipped silently (expected — most
 * won't have subscribed).
 */
async function broadcastPush(req, body, customers, dryRun, logger) {
    const cfg = (0, web_push_client_1.configureWebPush)();
    if (!cfg.configured) {
        return {
            ok: false,
            error: "VAPID keys not configured. Set VAPID_PUBLIC_KEY + VAPID_PRIVATE_KEY in backend .env and restart.",
        };
    }
    const title = (body.title || "").toString().trim();
    const text = (body.body || "").toString().trim();
    if (!title || !text) {
        return { ok: false, error: "title and body are required for push" };
    }
    const svc = req.scope.resolve(push_notifications_1.PUSH_NOTIFICATIONS_MODULE);
    // Resolve all active subscriptions for the customer set in one shot.
    // listPushSubscriptions accepts an `$in` style filter natively.
    const customerIds = customers.map((c) => c.id);
    const subs = await svc.listPushSubscriptions({ customer_id: customerIds, is_active: true }, { take: 100_000 });
    if (dryRun) {
        return {
            ok: true,
            dry_run: true,
            total_resolved_customers: customers.length,
            total_subscriptions: subs.length,
        };
    }
    if (!subs.length) {
        return {
            ok: true,
            total_resolved_customers: customers.length,
            total_subscriptions: 0,
            sent: 0,
            failed: 0,
            note: "No customer in the selected groups has a push subscription.",
        };
    }
    const payload = {
        title,
        body: text,
        icon: body.icon_url ? String(body.icon_url) : undefined,
        image: body.image_url ? String(body.image_url) : undefined,
        url: body.action_url ? String(body.action_url) : "/",
        tag: `broadcast-${Date.now()}`,
        backend_url: process.env.STORE_PUBLIC_BACKEND_URL ||
            process.env.MEDUSA_BACKEND_URL ||
            undefined,
    };
    const result = await (0, web_push_client_1.sendPushBatch)(subs.map((s) => ({
        id: s.id,
        endpoint: s.endpoint,
        p256dh: s.p256dh,
        auth: s.auth,
    })), payload);
    // Prune dead endpoints — same hygiene the campaign endpoint does.
    if (result.expiredIds.length) {
        try {
            await svc.deletePushSubscriptions(result.expiredIds);
        }
        catch (e) {
            logger?.warn?.(`[NotificationBroadcast] failed to prune ${result.expiredIds.length} dead subs: ${e?.message}`);
        }
    }
    logger?.info?.(`[NotificationBroadcast] push: customers=${customers.length} subs=${result.total} sent=${result.sent} failed=${result.failed} pruned=${result.expiredIds.length}`);
    return {
        ok: result.sent > 0,
        total_resolved_customers: customers.length,
        total_subscriptions: result.total,
        sent: result.sent,
        failed: result.failed,
        expired_pruned: result.expiredIds.length,
    };
}
function maskEmail(s) {
    if (!s)
        return "";
    const [local, domain] = s.split("@");
    if (!domain)
        return s.slice(0, 2) + "***";
    return `${local.slice(0, 2)}***@${domain}`;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL25vdGlmaWNhdGlvbi1icm9hZGNhc3Qvcm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUE4Q0Esb0JBZ0VDO0FBN0dELHFEQUE4RTtBQUM5RSw0RUFBK0U7QUFDL0UsNkZBR2dFO0FBQ2hFLHVHQUEyRztBQUUzRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0NHO0FBQ0ksS0FBSyxVQUFVLElBQUksQ0FBQyxHQUFrQixFQUFFLEdBQW1CO0lBQ2hFLE1BQU0sSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxFQUFFLENBQXdCLENBQUE7SUFDcEQsTUFBTSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFBO0lBQy9DLE1BQU0sUUFBUSxHQUFhLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDO1FBQy9ELENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7UUFDckQsQ0FBQyxDQUFDLEVBQUUsQ0FBQTtJQUNOLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLEtBQUssSUFBSSxDQUFBO0lBRXBDLE1BQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGlDQUF5QixDQUFDLE1BQU0sQ0FBUSxDQUFBO0lBRXpFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDckIsT0FBTyxHQUFHO2FBQ1AsTUFBTSxDQUFDLEdBQUcsQ0FBQzthQUNYLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLGdDQUFnQyxFQUFFLENBQUMsQ0FBQTtJQUNq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