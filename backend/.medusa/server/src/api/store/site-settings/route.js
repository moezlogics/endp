"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
const site_settings_1 = require("../../../modules/site-settings");
const cache_response_1 = require("../../../utils/cache-response");
// Public: GET /store/site-settings — storefront reads these on every request.
// Redis-cached so origin hits (CDN misses) don't re-query the DB each time.
async function GET(req, res) {
    const svc = req.scope.resolve(site_settings_1.SITE_SETTINGS_MODULE);
    const settings = await (0, cache_response_1.cached)(req.scope, "store:site-settings", 120, () => svc.getAll());
    // Allow short-term CDN/browser caching
    res.setHeader("Cache-Control", "public, max-age=60, s-maxage=120");
    res.json({ settings });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL3NpdGUtc2V0dGluZ3Mvcm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFPQSxrQkFRQztBQWRELGtFQUFxRTtBQUVyRSxrRUFBc0Q7QUFFdEQsOEVBQThFO0FBQzlFLDRFQUE0RTtBQUNyRSxLQUFLLFVBQVUsR0FBRyxDQUFDLEdBQWtCLEVBQUUsR0FBbUI7SUFDL0QsTUFBTSxHQUFHLEdBQThCLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLG9DQUFvQixDQUFDLENBQUE7SUFDOUUsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFBLHVCQUFNLEVBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxxQkFBcUIsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQ3hFLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FDYixDQUFBO0lBQ0QsdUNBQXVDO0lBQ3ZDLEdBQUcsQ0FBQyxTQUFTLENBQUMsZUFBZSxFQUFFLGtDQUFrQyxDQUFDLENBQUE7SUFDbEUsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUE7QUFDeEIsQ0FBQyJ9