"use strict";
/**
 * Thin wrapper around the `web-push` npm package.
 *
 * Centralizes VAPID setup so every code path (subscribers, admin
 * campaign sender) uses the same configured client. Reads VAPID keys
 * from env at first use.
 *
 * To generate keys:
 *   npx web-push generate-vapid-keys
 *
 * Then add to `.env`:
 *   VAPID_PUBLIC_KEY=<public>
 *   VAPID_PRIVATE_KEY=<private>
 *   VAPID_SUBJECT=mailto:admin@example.com
 *
 * The same `VAPID_PUBLIC_KEY` must also be exposed to the storefront
 * as `NEXT_PUBLIC_VAPID_PUBLIC_KEY` so the SW can subscribe.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureWebPush = configureWebPush;
exports.sendPushTo = sendPushTo;
exports.sendPushBatch = sendPushBatch;
let _wp = null;
let _configured = false;
function getWebPush() {
    if (_wp)
        return _wp;
    // Lazy require so the module loads even when web-push isn't installed yet
    // (during initial install or in test environments).
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    _wp = require("web-push");
    return _wp;
}
/**
 * Configure the VAPID details on first call. Idempotent.
 */
function configureWebPush() {
    const publicKey = process.env.VAPID_PUBLIC_KEY || "";
    const privateKey = process.env.VAPID_PRIVATE_KEY || "";
    const subject = process.env.VAPID_SUBJECT || "mailto:admin@example.com";
    if (!publicKey || !privateKey) {
        return { configured: false, publicKey, privateKey, subject };
    }
    if (!_configured) {
        try {
            getWebPush().setVapidDetails(subject, publicKey, privateKey);
            _configured = true;
        }
        catch (e) {
            // Bad keys; surface a clear error at send time
            _configured = false;
        }
    }
    return { configured: _configured, publicKey, privateKey, subject };
}
/**
 * Send a single notification. Always resolves — never throws — so callers
 * can fan out a batch send without try/catch noise.
 */
async function sendPushTo(sub, payload) {
    const cfg = configureWebPush();
    if (!cfg.configured) {
        return { success: false, error: "VAPID keys not configured" };
    }
    const wp = getWebPush();
    const subscription = {
        endpoint: sub.endpoint,
        keys: { p256dh: sub.p256dh, auth: sub.auth },
    };
    try {
        const res = await wp.sendNotification(subscription, JSON.stringify(payload), {
            TTL: 60 * 60 * 24, // 24h — push services can hold the notification this long
            // `high` urgency tells FCM/APNs to wake the device and deliver
            // IMMEDIATELY instead of batching it for a later Doze/maintenance
            // window — critical for "instant" new-order alerts on Android.
            urgency: "high",
        });
        return { success: true, statusCode: res?.statusCode };
    }
    catch (err) {
        const statusCode = err?.statusCode;
        // 404 / 410: subscription is dead, prune it
        const expired = statusCode === 404 || statusCode === 410;
        return {
            success: false,
            statusCode,
            expired,
            error: err?.body || err?.message || "send failed",
        };
    }
}
/**
 * Fan-out send. Returns aggregate stats and the list of expired
 * subscription IDs the caller should soft-delete.
 */
async function sendPushBatch(subs, payload, concurrency = 20) {
    const expiredIds = [];
    let sent = 0;
    let failed = 0;
    // Simple concurrency-limited fan-out
    let cursor = 0;
    async function worker() {
        while (cursor < subs.length) {
            const i = cursor++;
            const sub = subs[i];
            const r = await sendPushTo(sub, payload);
            if (r.success)
                sent++;
            else {
                failed++;
                if (r.expired && sub.id)
                    expiredIds.push(sub.id);
            }
        }
    }
    await Promise.all(Array.from({ length: Math.min(concurrency, subs.length) }, worker));
    return { total: subs.length, sent, failed, expiredIds };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViLXB1c2gtY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvcHVzaC1ub3RpZmljYXRpb25zL2xpYi93ZWItcHVzaC1jbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRzs7QUFpQkgsNENBeUJDO0FBaUNELGdDQXVDQztBQU1ELHNDQStCQztBQXJKRCxJQUFJLEdBQUcsR0FBUSxJQUFJLENBQUE7QUFDbkIsSUFBSSxXQUFXLEdBQUcsS0FBSyxDQUFBO0FBRXZCLFNBQVMsVUFBVTtJQUNqQixJQUFJLEdBQUc7UUFBRSxPQUFPLEdBQUcsQ0FBQTtJQUNuQiwwRUFBMEU7SUFDMUUsb0RBQW9EO0lBQ3BELDhEQUE4RDtJQUM5RCxHQUFHLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFBO0lBQ3pCLE9BQU8sR0FBRyxDQUFBO0FBQ1osQ0FBQztBQUVEOztHQUVHO0FBQ0gsU0FBZ0IsZ0JBQWdCO0lBTTlCLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLElBQUksRUFBRSxDQUFBO0lBQ3BELE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLElBQUksRUFBRSxDQUFBO0lBQ3RELE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxJQUFJLDBCQUEwQixDQUFBO0lBRXZFLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUM5QixPQUFPLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxDQUFBO0lBQzlELENBQUM7SUFFRCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDO1lBQ0gsVUFBVSxFQUFFLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUs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