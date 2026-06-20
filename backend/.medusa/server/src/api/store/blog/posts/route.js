"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
const blog_1 = require("../../../../modules/blog");
const cache_response_1 = require("../../../../utils/cache-response");
// Public list — only published posts
async function GET(req, res) {
    const blog = req.scope.resolve(blog_1.BLOG_MODULE);
    const q = req.query;
    const limit = Math.min(parseInt(q.limit || "12", 10), 50);
    const offset = parseInt(q.offset || "0", 10);
    const filters = { status: "published" };
    if (q.q)
        filters.title = { $ilike: `%${q.q}%` };
    if (q.category) {
        // filter by category handle
        const categories = await blog.listBlogCategories({ handle: q.category });
        if (categories.length) {
            filters.categories = { id: categories[0].id };
        }
        else {
            return res.json({ posts: [], count: 0, limit, offset });
        }
    }
    const runQuery = () => blog.listAndCountBlogPosts(filters, {
        take: limit,
        skip: offset,
        order: { published_at: "DESC" },
        relations: ["categories"],
    });
    // Cache normal listings/pagination. Skip caching free-text searches
    // (q.q) so arbitrary search strings can't pollute the cache.
    let posts;
    let count;
    if (q.q) {
        ;
        [posts, count] = await runQuery();
    }
    else {
        const cat = typeof q.category === "string" ? q.category : "all";
        const result = await (0, cache_response_1.cached)(req.scope, `store:blog:posts:${cat}:${limit}:${offset}`, 180, runQuery);
        [posts, count] = result;
        res.setHeader("Cache-Control", "public, max-age=120, s-maxage=180");
    }
    res.json({ posts, count, limit, offset });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL2Jsb2cvcG9zdHMvcm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFNQSxrQkErQ0M7QUFwREQsbURBQXNEO0FBRXRELHFFQUF5RDtBQUV6RCxxQ0FBcUM7QUFDOUIsS0FBSyxVQUFVLEdBQUcsQ0FBQyxHQUFrQixFQUFFLEdBQW1CO0lBQy9ELE1BQU0sSUFBSSxHQUFzQixHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxrQkFBVyxDQUFDLENBQUE7SUFDOUQsTUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDLEtBQTRCLENBQUE7SUFFMUMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxJQUFJLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUE7SUFDekQsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBRTVDLE1BQU0sT0FBTyxHQUF3QixFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsQ0FBQTtJQUM1RCxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQUUsT0FBTyxDQUFDLEtBQUssR0FBRyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFBO0lBRS9DLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2YsNEJBQTRCO1FBQzVCLE1BQU0sVUFBVSxHQUFHLE1BQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFBO1FBQ3hFLElBQUksVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3RCLE9BQU8sQ0FBQyxVQUFVLEdBQUcsRUFBRSxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFBO1FBQy9DLENBQUM7YUFBTSxDQUFDO1lBQ04sT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFBO1FBQ3pELENBQUM7SUFDSCxDQUFDO0lBRUQsTUFBTSxRQUFRLEdBQUcsR0FBRyxFQUFFLENBQ3BCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLEVBQUU7UUFDbEMsSUFBSSxFQUFFLEtBQUs7UUFDWCxJQUFJLEVBQUUsTUFBTTtRQUNaLEtBQUssRUFBRSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQVM7UUFDdEMsU0FBUyxFQUFFLENBQUMsWUFBWSxDQUFDO0tBQzFCLENBQUMsQ0FBQTtJQUVKLG9FQUFvRTtJQUNwRSw2REFBNkQ7SUFDN0QsSUFBSSxLQUFZLENBQUE7SUFDaEIsSUFBSSxLQUFhLENBQUE7SUFDakIsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDUixDQUFDO1FBQUEsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEdBQUcsTUFBTSxRQUFRLEVBQUUsQ0FBQTtJQUNwQyxDQUFDO1NBQU0sQ0FBQztRQUNOLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxDQUFDLFFBQVEsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQTtRQUMvRCxNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUEsdUJBQU0sRUFDekIsR0FBRyxDQUFDLEtBQUssRUFDVCxvQkFBb0IsR0FBRyxJQUFJLEtBQUssSUFBSSxNQUFNLEVBQUUsRUFDNUMsR0FBRyxFQUNILFFBQVEsQ0FDVCxDQUNBO1FBQUEsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEdBQUcsTUFBTSxDQUFBO1FBQ3hCLEdBQUcsQ0FBQyxTQUFTLENBQUMsZUFBZSxFQUFFLG1DQUFtQyxDQUFDLENBQUE7SUFDckUsQ0FBQztJQUVELEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFBO0FBQzNDLENBQUMifQ==