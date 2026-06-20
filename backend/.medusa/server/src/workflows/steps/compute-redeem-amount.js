"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeRedeemAmountStep = exports.MAX_REDEEM_RATIO = void 0;
const utils_1 = require("@medusajs/framework/utils");
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const loyalty_1 = require("../../modules/loyalty");
/**
 * How much of the cart's subtotal can be paid with loyalty points.
 * Half-off is the industry default — beyond that and operators lose
 * the upsell on items still in the cart. Adjust per-site if needed.
 */
exports.MAX_REDEEM_RATIO = 0.5;
/**
 * Resolve the actual amount of currency to discount, given the
 * customer's balance, the cart subtotal, and (optionally) a user-chosen
 * partial-redeem amount. Centralised so apply-cart + validation + the
 * storefront max calculation all agree.
 *
 * Rules:
 *   • amount >= 1 (zero/negative input is rejected)
 *   • amount <= customer balance (in points → currency)
 *   • amount <= subtotal × MAX_REDEEM_RATIO (so the cart still has
 *     real money in it to qualify for shipping promos, etc.)
 *   • If `requested_amount` is omitted, the max of those three caps wins
 *     — i.e. "redeem as much as the system allows" is the default.
 */
exports.computeRedeemAmountStep = (0, workflows_sdk_1.createStep)("compute-redeem-amount", async (input, { container }) => {
    const loyaltyModuleService = container.resolve(loyalty_1.LOYALTY_MODULE);
    const balance = await loyaltyModuleService.getPoints(input.cart.customer.id);
    if (balance <= 0) {
        throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, "You have no loyalty points to redeem");
    }
    // Prefer subtotal (pre-tax/shipping) so the discount lands on
    // products, not on freight. Fall back to total if the cart entity
    // doesn't expose subtotal for some reason.
    const baseTotal = Math.max(0, input.cart.subtotal ?? input.cart.total ?? 0);
    if (baseTotal <= 0) {
        throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, "Cart is empty — add items before redeeming points");
    }
    const balanceAsAmount = await loyaltyModuleService.calculateAmountFromPoints(balance);
    const cartCap = Math.floor(baseTotal * exports.MAX_REDEEM_RATIO);
    const maxAllowed = Math.min(balanceAsAmount, cartCap);
    if (maxAllowed <= 0) {
        throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, `Cart too small to redeem points — minimum cart value is ${Math.ceil(1 / exports.MAX_REDEEM_RATIO)} ${input.cart.currency_code.toUpperCase()}`);
    }
    let amount;
    if (typeof input.requested_amount === "number") {
        const requested = Math.floor(input.requested_amount);
        if (requested <= 0) {
            throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, "Redeem amount must be at least 1");
        }
        if (requested > maxAllowed) {
            throw new utils_1.MedusaError(utils_1.MedusaError.Types.NOT_ALLOWED, `You can redeem at most ${maxAllowed} ${input.cart.currency_code.toUpperCase()} on this cart`);
        }
        amount = requested;
    }
    else {
        amount = maxAllowed;
    }
    return new workflows_sdk_1.StepResponse(amount);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcHV0ZS1yZWRlZW0tYW1vdW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3dvcmtmbG93cy9zdGVwcy9jb21wdXRlLXJlZGVlbS1hbW91bnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EscURBQXVEO0FBQ3ZELHFFQUE0RTtBQUU1RSxtREFBc0Q7QUFFdEQ7Ozs7R0FJRztBQUNVLFFBQUEsZ0JBQWdCLEdBQUcsR0FBRyxDQUFBO0FBa0JuQzs7Ozs7Ozs7Ozs7OztHQWFHO0FBQ1UsUUFBQSx1QkFBdUIsR0FBRyxJQUFBLDBCQUFVLEVBQy9DLHVCQUF1QixFQUN2QixLQUFLLEVBQUUsS0FBbUMsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUU7SUFDM0QsTUFBTSxvQkFBb0IsR0FBeUIsU0FBUyxDQUFDLE9BQU8sQ0FDbEUsd0JBQWMsQ0FDZixDQUFBO0lBRUQsTUFBTSxPQUFPLEdBQUcsTUFBTSxvQkFBb0IsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUE7SUFDNUUsSUFBSSxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDakIsTUFBTSxJQUFJLG1CQUFXLENBQ25CLG1CQUFXLENBQUMsS0FBSyxDQUFDLFlBQVksRUFDOUIsc0NBQXNDLENBQ3ZDLENBQUE7SUFDSCxDQUFDO0lBRUQsOERBQThEO0lBQzlELGtFQUFrRTtJQUNsRSwyQ0FBMkM7SUFDM0MsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUE7SUFDM0UsSUFBSSxTQUFTLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDbkIsTUFBTSxJQUFJLG1CQUFXLENBQ25CLG1CQUFXLENBQUMsS0FBSyxDQUFDLFlBQVksRUFDOUIsbURBQW1ELENBQ3BELENBQUE7SUFDSCxDQUFDO0lBRUQsTUFBTSxlQUFlLEdBQUcsTUFBTSxvQkFBb0IsQ0FBQyx5QkFBeUIsQ0FDMUUsT0FBTyxDQUNSLENBQUE7SUFDRCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyx3QkFBZ0IsQ0FBQyxDQUFBO0lBQ3hELE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxDQUFBO0lBRXJELElBQUksVUFBVSxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQ3BCLE1BQU0sSUFBSSxtQkFBVyxDQUNuQixtQkFBVyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQzlCLDJEQUEyRCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyx3QkFBZ0IsQ0FBQyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQ3ZJLENBQUE7SUFDSCxDQUFDO0lBRUQsSUFBSSxNQUFjLENBQUE7SUFDbEIsSUFBSSxPQUFPLEtBQUssQ0FBQyxnQkFBZ0IsS0FBSyxRQUFRLEVBQUUsQ0FBQztRQUMvQyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO1FBQ3BELElBQUksU0FBUyxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ25CLE1BQU0sSUFBSSxtQkFBVyxDQUNuQixtQkFBVyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQzlCLGtDQUFrQyxDQUNuQyxDQUFBO1FBQ0gsQ0FBQztRQUNELElBQUksU0FBUyxHQUFHLFVBQVUsRUFBRSxDQUFDO1lBQzNCLE1BQU0sSUFBSSxtQkFBVyxDQUNuQixtQkFBVyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQzdCLDBCQUEwQixVQUFVLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLGVBQWUsQ0FDOUYsQ0FBQTtRQUNILENBQUM7UUFDRCxNQUFNLEdBQUcsU0FBUyxDQUFBO0lBQ3BCLENBQUM7U0FBTSxDQUFDO1FBQ04sTUFBTSxHQUFHLFVBQVUsQ0FBQTtJQUNyQixDQUFDO0lBRUQsT0FBTyxJQUFJLDRCQUFZLENBQUMsTUFBTSxDQUFDLENBQUE7QUFDakMsQ0FBQyxDQUNGLENBQUEifQ==