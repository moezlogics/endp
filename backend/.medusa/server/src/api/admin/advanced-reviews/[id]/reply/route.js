"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
const advanced_reviews_1 = require("../../../../../modules/advanced_reviews");
async function POST(req, res) {
    try {
        const reviewsModuleService = req.scope.resolve(advanced_reviews_1.ADVANCED_REVIEWS_MODULE);
        const { id } = req.params;
        const { content } = req.body;
        if (!content || typeof content !== "string") {
            res.status(400).json({ error: "Reply content is required." });
            return;
        }
        const updated = await reviewsModuleService.updateAdvancedReviews({
            id,
            owner_reply: content
        });
        res.json({ review: updated });
    }
    catch (error) {
        console.error("[Admin Reviews Reply] Error:", error);
        res.status(500).json({ error: error.message || "Failed to post reply." });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL2FkdmFuY2VkLXJldmlld3MvW2lkXS9yZXBseS9yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLG9CQXdCQztBQTFCRCw4RUFBaUY7QUFFMUUsS0FBSyxVQUFVLElBQUksQ0FDeEIsR0FBa0IsRUFDbEIsR0FBbUI7SUFFbkIsSUFBSSxDQUFDO1FBQ0gsTUFBTSxvQkFBb0IsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQywwQ0FBdUIsQ0FBQyxDQUFBO1FBQ3ZFLE1BQU0sRUFBRSxFQUFFLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFBO1FBQ3pCLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxHQUFHLENBQUMsSUFBVyxDQUFBO1FBRW5DLElBQUksQ0FBQyxPQUFPLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxFQUFFLENBQUM7WUFDNUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsNEJBQTRCLEVBQUUsQ0FBQyxDQUFBO1lBQzdELE9BQU07UUFDUixDQUFDO1FBRUQsTUFBTSxPQUFPLEdBQUcsTUFBTyxvQkFBNEIsQ0FBQyxxQkFBcUIsQ0FBQztZQUN4RSxFQUFFO1lBQ0YsV0FBVyxFQUFFLE9BQU87U0FDckIsQ0FBQyxDQUFBO1FBRUYsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFBO0lBQy9CLENBQUM7SUFBQyxPQUFPLEtBQVUsRUFBRSxDQUFDO1FBQ3BCLE9BQU8sQ0FBQyxLQUFLLENBQUMsOEJBQThCLEVBQUUsS0FBSyxDQUFDLENBQUE7UUFDcEQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLE9BQU8sSUFBSSx1QkFBdUIsRUFBRSxDQUFDLENBQUE7SUFDM0UsQ0FBQztBQUNILENBQUMifQ==