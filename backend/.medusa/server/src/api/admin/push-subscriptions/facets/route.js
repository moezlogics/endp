"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
const push_notifications_1 = require("../../../../modules/push-notifications");
/**
 * GET /admin/push-subscriptions/facets
 *
 * Drives the audience-filter UI on the campaign composer. Returns every
 * distinct value present in the active subscriber set together with a
 * subscriber count so the admin can see "Lahore (324)" etc. and pick
 * targets without typos.
 *
 * Response:
 *   {
 *     cities:       [{ key, count }, ...],
 *     states:       [{ key, count }, ...],
 *     countries:    [{ key, count }, ...],
 *     device_types: [{ key, count }, ...],
 *     os:           [{ key, count }, ...],
 *     browsers:     [{ key, count }, ...],
 *     locales:      [{ key, count }, ...],
 *     total_active: number,
 *     with_customer: number,
 *   }
 */
async function GET(req, res) {
    const svc = req.scope.resolve(push_notifications_1.PUSH_NOTIFICATIONS_MODULE);
    // Fetch the full active set. For a typical store this is well under
    // the 50k cap; for very large stores swap this for a SQL GROUP BY.
    const all = await svc.listPushSubscriptions({ is_active: true }, { take: 50_000 });
    const facet = (key) => {
        const counts = {};
        for (const s of all) {
            const v = s[key];
            if (!v)
                continue;
            counts[v] = (counts[v] || 0) + 1;
        }
        return Object.entries(counts)
            .sort((a, b) => b[1] - a[1])
            .map(([k, count]) => ({ key: k, count }));
    };
    let withCustomer = 0;
    for (const s of all)
        if (s.customer_id)
            withCustomer++;
    res.json({
        cities: facet("city"),
        states: facet("state"),
        countries: facet("country"),
        device_types: facet("device_type"),
        os: facet("os"),
        browsers: facet("device_browser"),
        locales: facet("locale"),
        genders: facet("gender"),
        total_active: all.length,
        with_customer: withCustomer,
        anonymous: all.length - withCustomer,
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL3B1c2gtc3Vic2NyaXB0aW9ucy9mYWNldHMvcm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUF5QkEsa0JBd0NDO0FBaEVELCtFQUFrRjtBQUdsRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFDSSxLQUFLLFVBQVUsR0FBRyxDQUFDLEdBQWtCLEVBQUUsR0FBbUI7SUFDL0QsTUFBTSxHQUFHLEdBQTZCLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUNyRCw4Q0FBeUIsQ0FDMUIsQ0FBQTtJQUVELG9FQUFvRTtJQUNwRSxtRUFBbUU7SUFDbkUsTUFBTSxHQUFHLEdBQUcsTUFBTyxHQUFXLENBQUMscUJBQXFCLENBQ2xELEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FDakIsQ0FBQTtJQUVELE1BQU0sS0FBSyxHQUFHLENBQUMsR0FBYyxFQUFFLEVBQUU7UUFDL0IsTUFBTSxNQUFNLEdBQTJCLEVBQUUsQ0FBQTtRQUN6QyxLQUFLLE1BQU0sQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ3BCLE1BQU0sQ0FBQyxHQUFJLENBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUN6QixJQUFJLENBQUMsQ0FBQztnQkFBRSxTQUFRO1lBQ2hCLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDbEMsQ0FBQztRQUNELE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7YUFDMUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUMzQixHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBQzdDLENBQUMsQ0FBQTtJQUVELElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQTtJQUNwQixLQUFLLE1BQU0sQ0FBQyxJQUFJLEdBQUc7UUFBRSxJQUFLLENBQVMsQ0FBQyxXQUFXO1lBQUUsWUFBWSxFQUFFLENBQUE7SUFFL0QsR0FBRyxDQUFDLElBQUksQ0FBQztRQUNQLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDO1FBQ3JCLE1BQU0sRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDO1FBQ3RCLFNBQVMsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDO1FBQzNCLFlBQVksRUFBRSxLQUFLLENBQUMsYUFBYSxDQUFDO1FBQ2xDLEVBQUUsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDO1FBQ2YsUUFBUSxFQUFFLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQztRQUNqQyxPQUFPLEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQztRQUN4QixPQUFPLEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQztRQUN4QixZQUFZLEVBQUUsR0FBRyxDQUFDLE1BQU07UUFDeEIsYUFBYSxFQUFFLFlBQVk7UUFDM0IsU0FBUyxFQUFFLEdBQUcsQ0FBQyxNQUFNLEdBQUcsWUFBWTtLQUNyQyxDQUFDLENBQUE7QUFDSixDQUFDIn0=