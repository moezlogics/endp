"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
const agentic_commerce_1 = require("../../../../modules/agentic-commerce");
/**
 * POST /store/chat/session
 *
 * Create or resume a chat session.
 *
 * Body:
 *   { visitor_token?: string }
 *
 * SECURITY:
 *   `customer_id` comes ONLY from the request's auth context (the
 *   bearer cookie). The body's `customer_id` is intentionally ignored —
 *   otherwise anyone could pass a stranger's id and read that customer's
 *   chat history. Anonymous visitors are namespaced by `visitor_token`
 *   (a UUID the chat widget generates and stores in localStorage).
 *   Knowing another guest's token at most exposes their transient chat —
 *   it never crosses into authenticated-customer data.
 */
async function POST(req, res) {
    const svc = req.scope.resolve(agentic_commerce_1.AGENTIC_COMMERCE_MODULE);
    const body = (req.body || {});
    const authedCustomerId = req.auth_context?.actor_id || null;
    // Visitor token only matters when the user isn't authenticated.
    const visitor_token = !authedCustomerId && body.visitor_token
        ? String(body.visitor_token).slice(0, 64)
        : null;
    const session = await svc.findOrCreateSession({
        customer_id: authedCustomerId,
        visitor_token,
    });
    // Return the prior conversation alongside the session so the widget
    // can paint history on first open.
    const messages = await svc.listMessages(session.id, 50);
    res.json({ session, messages });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL2NoYXQvc2Vzc2lvbi9yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQW9CQSxvQkFzQkM7QUF6Q0QsMkVBQThFO0FBRTlFOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBQ0ksS0FBSyxVQUFVLElBQUksQ0FBQyxHQUFrQixFQUFFLEdBQW1CO0lBQ2hFLE1BQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLDBDQUF1QixDQUFRLENBQUE7SUFDN0QsTUFBTSxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBd0IsQ0FBQTtJQUVwRCxNQUFNLGdCQUFnQixHQUNsQixHQUFXLENBQUMsWUFBWSxFQUFFLFFBQStCLElBQUksSUFBSSxDQUFBO0lBRXJFLGdFQUFnRTtJQUNoRSxNQUFNLGFBQWEsR0FBRyxDQUFDLGdCQUFnQixJQUFJLElBQUksQ0FBQyxhQUFhO1FBQzNELENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxJQUFJLENBQUE7SUFFUixNQUFNLE9BQU8sR0FBRyxNQUFNLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQztRQUM1QyxXQUFXLEVBQUUsZ0JBQWdCO1FBQzdCLGFBQWE7S0FDZCxDQUFDLENBQUE7SUFFRixvRUFBb0U7SUFDcEUsbUNBQW1DO0lBQ25DLE1BQU0sUUFBUSxHQUFHLE1BQU0sR0FBRyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBRXZELEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQTtBQUNqQyxDQUFDIn0=