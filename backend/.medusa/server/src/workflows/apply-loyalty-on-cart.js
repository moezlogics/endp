"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyLoyaltyOnCartWorkflow = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const core_flows_1 = require("@medusajs/medusa/core-flows");
const validate_customer_exists_1 = require("./steps/validate-customer-exists");
const compute_redeem_amount_1 = require("./steps/compute-redeem-amount");
const reserve_loyalty_points_1 = require("./steps/reserve-loyalty-points");
const promo_1 = require("../utils/promo");
const utils_1 = require("@medusajs/framework/utils");
const get_cart_loyalty_promo_1 = require("./steps/get-cart-loyalty-promo");
const fields = [
    "id",
    "customer.*",
    "promotions.*",
    "promotions.application_method.*",
    "promotions.rules.*",
    "promotions.rules.values.*",
    "currency_code",
    "subtotal",
    "total",
    "metadata",
];
/**
 * Apply a loyalty-points discount to a cart.
 *
 * Major changes vs. the original implementation:
 *
 * 1. **Atomic point reservation.** Points are deducted from the
 *    customer's balance immediately (`reserveLoyaltyPointsStep`) instead
 *    of at order-completion time. This kills the double-spend race and
 *    works around Medusa V2's missing `order.cart` association — the
 *    debit no longer depends on the order having a queryable cart.
 *
 * 2. **Partial-amount support.** Callers may pass `amount` for a
 *    "redeem only 200 of my 1000 points" flow. Omitting it falls back
 *    to the maximum allowed (capped at 50% of subtotal).
 *
 * 3. **Cart metadata carries the amount.** Both `loyalty_promo_id` AND
 *    `loyalty_amount` are stored on the cart, then copied onto the order
 *    by the `order-placed` subscriber. Cancellation logic can refund
 *    the right amount without re-deriving from the promotion.
 *
 * Compensation: `reserveLoyaltyPointsStep` has a rollback handler that
 * restores the points if a later step (promotion creation, cart update)
 * throws — so a partial failure can't strand a customer with their
 * balance debited but no discount applied.
 */
exports.applyLoyaltyOnCartWorkflow = (0, workflows_sdk_1.createWorkflow)("apply-loyalty-on-cart", (input) => {
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
    (0, validate_customer_exists_1.validateCustomerExistsStep)({
        customer: carts[0].customer,
    });
    // Reject duplicate apply (a second click while already-applied
    // would otherwise double-reserve points).
    (0, get_cart_loyalty_promo_1.getCartLoyaltyPromoStep)({
        cart: carts[0],
        throwErrorOn: "found",
    });
    (0, core_flows_1.acquireLockStep)({
        key: input.cart_id,
        timeout: 2,
        ttl: 10,
    });
    const amount = (0, compute_redeem_amount_1.computeRedeemAmountStep)({
        cart: carts[0],
        requested_amount: input.amount,
    });
    // Deduct points NOW — this is the atomic reservation.
    (0, reserve_loyalty_points_1.reserveLoyaltyPointsStep)((0, workflows_sdk_1.transform)({ carts, amount }, (data) => ({
        customer_id: data.carts[0].customer.id,
        amount: data.amount,
        cart_id: data.carts[0].id,
    })));
    const promoToCreate = (0, workflows_sdk_1.transform)({
        carts,
        amount,
    }, (data) => {
        const randomStr = Math.random().toString(36).substring(2, 8);
        const uniqueId = ("LOYALTY-" +
            data.carts[0].customer?.first_name +
            "-" +
            randomStr).toUpperCase();
        return {
            code: uniqueId,
            type: "standard",
            status: "active",
            application_method: {
                type: "fixed",
                value: data.amount,
                target_type: "order",
                currency_code: data.carts[0].currency_code,
                allocation: "across",
            },
            rules: [
                {
                    attribute: promo_1.CUSTOMER_ID_PROMOTION_RULE_ATTRIBUTE,
                    operator: "eq",
                    values: [data.carts[0].customer.id],
                },
            ],
            campaign: {
                name: uniqueId,
                description: "Loyalty points promotion for " + data.carts[0].customer.email,
                campaign_identifier: uniqueId,
                budget: {
                    type: "usage",
                    limit: 1,
                },
            },
        };
    });
    const loyaltyPromo = (0, core_flows_1.createPromotionsStep)([
        promoToCreate,
    ]);
    const { metadata, ...updatePromoData } = (0, workflows_sdk_1.transform)({
        carts,
        promoToCreate,
        loyaltyPromo,
        amount,
    }, (data) => {
        const promos = [
            ...(data.carts[0].promotions
                ?.map((promo) => promo?.code)
                .filter(Boolean) || []),
            data.promoToCreate.code,
        ];
        return {
            cart_id: data.carts[0].id,
            promo_codes: promos,
            action: utils_1.PromotionActions.ADD,
            // Persist both the promo id and the redeemed amount on the
            // cart. The `order-placed` subscriber forwards these onto the
            // order, where `handle-order-points` / `order-canceled` read
            // them. Without `loyalty_amount` we'd have to look up the
            // promotion to know how many points to clawback on cancel —
            // and Medusa's promotion engine doesn't keep historical
            // amounts after the campaign is exhausted.
            metadata: {
                loyalty_promo_id: data.loyaltyPromo[0].id,
                loyalty_amount: data.amount,
            },
        };
    });
    core_flows_1.updateCartPromotionsWorkflow.runAsStep({
        input: updatePromoData,
    });
    (0, core_flows_1.updateCartsStep)([
        {
            id: input.cart_id,
            metadata,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbHktbG95YWx0eS1vbi1jYXJ0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3dvcmtmbG93cy9hcHBseS1sb3lhbHR5LW9uLWNhcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUVBSTBDO0FBQzFDLDREQU9vQztBQUNwQywrRUFHeUM7QUFDekMseUVBQXVFO0FBQ3ZFLDJFQUF5RTtBQUN6RSwwQ0FBK0U7QUFFL0UscURBQTREO0FBQzVELDJFQUF3RTtBQVl4RSxNQUFNLE1BQU0sR0FBRztJQUNiLElBQUk7SUFDSixZQUFZO0lBQ1osY0FBYztJQUNkLGlDQUFpQztJQUNqQyxvQkFBb0I7SUFDcEIsMkJBQTJCO0lBQzNCLGVBQWU7SUFDZixVQUFVO0lBQ1YsT0FBTztJQUNQLFVBQVU7Q0FDWCxDQUFBO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUNVLFFBQUEsMEJBQTBCLEdBQUcsSUFBQSw4QkFBYyxFQUN0RCx1QkFBdUIsRUFDdkIsQ0FBQyxLQUFvQixFQUFFLEVBQUU7SUFDdkIsTUFBTSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxJQUFBLDhCQUFpQixFQUFDO1FBQ3hDLE1BQU0sRUFBRSxNQUFNO1FBQ2QsTUFBTTtRQUNOLE9BQU8sRUFBRTtZQUNQLEVBQUUsRUFBRSxLQUFLLENBQUMsT0FBTztTQUNsQjtRQUNELE9BQU8sRUFBRTtZQUNQLGtCQUFrQixFQUFFLElBQUk7U0FDekI7S0FDRixDQUFDLENBQUE7SUFFRixJQUFBLHFEQUEwQixFQUFDO1FBQ3pCLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUTtLQUNPLENBQUMsQ0FBQTtJQUVyQywrREFBK0Q7SUFDL0QsMENBQTBDO0lBQzFDLElBQUEsZ0RBQXVCLEVBQUM7UUFDdEIsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQXdCO1FBQ3JDLFlBQVksRUFBRSxPQUFPO0tBQ3RCLENB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