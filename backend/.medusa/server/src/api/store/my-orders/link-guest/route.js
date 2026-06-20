"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
const utils_1 = require("@medusajs/framework/utils");
async function POST(req, res) {
    try {
        const { order_id, guest_id } = req.body;
        if (!order_id || !guest_id) {
            res.status(400).json({ error: "order_id and guest_id are required" });
            return;
        }
        const orderModuleService = req.scope.resolve(utils_1.Modules.ORDER);
        // Retrieve order
        const order = await orderModuleService.retrieveOrder(order_id);
        if (!order) {
            res.status(404).json({ error: "Order not found" });
            return;
        }
        // Security check: if the order is already linked to a registered customer account, reject!
        if (order.customer_id) {
            res.status(400).json({ error: "Order is already linked to a registered customer account" });
            return;
        }
        const existingMeta = (order.metadata || {});
        // HIJACK GUARD: once an order is claimed by one guest, nobody else can
        // re-claim it. Without this, anyone who learns an order id (it appears
        // in the confirmation URL) could POST their own guest_id here and then
        // read the order's PII (name, phone, address) via /by-guest.
        if (existingMeta.guest_id && existingMeta.guest_id !== guest_id) {
            res.status(409).json({ error: "Order is already linked to another guest" });
            return;
        }
        // Already linked to THIS guest — nothing to do (idempotent).
        if (existingMeta.guest_id === guest_id) {
            res.json({ success: true });
            return;
        }
        await orderModuleService.updateOrders([{
                id: order_id,
                metadata: {
                    ...existingMeta,
                    guest_id: guest_id,
                },
            }]);
        res.json({ success: true });
    }
    catch (error) {
        console.error("[Link Guest Order API] Error:", error);
        res.status(500).json({ error: error.message || "Failed to link guest order" });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL215LW9yZGVycy9saW5rLWd1ZXN0L3JvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUEsb0JBcURDO0FBdkRELHFEQUFtRDtBQUU1QyxLQUFLLFVBQVUsSUFBSSxDQUFDLEdBQWtCLEVBQUUsR0FBUTtJQUNyRCxJQUFJLENBQUM7UUFDSCxNQUFNLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxHQUFHLEdBQUcsQ0FBQyxJQUE4QyxDQUFBO1FBQ2pGLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUMzQixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxvQ0FBb0MsRUFBRSxDQUFDLENBQUE7WUFDckUsT0FBTTtRQUNSLENBQUM7UUFFRCxNQUFNLGtCQUFrQixHQUF3QixHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxlQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7UUFFaEYsaUJBQWlCO1FBQ2pCLE1BQU0sS0FBSyxHQUFHLE1BQU0sa0JBQWtCLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQzlELElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNYLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFFLENBQUMsQ0FBQTtZQUNsRCxPQUFNO1FBQ1IsQ0FBQztRQUVELDJGQUEyRjtRQUMzRixJQUFJLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN0QixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSwwREFBMEQsRUFBRSxDQUFDLENBQUE7WUFDM0YsT0FBTTtRQUNSLENBQUM7UUFFRCxNQUFNLFlBQVksR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLElBQUksRUFBRSxDQUF3QixDQUFBO1FBRWxFLHVFQUF1RTtRQUN2RSx1RUFBdUU7UUFDdkUsdUVBQXVFO1FBQ3ZFLDZEQUE2RDtRQUM3RCxJQUFJLFlBQVksQ0FBQyxRQUFRLElBQUksWUFBWSxDQUFDLFFBQVEsS0FBSyxRQUFRLEVBQUUsQ0FBQztZQUNoRSxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSwwQ0FBMEMsRUFBRSxDQUFDLENBQUE7WUFDM0UsT0FBTTtRQUNSLENBQUM7UUFFRCw2REFBNkQ7UUFDN0QsSUFBSSxZQUFZLENBQUMsUUFBUSxLQUFLLFFBQVEsRUFBRSxDQUFDO1lBQ3ZDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQTtZQUMzQixPQUFNO1FBQ1IsQ0FBQztRQUVELE1BQU0sa0JBQWtCLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ3JDLEVBQUUsRUFBRSxRQUFRO2dCQUNaLFFBQVEsRUFBRTtvQkFDUixHQUFHLFlBQVk7b0JBQ2YsUUFBUSxFQUFFLFFBQVE7aUJBQ25CO2FBQ0YsQ0FBQyxDQUFDLENBQUE7UUFFSCxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7SUFDN0IsQ0FBQztJQUFDLE9BQU8sS0FBVSxFQUFFLENBQUM7UUFDcEIsT0FBTyxDQUFDLEtBQUssQ0FBQywrQkFBK0IsRUFBRSxLQUFLLENBQUMsQ0FBQTtRQUNyRCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsT0FBTyxJQUFJLDRCQUE0QixFQUFFLENBQUMsQ0FBQTtJQUNoRixDQUFDO0FBQ0gsQ0FBQyJ9