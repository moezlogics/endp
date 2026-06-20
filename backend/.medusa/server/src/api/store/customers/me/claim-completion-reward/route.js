"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
const utils_1 = require("@medusajs/framework/utils");
const loyalty_1 = require("../../../../../modules/loyalty");
/**
 * POST /store/customers/me/claim-completion-reward
 *
 * Idempotent loyalty reward for completing the onboarding profile.
 *
 * The storefront calls this once the customer hits 100% — meaning
 * email + first/last name + phone + at least one address are all
 * filled in. We mirror the same definition the dashboard uses so
 * users can't trick the route by saving the form half-empty.
 *
 * Awards a flat REWARD_POINTS one time. The flag goes on the
 * customer's `metadata.profile_completion_rewarded_at` so a re-check
 * never double-credits even if the storefront fires the call twice.
 *
 * Response shape:
 *   {
 *     rewarded: boolean,        // true the moment we credited points
 *     points_granted: number,   // 0 unless rewarded === true
 *     balance: number,          // current loyalty balance after credit
 *     completion: number,       // 0..100 — useful for the UI bar
 *     already_claimed: boolean, // had been rewarded before this call
 *   }
 */
const REWARD_POINTS = 10;
const META_KEY = "profile_completion_rewarded_at";
async function POST(req, res) {
    const customerId = req.auth_context?.actor_id;
    if (!customerId) {
        return res.status(401).json({ message: "Not authenticated" });
    }
    const customerModuleService = req.scope.resolve(utils_1.Modules.CUSTOMER);
    const loyaltyModuleService = req.scope.resolve(loyalty_1.LOYALTY_MODULE);
    // Pull the customer + addresses; we need both to compute completion
    // the same way the storefront dashboard does.
    const customer = await customerModuleService.retrieveCustomer(customerId, {
        relations: ["addresses"],
    });
    if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
    }
    const completion = computeCompletion(customer);
    const alreadyClaimed = !!customer.metadata?.[META_KEY];
    const balance = await loyaltyModuleService.getPoints(customerId);
    if (completion < 100) {
        return res.json({
            rewarded: false,
            points_granted: 0,
            balance,
            completion,
            already_claimed: alreadyClaimed,
        });
    }
    if (alreadyClaimed) {
        return res.json({
            rewarded: false,
            points_granted: 0,
            balance,
            completion,
            already_claimed: true,
        });
    }
    // Credit + flag the customer so retries are no-ops.
    const updated = await loyaltyModuleService.addPoints(customerId, REWARD_POINTS, {
        kind: "earn",
        description: "Profile setup completed",
    });
    await customerModuleService.updateCustomers(customerId, {
        metadata: {
            ...(customer.metadata || {}),
            [META_KEY]: new Date().toISOString(),
        },
    });
    return res.json({
        rewarded: true,
        points_granted: REWARD_POINTS,
        balance: updated.points,
        completion,
        already_claimed: false,
    });
}
/**
 * Mirrors `getProfileCompletion()` in
 * src/modules/account/components/overview-modern/index.tsx so the
 * server reward gate matches what the user sees on screen.
 *   - email
 *   - first_name + last_name
 *   - phone
 *   - gender (metadata.gender — collected in the onboarding wizard,
 *             powers the push-campaign gender filter)
 *   - default billing address (or any address — see notes)
 *
 * Keep this in sync with the storefront helper when you change steps.
 */
function computeCompletion(customer) {
    if (!customer)
        return 0;
    let count = 0;
    const total = 5;
    if (customer.email)
        count++;
    if (customer.first_name && customer.last_name)
        count++;
    if (customer.phone)
        count++;
    if (customer.metadata &&
        typeof customer.metadata.gender === "string" &&
        customer.metadata.gender.trim()) {
        count++;
    }
    const addresses = customer.addresses || [];
    const hasAddress = addresses.some((a) => a.is_default_billing) || addresses.length > 0;
    if (hasAddress)
        count++;
    return Math.round((count / total) * 100);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL2N1c3RvbWVycy9tZS9jbGFpbS1jb21wbGV0aW9uLXJld2FyZC9yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQW1DQSxvQkF3RUM7QUF2R0QscURBQW1EO0FBQ25ELDREQUErRDtBQUcvRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUVILE1BQU0sYUFBYSxHQUFHLEVBQUUsQ0FBQTtBQUN4QixNQUFNLFFBQVEsR0FBRyxnQ0FBZ0MsQ0FBQTtBQUUxQyxLQUFLLFVBQVUsSUFBSSxDQUN4QixHQUErQixFQUMvQixHQUFtQjtJQUVuQixNQUFNLFVBQVUsR0FBRyxHQUFHLENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQTtJQUM3QyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDaEIsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxDQUFDLENBQUE7SUFDL0QsQ0FBQztJQUVELE1BQU0scUJBQXFCLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsZUFBTyxDQUFDLFFBQVEsQ0FBUSxDQUFBO0lBQ3hFLE1BQU0sb0JBQW9CLEdBQ3hCLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLHdCQUFjLENBQUMsQ0FBQTtJQUVuQyxvRUFBb0U7SUFDcEUsOENBQThDO0lBQzlDLE1BQU0sUUFBUSxHQUFHLE1BQU0scUJBQXFCLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFO1FBQ3hFLFNBQVMsRUFBRSxDQUFDLFdBQVcsQ0FBQztLQUN6QixDQUFDLENBQUE7SUFFRixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDZCxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFD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