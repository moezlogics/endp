"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
const push_notifications_1 = require("../../../../modules/push-notifications");
const web_push_client_1 = require("../../../../modules/push-notifications/lib/web-push-client");
/**
 * GET /admin/admin-push/debug
 *
 * Diagnostic endpoint: returns the current state of the admin push
 * infrastructure so the operator can verify in one request whether:
 *   - VAPID keys are configured
 *   - Admin push subscriptions exist in the database
 *   - The worker process is likely running
 *
 * Auth: admin Bearer JWT.
 */
async function GET(req, res) {
    const cfg = (0, web_push_client_1.configureWebPush)();
    const svc = req.scope.resolve(push_notifications_1.PUSH_NOTIFICATIONS_MODULE);
    let adminSubs = [];
    let customerSubs = [];
    try {
        adminSubs = await svc.listAdminPushSubscriptions({ is_active: true }, { take: 100 });
    }
    catch (e) {
        adminSubs = [{ error: e?.message || "listAdminPushSubscriptions failed" }];
    }
    try {
        customerSubs = await svc.listPushSubscriptions({ is_active: true }, { take: 100 });
    }
    catch (e) {
        customerSubs = [{ error: e?.message || "listPushSubscriptions failed" }];
    }
    const workerMode = process.env.MEDUSA_WORKER_MODE || "shared (default)";
    res.json({
        vapid: {
            configured: cfg.configured,
            publicKey: cfg.publicKey ? cfg.publicKey.slice(0, 20) + "..." : null,
            subject: cfg.configured ? process.env.VAPID_SUBJECT : null,
        },
        workerMode,
        adminSubscriptions: {
            count: Array.isArray(adminSubs) ? adminSubs.filter((s) => !s.error).length : 0,
            items: adminSubs.map((s) => ({
                id: s.id,
                admin_id: s.admin_id,
                device_browser: s.device_browser,
                is_active: s.is_active,
                endpoint: s.endpoint ? s.endpoint.slice(0, 60) + "..." : null,
                created_at: s.created_at,
                updated_at: s.updated_at,
                error: s.error,
            })),
        },
        customerSubscriptions: {
            count: Array.isArray(customerSubs) ? customerSubs.filter((s) => !s.error).length : 0,
            sample: customerSubs.slice(0, 5).map((s) => ({
                id: s.id,
                customer_id: s.customer_id,
                endpoint: s.endpoint ? s.endpoint.slice(0, 60) + "..." : null,
                is_active: s.is_active,
                created_at: s.created_at,
                error: s.error,
            })),
        },
        hints: [
            !cfg.configured && "⚠️ VAPID keys not configured — set VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY in .env",
            workerMode === "server" && "⚠️ This process is in SERVER mode — subscribers (push, email, etc.) only run in WORKER mode. Make sure medusa-worker is running.",
            workerMode === "shared (default)" && "ℹ️ Running in shared mode (server + worker in same process). Subscribers should fire.",
            (!adminSubs.length || adminSubs[0]?.error) && "⚠️ No active admin push subscriptions — open the admin app and enable notifications first.",
        ].filter(Boolean),
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL2FkbWluLXB1c2gvZGVidWcvcm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFnQkEsa0JBbUVDO0FBbEZELCtFQUFrRjtBQUVsRixnR0FBNkY7QUFFN0Y7Ozs7Ozs7Ozs7R0FVRztBQUNJLEtBQUssVUFBVSxHQUFHLENBQUMsR0FBa0IsRUFBRSxHQUFtQjtJQUMvRCxNQUFNLEdBQUcsR0FBRyxJQUFBLGtDQUFnQixHQUFFLENBQUE7SUFFOUIsTUFBTSxHQUFHLEdBQTZCLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUNyRCw4Q0FBeUIsQ0FDMUIsQ0FBQTtJQUVELElBQUksU0FBUyxHQUFVLEVBQUUsQ0FBQTtJQUN6QixJQUFJLFlBQVksR0FBVSxFQUFFLENBQUE7SUFDNUIsSUFBSSxDQUFDO1FBQ0gsU0FBUyxHQUFHLE1BQU8sR0FBVyxDQUFDLDBCQUEwQixDQUN2RCxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFDbkIsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQ2QsQ0FBQTtJQUNILENBQUM7SUFBQyxPQUFPLENBQU0sRUFBRSxDQUFDO1FBQ2hCLFNBQVMsR0FBRyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxPQUFPLElBQUksbUNBQW1DLEVBQUUsQ0FBQyxDQUFBO0lBQzVFLENBQUM7SUFFRCxJQUFJLENBQUM7UUFDSCxZQUFZLEdBQUcsTUFBTyxHQUFXLENBQUMscUJBQXFCLENBQ3JELEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FDZCxDQUFBO0lBQ0gsQ0FBQztJQUFDLE9BQU8sQ0FBTSxFQUFFLENBQUM7UUFDaEIsWUFBWSxHQUFHLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLE9BQU8sSUFBSSw4QkFBOEIsRUFBRSxD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