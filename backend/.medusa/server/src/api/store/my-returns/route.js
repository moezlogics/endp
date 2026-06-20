"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
const utils_1 = require("@medusajs/framework/utils");
async function POST(req, res) {
    try {
        const { order_id, items, return_shipping } = req.body;
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
        // Store the return request in metadata for admin to review
        const existingMeta = (order.metadata || {});
        const returnRequests = existingMeta.return_requests || [];
        returnRequests.push({
            items,
            return_shipping,
            requested_at: new Date().toISOString(),
            status: "pending",
        });
        await orderModuleService.updateOrders([{
                id: order_id,
                metadata: {
                    ...existingMeta,
                    return_requests: returnRequests,
                },
            }]);
        res.status(201).json({ success: true, return: { order_id, status: "pending" } });
    }
    catch (error) {
        console.error("[Store Returns API] Error:", error);
        res.status(500).json({ error: error.message || "Failed to initiate return" });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL215LXJldHVybnMvcm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFJQSxvQkF5Q0M7QUEzQ0QscURBQW1EO0FBRTVDLEtBQUssVUFBVSxJQUFJLENBQUMsR0FBa0IsRUFBRSxHQUFRO0lBQ3JELElBQUksQ0FBQztRQUNILE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxJQUFXLENBQUE7UUFFNUQsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUN6QyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxpQ0FBaUMsRUFBRSxDQUFDLENBQUE7WUFDbEUsT0FBTTtRQUNSLENBQUM7UUFFRCxNQUFNLGtCQUFrQixHQUF3QixHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxlQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7UUFFaEYsc0JBQXNCO1FBQ3RCLE1BQU0sS0FBSyxHQUFHLE1BQU0sa0JBQWtCLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQzlELElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNYLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFFLENBQUMsQ0FBQTtZQUNsRCxPQUFNO1FBQ1IsQ0FBQztRQUVELDJEQUEyRDtRQUMzRCxNQUFNLFlBQVksR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLElBQUksRUFBRSxDQUF3QixDQUFBO1FBQ2xFLE1BQU0sY0FBYyxHQUFHLFlBQVksQ0FBQyxlQUFlLElBQUksRUFBRSxDQUFBO1FBQ3pELGNBQWMsQ0FBQyxJQUFJLENBQUM7WUFDbEIsS0FBSztZQUNMLGVBQWU7WUFDZixZQUFZLEVBQUUsSUFBSSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUU7WUFDdEMsTUFBTSxFQUFFLFNBQVM7U0FDbEIsQ0FBQyxDQUFBO1FBRUYsTUFBTSxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDckMsRUFBRSxFQUFFLFFBQVE7Z0JBQ1osUUFBUSxFQUFFO29CQUNSLEdBQUcsWUFBWTtvQkFDZixlQUFlLEVBQUUsY0FBYztpQkFDaEM7YUFDRixDQUFDLENBQUMsQ0FBQTtRQUVILEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQTtJQUNsRixDQUFDO0lBQUMsT0FBTyxLQUFVLEVBQUUsQ0FBQztRQUNwQixPQUFPLENBQUMsS0FBSyxDQUFDLDRCQUE0QixFQUFFLEtBQUssQ0FBQyxDQUFBO1FBQ2xELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxPQUFPLElBQUksMkJBQTJCLEVBQUUsQ0FBQyxDQUFBO0lBQy9FLENBQUM7QUFDSCxDQUFDIn0=