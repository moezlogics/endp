"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PUT = PUT;
const advanced_reviews_1 = require("../../../../../modules/advanced_reviews");
async function PUT(req, res) {
    try {
        const reviewsModuleService = req.scope.resolve(advanced_reviews_1.ADVANCED_REVIEWS_MODULE);
        const { id } = req.params;
        const { status } = req.body;
        if (!["pending", "approved", "flagged"].includes(status)) {
            res.status(400).json({ error: "Invalid status" });
            return;
        }
        const updated = await reviewsModuleService.updateAdvancedReviews({
            id,
            status
        });
        res.json({ review: updated });
    }
    catch (error) {
        console.error("[Admin Reviews Status] Error:", error);
        res.status(500).json({ error: error.message || "Failed to update review status." });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL2FkdmFuY2VkLXJldmlld3MvW2lkXS9zdGF0dXMvcm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSxrQkF3QkM7QUExQkQsOEVBQWlGO0FBRTFFLEtBQUssVUFBVSxHQUFHLENBQ3ZCLEdBQWtCLEVBQ2xCLEdBQW1CO0lBRW5CLElBQUksQ0FBQztRQUNILE1BQU0sb0JBQW9CLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsMENBQXVCLENBQUMsQ0FBQTtRQUN2RSxNQUFNLEVBQUUsRUFBRSxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQTtRQUN6QixNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLElBQVcsQ0FBQTtRQUVsQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1lBQ3pELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLGdCQUFnQixFQUFFLENBQUMsQ0FBQTtZQUNqRCxPQUFNO1FBQ1IsQ0FBQztRQUVELE1BQU0sT0FBTyxHQUFHLE1BQU8sb0JBQTRCLENBQUMscUJBQXFCLENBQUM7WUFDeEUsRUFBRTtZQUNGLE1BQU07U0FDUCxDQUFDLENBQUE7UUFFRixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUE7SUFDL0IsQ0FBQztJQUFDLE9BQU8sS0FBVSxFQUFFLENBQUM7UUFDcEIsT0FBTyxDQUFDLEtBQUssQ0FBQywrQkFBK0IsRUFBRSxLQUFLLENBQUMsQ0FBQTtRQUNyRCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsT0FBTyxJQUFJLGlDQUFpQyxFQUFFLENBQUMsQ0FBQTtJQUNyRixDQUFDO0FBQ0gsQ0FBQyJ9