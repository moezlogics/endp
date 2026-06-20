"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
exports.DELETE = DELETE;
const apply_loyalty_on_cart_1 = require("../../../../../workflows/apply-loyalty-on-cart");
const remove_loyalty_from_cart_1 = require("../../../../../workflows/remove-loyalty-from-cart");
/**
 * Apply / remove a loyalty redemption on a cart.
 *
 * POST   /store/carts/:id/loyalty-points          → reserve points + add discount
 * DELETE /store/carts/:id/loyalty-points          → refund points + drop discount
 *
 * POST body:
 *   { amount?: number }  // optional partial-redeem; omit for "max allowed"
 *
 * The body is intentionally tiny — the backend workflow validates the
 * amount against the customer's balance + the cart subtotal cap so the
 * storefront can't bypass either limit by hand-crafting a request.
 */
async function POST(req, res) {
    const { id: cart_id } = req.params;
    // Parse + sanitise the requested amount. We accept ints only — points
    // are integers and so is the resulting discount, so anything else
    // would just confuse the downstream Math.floor.
    const body = (req.body || {});
    let amount;
    if (body.amount !== undefined && body.amount !== null) {
        const n = Number(body.amount);
        if (!Number.isFinite(n) || n <= 0) {
            return res
                .status(400)
                .json({ message: "Redeem amount must be a positive number" });
        }
        amount = Math.floor(n);
    }
    // Replace any existing reservation so a user changing their mind on
    // the slider doesn't have to click Remove → Apply. Wrapped in
    // try/catch because the first apply will have no prior promotion to
    // remove (and that throws "not-found" by design).
    try {
        await (0, remove_loyalty_from_cart_1.removeLoyaltyFromCartWorkflow)(req.scope).run({
            input: { cart_id },
        });
    }
    catch {
        // No prior redemption — fine.
    }
    try {
        const { result: cart } = await (0, apply_loyalty_on_cart_1.applyLoyaltyOnCartWorkflow)(req.scope).run({
            input: { cart_id, amount },
        });
        res.json({ cart });
    }
    catch (e) {
        // Surface the workflow error to the client so the storefront can
        // show a useful "you can only redeem N points on this cart" toast
        // instead of a generic 500.
        res.status(400).json({ message: e?.message || "Could not apply points" });
    }
}
async function DELETE(req, res) {
    const { id: cart_id } = req.params;
    try {
        const { result: cart } = await (0, remove_loyalty_from_cart_1.removeLoyaltyFromCartWorkflow)(req.scope).run({ input: { cart_id } });
        res.json({ cart });
    }
    catch (e) {
        res
            .status(400)
            .json({ message: e?.message || "Could not remove redemption" });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL2NhcnRzL1tpZF0vbG95YWx0eS1wb2ludHMvcm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFpQkEsb0JBeUNDO0FBRUQsd0JBYUM7QUF4RUQsMEZBQTJGO0FBQzNGLGdHQUFpRztBQUVqRzs7Ozs7Ozs7Ozs7O0dBWUc7QUFDSSxLQUFLLFVBQVUsSUFBSSxDQUFDLEdBQWtCLEVBQUUsR0FBbUI7SUFDaEUsTUFBTSxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFBO0lBRWxDLHNFQUFzRTtJQUN0RSxrRUFBa0U7SUFDbEUsZ0RBQWdEO0lBQ2hELE1BQU0sSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxFQUFFLENBQXlCLENBQUE7SUFDckQsSUFBSSxNQUEwQixDQUFBO0lBQzlCLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxTQUFTLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxJQUFJLEVBQUUsQ0FBQztRQUN0RCxNQUFNLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQzdCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNsQyxPQUFPLEdBQUc7aUJBQ1AsTUFBTSxDQUFDLEdBQUcsQ0FBQztpQkFDWCxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUseUNBQXlDLEVBQUUsQ0FBQyxDQUFBO1FBQ2pFLENBQUM7UUFDRCxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUN4QixDQUFDO0lBRUQsb0VBQW9FO0lBQ3BFLDhEQUE4RDtJQUM5RCxvRUFBb0U7SUFDcEUsa0RBQWtEO0lBQ2xELElBQUksQ0FBQztRQUNILE1BQU0sSUFBQSx3REFBNkIsRUFBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQ2pELEtBQUssRUFBRSxFQUFFLE9BQU8sRUFBRTtTQUNuQixDQUFDLENBQUE7SUFDSixDQUFDO0lBQUMsTUFBTSxDQUFDO1FBQ1AsOEJBQThCO0lBQ2hDLENBQUM7SUFFRCxJQUFJLENBQUM7UUFDSCxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLE1BQU0sSUFBQSxrREFBMEIsRUFBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQ3ZFLEtBQUssRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUU7U0FDM0IsQ0FBQyxDQUFBO1FBQ0YsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7SUFDcEIsQ0FBQztJQUFDLE9BQU8sQ0FBTSxFQUFFLENBQUM7UUFDaEIsaUVBQWlFO1FBQ2pFLGtFQUFrRTtRQUNsRSw0QkFBNEI7UUFDNUIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLE9BQU8sSUFBSSx3QkFBd0IsRUFBRSxDQUFDLENBQUE7SUFDM0UsQ0FBQztBQUNILENBQUM7QUFFTSxLQUFLLFVBQVUsTUFBTSxDQUFDLEdBQWtCLEVBQUUsR0FBbUI7SUFDbEUsTUFBTSxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFBO0lBRWxDLElBQUksQ0FBQztRQUNILE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsTUFBTSxJQUFBLHdEQUE2QixFQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQ3pFLEVBQUUsS0FBSyxFQUFFLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FDdkIsQ0FBQTtRQUNELEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO0lBQ3BCLENBQUM7SUFBQyxPQUFPLENBQU0sRUFBRSxDQUFDO1FBQ2hCLEdBQUc7YUFDQSxNQUFNLENBQUMsR0FBRyxDQUFDO2FBQ1gsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxPQUFPLElBQUksNkJBQTZCLEVBQUUsQ0FBQyxDQUFBO0lBQ25FLENBQUM7QUFDSCxDQUFDIn0=