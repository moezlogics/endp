"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DELETE = DELETE;
const push_notifications_1 = require("../../../../modules/push-notifications");
/**
 * DELETE /admin/push-subscriptions/:id
 *   Soft-delete a subscription. Useful when the admin manually removes
 *   a subscriber or when pruning a dead endpoint.
 */
async function DELETE(req, res) {
    const svc = req.scope.resolve(push_notifications_1.PUSH_NOTIFICATIONS_MODULE);
    const id = req.params.id;
    if (!id)
        return res.status(400).json({ error: "id required" });
    await svc.deletePushSubscriptions([id]);
    res.json({ success: true });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL3B1c2gtc3Vic2NyaXB0aW9ucy9baWRdL3JvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBU0Esd0JBUUM7QUFoQkQsK0VBQWtGO0FBR2xGOzs7O0dBSUc7QUFDSSxLQUFLLFVBQVUsTUFBTSxDQUFDLEdBQWtCLEVBQUUsR0FBbUI7SUFDbEUsTUFBTSxHQUFHLEdBQTZCLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUNyRCw4Q0FBeUIsQ0FDMUIsQ0FBQTtJQUNELE1BQU0sRUFBRSxHQUFJLEdBQUcsQ0FBQyxNQUFjLENBQUMsRUFBRSxDQUFBO0lBQ2pDLElBQUksQ0FBQyxFQUFFO1FBQUUsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsQ0FBQyxDQUFBO0lBQzlELE1BQU8sR0FBVyxDQUFDLHVCQUF1QixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUNoRCxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7QUFDN0IsQ0FBQyJ9