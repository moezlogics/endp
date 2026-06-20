"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
const utils_1 = require("@medusajs/framework/utils");
const push_notifications_1 = require("../../../../modules/push-notifications");
/**
 * POST /store/push-subscriptions/sync-from-customer
 *
 * Copies demographic data from the signed-in customer's profile onto
 * their push subscription row(s). Called by the storefront onboarding
 * wizard right after the gender step saves, so the newly-picked value
 * lands in the subscriber record the marketer will filter on.
 *
 * Two subscriber lookup strategies run together (the results are
 * unioned, deduped by id):
 *
 *   1. Every active subscription already linked to this `customer_id`
 *      — catches the case where the user has subscribed and signed in
 *      on the same browser (the browser then re-subscribed with a
 *      `customer_id` attached).
 *
 *   2. The `endpoint` the storefront caches in `localStorage` at
 *      subscribe time. This is the glue for the very common flow:
 *
 *         a. Anonymous visitor allows push → row created with
 *            `customer_id = null`.
 *         b. Visitor signs up / signs in → we don't re-subscribe
 *            the service worker, but we do know the endpoint from
 *            localStorage. Passing it here lets us back-fill both
 *            the `customer_id` and `gender` in one call.
 *
 * Body:
 *   {
 *     endpoint?: string  // optional — the browser's current push endpoint
 *   }
 *
 * Response:
 *   {
 *     synced: number,          // rows updated
 *     gender: string | null,   // value applied (for debugging)
 *     customer_id: string,
 *   }
 *
 * Requires the customer auth cookie. Silently returns `synced: 0` if
 * the customer hasn't picked a gender yet — harmless no-op, so the
 * storefront can call this every time the wizard finishes without
 * checking state first.
 */
async function POST(req, res) {
    const customerId = req.auth_context?.actor_id;
    if (!customerId) {
        return res.status(401).json({ message: "Not authenticated" });
    }
    const body = (req.body || {});
    const endpoint = body.endpoint ? String(body.endpoint).trim() : null;
    // Pull the latest customer record so we read freshly-saved metadata.
    const customerModuleService = req.scope.resolve(utils_1.Modules.CUSTOMER);
    const customer = await customerModuleService
        .retrieveCustomer(customerId)
        .catch(() => null);
    if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
    }
    const rawGender = customer.metadata && typeof customer.metadata.gender === "string"
        ? String(customer.metadata.gender).trim().toLowerCase()
        : "";
    const gender = rawGender ? rawGender.slice(0, 32) : null;
    const svc = req.scope.resolve(push_notifications_1.PUSH_NOTIFICATIONS_MODULE);
    // ── Collect candidate subscriber rows ──
    const byCustomer = await svc.listPushSubscriptions({ customer_id: customerId, is_active: true }, { take: 50 });
    let byEndpoint = [];
    if (endpoint) {
        byEndpoint = await svc.listPushSubscriptions({
            endpoint,
            is_active: true,
        });
    }
    const seen = new Set();
    const targets = [...byCustomer, ...byEndpoint].filter((row) => {
        if (seen.has(row.id))
            return false;
        seen.add(row.id);
        return true;
    });
    // ── Apply updates ──
    // We always attach customer_id (cheap idempotent back-fill for the
    // anonymous-then-signed-in flow). Gender only gets written when set;
    // we never clobber an existing value with null.
    let synced = 0;
    for (const row of targets) {
        const patch = { id: row.id, customer_id: customerId };
        if (gender && row.gender !== gender) {
            patch.gender = gender;
        }
        else if (!row.customer_id) {
            // no-op besides customer_id back-fill — still counts as synced
        }
        else if (!gender) {
            // customer hasn't picked a gender yet; skip this row
            continue;
        }
        await svc.updatePushSubscriptions(patch);
        synced++;
    }
    res.json({
        synced,
        gender,
        customer_id: customerId,
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL3B1c2gtc3Vic2NyaXB0aW9ucy9zeW5jLWZyb20tY3VzdG9tZXIvcm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFtREEsb0JBNEVDO0FBM0hELHFEQUFtRDtBQUNuRCwrRUFBa0Y7QUFHbEY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBDRztBQUNJLEtBQUssVUFBVSxJQUFJLENBQ3hCLEdBQStCLEVBQy9CLEdBQW1CO0lBRW5CLE1BQU0sVUFBVSxHQUFHLEdBQUcsQ0FBQyxZQUFZLEVBQUUsUUFBUSxDQUFBO0lBQzdDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNoQixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLENBQUMsQ0FBQTtJQUMvRCxDQUFDO0lBRUQsTUFBTSxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBd0IsQ0FBQTtJQUNwRCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUE7SUFFcEUscUVBQXFFO0lBQ3JFLE1BQU0scUJBQXFCLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsZUFBTyxDQUFDLFFBQVEsQ0FBUSxDQUFBO0lBQ3hFLE1BQU0sUUFBUSxHQUFHLE1BQU0scUJBQXFCO1NBQ3pDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQztTQUM1QixLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDcEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFD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