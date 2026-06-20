"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = orderCanceledHandler;
const utils_1 = require("@medusajs/framework/utils");
const loyalty_1 = require("../modules/loyalty");
/**
 * Reverse loyalty bookkeeping when an order is canceled.
 *
 * Two sides to a cancel:
 *
 *   1. **Refund redeemed points.** If the customer paid for part of the
 *      order with loyalty (`order.metadata.loyalty_amount > 0`), credit
 *      those points back so they're not lost to a canceled order.
 *
 *   2. **Clawback earned points.** Points earned by `handleOrderPoints`
 *      reference this order via `loyalty_transaction.order_id`. Sum the
 *      positive `earn`-kind transactions for this order and deduct the
 *      same amount as an `adjust` so the running balance reflects the
 *      cancel.
 *
 * Both sides are best-effort: a missing earn transaction (e.g. order
 * canceled before `handleOrderPoints` ran) just means there's nothing
 * to clawback, which is fine.
 *
 * Idempotency: the subscriber tags each refund and clawback transaction
 * with `order_id`, and checks for an existing matching row before
 * acting. This protects against Medusa retrying the event (or admin
 * clicking "cancel" twice — the order is already in canceled state, so
 * Medusa emits the event once, but the safety belt is cheap).
 */
async function orderCanceledHandler({ event, container, }) {
    const logger = container.resolve("logger");
    const orderId = event.data?.id;
    if (!orderId) {
        logger.warn("[orderCanceled] No order id in event data — skipping.");
        return;
    }
    const query = container.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const loyaltyModuleService = container.resolve(loyalty_1.LOYALTY_MODULE);
    try {
        const { data: [order], } = await query.graph({
            entity: "order",
            fields: ["id", "customer.*", "metadata"],
            filters: { id: orderId },
        });
        if (!order) {
            logger.warn(`[orderCanceled] Order ${orderId} not found — skipping.`);
            return;
        }
        const customerId = order.customer?.id;
        if (!customerId) {
            logger.info(`[orderCanceled] Order ${orderId} has no customer — skipping loyalty refund.`);
            return;
        }
        const meta = (order.metadata || {});
        const loyaltyAmount = Number(meta.loyalty_amount) || 0;
        // 1) Refund the redeemed points (if any).
        if (loyaltyAmount > 0) {
            // Idempotency guard: if we already wrote a "refund" row for this
            // order, skip. Otherwise admin re-canceling a half-canceled order
            // would double-credit.
            const existingRefunds = await loyaltyModuleService.listLoyaltyTransactions({
                customer_id: customerId,
                order_id: orderId,
                kind: "refund",
            });
            if (existingRefunds.length === 0) {
                // Refund the SAME number of points that were deducted at apply
                // time — i.e. the redeem conversion (amount × 2), not the earn
                // conversion. We're undoing the reservation, not the earning.
                const points = await loyaltyModuleService.calculatePointsForAmount(loyaltyAmount);
                await loyaltyModuleService.addPoints(customerId, points, {
                    kind: "refund",
                    order_id: orderId,
                    description: `Refunded — order #${orderId.slice(-8)} canceled`,
                });
                logger.info(`[orderCanceled] Refunded ${points} loyalty points to ${customerId} for canceled order ${orderId}`);
            }
            else {
                logger.info(`[orderCanceled] Refund row already exists for order ${orderId} — skipping`);
            }
        }
        // 2) Clawback earned points (the order had been giving points back
        //    to the customer; cancellation invalidates that).
        const earnedTxns = await loyaltyModuleService.listLoyaltyTransactions({
            customer_id: customerId,
            order_id: orderId,
            kind: "earn",
        });
        const totalEarned = earnedTxns.reduce((acc, t) => acc + (Number(t.points) || 0), 0);
        if (totalEarned > 0) {
            // Same idempotency guard — don't clawback twice.
            const existingClawbacks = await loyaltyModuleService.listLoyaltyTransactions({
                customer_id: customerId,
                order_id: orderId,
                kind: "adjust",
            });
            const alreadyClawedBack = existingClawbacks.reduce((acc, t) => acc + Math.abs(Number(t.points) || 0), 0);
            const remaining = totalEarned - alreadyClawedBack;
            if (remaining > 0) {
                try {
                    await loyaltyModuleService.deductPoints(customerId, remaining, {
                        kind: "adjust",
                        order_id: orderId,
                        description: `Clawback — order #${orderId.slice(-8)} canceled`,
                    });
                    logger.info(`[orderCanceled] Clawed back ${remaining} earned points from ${customerId} for canceled order ${orderId}`);
                }
                catch (e) {
                    // Customer has already spent some/all of the earned points
                    // on another cart — we can't go negative. Log and move on; an
                    // admin can reconcile from the transaction history if needed.
                    logger.warn(`[orderCanceled] Could not clawback ${remaining} points (likely already spent): ${e?.message || e}`);
                }
            }
        }
    }
    catch (err) {
        logger.error(`[orderCanceled] FAILED order=${orderId} message=${err?.message || err}`);
        if (err?.stack) {
            logger.error(`[orderCanceled] stack: ${err.stack.split("\n").slice(0, 5).join(" | ")}`);
        }
    }
}
exports.config = {
    event: "order.canceled",
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItY2FuY2VsZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc3Vic2NyaWJlcnMvb3JkZXItY2FuY2VsZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBOEJBLHVDQWdJQztBQTdKRCxxREFBcUU7QUFDckUsZ0RBQW1EO0FBR25EOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFDWSxLQUFLLFVBQVUsb0JBQW9CLENBQUMsRUFDakQsS0FBSyxFQUNMLFNBQVMsR0FDc0I7SUFDL0IsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUMxQyxNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQTtJQUM5QixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLHVEQUF1RCxDQUFDLENBQUE7UUFDcEUsT0FBTTtJQUNSLENBQUM7SUFFRCxNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLGlDQUF5QixDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ2hFLE1BQU0sb0JBQW9CLEdBQ3hCLFNBQVMsQ0FBQyxPQUFPLENBQUMsd0JBQWMsQ0FBQyxDQUFBO0lBRW5DLElBQUksQ0FBQztRQUNILE1BQU0sRUFDSixJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FDZCxHQUFHLE1BQU0sS0FBSyxDQUFDLEtBQUssQ0FBQztZQUNwQixNQUFNLEVBQUUsT0FBTztZQUNmLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxZQUFZLEVBQUUsVUFBVSxDQUFDO1lBQ3hDLE9BQU8sRUFBRSxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUU7U0FDekIsQ0FBQyxDQUFBO1FBRUYsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ1gsTUFBTSxDQUFDLElBQUksQ0FBQyx5QkFBeUIsT0FBTyx3QkFBd0IsQ0FBQyxDQUFB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