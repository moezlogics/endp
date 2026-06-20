"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
const utils_1 = require("@medusajs/framework/utils");
const loyalty_1 = require("../../../../../../modules/loyalty");
const compute_redeem_amount_1 = require("../../../../../../workflows/steps/compute-redeem-amount");
/**
 * GET /store/carts/:id/loyalty-points/max
 *
 * Returns the maximum amount the authenticated customer can redeem on
 * this cart, given:
 *   • their current point balance
 *   • the cart subtotal
 *   • the global MAX_REDEEM_RATIO (50% cap by default)
 *
 * The storefront slider uses this to set its upper bound — keeping the
 * cap logic on the backend means the storefront can't accidentally
 * allow over-redemption when the rules change.
 *
 * Response:
 *   {
 *     balance: 1240,         // raw point count
 *     max_amount: 350,       // major currency units (e.g. PKR)
 *     subtotal: 700,
 *     ratio: 0.5,
 *     currency_code: "pkr"
 *   }
 */
async function GET(req, res) {
    const { id: cart_id } = req.params;
    const query = req.scope.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const loyaltyModuleService = req.scope.resolve(loyalty_1.LOYALTY_MODULE);
    try {
        const { data: [rawCart], } = (await query.graph({
            entity: "cart",
            fields: ["id", "customer.id", "subtotal", "total", "currency_code"],
            filters: { id: cart_id },
        }));
        const cart = rawCart;
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        if (!cart.customer?.id) {
            return res.json({
                balance: 0,
                max_amount: 0,
                subtotal: cart.subtotal || 0,
                ratio: compute_redeem_amount_1.MAX_REDEEM_RATIO,
                currency_code: cart.currency_code,
            });
        }
        const balance = await loyaltyModuleService.getPoints(cart.customer.id);
        const balanceAsAmount = await loyaltyModuleService.calculateAmountFromPoints(balance);
        const baseTotal = Math.max(0, cart.subtotal ?? cart.total ?? 0);
        const cartCap = Math.floor(baseTotal * compute_redeem_amount_1.MAX_REDEEM_RATIO);
        const maxAmount = Math.max(0, Math.min(balanceAsAmount, cartCap));
        res.json({
            balance,
            max_amount: maxAmount,
            subtotal: baseTotal,
            ratio: compute_redeem_amount_1.MAX_REDEEM_RATIO,
            currency_code: cart.currency_code,
        });
    }
    catch (e) {
        res
            .status(500)
            .json({ message: e?.message || "Could not compute max redeem" });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL2NhcnRzL1tpZF0vbG95YWx0eS1wb2ludHMvbWF4L3JvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBNEJBLGtCQW1EQztBQTlFRCxxREFBcUU7QUFDckUsK0RBQWtFO0FBRWxFLG1HQUEwRjtBQUUxRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBQ0ksS0FBSyxVQUFVLEdBQUcsQ0FBQyxHQUFrQixFQUFFLEdBQW1CO0lBQy9ELE1BQU0sRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQTtJQUVsQyxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxpQ0FBeUIsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNoRSxNQUFNLG9CQUFvQixHQUN4QixHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyx3QkFBYyxDQUFDLENBQUE7SUFFbkMsSUFBSSxDQUFDO1FBQ0gsTUFBTSxFQUNKLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUNoQixHQUFHLENBQUMsTUFBTSxLQUFLLENBQUMsS0FBSyxDQUFDO1lBQ3JCLE1BQU0sRUFBRSxNQUFNO1lBQ2QsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLGVBQWUsQ0FBQztZQUNuRSxPQUFPLEVBQUUsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFO1NBQ3pCLENBQUMsQ0FBb0IsQ0FBQTtRQUV0QixNQUFNLElBQUksR0FBRyxPQUFjLENBQUE7UUFFM0IsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ1YsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxDQUFDLENBQUE7UUFDNUQsQ0FBQztRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsRUFBRSxDQUFDO1lBQ3ZCLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQztnQkFDZCxPQUFPLEVBQUUsQ0FBQztnQkFDVixVQUFVLEVBQUUsQ0FBQztnQkFDYixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDO2dCQUM1QixLQUFLLEVBQUUsd0NBQWdCO2dCQUN2QixhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWE7YUFDbEMsQ0FBQyxDQUFBO1FBQ0osQ0FBQztRQUVELE1BQU0sT0FBTyxHQUFHLE1BQU0sb0JBQW9CLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDdEUsTUFBTSxlQUFlLEdBQ25CLE1BQU0sb0JBQW9CLENBQUMseUJBQXlCLENBQUMsT0FBTyxDQUFDLENBQUE7UUFFL0QsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFBO1FBQy9ELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLHdDQUFnQixDQUFDLENBQUE7UUFDeEQsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQTtRQUVqRSxHQUFHLENBQUMsSUFBSSxDQUFDO1lBQ1AsT0FBTztZQUNQLFVBQVUsRUFBRSxTQUFTO1lBQ3JCLFFBQVEsRUFBRSxTQUFTO1lBQ25CLEtBQUssRUFBRSx3Q0FBZ0I7WUFDdkIsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhO1NBQ2xDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFBQyxPQUFPLENBQU0sRUFBRSxDQUFDO1FBQ2hCLEdBQUc7YUFDQSxNQUFNLENBQUMsR0FBRyxDQUFDO2FBQ1gsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxPQUFPLElBQUksOEJBQThCLEVBQUUsQ0FBQyxDQUFBO0lBQ3BFLENBQUM7QUFDSCxDQUFDIn0=