"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
const advanced_reviews_1 = require("../../../../modules/advanced_reviews");
async function GET(req, res) {
    try {
        const { guest_id } = req.query;
        if (!guest_id) {
            res.status(400).json({ error: "guest_id is required" });
            return;
        }
        const reviewsModuleService = req.scope.resolve(advanced_reviews_1.ADVANCED_REVIEWS_MODULE);
        // Query advanced reviews by guest_id in metadata
        const reviews = await reviewsModuleService.listAdvancedReviews({
            metadata: { guest_id }
        }, {
            order: { created_at: "DESC" }
        });
        // Defence-in-depth: nested-JSON metadata filters don't always narrow
        // correctly across module backends. Re-filter in memory so we can NEVER
        // leak another guest's reviews even if the DB filter is too loose.
        const secureReviews = (reviews || []).filter((r) => (r?.metadata || {}).guest_id === guest_id);
        res.json({ reviews: secureReviews });
    }
    catch (error) {
        console.error("[Guest Reviews API] Error:", error);
        res.status(500).json({ error: error.message || "Failed to fetch guest reviews" });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL215LXJldmlld3MvYnktZ3Vlc3Qvcm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSxrQkFnQ0M7QUFsQ0QsMkVBQThFO0FBRXZFLEtBQUssVUFBVSxHQUFHLENBQUMsR0FBa0IsRUFBRSxHQUFRO0lBQ3BELElBQUksQ0FBQztRQUNILE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxHQUFHLENBQUMsS0FBNkIsQ0FBQTtRQUN0RCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDZCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxzQkFBc0IsRUFBRSxDQUFDLENBQUE7WUFDdkQsT0FBTTtRQUNSLENBQUM7UUFFRCxNQUFNLG9CQUFvQixHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLDBDQUF1QixDQUFDLENBQUE7UUFFdkUsaURBQWlEO1FBQ2pELE1BQU0sT0FBTyxHQUFHLE1BQU8sb0JBQTRCLENBQUMsbUJBQW1CLENBQ3JFO1lBQ0UsUUFBUSxFQUFFLEVBQUUsUUFBUSxFQUFFO1NBQ3ZCLEVBQ0Q7WUFDRSxLQUFLLEVBQUUsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFO1NBQzlCLENBQ0YsQ0FBQTtRQUVELHFFQUFxRTtRQUNyRSx3RUFBd0U7UUFDeEUsbUVBQW1FO1FBQ25FLE1BQU0sYUFBYSxHQUFHLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FDMUMsQ0FBQyxDQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsSUFBSSxFQUFFLENBQUMsQ0FBQyxRQUFRLEtBQUssUUFBUSxDQUN0RCxDQUFBO1FBRUQsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsQ0FBQyxDQUFBO0lBQ3RDLENBQUM7SUFBQyxPQUFPLEtBQVUsRUFBRSxDQUFDO1FBQ3BCLE9BQU8sQ0FBQyxLQUFLLENBQUMsNEJBQTRCLEVBQUUsS0FBSyxDQUFDLENBQUE7UUFDbEQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLE9BQU8sSUFBSSwrQkFBK0IsRUFBRSxDQUFDLENBQUE7SUFDbkYsQ0FBQztBQUNILENBQUMifQ==