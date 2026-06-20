"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleOrderPointsWorkflow = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const core_flows_1 = require("@medusajs/medusa/core-flows");
const validate_customer_exists_1 = require("./steps/validate-customer-exists");
const add_purchase_as_points_1 = require("./steps/add-purchase-as-points");
/**
 * Post-order loyalty bookkeeping.
 *
 * After an order is placed we need to:
 *
 *   1. **Credit earned points** on the portion of the order the
 *      customer actually paid in cash (subtotal − loyalty_amount).
 *      The previous code earned off `order.total` which double-counted
 *      the redeemed slice — a customer who spent 1000 points on a 5000
 *      cart paid 4000 in cash and then earned 4000 more points,
 *      effectively recovering the 1000 they "spent" (and #1 meant the
 *      1000 was never even debited in the first place).
 *
 *   2. **Deactivate the loyalty promotion** so it can't be reused on
 *      another cart. The budget.limit=1 setting handles this on
 *      Medusa's side, but flipping `status=inactive` makes the admin
 *      UI cleaner and prevents accidental admin reuse.
 *
 * No debit step is needed here: points were already deducted at apply
 * time by `reserveLoyaltyPointsStep`. The only ledger entry we add is
 * an "earn" row referencing this order_id.
 *
 * Why read from `order.metadata` instead of `order.cart.promotions`?
 * Medusa V2 doesn't reliably surface the parent cart on order graphs —
 * the historic workflow relied on `order.cart.promotions.*` which
 * always came back undefined in production, so the deduction step
 * never ran. The `order-placed` subscriber now forwards
 * `loyalty_promo_id` and `loyalty_amount` from cart.metadata to
 * order.metadata, giving this workflow a stable, queryable signal.
 */
exports.handleOrderPointsWorkflow = (0, workflows_sdk_1.createWorkflow)("handle-order-points", ({ order_id }) => {
    const { data: orders } = (0, core_flows_1.useQueryGraphStep)({
        entity: "order",
        fields: [
            "id",
            "customer.*",
            "total",
            "subtotal",
            "item_subtotal",
            "metadata",
        ],
        filters: {
            id: order_id,
        },
        options: {
            throwIfKeyNotFound: true,
        },
    });
    (0, validate_customer_exists_1.validateCustomerExistsStep)({
        customer: orders[0].customer,
    });
    // How much (if any) of this order was paid with loyalty points.
    // Defaults to 0 when the customer didn't redeem.
    const loyaltyContext = (0, workflows_sdk_1.transform)({ orders }, (data) => {
        const meta = (data.orders[0].metadata || {});
        const loyaltyAmount = Number(meta.loyalty_amount) || 0;
        const loyaltyPromoId = typeof meta.loyalty_promo_id === "string" ? meta.loyalty_promo_id : null;
        // Earn on the cash portion only. Use item_subtotal/subtotal so we
        // don't credit the customer for shipping/tax/loyalty discount.
        // Fall back to total if those fields are missing (older Medusa
        // versions or edge-case order shapes).
        const earnBase = Math.max(0, (data.orders[0].item_subtotal ??
            data.orders[0].subtotal ??
            data.orders[0].total ??
            0) - loyaltyAmount);
        return {
            loyaltyAmount,
            loyaltyPromoId,
            earnBase,
        };
    });
    // Credit earned points (always — even on partially-redeemed orders).
    (0, workflows_sdk_1.when)({ loyaltyContext }, (data) => data.loyaltyContext.earnBase > 0).then(() => {
        (0, add_purchase_as_points_1.addPurchaseAsPointsStep)((0, workflows_sdk_1.transform)({ orders, loyaltyContext }, (data) => ({
            customer_id: data.orders[0].customer.id,
            amount: data.loyaltyContext.earnBase,
            order_id: data.orders[0].id,
        })));
    });
    // If the order used a loyalty promo, retire it so it can't be
    // reused on a future cart. Medusa's budget.limit=1 also protects
    // against double-use, but explicit status:inactive keeps the admin
    // promotions list tidy.
    (0, workflows_sdk_1.when)({ loyaltyContext }, (data) => data.loyaltyContext.loyaltyPromoId !== null).then(() => {
        (0, core_flows_1.updatePromotionsStep)((0, workflows_sdk_1.transform)({ loyaltyContext }, (data) => [
            {
                id: data.loyaltyContext.loyaltyPromoId,
                status: "inactive",
            },
        ]));
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFuZGxlLW9yZGVyLXBvaW50cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy93b3JrZmxvd3MvaGFuZGxlLW9yZGVyLXBvaW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxRUFJMEM7QUFDMUMsNERBR29DO0FBQ3BDLCtFQUd5QztBQUN6QywyRUFBd0U7QUFNeEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNkJHO0FBQ1UsUUFBQSx5QkFBeUIsR0FBRyxJQUFBLDhCQUFjLEVBQ3JELHFCQUFxQixFQUNyQixDQUFDLEVBQUUsUUFBUSxFQUFpQixFQUFFLEVBQUU7SUFDOUIsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBRyxJQUFBLDhCQUFpQixFQUFDO1FBQ3pDLE1BQU0sRUFBRSxPQUFPO1FBQ2YsTUFBTSxFQUFFO1lBQ04sSUFBSTtZQUNKLFlBQVk7WUFDWixPQUFPO1lBQ1AsVUFBVTtZQUNWLGVBQWU7WUFDZixVQUFVO1NBQ1g7UUFDRCxPQUFPLEVBQUU7WUFDUCxFQUFFLEVBQUUsUUFBUTtTQUNiO1FBQ0QsT0FBTyxFQUFFO1lBQ1Asa0JBQWtCLEVBQUUsSUFBSTtTQUN6QjtLQUNGLENBQUMsQ0FBQTtJQUVGLElBQUEscURBQTBCLEVBQUM7UUFDekIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRO0tBQ00sQ0FBQyxDQUFBO0lBRXJDLGdFQUFnRTtJQUNoRSxpREFBaUQ7SUFDakQsTUFBTSxjQUFjLEdBQUcsSUFBQSx5QkFBUyxFQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNwRCxNQUFNLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBd0IsQ0FBQTtRQUNuRSxNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUN0RCxNQUFNLGNBQWMsR0FDbEIsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQTtRQUUxRSxrRUFBa0U7UUFDbEUsK0RBQStEO1FBQy9ELCtEQUErRDtRQUMvRCx1Q0FBdUM7UUFDdkMsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FDdkIsQ0FBQyxFQUNELENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhO1lBQzNCLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUTtZQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUs7WUFDcEIsQ0FBQyxDQUFDLEdBQUcsYUFBYSxDQUNyQixDQUFBO1FBRUQsT0FBTztZQUNMLGFBQWE7WUFDYixjQUFjO1lBQ2QsUUFBUTtTQUNULENBQUE7SUFDSCxDQUFDLENBQUMsQ0FBQTtJQUVGLHFFQUFxRTtJQUNyRSxJQUFBLG9CQUFJLEVBQUMsRUFBRSxjQUFjLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUN2RSxHQUFHLEVBQUU7UUFDSCxJQUFBLGdEQUF1QixFQUNyQixJQUFBLHlCQUFTLEVBQUMsRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDL0MsV0FBVyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUyxDQUFDLEVBQUU7WUFDeEMsTUFBTSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUTtZQUNwQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1NBQzVCLENBQUMsQ0FBQyxDQUNKLENBQUE7SUFDSCxDQUFDLENBQ0YsQ0FBQTtJQUVELDhEQUE4RDtJQUM5RCxpRUFBaUU7SUFDakUsbUVBQW1FO0lBQ25FLHdCQUF3QjtJQUN4QixJQUFBLG9CQUFJLEVBQ0YsRUFBRSxjQUFjLEVBQUUsRUFDbEIsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxLQUFLLElBQUksQ0FDdEQsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1FBQ1YsSUFBQSxpQ0FBb0IsRUFDbEIsSUFBQSx5QkFBUyxFQUFDLEVBQUUsY0FBYyxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDO1lBQ3RDO2dCQUNFLEVBQUUsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWU7Z0JBQ3ZDLE1BQU0sRUFBRSxVQUFVO2FBQ25CO1NBQ0YsQ0FBUSxDQUNWLENBQUE7SUFDSCxDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FDRixDQUFBIn0=