"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
const advanced_reviews_1 = require("../../../modules/advanced_reviews");
async function GET(req, res) {
    try {
        const reviewsModuleService = req.scope.resolve(advanced_reviews_1.ADVANCED_REVIEWS_MODULE);
        const limit = req.query.limit ? parseInt(req.query.limit) : 50;
        const offset = req.query.offset ? parseInt(req.query.offset) : 0;
        const [reviews, count] = await reviewsModuleService.listAndCountAdvancedReviews({}, {
            skip: offset,
            take: limit,
            order: { created_at: "DESC" }
        });
        res.json({
            reviews,
            count,
            limit,
            offset
        });
    }
    catch (error) {
        console.error("[Admin Reviews] Error:", error);
        res.status(500).json({ error: error.message || "Failed to fetch reviews." });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL2FkdmFuY2VkLXJldmlld3Mvcm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSxrQkE2QkM7QUEvQkQsd0VBQTJFO0FBRXBFLEtBQUssVUFBVSxHQUFHLENBQ3ZCLEdBQWtCLEVBQ2xCLEdBQW1CO0lBRW5CLElBQUksQ0FBQztRQUNILE1BQU0sb0JBQW9CLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsMENBQXVCLENBQUMsQ0FBQTtRQUV2RSxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQTtRQUN4RSxNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFFMUUsTUFBTSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsR0FBRyxNQUFPLG9CQUE0QixDQUFDLDJCQUEyQixDQUN0RixFQUFFLEVBQ0Y7WUFDRSxJQUFJLEVBQUUsTUFBTTtZQUNaLElBQUksRUFBRSxLQUFLO1lBQ1gsS0FBSyxFQUFFLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRTtTQUM5QixDQUNGLENBQUE7UUFFRCxHQUFHLENBQUMsSUFBSSxDQUFDO1lBQ1AsT0FBTztZQUNQLEtBQUs7WUFDTCxLQUFLO1lBQ0wsTUFBTTtTQUNQLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFBQyxPQUFPLEtBQVUsRUFBRSxDQUFDO1FBQ3BCLE9BQU8sQ0FBQyxLQUFLLENBQUMsd0JBQXdCLEVBQUUsS0FBSyxDQUFDLENBQUE7UUFDOUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLE9BQU8sSUFBSSwwQkFBMEIsRUFBRSxDQUFDLENBQUE7SUFDOUUsQ0FBQztBQUNILENBQUMifQ==