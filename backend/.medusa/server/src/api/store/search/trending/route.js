"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
const search_log_1 = require("../../../../modules/search-log");
/**
 * GET /store/search/trending?limit=8 — returns the top trending
 * search queries (most-searched in the last 30 days). Used by the
 * header search bar's empty state. If no queries have been logged
 * yet the response is `{ queries: [] }` and the storefront hides the
 * "Trending" section entirely (per spec).
 */
async function GET(req, res) {
    const rawLimit = req.query?.limit;
    const parsed = parseInt(typeof rawLimit === "string" ? rawLimit : "8", 10);
    const limit = Number.isFinite(parsed)
        ? Math.min(20, Math.max(1, parsed))
        : 8;
    let queries = [];
    try {
        const svc = req.scope.resolve(search_log_1.SEARCH_LOG_MODULE);
        queries = await svc.getTrending(limit);
    }
    catch (e) {
        // Soft-fail — return an empty list so the UI cleanly hides the
        // trending row.
        queries = [];
    }
    res.json({ queries });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL3NlYXJjaC90cmVuZGluZy9yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQVdBLGtCQWtCQztBQTVCRCwrREFBa0U7QUFHbEU7Ozs7OztHQU1HO0FBQ0ksS0FBSyxVQUFVLEdBQUcsQ0FBQyxHQUFrQixFQUFFLEdBQW1CO0lBQy9ELE1BQU0sUUFBUSxHQUFJLEdBQUcsQ0FBQyxLQUFhLEVBQUUsS0FBSyxDQUFBO0lBQzFDLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxPQUFPLFFBQVEsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBQzFFLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1FBQ25DLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNuQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBRUwsSUFBSSxPQUFPLEdBQWEsRUFBRSxDQUFBO0lBQzFCLElBQUksQ0FBQztRQUNILE1BQU0sR0FBRyxHQUEyQixHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyw4QkFBaUIsQ0FBQyxDQUFBO1FBQ3hFLE9BQU8sR0FBRyxNQUFNLEdBQUcsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDeEMsQ0FBQztJQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7UUFDWCwrREFBK0Q7UUFDL0QsZ0JBQWdCO1FBQ2hCLE9BQU8sR0FBRyxFQUFFLENBQUE7SUFDZCxDQUFDO0lBRUQsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUE7QUFDdkIsQ0FBQyJ9