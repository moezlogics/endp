"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reserveLoyaltyPointsStep = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const loyalty_1 = require("../../modules/loyalty");
/**
 * Reserve loyalty points up-front (atomic deduction at apply time)
 * so two carts in two tabs can't spend the same balance.
 *
 * The compensation handler runs when a later step in the apply-loyalty
 * workflow throws — points are restored and the placeholder reservation
 * row is back-stamped as refunded.
 *
 * Why deduct at apply instead of at order placement?
 *   1. **Race-free**: balance check + deduct happens in one DB write.
 *   2. **No order.cart dependency**: Medusa V2 doesn't expose `order.cart`
 *      reliably, so the historic complete-time deduction silently never
 *      fired (the redeemed promo applied as discount, but points stayed
 *      in the account — customers got a free discount AND kept the
 *      balance, effectively earning *more* points on the redeemed order).
 *   3. **Clean refund path**: removing the redemption restores points,
 *      and order cancellation gets the same `addPoints(kind:"refund")`
 *      treatment.
 */
exports.reserveLoyaltyPointsStep = (0, workflows_sdk_1.createStep)("reserve-loyalty-points", async ({ customer_id, amount, cart_id }, { container }) => {
    const loyaltyModuleService = container.resolve(loyalty_1.LOYALTY_MODULE);
    // REDEEM conversion: 1 point = 0.5 PKR, so to discount `amount`
    // PKR we need `amount × 2` points. (Earn ratio is a different
    // 0.02× rate — see service.ts. Calling `calculateEarnPoints` here
    // would silently under-deduct by 100× and effectively give the
    // customer 99% of their redemption for free.)
    const points = await loyaltyModuleService.calculatePointsForAmount(amount);
    await loyaltyModuleService.deductPoints(customer_id, points, {
        kind: "redeem",
        cart_id,
        description: `Applied to cart ${cart_id.slice(-8)} (pending checkout)`,
    });
    // Stash everything we need for compensation in the rollback payload.
    return new workflows_sdk_1.StepResponse({ customer_id, points, cart_id }, {
        customer_id,
        points,
        cart_id,
    });
}, async (data, { container }) => {
    if (!data)
        return;
    const loyaltyModuleService = container.resolve(loyalty_1.LOYALTY_MODULE);
    await loyaltyModuleService.addPoints(data.customer_id, data.points, {
        kind: "refund",
        cart_id: data.cart_id,
        description: "Reservation rolled back",
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzZXJ2ZS1sb3lhbHR5LXBvaW50cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy93b3JrZmxvd3Mvc3RlcHMvcmVzZXJ2ZS1sb3lhbHR5LXBvaW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxRUFBNEU7QUFDNUUsbURBQXNEO0FBU3REOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFDVSxRQUFBLHdCQUF3QixHQUFHLElBQUEsMEJBQVUsRUFDaEQsd0JBQXdCLEVBQ3hCLEtBQUssRUFBRSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFhLEVBQUUsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFO0lBQ25FLE1BQU0sb0JBQW9CLEdBQXlCLFNBQVMsQ0FBQyxPQUFPLENBQ2xFLHdCQUFjLENBQ2YsQ0FBQTtJQUNELGdFQUFnRTtJQUNoRSw4REFBOEQ7SUFDOUQsa0VBQWtFO0lBQ2xFLCtEQUErRDtJQUMvRCw4Q0FBOEM7SUFDOUMsTUFBTSxNQUFNLEdBQUcsTUFBTSxvQkFBb0IsQ0FBQyx3QkFBd0IsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUUxRSxNQUFNLG9CQUFvQixDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsTUFBTSxFQUFFO1FBQzNELElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTztRQUNQLFdBQVcsRUFBRSxtQkFBbUIsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxxQkFBcUI7S0FDdkUsQ0FBQyxDQUFBO0lBRUYscUVBQXFFO0lBQ3JFLE9BQU8sSUFBSSw0QkFBWSxDQUFDLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRTtRQUN4RCxXQUFXO1FBQ1gsTUFBTTtRQUNOLE9BQU87S0FDUixDQUFDLENBQUE7QUFDSixDQUFDLEVBQ0QsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUU7SUFDNUIsSUFBSSxDQUFDLElBQUk7UUFBRSxPQUFNO0lBQ2pCLE1BQU0sb0JBQW9CLEdBQXlCLFNBQVMsQ0FBQyxPQUFPLENBQ2xFLHdCQUFjLENBQ2YsQ0FBQTtJQUNELE1BQU0sb0JBQW9CLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRTtRQUNsRSxJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztRQUNyQixXQUFXLEVBQUUseUJBQXlCO0tBQ3ZDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FDRixDQUFBIn0=