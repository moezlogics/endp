"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
const banners_1 = require("../../../modules/banners");
const cache_response_1 = require("../../../utils/cache-response");
/**
 * GET /store/banners — public list of active banners, ordered by
 * `sort_order ASC`. Used by the storefront hero slider on the homepage.
 * Cached (Redis) since it's read on every homepage render.
 */
async function GET(req, res) {
    const svc = req.scope.resolve(banners_1.BANNERS_MODULE);
    const banners = await (0, cache_response_1.cached)(req.scope, "store:banners:active", 120, () => svc.listBanners({ is_active: true }, { order: { sort_order: "ASC" }, take: 50 }));
    res.setHeader("Cache-Control", "public, max-age=60, s-maxage=120");
    res.json({ banners });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL2Jhbm5lcnMvcm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFVQSxrQkFZQztBQXJCRCxzREFBeUQ7QUFFekQsa0VBQXNEO0FBRXREOzs7O0dBSUc7QUFDSSxLQUFLLFVBQVUsR0FBRyxDQUFDLEdBQWtCLEVBQUUsR0FBbUI7SUFDL0QsTUFBTSxHQUFHLEdBQXlCLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLHdCQUFjLENBQUMsQ0FBQTtJQUVuRSxNQUFNLE9BQU8sR0FBRyxNQUFNLElBQUEsdUJBQU0sRUFBQyxHQUFHLENBQUMsS0FBSyxFQUFFLHNCQUFzQixFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FDeEUsR0FBRyxDQUFDLFdBQVcsQ0FDYixFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFDbkIsRUFBRSxLQUFLLEVBQUUsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUNsRCxDQUNGLENBQUE7SUFFRCxHQUFHLENBQUMsU0FBUyxDQUFDLGVBQWUsRUFBRSxrQ0FBa0MsQ0FBQyxDQUFBO0lBQ2xFLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFBO0FBQ3ZCLENBQUMifQ==