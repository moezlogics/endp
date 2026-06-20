"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
const utils_1 = require("@medusajs/framework/utils");
async function GET(req, res) {
    try {
        const { display_id, email } = req.query;
        if (!display_id || !email) {
            res.status(400).json({ error: "display_id and email are required" });
            return;
        }
        const query = req.scope.resolve(utils_1.ContainerRegistrationKeys.QUERY);
        const displayIdNumber = parseInt(display_id, 10);
        if (isNaN(displayIdNumber)) {
            res.status(400).json({ error: "Invalid display_id format" });
            return;
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
                "shipping_address.*",
                "email"
            ],
            filters: {
                display_id: displayIdNumber,
                email: email.trim().toLowerCase()
            }
        });
        if (!orders || orders.length === 0) {
            res.status(404).json({ error: "Order not found with the provided ID and email" });
            return;
        }
        res.json({ order: orders[0] });
    }
    catch (error) {
        console.error("[Track Order API] Error:", error);
        res.status(500).json({ error: error.message || "Failed to retrieve order" });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL215LW9yZGVycy90cmFjay9yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLGtCQThDQztBQWhERCxxREFBcUU7QUFFOUQsS0FBSyxVQUFVLEdBQUcsQ0FBQyxHQUFrQixFQUFFLEdBQVE7SUFDcEQsSUFBSSxDQUFDO1FBQ0gsTUFBTSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsR0FBRyxHQUFHLENBQUMsS0FBOEMsQ0FBQTtRQUNoRixJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDMUIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsbUNBQW1DLEVBQUUsQ0FBQyxDQUFBO1lBQ3BFLE9BQU07UUFDUixDQUFDO1FBRUQsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsaUNBQXlCLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDaEUsTUFBTSxlQUFlLEdBQUcsUUFBUSxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQTtRQUVoRCxJQUFJLEtBQUssQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDO1lBQzNCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLDJCQUEyQixFQUFFLENBQUMsQ0FBQTtZQUM1RCxPQUFNO1FBQ1IsQ0FBQztRQUVELE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEdBQUcsTUFBTSxLQUFLLENBQUMsS0FBSyxDQUFDO1lBQ3pDLE1BQU0sRUFBRSxPQUFPO1lBQ2YsTUFBTSxFQUFFO2dCQUNOLElBQUk7Z0JBQ0osWUFBWTtnQkFDWixRQUFRO2dCQUNSLFlBQVk7Z0JBQ1osT0FBTztnQkFDUCxlQUFlO2dCQUNmLFNBQVM7Z0JBQ1QsVUFBVTtnQkFDVixvQkFBb0I7Z0JBQ3BCLE9BQU87YUFDUjtZQUNELE9BQU8sRUFBRTtnQkFDUCxVQUFVLEVBQUUsZUFBZTtnQkFDM0IsS0FBSyxFQUFFLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUU7YUFDM0I7U0FDVCxDQUFDLENBQUE7UUFFRixJQUFJLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDbkMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsZ0RBQWdELEVBQUUsQ0FBQyxDQUFBO1lBQ2pGLE9BQU07UUFDUixDQUFDO1FBRUQsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBQ2hDLENBQUM7SUFBQyxPQUFPLEtBQVUsRUFBRSxDQUFDO1FBQ3BCLE9BQU8sQ0FBQyxLQUFLLENBQUMsMEJBQTBCLEVBQUUsS0FBSyxDQUFDLENBQUE7UUFDaEQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLE9BQU8sSUFBSSwwQkFBMEIsRUFBRSxDQUFDLENBQUE7SUFDOUUsQ0FBQztBQUNILENBQUMifQ==