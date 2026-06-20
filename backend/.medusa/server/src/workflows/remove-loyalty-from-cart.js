"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeLoyaltyFromCartWorkflow = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const core_flows_1 = require("@medusajs/medusa/core-flows");
const get_cart_loyalty_promo_1 = require("./steps/get-cart-loyalty-promo");
const refund_loyalty_points_1 = require("./steps/refund-loyalty-points");
const utils_1 = require("@medusajs/framework/utils");
const fields = [
    "id",
    "customer.*",
    "promotions.*",
    "promotions.application_method.*",
    "promotions.rules.*",
    "promotions.rules.values.*",
    "currency_code",
    "total",
    "metadata",
];
/**
 * Remove a previously-applied loyalty redemption from a cart and
 * **refund the reserved points back to the customer**.
 *
 * The old implementation only stripped the promotion — points stayed
 * debited because there was no record of how many were originally
 * reserved (the historic workflow recomputed everything at order time
 * and never touched the balance at apply). Now `applyLoyaltyOnCart`
 * persists `loyalty_amount` on cart.metadata, so this workflow knows
 * exactly how much to credit back.
 */
exports.removeLoyaltyFromCartWorkflow = (0, workflows_sdk_1.createWorkflow)("remove-loyalty-from-cart", (input) => {
    const { data: carts } = (0, core_flows_1.useQueryGraphStep)({
        entity: "cart",
        fields,
        filters: {
            id: input.cart_id,
        },
        options: {
            throwIfKeyNotFound: true,
        },
    });
    const loyaltyPromo = (0, get_cart_loyalty_promo_1.getCartLoyaltyPromoStep)({
        cart: carts[0],
        throwErrorOn: "not-found",
    });
    (0, core_flows_1.acquireLockStep)({
        key: input.cart_id,
        timeout: 2,
        ttl: 10,
    });
    // Refund the reserved amount BEFORE removing the promo so a later
    // failure still leaves the customer with their points + the cart
    // intact (better UX than "discount gone, balance lost").
    (0, refund_loyalty_points_1.refundLoyaltyPointsStep)((0, workflows_sdk_1.transform)({ carts }, (data) => {
        const meta = (data.carts[0].metadata || {});
        const amount = Number(meta.loyalty_amount) || 0;
        return {
            customer_id: data.carts[0].customer.id,
            amount,
            cart_id: data.carts[0].id,
            description: "Removed from cart before checkout",
        };
    }));
    core_flows_1.updateCartPromotionsWorkflow.runAsStep({
        input: {
            cart_id: input.cart_id,
            promo_codes: [loyaltyPromo.code],
            action: utils_1.PromotionActions.REMOVE,
        },
    });
    const newMetadata = (0, workflows_sdk_1.transform)({
        carts,
    }, (data) => {
        const { loyalty_promo_id: _ignoreId, loyalty_amount: _ignoreAmount, ...rest } = (data.carts[0].metadata || {});
        return {
            ...rest,
            loyalty_promo_id: null,
            loyalty_amount: null,
        };
    });
    (0, core_flows_1.updateCartsStep)([
        {
            id: input.cart_id,
            metadata: newMetadata,
        },
    ]);
    (0, core_flows_1.updatePromotionsStep)([
        {
            id: loyaltyPromo.id,
            status: "inactive",
        },
    ]);
    // retrieve cart with updated promotions
    const { data: updatedCarts } = (0, core_flows_1.useQueryGraphStep)({
        entity: "cart",
        fields,
        filters: { id: input.cart_id },
    }).config({ name: "retrieve-cart" });
    (0, core_flows_1.releaseLockStep)({
        key: input.cart_id,
    });
    return new workflows_sdk_1.WorkflowResponse(updatedCarts[0]);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3ZlLWxveWFsdHktZnJvbS1jYXJ0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3dvcmtmbG93cy9yZW1vdmUtbG95YWx0eS1mcm9tLWNhcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUVBSTBDO0FBQzFDLDREQU9vQztBQUNwQywyRUFBd0U7QUFDeEUseUVBQXVFO0FBQ3ZFLHFEQUE0RDtBQU81RCxNQUFNLE1BQU0sR0FBRztJQUNiLElBQUk7SUFDSixZQUFZO0lBQ1osY0FBYztJQUNkLGlDQUFpQztJQUNqQyxvQkFBb0I7SUFDcEIsMkJBQTJCO0lBQzNCLGVBQWU7SUFDZixPQUFPO0lBQ1AsVUFBVTtDQUNYLENBQUE7QUFFRDs7Ozs7Ozs7OztHQVVHO0FBQ1UsUUFBQSw2QkFBNkIsR0FBRyxJQUFBLDhCQUFjLEVBQ3pELDBCQUEwQixFQUMxQixDQUFDLEtBQW9CLEVBQUUsRUFBRTtJQUN2QixNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLElBQUEsOEJBQWlCLEVBQUM7UUFDeEMsTUFBTSxFQUFFLE1BQU07UUFDZCxNQUFNO1FBQ04sT0FBTyxFQUFFO1lBQ1AsRUFBRSxFQUFFLEtBQUssQ0FBQyxPQUFPO1NBQ2xCO1FBQ0QsT0FBTyxFQUFFO1lBQ1Asa0JBQWtCLEVBQUUsSUFBSTtTQUN6QjtLQUNGLENBQUMsQ0FBQTtJQUVGLE1BQU0sWUFBWSxHQUFHLElBQUEsZ0RBQXVCLEVBQUM7UUFDM0MsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQXdCO1FBQ3JDLFlBQVksRUFBRSxXQUFXO0tBQzFCLENBQUMsQ0FBQTtJQUVGLElBQUEsNEJBQWUsRUFBQztRQUNkLEdBQUcsRUFBRSxLQUFLLENBQUMsT0FBTztRQUNsQixPQUFPLEVBQUUsQ0FBQztRQUNWLEdBQUcsRUFBRSxFQUFFO0tBQ1IsQ0FBQyxDQUFBO0lBRUYsa0VBQWtFO0lBQ2xFLGlFQUFpRTtJQUNqRSx5REFBeUQ7SUFDekQsSUFBQSwrQ0FBdUIsRUFDckIsSUFBQSx5QkFBUyxFQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUM1QixNQUFNLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBd0IsQ0FBQTtRQUNsRSxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUMvQyxPQUFPO1lBQ0wsV0FBVyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUyxDQUFDLEVBQUU7WUFDdkMsTUFBTTtZQUNOLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDekIsV0FBVyxFQUFFLG1DQUFtQztTQUNqRCxDQUFBO0lBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQTtJQUVELHlDQUE0QixDQUFDLFNBQVMsQ0FBQztRQUNyQyxLQUFLLEVBQUU7WUFDTCxPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU87WUFDdEIsV0FBVyxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUssQ0FBQztZQUNqQyxNQUFNLEVBQUUsd0JBQWdCLENBQUMsTUFBTTtTQUNoQztLQUNGLENBQUMsQ0FBQTtJQUVGLE1BQU0sV0FBVyxHQUFHLElBQUEseUJBQVMsRUFDM0I7UUFDRSxLQUFLO0tBQ04sRUFDRCxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ1AsTUFBTSxFQUNKLGdCQUFnQixFQUFFLFNBQVMsRUFDM0IsY0FBYyxFQUFFLGFBQWEsRUFDN0IsR0FBRyxJQUFJLEVBQ1IsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBd0IsQ0FBQTtRQUV6RCxPQUFPO1lBQ0wsR0FBRyxJQUFJO1lBQ1AsZ0JBQWdCLEVBQUUsSUFBSTtZQUN0QixjQUFjLEVBQUUsSUFBSTtTQUNyQixDQUFBO0lBQ0gsQ0FBQyxDQUNGLENBQUE7SUFFRCxJQUFBLDRCQUFlLEVBQUM7UUFDZDtZQUNFLEVBQUUsRUFBRSxLQUFLLENBQUMsT0FBTztZQUNqQixRQUFRLEVBQUUsV0FBVztTQUN0QjtLQUNGLENBQUMsQ0FBQTtJQUVGLElBQUEsaUNBQW9CLEVBQUM7UUFDbkI7WUFDRSxFQUFFLEVBQUUsWUFBWSxDQUFDLEVBQUU7WUFDbkIsTUFBTSxFQUFFLFVBQVU7U0FDbkI7S0FDRixDQUFDLENBQUE7SUFFRix3Q0FBd0M7SUFDeEMsTUFBTSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsR0FBRyxJQUFBLDhCQUFpQixFQUFDO1FBQy9DLE1BQU0sRUFBRSxNQUFNO1FBQ2QsTUFBTTtRQUNOLE9BQU8sRUFBRSxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsT0FBTyxFQUFFO0tBQy9CLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQTtJQUVwQyxJQUFBLDRCQUFlLEVBQUM7UUFDZCxHQUFHLEVBQUUsS0FBSyxDQUFDLE9BQU87S0FDbkIsQ0FBQyxDQUFBO0lBRUYsT0FBTyxJQUFJLGdDQUFnQixDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQzlDLENBQUMsQ0FDRixDQUFBIn0=