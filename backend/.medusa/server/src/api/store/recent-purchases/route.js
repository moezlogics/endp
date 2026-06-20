"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
async function GET(req, res) {
    const query = req.scope.resolve("query");
    try {
        const { data: orders } = await query.graph({
            entity: "order",
            fields: [
                "created_at",
                "shipping_address.first_name",
                "shipping_address.city",
                "items.title",
                "items.thumbnail",
            ],
            pagination: {
                take: 10,
                skip: 0,
                order: {
                    created_at: "DESC"
                }
            }
        });
        const purchases = orders.map((order) => {
            const firstItem = order.items?.[0];
            return {
                name: order.shipping_address?.first_name || "Someone",
                city: order.shipping_address?.city || "Pakistan",
                product: firstItem?.title || "a product",
                thumbnail: firstItem?.thumbnail || null,
                created_at: order.created_at,
            };
        });
        return res.json({ purchases });
    }
    catch (error) {
        return res.status(500).json({ error: "Failed to fetch recent purchases" });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL3JlY2VudC1wdXJjaGFzZXMvcm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxrQkFxQ0M7QUFyQ00sS0FBSyxVQUFVLEdBQUcsQ0FBQyxHQUFrQixFQUFFLEdBQW1CO0lBQy9ELE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBRXhDLElBQUksQ0FBQztRQUNILE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEdBQUcsTUFBTSxLQUFLLENBQUMsS0FBSyxDQUFDO1lBQ3pDLE1BQU0sRUFBRSxPQUFPO1lBQ2YsTUFBTSxFQUFFO2dCQUNOLFlBQVk7Z0JBQ1osNkJBQTZCO2dCQUM3Qix1QkFBdUI7Z0JBQ3ZCLGFBQWE7Z0JBQ2IsaUJBQWlCO2FBQ2xCO1lBQ0QsVUFBVSxFQUFFO2dCQUNWLElBQUksRUFBRSxFQUFFO2dCQUNSLElBQUksRUFBRSxDQUFDO2dCQUNQLEtBQUssRUFBRTtvQkFDTCxVQUFVLEVBQUUsTUFBTTtpQkFDbkI7YUFDRjtTQUNGLENBQUMsQ0FBQTtRQUVGLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFVLEVBQUUsRUFBRTtZQUMxQyxNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDbEMsT0FBTztnQkFDTCxJQUFJLEVBQUUsS0FBSyxDQUFDLGdCQUFnQixFQUFFLFVBQVUsSUFBSSxTQUFTO2dCQUNyRCxJQUFJLEVBQUUsS0FBSyxDQUFDLGdCQUFnQixFQUFFLElBQUksSUFBSSxVQUFVO2dCQUNoRCxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssSUFBSSxXQUFXO2dCQUN4QyxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsSUFBSSxJQUFJO2dCQUN2QyxVQUFVLEVBQUUsS0FBSyxDQUFDLFVBQVU7YUFDN0IsQ0FBQTtRQUNILENBQUMsQ0FBQyxDQUFBO1FBRUYsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQTtJQUNoQyxDQUFDO0lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztRQUNmLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsa0NBQWtDLEVBQUUsQ0FBQyxDQUFBO0lBQzVFLENBQUM7QUFDSCxDQUFDIn0=