"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
const web_push_client_1 = require("../../../../modules/push-notifications/lib/web-push-client");
/**
 * GET /admin/admin-push/vapid
 *
 * Returns the VAPID public key so the admin PWA's service worker can
 * call pushManager.subscribe({ applicationServerKey }). Reuses the same
 * VAPID keypair as the customer web-push system (no Firebase).
 */
async function GET(_req, res) {
    const cfg = (0, web_push_client_1.configureWebPush)();
    if (!cfg.configured) {
        return res.status(503).json({
            error: "VAPID keys not configured on the server (VAPID_PUBLIC_KEY / VAPID_PRIVATE_KEY).",
        });
    }
    res.json({ publicKey: cfg.publicKey });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL2FkbWluLXB1c2gvdmFwaWQvcm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFVQSxrQkFTQztBQWxCRCxnR0FBNkY7QUFFN0Y7Ozs7OztHQU1HO0FBQ0ksS0FBSyxVQUFVLEdBQUcsQ0FBQyxJQUFtQixFQUFFLEdBQW1CO0lBQ2hFLE1BQU0sR0FBRyxHQUFHLElBQUEsa0NBQWdCLEdBQUUsQ0FBQTtJQUM5QixJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3BCLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDMUIsS0FBSyxFQUNILGlGQUFpRjtTQUNwRixDQUFDLENBQUE7SUFDSixDQUFDO0lBQ0QsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLFNBQVMsRUFBRSxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQTtBQUN4QyxDQUFDIn0=