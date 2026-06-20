"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
const search_log_1 = require("../../../../modules/search-log");
/**
 * POST /store/search/log — fire-and-forget endpoint the storefront
 * calls when a customer commits to a search (clicks a result, hits
 * Enter on the search field, taps a recent-search chip, etc.).
 *
 * Body: `{ query: string }`. The service normalizes (lowercase + trim)
 * and dedupes on its own. Errors are swallowed so a failure here can
 * never break the user's search flow.
 */
async function POST(req, res) {
    const body = (req.body || {});
    const query = typeof body.query === "string" ? body.query : "";
    // Always 200 — caller doesn't care, this is best-effort.
    try {
        if (query.trim()) {
            const svc = req.scope.resolve(search_log_1.SEARCH_LOG_MODULE);
            await svc.logQuery(query);
        }
    }
    catch (e) {
        // Soft-fail: never bubble up to the user.
    }
    res.json({ ok: true });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL3NlYXJjaC9sb2cvcm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFhQSxvQkFlQztBQTNCRCwrREFBa0U7QUFHbEU7Ozs7Ozs7O0dBUUc7QUFDSSxLQUFLLFVBQVUsSUFBSSxDQUFDLEdBQWtCLEVBQUUsR0FBbUI7SUFDaEUsTUFBTSxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBdUIsQ0FBQTtJQUNuRCxNQUFNLEtBQUssR0FBRyxPQUFPLElBQUksQ0FBQyxLQUFLLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUE7SUFFOUQseURBQXlEO0lBQ3pELElBQUksQ0FBQztRQUNILElBQUksS0FBSyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUM7WUFDakIsTUFBTSxHQUFHLEdBQTJCLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLDhCQUFpQixDQUFDLENBQUE7WUFDeEUsTUFBTSxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQzNCLENBQUM7SUFDSCxDQUFDO0lBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztRQUNYLDBDQUEwQztJQUM1QyxDQUFDO0lBRUQsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO0FBQ3hCLENBQUMifQ==