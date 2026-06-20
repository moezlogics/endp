"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
const agentic_commerce_1 = require("../../../../modules/agentic-commerce");
/**
 * GET /store/chat/history?session_id=xxx
 *   Returns the full message history for a session. Used when the chat
 *   widget reopens after a navigation and needs to repaint quickly.
 */
async function GET(req, res) {
    const svc = req.scope.resolve(agentic_commerce_1.AGENTIC_COMMERCE_MODULE);
    const session_id = (req.query.session_id || "").toString();
    if (!session_id)
        return res.status(400).json({ error: "session_id required" });
    const messages = await svc.listMessages(session_id, 100);
    res.json({ messages });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL2NoYXQvaGlzdG9yeS9yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQVFBLGtCQU9DO0FBZEQsMkVBQThFO0FBRTlFOzs7O0dBSUc7QUFDSSxLQUFLLFVBQVUsR0FBRyxDQUFDLEdBQWtCLEVBQUUsR0FBbUI7SUFDL0QsTUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsMENBQXVCLENBQVEsQ0FBQTtJQUM3RCxNQUFNLFVBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFBO0lBQzFELElBQUksQ0FBQyxVQUFVO1FBQUUsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxxQkFBcUIsRUFBRSxDQUFDLENBQUE7SUFFOUUsTUFBTSxRQUFRLEdBQUcsTUFBTSxHQUFHLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUN4RCxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQTtBQUN4QixDQUFDIn0=