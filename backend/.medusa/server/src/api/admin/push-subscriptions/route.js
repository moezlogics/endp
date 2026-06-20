"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
const push_notifications_1 = require("../../../modules/push-notifications");
/**
 * GET /admin/push-subscriptions
 *   List subscribers with optional filters and a small stats summary
 *   used to power the dashboard chips.
 *
 * Query:
 *   ?city=Lahore       — filter by city
 *   ?state=Punjab      — filter by state
 *   ?browser=Chrome    — filter by device browser
 *   ?customers_only=1  — only logged-in customers
 *   ?take=100          — page size (default 100, max 500)
 *   ?skip=0            — offset
 */
async function GET(req, res) {
    const svc = req.scope.resolve(push_notifications_1.PUSH_NOTIFICATIONS_MODULE);
    const filter = { is_active: true };
    if (req.query.city)
        filter.city = req.query.city;
    if (req.query.state)
        filter.state = req.query.state;
    if (req.query.country)
        filter.country = req.query.country;
    if (req.query.browser)
        filter.device_browser = req.query.browser;
    if (req.query.device_type)
        filter.device_type = req.query.device_type;
    if (req.query.os)
        filter.os = req.query.os;
    if (req.query.gender)
        filter.gender = String(req.query.gender).toLowerCase();
    if (req.query.customers_only === "1") {
        // Filter out null customer_id — handled in JS below since MikroORM
        // operators need explicit `$ne` syntax on a different code path.
    }
    const take = Math.min(Number(req.query.take) || 100, 500);
    const skip = Number(req.query.skip) || 0;
    const [rows, total] = await svc.listAndCountPushSubscriptions(filter, { order: { created_at: "DESC" }, take, skip });
    let subscribers = rows;
    if (req.query.customers_only === "1") {
        subscribers = rows.filter((r) => !!r.customer_id);
    }
    // Aggregate stats over the active set (small enough to compute in-memory)
    const all = await svc.listPushSubscriptions({ is_active: true }, { take: 10_000 } // sane upper bound for dashboard stats
    );
    const cityCounts = {};
    const stateCounts = {};
    const browserCounts = {};
    const genderCounts = {};
    let withCustomer = 0;
    for (const s of all) {
        if (s.city)
            cityCounts[s.city] = (cityCounts[s.city] || 0) + 1;
        if (s.state)
            stateCounts[s.state] = (stateCounts[s.state] || 0) + 1;
        if (s.device_browser) {
            browserCounts[s.device_browser] = (browserCounts[s.device_browser] || 0) + 1;
        }
        if (s.gender)
            genderCounts[s.gender] = (genderCounts[s.gender] || 0) + 1;
        if (s.customer_id)
            withCustomer++;
    }
    const stats = {
        total_active: all.length,
        with_customer: withCustomer,
        anonymous: all.length - withCustomer,
        by_city: topN(cityCounts, 20),
        by_state: topN(stateCounts, 20),
        by_browser: browserCounts,
        by_gender: genderCounts,
    };
    res.json({ subscribers, count: total, stats });
}
function topN(obj, n) {
    return Object.entries(obj)
        .sort((a, b) => b[1] - a[1])
        .slice(0, n)
        .map(([key, count]) => ({ key, count }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL3B1c2gtc3Vic2NyaXB0aW9ucy9yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQWlCQSxrQkErREM7QUEvRUQsNEVBQStFO0FBRy9FOzs7Ozs7Ozs7Ozs7R0FZRztBQUNJLEtBQUssVUFBVSxHQUFHLENBQUMsR0FBa0IsRUFBRSxHQUFtQjtJQUMvRCxNQUFNLEdBQUcsR0FBNkIsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQ3JELDhDQUF5QixDQUMxQixDQUFBO0lBRUQsTUFBTSxNQUFNLEdBQXdCLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFBO0lBQ3ZELElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJO1FBQUUsTUFBTSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQTtJQUNoRCxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSztRQUFFLE1BQU0sQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUE7SUFDbkQsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU87UUFBRSxNQUFNLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFBO0lBQ3pELElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPO1FBQUUsTUFBTSxDQUFDLGNBQWMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQTtJQUNoRSxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsV0FBVztRQUFFLE1BQU0sQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUE7SUFDckUsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFBRSxNQUFNLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxD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