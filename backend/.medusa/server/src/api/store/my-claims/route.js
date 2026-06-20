"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
const utils_1 = require("@medusajs/framework/utils");
async function POST(req, res) {
    try {
        const { order_id, type, items, return_shipping, additional_items } = req.body;
        if (!order_id || !type || !items || !items.length) {
            res.status(400).json({ error: "order_id, type, and items are required" });
            return;
        }
        const orderModuleService = req.scope.resolve(utils_1.Modules.ORDER);
        // Verify order exists and isn't canceled
        const order = await orderModuleService.retrieveOrder(order_id);
        if (!order) {
            res.status(404).json({ error: "Order not found" });
            return;
        }
        // Store the claim request in metadata for admin to review
        const existingMeta = (order.metadata || {});
        const claimRequests = existingMeta.claim_requests || [];
        claimRequests.push({
            type,
            items,
            return_shipping,
            additional_items,
            requested_at: new Date().toISOString(),
            status: "pending",
        });
        await orderModuleService.updateOrders([{
                id: order_id,
                metadata: {
                    ...existingMeta,
                    claim_requests: claimRequests,
                },
            }]);
        res.status(201).json({ success: true, claim: { order_id, type, status: "pending" } });
    }
    catch (error) {
        console.error("[Store Claims API] Error:", error);
        res.status(500).json({ error: error.message || "Failed to initiate claim" });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL215LWNsYWltcy9yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUlBLG9CQTJDQztBQTdDRCxxREFBbUQ7QUFFNUMsS0FBSyxVQUFVLElBQUksQ0FBQyxHQUFrQixFQUFFLEdBQVE7SUFDckQsSUFBSSxDQUFDO1FBQ0gsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRSxHQUFHLEdBQUcsQ0FBQyxJQUFXLENBQUE7UUFFcEYsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNsRCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSx3Q0FBd0MsRUFBRSxDQUFDLENBQUE7WUFDekUsT0FBTTtRQUNSLENBQUM7UUFFRCxNQUFNLGtCQUFrQixHQUF3QixHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxlQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7UUFFaEYseUNBQXlDO1FBQ3pDLE1BQU0sS0FBSyxHQUFHLE1BQU0sa0JBQWtCLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQzlELElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNYLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFFLENBQUMsQ0FBQTtZQUNsRCxPQUFNO1FBQ1IsQ0FBQztRQUVELDBEQUEwRDtRQUMxRCxNQUFNLFlBQVksR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLElBQUksRUFBRSxDQUF3QixDQUFBO1FBQ2xFLE1BQU0sYUFBYSxHQUFHLFlBQVksQ0FBQyxjQUFjLElBQUksRUFBRSxDQUFBO1FBQ3ZELGFBQWEsQ0FBQyxJQUFJLENBQUM7WUFDakIsSUFBSTtZQUNKLEtBQUs7WUFDTCxlQUFlO1lBQ2YsZ0JBQWdCO1lBQ2hCLFlBQVksRUFBRSxJQUFJLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRTtZQUN0QyxNQUFNLEVBQUUsU0FBUztTQUNsQixDQUFDLENBQUE7UUFFRixNQUFNLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUNyQyxFQUFFLEVBQUUsUUFBUTtnQkFDWixRQUFRLEVBQUU7b0JBQ1IsR0FBRyxZQUFZO29CQUNmLGNBQWMsRUFBRSxhQUFhO2lCQUM5QjthQUNGLENBQUMsQ0FBQyxDQUFBO1FBRUgsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQTtJQUN2RixDQUFDO0lBQUMsT0FBTyxLQUFVLEVBQUUsQ0FBQztRQUNwQixPQUFPLENBQUMsS0FBSyxDQUFDLDJCQUEyQixFQUFFLEtBQUssQ0FBQyxDQUFBO1FBQ2pELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxPQUFPLElBQUksMEJBQTBCLEVBQUUsQ0FBQyxDQUFBO0lBQzlFLENBQUM7QUFDSCxDQUFDIn0=