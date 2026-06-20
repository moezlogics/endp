"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
const utils_1 = require("@medusajs/framework/utils");
async function GET(req, res) {
    try {
        const { guest_id, order_ids } = req.query;
        if (!guest_id) {
            res.status(400).json({ error: "guest_id is required" });
            return;
        }
        const query = req.scope.resolve(utils_1.ContainerRegistrationKeys.QUERY);
        let filterIds = [];
        if (order_ids) {
            filterIds = order_ids.split(",").filter(Boolean);
        }
        const filters = {};
        if (filterIds.length > 0) {
            filters.id = filterIds;
        }
        else {
            // Query directly by metadata
            filters.metadata = { guest_id };
        }
        const { data: orders } = await query.graph({
            entity: "order",
            fields: [
                "id",
                "display_id",
                "status",
                "created_at",
                "total",
                "currency_code",
                "items.*",
                "metadata",
                "shipping_address.*"
            ],
            filters
        });
        // Filter results in memory to ensure they belong to this guest (security check)
        const secureOrders = orders.filter((o) => {
            const meta = o.metadata || {};
            return meta.guest_id === guest_id;
        });
        res.json({ orders: secureOrders });
    }
    catch (error) {
        console.error("[Guest Orders API] Error:", error);
        res.status(500).json({ error: error.message || "Failed to fetch guest orders" });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL215LW9yZGVycy9ieS1ndWVzdC9yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLGtCQWtEQztBQXBERCxxREFBcUU7QUFFOUQsS0FBSyxVQUFVLEdBQUcsQ0FBQyxHQUFrQixFQUFFLEdBQVE7SUFDcEQsSUFBSSxDQUFDO1FBQ0gsTUFBTSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsR0FBRyxHQUFHLENBQUMsS0FBaUQsQ0FBQTtRQUNyRixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDZCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxzQkFBc0IsRUFBRSxDQUFDLENBQUE7WUFDdkQsT0FBTTtRQUNSLENBQUM7UUFFRCxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxpQ0FBeUIsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUVoRSxJQUFJLFNBQVMsR0FBYSxFQUFFLENBQUE7UUFDNUIsSUFBSSxTQUFTLEVBQUUsQ0FBQztZQUNkLFNBQVMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUNsRCxDQUFDO1FBRUQsTUFBTSxPQUFPLEdBQVEsRUFBRSxDQUFBO1FBQ3ZCLElBQUksU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUN6QixPQUFPLENBQUMsRUFBRSxHQUFHLFNBQVMsQ0FBQTtRQUN4QixDQUFDO2FBQU0sQ0FBQztZQUNOLDZCQUE2QjtZQUM3QixPQUFPLENBQUMsUUFBUSxHQUFHLEVBQUUsUUFBUSxFQUFFLENBQUE7UUFDakMsQ0FBQztRQUVELE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEdBQUcsTUFBTSxLQUFLLENBQUMsS0FBSyxDQUFDO1lBQ3pDLE1BQU0sRUFBRSxPQUFPO1lBQ2YsTUFBTSxFQUFFO2dCQUNOLElBQUk7Z0JBQ0osWUFBWTtnQkFDWixRQUFRO2dCQUNSLFlBQVk7Z0JBQ1osT0FBTztnQkFDUCxlQUFlO2dCQUNmLFNBQVM7Z0JBQ1QsVUFBVTtnQkFDVixvQkFBb0I7YUFDckI7WUFDRCxPQUFPO1NBQ1IsQ0FBQyxDQUFBO1FBRUYsZ0ZBQWdGO1FBQ2hGLE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRTtZQUM1QyxNQUFNLElBQUksR0FBRyxDQUFDLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQTtZQUM3QixPQUFPLElBQUksQ0FBQyxRQUFRLEtBQUssUUFBUSxDQUFBO1FBQ25DLENBQUMsQ0FBQyxDQUFBO1FBRUYsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFBO0lBQ3BDLENBQUM7SUFBQyxPQUFPLEtBQVUsRUFBRSxDQUFDO1FBQ3BCLE9BQU8sQ0FBQyxLQUFLLENBQUMsMkJBQTJCLEVBQUUsS0FBSyxDQUFDLENBQUE7UUFDakQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLE9BQU8sSUFBSSw4QkFBOEIsRUFBRSxDQUFDLENBQUE7SUFDbEYsQ0FBQztBQUNILENBQUMifQ==