"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refundLoyaltyPointsStep = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const loyalty_1 = require("../../modules/loyalty");
/**
 * Restore previously-reserved loyalty points back to a customer's
 * balance. Used in three places:
 *
 *   1. `remove-loyalty-from-cart` — user clicks "Remove" before
 *      checking out, so we give the reserved points back.
 *   2. `order-canceled` subscriber — order they redeemed against got
 *      canceled, refund the points spent.
 *   3. `reserve-loyalty-points` compensation — apply-cart workflow
 *      partially failed mid-way; reserve already debited, this step
 *      undoes it.
 *
 * Idempotent at the service level — caller decides the description so
 * the customer's transaction history reads cleanly ("Removed from cart"
 * vs "Refunded — order canceled").
 */
exports.refundLoyaltyPointsStep = (0, workflows_sdk_1.createStep)("refund-loyalty-points", async ({ customer_id, amount, cart_id, order_id, description }, { container }) => {
    const loyaltyModuleService = container.resolve(loyalty_1.LOYALTY_MODULE);
    // Mirror of `reserveLoyaltyPointsStep` — refund the SAME number of
    // points that were originally debited for this `amount` of discount
    // (`amount × 2` under the 1-point-=-0.5-PKR ratio). Using the earn
    // conversion here would refund only 2 % of what was taken,
    // silently shrinking the customer's balance on every remove or
    // cancel.
    const points = await loyaltyModuleService.calculatePointsForAmount(amount);
    if (points <= 0) {
        // Nothing to refund — keep the workflow happy.
        return new workflows_sdk_1.StepResponse(null, null);
    }
    await loyaltyModuleService.addPoints(customer_id, points, {
        kind: "refund",
        cart_id: cart_id || null,
        order_id: order_id || null,
        description: description || "Refunded loyalty redemption",
    });
    return new workflows_sdk_1.StepResponse({ customer_id, points }, { customer_id, points });
}, async (data, { container }) => {
    if (!data)
        return;
    const loyaltyModuleService = container.resolve(loyalty_1.LOYALTY_MODULE);
    // Compensation: re-deduct the refund if a later step in the same
    // workflow throws (rare — most callers are leaf workflows).
    await loyaltyModuleService.deductPoints(data.customer_id, data.points, {
        kind: "adjust",
        description: "Refund rolled back",
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVmdW5kLWxveWFsdHktcG9pbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3dvcmtmbG93cy9zdGVwcy9yZWZ1bmQtbG95YWx0eS1wb2ludHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUVBQTRFO0FBQzVFLG1EQUFzRDtBQVl0RDs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFDVSxRQUFBLHVCQUF1QixHQUFHLElBQUEsMEJBQVUsRUFDL0MsdUJBQXVCLEVBQ3ZCLEtBQUssRUFDSCxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQWEsRUFDbEUsRUFBRSxTQUFTLEVBQUUsRUFDYixFQUFFO0lBQ0YsTUFBTSxvQkFBb0IsR0FBeUIsU0FBUyxDQUFDLE9BQU8sQ0FDbEUsd0JBQWMsQ0FDZixDQUFBO0lBQ0QsbUVBQW1FO0lBQ25FLG9FQUFvRTtJQUNwRSxtRUFBbUU7SUFDbkUsMkRBQTJEO0lBQzNELCtEQUErRDtJQUMvRCxVQUFVO0lBQ1YsTUFBTSxNQUFNLEdBQUcsTUFBTSxvQkFBb0IsQ0FBQyx3QkFBd0IsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUMxRSxJQUFJLE1BQU0sSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUNoQiwrQ0FBK0M7UUFDL0MsT0FBTyxJQUFJLDRCQUFZLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQ3JDLENBQUM7SUFFRCxNQUFNLG9CQUFvQixDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsTUFBTSxFQUFFO1FBQ3hELElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLE9BQU8sSUFBSSxJQUFJO1FBQ3hCLFFBQVEsRUFBRSxRQUFRLElBQUksSUFBSTtRQUMxQixXQUFXLEVBQUUsV0FBVyxJQUFJLDZCQUE2QjtLQUMxRCxDQUFDLENBQUE7SUFFRixPQUFPLElBQUksNEJBQVksQ0FBQyxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFBO0FBQzNFLENBQUMsRUFDRCxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRTtJQUM1QixJQUFJLENBQUMsSUFBSTtRQUFFLE9BQU07SUFDakIsTUFBTSxvQkFBb0IsR0FBeUIsU0FBUyxDQUFDLE9BQU8sQ0FDbEUsd0JBQWMsQ0FDZixDQUFBO0lBQ0QsaUVBQWlFO0lBQ2pFLDREQUE0RDtJQUM1RCxNQUFNLG9CQUFvQixDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUU7UUFDckUsSUFBSSxFQUFFLFFBQVE7UUFDZCxXQUFXLEVBQUUsb0JBQW9CO0tBQ2xDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FDRixDQUFBIn0=