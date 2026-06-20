"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = orderAdminPushHandler;
const push_notifications_1 = require("../modules/push-notifications");
const web_push_client_1 = require("../modules/push-notifications/lib/web-push-client");
/**
 * ADMIN push on a new order — MINIMAL + LOUD DIAGNOSTICS.
 *
 * Uses console.log (NOT the framework logger) so the markers show up in
 * `pm2 logs` even if the logger's level is filtered to http-only — that's
 * why earlier the subscriber's firing was invisible in the logs.
 *
 * Runs only in MEDUSA_WORKER_MODE = worker | shared.
 */
// Runs ONCE when Medusa loads this subscriber file at startup. If you do
// NOT see this line right after `pm2 restart`, the file isn't deployed /
// built / registered on the server.
console.log("[AdminPush] ✅ MODULE LOADED — subscriber registered for order.placed");
async function orderAdminPushHandler({ event, container, }) {
    const orderId = event.data?.id;
    // console.log so it's visible regardless of logger level.
    console.log(`[AdminPush] 🔔 order.placed FIRED — orderId=${orderId || "NONE"}`);
    if (!orderId)
        return;
    const cfg = (0, web_push_client_1.configureWebPush)();
    if (!cfg.configured) {
        console.log("[AdminPush] ⚠️ VAPID not configured — skipping");
        return;
    }
    const svc = container.resolve(push_notifications_1.PUSH_NOTIFICATIONS_MODULE);
    let subs = [];
    try {
        subs = await svc.listAdminPushSubscriptions({ is_active: true }, { take: 200 });
    }
    catch (e) {
        console.log(`[AdminPush] ❌ listAdminPushSubscriptions failed: ${e?.message || e}`);
        return;
    }
    console.log(`[AdminPush] active admin devices = ${subs?.length || 0}`);
    if (!subs?.length)
        return;
    const payload = {
        title: "🛒 New order received",
        body: "A new order just came in — tap to view.",
        url: `/orders/${orderId}`,
        tag: `admin-order-${orderId}`,
        data: { order_id: orderId },
    };
    try {
        const result = await (0, web_push_client_1.sendPushBatch)(subs.map((s) => ({ id: s.id, endpoint: s.endpoint, p256dh: s.p256dh, auth: s.auth })), payload);
        if (result.expiredIds.length) {
            try {
                await svc.deleteAdminPushSubscriptions(result.expiredIds);
            }
            catch {
                /* ignore prune errors */
            }
        }
        console.log(`[AdminPush] 📤 order=${orderId} sent=${result.sent}/${result.total} failed=${result.failed} pruned=${result.expiredIds.length}`);
    }
    catch (err) {
        console.log(`[AdminPush] ❌ SEND FAILED order=${orderId} message=${err?.message || err}`);
    }
}
exports.config = {
    event: "order.placed",
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItYWRtaW4tcHVzaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zdWJzY3JpYmVycy9vcmRlci1hZG1pbi1wdXNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQXdCQSx3Q0F1REM7QUE3RUQsc0VBQXlFO0FBRXpFLHVGQUcwRDtBQUUxRDs7Ozs7Ozs7R0FRRztBQUVILHlFQUF5RTtBQUN6RSx5RUFBeUU7QUFDekUsb0NBQW9DO0FBQ3BDLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0VBQXNFLENBQUMsQ0FBQTtBQUVwRSxLQUFLLFVBQVUscUJBQXFCLENBQUMsRUFDbEQsS0FBSyxFQUNMLFNBQVMsR0FDc0I7SUFDL0IsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUE7SUFDOUIsMERBQTBEO0lBQzFELE9BQU8sQ0FBQyxHQUFHLENBQUMsK0NBQStDLE9BQU8sSUFBSSxNQUFNLEVBQUUsQ0FBQyxDQUFBO0lBQy9FLElBQUksQ0FBQyxPQUFPO1FBQUUsT0FBTTtJQUVwQixNQUFNLEdBQUcsR0FBRyxJQUFBLGtDQUFnQixHQUFFLENBQUE7SUFDOUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLGdEQUFnRCxDQUFDLENBQUE7UUFDN0QsT0FBTTtJQUNSLENBQUM7SUFFRCxNQUFNLEdBQUcsR0FBNkIsU0FBUyxDQUFDLE9BQU8sQ0FBQyw4Q0FBeUIsQ0FBQyxDQUFBO0lBRWxGLElBQUksSUFBSSxHQUFVLEVBQUUsQ0FBQTtJQUNwQixJQUFJLENBQUM7UUFDSCxJQUFJLEdBQUcsTUFBTyxHQUFXLENBQUMsMEJBQTBCLENBQUMsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQTtJQUMxRixDQUFDO0lBQUMsT0FBTyxDQUFNLEVBQUUsQ0FBQztRQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLG9EQUFvRCxDQUFDLEVBQUUsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDbEYsT0FBTTtJQUNSLENBQUM7SUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLHNDQUFzQyxJQUFJLEVBQUUsTUFBTSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7SUFDdEUsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNO1FBQUUsT0FBTTtJQUV6QixNQUFNLE9BQU8sR0FBRztRQUNkLEtBQUssRUFBRSx1QkFBdUI7UUFDOUIsSUFBSSxFQUFFLHlDQUF5QztRQUMvQyxHQUFHLEVBQUUsV0FBVyxPQUFPLEVBQUU7UUFDekIsR0FBRyxFQUFFLGVBQWUsT0FBTyxFQUFFO1FBQzdCLElBQUksRUFBRSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUU7S0FDNUIsQ0FBQTtJQUVELElBQUksQ0FBQztRQUNILE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBQSwrQkFBYSxFQUNoQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQ3JGLE9BQU8sQ0FDUixDQUFBO1FBRUQsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQzdCLElBQUksQ0FBQztnQkFDSCxNQUFPLEdBQVcsQ0FBQyw0QkFBNEIsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUE7WUFDcEUsQ0FBQztZQUFDLE1BQU0sQ0FBQztnQkFDUCx5QkFBeUI7WUFDM0IsQ0FBQztRQUNILENBQUM7UUFFRCxPQUFPLENBQUMsR0FBRyxDQUNULHdCQUF3QixPQUFPLFNBQVMsTUFBTSxDQUFDLElBQUksSUFBSSxNQUFNLENBQUMsS0FBSyxXQUFXLE1BQU0sQ0FBQyxNQUFNLFdBQVcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FDakksQ0FBQTtJQUNILENBQUM7SUFBQyxPQUFPLEdBQVEsRUFBRSxDQUFDO1FBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUNBQW1DLE9BQU8sWUFBWSxHQUFHLEVBQUUsT0FBTyxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUE7SUFDMUYsQ0FBQztBQUNILENBQUM7QUFFWSxRQUFBLE1BQU0sR0FBcUI7SUFDdEMsS0FBSyxFQUFFLGNBQWM7Q0FDdEIsQ0FBQSJ9