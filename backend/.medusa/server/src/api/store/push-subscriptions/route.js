"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
exports.DELETE = DELETE;
const push_notifications_1 = require("../../../modules/push-notifications");
const ip_geolocation_1 = require("../../../utils/ip-geolocation");
/**
 * GET /store/push-subscriptions/vapid-public-key
 *   (handled in ./vapid-public-key/route.ts)
 *
 * POST /store/push-subscriptions
 *   Register a new browser subscription. Idempotent — if the same
 *   `endpoint` is sent again it updates the existing row (re-activates,
 *   refreshes geo/customer link).
 *
 * Body:
 *   {
 *     endpoint: string,
 *     keys: { p256dh: string, auth: string },
 *     city?: string, state?: string, country?: string,
 *     customer_id?: string
 *   }
 *
 * Geo resolution priority (highest → lowest):
 *   1. Body-supplied city/state/country (legacy clients)
 *   2. Cloudflare headers (`cf-ipcity`, `cf-region`, `cf-ipcountry`)
 *   3. Server-side IP geolocation lookup (cached, multi-provider)
 *      — used by the modern storefront which doesn't ship geo at all,
 *      so we always have city/state for every subscriber.
 */
async function POST(req, res) {
    const svc = req.scope.resolve(push_notifications_1.PUSH_NOTIFICATIONS_MODULE);
    const body = (req.body || {});
    const endpoint = (body.endpoint || "").toString().trim();
    const p256dh = body.keys?.p256dh?.toString().trim() || "";
    const auth = body.keys?.auth?.toString().trim() || "";
    if (!endpoint || !p256dh || !auth) {
        return res
            .status(400)
            .json({ error: "endpoint and keys.p256dh, keys.auth are required" });
    }
    const ua = (req.headers["user-agent"] || "").toString().slice(0, 255);
    const deviceBrowser = parseBrowser(ua);
    const deviceType = parseDeviceType(ua);
    const os = parseOS(ua);
    // Locale from Accept-Language header (best-effort), or body override
    const acceptLang = (req.headers["accept-language"] || "").toString();
    const locale = (body.locale ? String(body.locale) : null) ||
        acceptLang.split(",")[0]?.trim() ||
        null;
    const timezone = body.timezone ? String(body.timezone) : null;
    const subscribeSource = body.subscribe_source
        ? String(body.subscribe_source).slice(0, 255)
        : null;
    // ── Resolve geo (city / state / country) ──
    // 1. Body-supplied wins (legacy clients that did their own lookup)
    let city = body.city ? String(body.city) : null;
    let state = body.state ? String(body.state) : null;
    let country = body.country ? String(body.country) : null;
    // 2. Cloudflare headers — free and accurate when CF is in front
    if (!city)
        city = (req.headers["cf-ipcity"] || "").toString() || null;
    if (!state)
        state = (req.headers["cf-region"] || "").toString() || null;
    if (!country)
        country = (req.headers["cf-ipcountry"] || "").toString() || null;
    // 3. Server-side IP geolocation as the last fallback. We do this even
    // when one of the above is set but missing city — a Cloudflare edge
    // sometimes returns country only.
    if (!city || !state || !country) {
        const ip = (0, ip_geolocation_1.extractClientIp)(req);
        const geo = await (0, ip_geolocation_1.resolveGeoFromIp)(ip);
        if (geo) {
            city = city || geo.city;
            state = state || geo.state;
            country = country || geo.country;
        }
    }
    // Optional gender. We accept male / female / other / prefer_not_to_say
    // but store whatever the caller sends (normalized lowercase) so future
    // values don't need code changes. Empty / missing = unknown (null).
    const rawGender = body.gender ? String(body.gender).trim().toLowerCase() : "";
    const gender = rawGender ? rawGender.slice(0, 32) : null;
    const data = {
        endpoint,
        p256dh,
        auth,
        customer_id: body.customer_id ? String(body.customer_id) : null,
        city,
        state,
        country,
        user_agent: ua || null,
        device_browser: deviceBrowser,
        device_type: deviceType,
        os,
        locale,
        timezone,
        subscribe_source: subscribeSource,
        gender,
        is_active: true,
    };
    // Upsert by endpoint
    const existing = await svc.listPushSubscriptions({ endpoint });
    if (existing && existing.length > 0) {
        await svc.updatePushSubscriptions({
            id: existing[0].id,
            ...data,
        });
        return res.json({ success: true, id: existing[0].id, created: false });
    }
    const [created] = await svc.createPushSubscriptions([data]);
    res.status(201).json({ success: true, id: created.id, created: true });
}
/**
 * DELETE /store/push-subscriptions
 *   Body: { endpoint: string }
 *   Soft-delete a subscription (used when user toggles notifications off
 *   in the browser or in a UI control).
 */
async function DELETE(req, res) {
    const svc = req.scope.resolve(push_notifications_1.PUSH_NOTIFICATIONS_MODULE);
    const body = (req.body || {});
    const endpoint = (body.endpoint || "").toString().trim();
    if (!endpoint)
        return res.status(400).json({ error: "endpoint required" });
    const existing = await svc.listPushSubscriptions({ endpoint });
    if (!existing || existing.length === 0) {
        return res.json({ success: true, deleted: 0 });
    }
    await svc.deletePushSubscriptions(existing.map((s) => s.id));
    res.json({ success: true, deleted: existing.length });
}
function parseBrowser(ua) {
    const u = ua.toLowerCase();
    if (u.includes("edg/"))
        return "Edge";
    if (u.includes("chrome/") && !u.includes("edg/"))
        return "Chrome";
    if (u.includes("firefox/"))
        return "Firefox";
    if (u.includes("safari/") && !u.includes("chrome/"))
        return "Safari";
    if (u.includes("opera") || u.includes("opr/"))
        return "Opera";
    return "Other";
}
function parseDeviceType(ua) {
    const u = ua.toLowerCase();
    if (/ipad|tablet|kindle|playbook/.test(u))
        return "tablet";
    if (/android(?!.*mobile)/.test(u))
        return "tablet";
    if (/mobi|iphone|ipod|blackberry|windows phone/.test(u))
        return "mobile";
    return "desktop";
}
function parseOS(ua) {
    const u = ua.toLowerCase();
    if (u.includes("android"))
        return "Android";
    if (/ipad|iphone|ipod/.test(u))
        return "iOS";
    if (u.includes("windows"))
        return "Windows";
    if (u.includes("mac os"))
        return "macOS";
    if (u.includes("linux"))
        return "Linux";
    return "Other";
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL3B1c2gtc3Vic2NyaXB0aW9ucy9yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQTZCQSxvQkE4RkM7QUFRRCx3QkFlQztBQWpKRCw0RUFBK0U7QUFFL0Usa0VBQWlGO0FBRWpGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUNJLEtBQUssVUFBVSxJQUFJLENBQUMsR0FBa0IsRUFBRSxHQUFtQjtJQUNoRSxNQUFNLEdBQUcsR0FBNkIsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQ3JELDhDQUF5QixDQUMxQixDQUFBO0lBQ0QsTUFBTSxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBd0IsQ0FBQTtJQUVwRCxNQUFNLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUE7SUFDeEQsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFBO0lBQ3pELE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQTtJQUVyRCxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDbEMsT0FBTyxHQUFHO2FBQ1AsTUFBTSxDQUFDLEdBQUcsQ0FBQzthQUNYLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxrREFBa0QsRUFBRSxDQUFDLENBQUE7SUFDeEUsQ0FBQztJQUVELE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFB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QUMsTUFBTSxLQUFLLENBQUMsRUFBRSxDQUFDO1FBQ3ZDLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUE7SUFDaEQsQ0FBQztJQUVELE1BQU8sR0FBVyxDQUFDLHVCQUF1QixDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBQzFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQTtBQUN2RCxDQUFDO0FBRUQsU0FBUyxZQUFZLENBQUMsRUFBVTtJQUM5QixNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUE7SUFDMUIsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztRQUFFLE9BQU8sTUFBTSxDQUFBO0lBQ3JDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1FBQUUsT0FBTyxRQUFRLENBQUE7SUFDakUsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQztRQUFFLE9BQU8sU0FBUyxDQUFBO0lBQzVDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDO1FBQUUsT0FBTyxRQUFRLENBQUE7SUFDcEUsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1FBQUUsT0FBTyxPQUFPLENBQUE7SUFDN0QsT0FBTyxPQUFPLENBQUE7QUFDaEIsQ0FBQztBQUVELFNBQVMsZUFBZSxDQUFDLEVBQVU7SUFDakMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFBO0lBQzFCLElBQUksNkJBQTZCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUFFLE9BQU8sUUFBUSxDQUFBO0lBQzFELElBQUkscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUFFLE9BQU8sUUFBUSxDQUFBO0lBQ2xELElBQUksMkNBQTJDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUFFLE9BQU8sUUFBUSxDQUFBO0lBQ3hFLE9BQU8sU0FBUyxDQUFBO0FBQ2xCLENBQUM7QUFFRCxTQUFTLE9BQU8sQ0FBQyxFQUFVO0lBQ3pCLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtJQUMxQixJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDO1FBQUUsT0FBTyxTQUFTLENBQUE7SUFDM0MsSUFBSSxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQUUsT0FBTyxLQUFLLENBQUE7SUFDNUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQztRQUFFLE9BQU8sU0FBUyxDQUFBO0lBQzNDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7UUFBRSxPQUFPLE9BQU8sQ0FBQTtJQUN4QyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO1FBQUUsT0FBTyxPQUFPLENBQUE7SUFDdkMsT0FBTyxPQUFPLENBQUE7QUFDaEIsQ0FBQyJ9