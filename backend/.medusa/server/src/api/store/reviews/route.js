"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
exports.GET = GET;
const advanced_reviews_1 = require("../../../modules/advanced_reviews");
async function POST(req, res) {
    try {
        const reviewsModuleService = req.scope.resolve(advanced_reviews_1.ADVANCED_REVIEWS_MODULE);
        const { product_id, guest_name, guest_email, rating, content, photos, guest_id } = req.body;
        if (!product_id || !rating || !content) {
            res.status(400).json({ error: "product_id, rating, and content are required." });
            return;
        }
        // Determine customer status from session if available
        let customer_id = null;
        let is_verified = false;
        const reqAny = req;
        if (reqAny.auth_context && reqAny.auth_context.actor_id) {
            customer_id = reqAny.auth_context.actor_id;
            is_verified = true;
        }
        else {
            if (!guest_name || !guest_email) {
                res.status(400).json({ error: "guest_name and guest_email are required when not logged in." });
                return;
            }
        }
        // Enforce limits
        if (content.length > 2000) {
            res.status(400).json({ error: "Review cannot exceed 2000 characters." });
            return;
        }
        const clean_photos = is_verified && Array.isArray(photos) ? photos.slice(0, 5) : [];
        const review = await reviewsModuleService.createAdvancedReviews({
            product_id,
            customer_id,
            guest_name,
            guest_email,
            rating,
            content,
            photos: clean_photos,
            is_verified,
            status: "pending", // require admin approval to appear (or set auto-approve)
            metadata: guest_id ? { guest_id } : null,
        });
        res.status(201).json({ success: true, review });
    }
    catch (error) {
        console.error("[Store Reviews] Error:", error);
        res.status(500).json({ error: error.message || "Failed to submit review." });
    }
}
async function GET(req, res) {
    try {
        const reviewsModuleService = req.scope.resolve(advanced_reviews_1.ADVANCED_REVIEWS_MODULE);
        const product_id = req.query.product_id;
        if (!product_id) {
            res.status(400).json({ error: "product_id is required." });
            return;
        }
        // Only return approved reviews
        const limit = req.query.limit ? parseInt(req.query.limit) : 50;
        const offset = req.query.offset ? parseInt(req.query.offset) : 0;
        const [reviews, count] = await reviewsModuleService.listAndCountAdvancedReviews({ product_id, status: "approved" }, {
            skip: offset,
            take: limit,
            order: { created_at: "DESC" }
        });
        // ── Hydrate customer info for the storefront avatar/name. ──
        // The Review row only stores `customer_id`. The storefront's
        // <Avatar /> component needs first_name + the slice of metadata
        // that holds avatar_url + gender. We batch-fetch with one
        // query.graph call so N reviews don't trigger N round-trips.
        const customerIds = Array.from(new Set((reviews || [])
            .map((r) => r.customer_id)
            .filter((x) => !!x)));
        const customerMap = new Map();
        if (customerIds.length > 0) {
            try {
                const query = req.scope.resolve("query");
                const { data: customers } = await query.graph({
                    entity: "customer",
                    fields: [
                        "id",
                        "first_name",
                        "last_name",
                        "metadata",
                    ],
                    filters: { id: customerIds },
                });
                for (const c of customers || []) {
                    // Only ship the fields we actually use — avoids leaking
                    // internal metadata keys to the storefront.
                    const meta = c.metadata || {};
                    customerMap.set(c.id, {
                        first_name: c.first_name || null,
                        last_name: c.last_name || null,
                        metadata: {
                            avatar_url: typeof meta.avatar_url === "string" ? meta.avatar_url : null,
                            gender: typeof meta.gender === "string" ? meta.gender : null,
                        },
                    });
                }
            }
            catch (e) {
                console.warn("[Store Reviews] customer hydration failed", e);
            }
        }
        const enrichedReviews = (reviews || []).map((r) => ({
            ...r,
            customer: r.customer_id ? customerMap.get(r.customer_id) || null : null,
        }));
        // Calculate averages natively using the retrieved total
        // (In production, you'd calculate and cache this directly onto the product model to avoid querying heavy review sets)
        let avg = 0;
        if (enrichedReviews.length > 0) {
            const sum = enrichedReviews.reduce((acc, cur) => acc + (cur.rating || 0), 0);
            avg = sum / enrichedReviews.length;
        }
        res.json({
            reviews: enrichedReviews,
            count,
            limit,
            offset,
            averageRating: avg,
        });
    }
    catch (error) {
        console.error("[Store Reviews] Error:", error);
        res.status(500).json({ error: error.message || "Failed to fetch reviews." });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL3Jldmlld3Mvcm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSxvQkE2REM7QUFFRCxrQkFvR0M7QUFyS0Qsd0VBQTJFO0FBRXBFLEtBQUssVUFBVSxJQUFJLENBQ3hCLEdBQWtCLEVBQ2xCLEdBQW1CO0lBRW5CLElBQUksQ0FBQztRQUNILE1BQU0sb0JBQW9CLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsMENBQXVCLENBQUMsQ0FBQTtRQUN2RSxNQUFNLEVBQ0osVUFBVSxFQUNWLFVBQVUsRUFDVixXQUFXLEVBQ1gsTUFBTSxFQUNOLE9BQU8sRUFDUCxNQUFNLEVBQ04sUUFBUSxFQUNULEdBQUcsR0FBRyxDQUFDLElBQVcsQ0FBQTtRQUVuQixJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDdkMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsK0NBQStDLEVBQUUsQ0FBQyxDQUFBO1lBQ2hGLE9BQU07UUFDUixDQUFDO1FBRUQsc0RBQXNEO1FBQ3RELElBQUksV0FBVyxHQUFHLElBQUksQ0FBQTtRQUN0QixJQUFJLFdBQVcsR0FBRyxLQUFLLENBQUE7UUFFdkIsTUFBTSxNQUFNLEdBQUcsR0FBVSxDQUFBO1FBQ3pCLElBQUksTUFBTSxDQUFDLFlBQVksSUFBSSxNQUFNLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3hELFdBQVcsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQTtZQUMxQyxXQUFXLEdBQUcsSUFBSSxDQUFBO1FBQ3BCLENBQUM7YUFBTSxDQUFDO1lBQ04sSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUNoQyxH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