"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@medusajs/framework/utils");
const loyalty_point_1 = __importDefault(require("./models/loyalty-point"));
const loyalty_transaction_1 = __importDefault(require("./models/loyalty-transaction"));
/**
 * Loyalty program economics — single source of truth.
 *
 *   • Earn rate: 2 points per 100 currency units → effective 1% reward.
 *     Spend 100 PKR → earn 2 points. Spend 5,000 PKR → earn 100 points.
 *
 *   • Redeem value: 1 point = 0.5 currency units.
 *     200 points → 100 PKR off. So to recover the 100 PKR you'd have
 *     to *spend* (and earn back) 200 points × 50 PKR-per-2-points
 *     = 10,000 PKR of further purchases. This 1 % round-trip is the
 *     standard retail loyalty economics — generous enough to feel
 *     valuable, conservative enough not to give margin away.
 *
 * Together these two ratios are inverse-related (earn = 2/100,
 * redeem = 1/0.5 = 2) so the math is symmetric: every PKR redeemed
 * "costs" the same number of points as 100 PKR of pure-cash spending
 * would have earned.
 *
 * If a per-site override is ever needed (different currency, premium
 * tier, etc.), copy this file and change ONLY these two constants —
 * every conversion routes through `calculateEarnPoints` /
 * `calculateAmountFromPoints` / `calculatePointsForAmount`.
 */
const EARN_POINTS_PER_CURRENCY = 0.02; // 2 points per 100 PKR
const REDEEM_CURRENCY_PER_POINT = 0.5; // 1 point worth 0.5 PKR
class LoyaltyModuleService extends (0, utils_1.MedusaService)({
    LoyaltyPoint: loyalty_point_1.default,
    LoyaltyTransaction: loyalty_transaction_1.default,
}) {
    /**
     * Add points to a customer's balance and log a transaction row.
     *
     * @param customerId  Medusa customer id
     * @param points      Points to credit (must be > 0)
     * @param meta        Optional log metadata: order_id, kind, description.
     *                    Defaults: kind="earn", description="Earned points".
     *                    Use kind="refund" when restoring points spent on a
     *                    canceled order (or when removing a not-yet-checked-out
     *                    loyalty redemption from a cart).
     */
    async addPoints(customerId, points, meta) {
        if (points <= 0) {
            throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, "Points must be greater than zero");
        }
        const existing = await this.listLoyaltyPoints({ customer_id: customerId });
        let updated;
        if (existing.length > 0) {
            updated = await this.updateLoyaltyPoints({
                id: existing[0].id,
                points: existing[0].points + points,
            });
        }
        else {
            updated = await this.createLoyaltyPoints({
                customer_id: customerId,
                points,
            });
        }
        await this.createLoyaltyTransactions({
            customer_id: customerId,
            points,
            balance_after: updated.points,
            kind: meta?.kind || "earn",
            order_id: meta?.order_id || null,
            cart_id: meta?.cart_id || null,
            description: meta?.description || "Earned points",
        });
        return updated;
    }
    /**
     * Deduct points. Throws if the customer doesn't have enough.
     *
     * `kind` should describe WHY points are being removed so the customer
     * sees an accurate history. Defaults to `"redeem"` (the apply-loyalty
     * workflow reserves points up-front so the balance moves at apply time,
     * not at order time). Use `"adjust"` for an admin clawback or for
     * reversing earned points on a canceled order.
     */
    async deductPoints(customerId, points, meta) {
        if (points <= 0) {
            throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, "Points must be greater than zero");
        }
        const existing = await this.listLoyaltyPoints({ customer_id: customerId });
        if (existing.length === 0 || existing[0].points < points) {
            throw new utils_1.MedusaError(utils_1.MedusaError.Types.NOT_ALLOWED, "Insufficient loyalty points");
        }
        const updated = await this.updateLoyaltyPoints({
            id: existing[0].id,
            points: existing[0].points - points,
        });
        await this.createLoyaltyTransactions({
            customer_id: customerId,
            points: -points,
            balance_after: updated.points,
            kind: meta?.kind || "redeem",
            cart_id: meta?.cart_id || null,
            order_id: meta?.order_id || null,
            description: meta?.description || "Redeemed for cart discount",
        });
        return updated;
    }
    async getPoints(customerId) {
        const rows = await this.listLoyaltyPoints({ customer_id: customerId });
        return rows[0]?.points || 0;
    }
    /**
     * Most recent transactions, newest first. Used by the storefront
     * loyalty history panel.
     */
    async listTransactionsForCustomer(customerId, take = 50) {
        return await this.listLoyaltyTransactions({ customer_id: customerId }, { order: { created_at: "DESC" }, take });
    }
    /**
     * EARN: how many points to credit for a given cash purchase amount.
     *
     *   amount × 0.02 (and floored to an integer)
     *
     * Examples:
     *   • 100  → 2 points
     *   • 5000 → 100 points
     *   • 749  → 14 points (749 × 0.02 = 14.98 → floor)
     *
     * Used by `add-purchase-as-points` after an order is placed, and by
     * the cancellation clawback when an order is reversed.
     *
     * Floor (not round) on purpose — over-rounding the earn would slowly
     * leak margin on tens of thousands of orders.
     */
    async calculateEarnPoints(amount) {
        if (amount < 0) {
            throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, "Amount cannot be negative");
        }
        return Math.floor(amount * EARN_POINTS_PER_CURRENCY);
    }
    /**
     * REDEEM: convert points → currency amount the customer can take off
     * the cart total.
     *
     *   points × 0.5 (floored)
     *
     * Examples:
     *   • 100 points → 50 PKR off
     *   • 500 points → 250 PKR off
     *   • 1 point   → 0 (one point alone is below the 1 PKR minimum)
     *
     * Used to compute the slider's upper bound and to show "balance =
     * X PKR worth" on the storefront.
     */
    async calculateAmountFromPoints(points) {
        if (points < 0) {
            throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, "Points cannot be negative");
        }
        return Math.floor(points * REDEEM_CURRENCY_PER_POINT);
    }
    /**
     * REDEEM: convert a desired discount amount → points required to buy
     * that discount. Inverse of `calculateAmountFromPoints`.
     *
     *   ceil(amount / 0.5) = amount × 2
     *
     * Examples:
     *   • 50 PKR off  → 100 points
     *   • 100 PKR off → 200 points
     *   • 1 PKR off   → 2 points
     *
     * `Math.ceil` so partial-rupee fractions can't leak free points
     * (they'd be `0.5 PKR free` per 1 point under-charged, which
     * compounds fast across many redemptions).
     *
     * Used by `reserve-loyalty-points` (debit at apply time) and
     * `refund-loyalty-points` (credit on remove / order cancel).
     */
    async calculatePointsForAmount(amount) {
        if (amount < 0) {
            throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, "Amount cannot be negative");
        }
        return Math.ceil(amount / REDEEM_CURRENCY_PER_POINT);
    }
    /**
     * Backwards-compatible alias for the earn ratio.
     *
     * Older code paths and any third-party scripts that imported the
     * service still call `calculatePointsFromAmount` expecting the earn
     * conversion. New code should call `calculateEarnPoints` (for earning)
     * or `calculatePointsForAmount` (for redemption) explicitly, since
     * those two now produce different numbers.
     *
     * @deprecated Use `calculateEarnPoints` (earning) or
     *             `calculatePointsForAmount` (redemption) directly.
     */
    async calculatePointsFromAmount(amount) {
        return this.calculateEarnPoints(amount);
    }
}
exports.default = LoyaltyModuleService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2xveWFsdHkvc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHFEQUFzRTtBQUN0RSwyRUFBaUQ7QUFDakQsdUZBQTZEO0FBTTdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBQ0gsTUFBTSx3QkFBd0IsR0FBRyxJQUFJLENBQUEsQ0FBQyx1QkFBdUI7QUFDN0QsTUFBTSx5QkFBeUIsR0FBRyxHQUFHLENBQUEsQ0FBQyx3QkFBd0I7QUFFOUQsTUFBTSxvQkFBcUIsU0FBUSxJQUFBLHFCQUFhLEVBQUM7SUFDL0MsWUFBWSxFQUFaLHVCQUFZO0lBQ1osa0JBQWtCLEVBQWxCLDZCQUFrQjtDQUNuQixDQUFDO0lBQ0E7Ozs7Ozs7Ozs7T0FVRztJQUNILEtBQUssQ0FBQyxTQUFTLENBQ2IsVUFBa0IsRUFDbEIsTUFBYyxFQUNkLElBS0M7UUFFRCxJQUFJLE1BQU0sSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNoQixNQUFNLElBQUksbUJBQVcsQ0FDbkIsbUJBQVcsQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUM5QixrQ0FBa0MsQ0FDbkMsQ0FBQTtRQUNILENBQUM7UUFFRCxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFBO1FBQzFFLElBQUksT0FBcUIsQ0FBQTtRQUN6QixJQUFJLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDeEIsT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLG1CQUFtQixDQUFDO2dCQUN2QyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ2xCLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLE1BQU07YUFDcEMsQ0FBQyxDQUFB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