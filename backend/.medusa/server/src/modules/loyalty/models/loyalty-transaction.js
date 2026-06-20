"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@medusajs/framework/utils");
/**
 * Loyalty point transaction log.
 *
 * Every change to a customer's `loyalty_point.points` value writes a
 * row here so the storefront and admin can show a full history. The
 * `kind` discriminator separates earned points (from completed orders)
 * from redeemed points (applied to a cart) and from manual admin
 * adjustments.
 */
const LoyaltyTransaction = utils_1.model.define("loyalty_transaction", {
    id: utils_1.model.id({ prefix: "ltx" }).primaryKey(),
    customer_id: utils_1.model.text(),
    // Positive = earned, negative = redeemed/spent.
    points: utils_1.model.number(),
    // Running balance after this transaction (snapshot).
    balance_after: utils_1.model.number().default(0),
    kind: utils_1.model
        .enum(["earn", "redeem", "adjust", "refund"])
        .default("earn"),
    // Optional ref to the order that produced these points
    order_id: utils_1.model.text().nullable(),
    // Optional ref to the cart that redeemed them
    cart_id: utils_1.model.text().nullable(),
    // Human-readable description shown in the UI history panel
    description: utils_1.model.text().nullable(),
});
exports.default = LoyaltyTransaction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG95YWx0eS10cmFuc2FjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2xveWFsdHkvbW9kZWxzL2xveWFsdHktdHJhbnNhY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxREFBaUQ7QUFFakQ7Ozs7Ozs7O0dBUUc7QUFDSCxNQUFNLGtCQUFrQixHQUFHLGFBQUssQ0FBQyxNQUFNLENBQUMscUJBQXFCLEVBQUU7SUFDN0QsRUFBRSxFQUFFLGFBQUssQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxVQUFVLEVBQUU7SUFDNUMsV0FBVyxFQUFFLGFBQUssQ0FBQyxJQUFJLEVBQUU7SUFDekIsZ0RBQWdEO0lBQ2hELE1BQU0sRUFBRSxhQUFLLENBQUMsTUFBTSxFQUFFO0lBQ3RCLHFEQUFxRDtJQUNyRCxhQUFhLEVBQUUsYUFBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDeEMsSUFBSSxFQUFFLGFBQUs7U0FDUixJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztTQUM1QyxPQUFPLENBQUMsTUFBTSxDQUFDO0lBQ2xCLHVEQUF1RDtJQUN2RCxRQUFRLEVBQUUsYUFBSyxDQUFDLElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRTtJQUNqQyw4Q0FBOEM7SUFDOUMsT0FBTyxFQUFFLGFBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDaEMsMkRBQTJEO0lBQzNELFdBQVcsRUFBRSxhQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFO0NBQ3JDLENBQUMsQ0FBQTtBQUVGLGtCQUFlLGtCQUFrQixDQUFBIn0=