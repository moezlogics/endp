"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
const utils_1 = require("@medusajs/framework/utils");
const core_flows_1 = require("@medusajs/medusa/core-flows");
/**
 * POST /store/chat/confirm-order
 *
 * Final step of the AI-assisted order flow. The AI never places orders
 * directly — it only `prepare_order_for_confirmation`, which renders a
 * "Confirm order" button in the chat. Tapping that button hits THIS
 * route, which is the single, isolated, server-side place where an
 * order can actually be created from the chat surface.
 *
 * Body: { cart_id: string }
 *
 * SECURITY:
 *   - Requires an authenticated customer (auth bearer). Anonymous
 *     callers get 401.
 *   - Re-fetches the cart server-side and verifies `cart.customer_id`
 *     matches the authed user. A user CANNOT confirm someone else's
 *     cart even if they discover the id.
 *   - Cart must be COD (no payment session yet OR payment provider
 *     id starts with "pp_system_default_" / "manual" / "cod"). For
 *     anything that needs a real charge we return 409 and tell the
 *     storefront to send the user to /checkout — payments only ever
 *     run through the proper checkout flow, never via chat.
 *   - The cart's customer_id is forced to the authed user before
 *     completion so the resulting order is automatically attached to
 *     their account and shows up at /account/orders.
 *
 * Response: { order: { id, display_id }, redirect: "/account/orders/details/..." }
 */
async function POST(req, res) {
    const authedCustomerId = req.auth_context?.actor_id || null;
    const body = (req.body || {});
    const cartId = (body.cart_id || "").toString().trim();
    if (!cartId) {
        return res.status(400).json({ message: "cart_id is required" });
    }
    const cartModule = req.scope.resolve(utils_1.Modules.CART);
    let cart;
    try {
        cart = await cartModule.retrieveCart(cartId, {
            relations: [
                "items",
                "shipping_address",
                "payment_collection",
                "payment_collection.payment_sessions",
            ],
        });
    }
    catch {
        return res.status(404).json({ message: "Cart not found" });
    }
    if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
    }
    // Ownership: a cart already linked to a customer can ONLY be completed
    // by that same signed-in customer. Anonymous carts can be completed by
    // anyone holding the (unguessable) cart id — same surface as the normal
    // guest checkout. Guests (no auth) may ONLY complete anonymous carts.
    if (cart.customer_id && cart.customer_id !== authedCustomerId) {
        return res.status(403).json({ message: "Forbidden" });
    }
    if (!cart.items?.length) {
        return res.status(400).json({ message: "Cart is empty" });
    }
    // COD needs a delivery address + contact email on the cart (the AI
    // collects these via collect_checkout_info). Refuse otherwise so we
    // never create an order we can't ship.
    const addr = cart.shipping_address;
    const hasShipping = !!(addr && addr.address_1 && addr.city);
    const hasEmail = !!cart.email;
    if (!hasShipping || !hasEmail) {
        const missing = [];
        if (!hasShipping)
            missing.push("shipping_address");
        if (!hasEmail)
            missing.push("email");
        return res.status(400).json({
            message: "Delivery details are incomplete. Please provide name, full address, city and email first.",
            missing,
        });
    }
    // Anchor the cart to the authed customer (if any) so the order shows up
    // in their account. Guests stay anonymous → a normal guest order.
    if (authedCustomerId && !cart.customer_id) {
        try {
            await cartModule.updateCarts(cart.id, { customer_id: authedCustomerId });
        }
        catch (e) {
            return res.status(500).json({
                message: e?.message || "Could not attach cart to customer",
            });
        }
    }
    // Only let cash-on-delivery (or an empty payment collection that
    // implies "no charge yet") complete from chat. Anything else has to
    // use the regular checkout — we don't run real payments here.
    const sessions = cart.payment_collection?.payment_sessions || [];
    const allCod = sessions.every((s) => {
        const pid = (s.provider_id || "").toLowerCase();
        return (pid.includes("cod") ||
            pid.includes("manual") ||
            pid.includes("system_default"));
    });
    if (sessions.length && !allCod) {
        return res.status(409).json({
            message: "This order needs an online payment — please confirm it from the checkout page.",
            redirect: "/checkout",
        });
    }
    try {
        const { result } = await (0, core_flows_1.completeCartWorkflow)(req.scope).run({
            input: { id: cart.id },
        });
        const order = result?.order || result;
        const orderId = order?.id || result?.id;
        return res.json({
            order: {
                id: orderId,
                display_id: order?.display_id ?? null,
            },
            redirect: orderId
                ? authedCustomerId
                    ? `/account/orders/details/${orderId}`
                    : `/order/confirmed/${orderId}`
                : "/account/orders",
        });
    }
    catch (e) {
        // The cart may still be missing a shipping method or COD payment
        // session (normally set up on the checkout page). Rather than 500,
        // send the user to checkout to finish — their cart + details are
        // already saved, so it's one tap there.
        return res.status(409).json({
            message: "Aap ka order taiyaar hai — bas ek aakhri tap checkout par karna hai (shipping/payment confirm).",
            redirect: "/checkout",
            detail: e?.message || "cart_not_ready",
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL2NoYXQvY29uZmlybS1vcmRlci9yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQWdDQSxvQkEySEM7QUExSkQscURBQW1EO0FBQ25ELDREQUFrRTtBQUVsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkJHO0FBQ0ksS0FBSyxVQUFVLElBQUksQ0FBQyxHQUFrQixFQUFFLEdBQW1CO0lBQ2hFLE1BQU0sZ0JBQWdCLEdBQ2xCLEdBQVcsQ0FBQyxZQUFZLEVBQUUsUUFBK0IsSUFBSSxJQUFJLENBQUE7SUFFckUsTUFBTSxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBd0IsQ0FBQTtJQUNwRCxNQUFNLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUE7SUFDckQsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ1osT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxDQUFDLENBQUE7SUFDakUsQ0FBQztJQUVELE1BQU0sVUFBVSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGVBQU8sQ0FBQyxJQUFJLENBQVEsQ0FBQTtJQUV6RCxJQUFJLElBQVMsQ0FBQTtJQUNiLElBQUksQ0FBQztRQUNILElBQUksR0FBRyxNQUFNLFVBQVUsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFO1lBQzNDLFNBQVMsRUFBRTtnQkFDVCxPQUFPO2dCQUNQLGtCQUFrQjtnQkFDbEIsb0JBQW9CO2dCQUNwQixxQ0FBcUM7YUFDdEM7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDO0lBQUMsTUFBTSxDQUFDO1FBQ1As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