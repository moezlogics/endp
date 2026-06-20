"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
const utils_1 = require("@medusajs/framework/utils");
async function POST(req, res) {
    try {
        const { order_id, items, return_shipping, additional_items } = req.body;
        if (!order_id || !items || !items.length) {
            res.status(400).json({ error: "order_id and items are required" });
            return;
        }
        const orderModuleService = req.scope.resolve(utils_1.Modules.ORDER);
        // Verify order exists
        const order = await orderModuleService.retrieveOrder(order_id);
        if (!order) {
            res.status(404).json({ error: "Order not found" });
            return;
        }
        // Store the exchange request in metadata for admin to review
        const existingMeta = (order.metadata || {});
        const exchangeRequests = existingMeta.exchange_requests || [];
        exchangeRequests.push({
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
                    exchange_requests: exchangeRequests,
                },
            }]);
        res.status(201).json({ success: true, exchange: { order_id, status: "pending" } });
    }
    catch (error) {
        console.error("[Store Exchanges API] Error:", error);
        res.status(500).json({ error: error.message || "Failed to initiate exchange" });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL215LWV4Y2hhbmdlcy9yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUlBLG9CQTBDQztBQTVDRCxxREFBbUQ7QUFFNUMsS0FBSyxVQUFVLElBQUksQ0FBQyxHQUFrQixFQUFFLEdBQVE7SUFDckQsSUFBSSxDQUFDO1FBQ0gsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFLGdCQUFnQixFQUFFLEdBQUcsR0FBRyxDQUFDLElBQVcsQ0FBQTtRQUU5RSxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3pDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLGlDQUFpQyxFQUFFLENBQUMsQ0FBQTtZQUNsRSxPQUFNO1FBQ1IsQ0FBQztRQUVELE1BQU0sa0JBQWtCLEdBQXdCLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGVBQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUVoRixzQkFBc0I7UUFDdEIsTUFBTSxLQUFLLEdBQUcsTUFBTSxrQkFBa0IsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDOUQsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ1gsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQyxDQUFBO1lBQ2xELE9BQU07UUFDUixDQUFDO1FBRUQsNkRBQTZEO1FBQzdELE1BQU0sWUFBWSxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQXdCLENBQUE7UUFDbEUsTUFBTSxnQkFBZ0IsR0FBRyxZQUFZLENBQUMsaUJBQWlCLElBQUksRUFBRSxDQUFBO1FBQzdELGdCQUFnQixDQUFDLElBQUksQ0FBQztZQUNwQixLQUFLO1lBQ0wsZUFBZTtZQUNmLGdCQUFnQjtZQUNoQixZQUFZLEVBQUUsSUFBSSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUU7WUFDdEMsTUFBTSxFQUFFLFNBQVM7U0FDbEIsQ0FBQyxDQUFBO1FBRUYsTUFBTSxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDckMsRUFBRSxFQUFFLFFBQVE7Z0JBQ1osUUFBUSxFQUFFO29CQUNSLEdBQUcsWUFBWTtvQkFDZixpQkFBaUIsRUFBRSxnQkFBZ0I7aUJBQ3BDO2FBQ0YsQ0FBQyxDQUFDLENBQUE7UUFFSCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUE7SUFDcEYsQ0FBQztJQUFDLE9BQU8sS0FBVSxFQUFFLENBQUM7UUFDcEIsT0FBTyxDQUFDLEtBQUssQ0FBQyw4QkFBOEIsRUFBRSxLQUFLLENBQUMsQ0FBQTtRQUNwRCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsT0FBTyxJQUFJLDZCQUE2QixFQUFFLENBQUMsQ0FBQTtJQUNqRixDQUFDO0FBQ0gsQ0FBQyJ9