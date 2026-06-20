"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_flows_1 = require("@medusajs/medusa/core-flows");
const loyalty_1 = require("../../modules/loyalty");
const promo_1 = require("../../utils/promo");
const utils_1 = require("@medusajs/framework/utils");
const constants_1 = require("../../constants");
const push_notifications_1 = require("../../modules/push-notifications");
const web_push_client_1 = require("../../modules/push-notifications/lib/web-push-client");
core_flows_1.completeCartWorkflow.hooks.validate(async ({ input, cart }, { container }) => {
    const query = container.resolve("query");
    const loyaltyModuleService = container.resolve(loyalty_1.LOYALTY_MODULE);
    const { data: carts } = await query.graph({
        entity: "cart",
        fields: [
            "id",
            "promotions.*",
            "customer.*",
            "promotions.rules.*",
            "promotions.rules.values.*",
            "promotions.application_method.*",
            "metadata"
        ],
        filters: {
            id: cart.id
        }
    }, {
        throwIfKeyNotFound: true
    });
    const loyaltyPromo = (0, promo_1.getCartLoyaltyPromotion)(carts[0]);
    if (!loyaltyPromo) {
        return;
    }
    // Reservation model: points are deducted at *apply* time by
    // `reserveLoyaltyPointsStep`, so by the time the customer reaches
    // checkout the balance has already been spent. We no longer compare
    // `getPoints()` against the promo value — that would always fail
    // (the balance is now lower-by-the-redeemed-amount than it was when
    // they hit Apply).
    //
    // Instead, sanity-check that the cart actually carries the
    // `loyalty_promo_id`/`loyalty_amount` metadata pair, so the
    // downstream `order-placed` copy + `handle-order-points` workflow
    // have what they need. A promo without that pairing is a corrupt
    // state (cart was edited admin-side, race during apply, etc.) and
    // we'd rather fail loudly than place an order whose loyalty
    // accounting is broken.
    const cartMeta = (carts[0].metadata || {});
    const hasLoyaltyMeta = typeof cartMeta.loyalty_promo_id === "string" &&
        Number(cartMeta.loyalty_amount) > 0;
    if (!hasLoyaltyMeta) {
        throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, "Loyalty redemption is in an inconsistent state — please remove and re-apply your points.");
    }
    // First purchase discount validation logic
    const hasFirstPurchasePromo = cart.promotions?.some((promo) => promo?.code === constants_1.FIRST_PURCHASE_PROMOTION_CODE);
    if (hasFirstPurchasePromo) {
        if (!cart.customer_id) {
            throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, "First purchase discount can only be applied to carts with a customer");
        }
        const { data: [customerFirstPurchase] } = await query.graph({
            entity: "customer",
            fields: ["orders.*", "has_account"],
            filters: {
                id: cart.customer_id
            }
        });
        if (!customerFirstPurchase.has_account || (customerFirstPurchase?.orders?.length || 0) > 0) {
            throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, "First purchase discount can only be applied to carts with no previous orders");
        }
    }
});
core_flows_1.completeCartWorkflow.hooks.orderCreated(async ({ order_id }, { container }) => {
    const cfg = (0, web_push_client_1.configureWebPush)();
    if (!cfg.configured) {
        console.log("[Push/hook] ⚠️ VAPID not configured — skipping all push");
        return;
    }
    const svc = container.resolve(push_notifications_1.PUSH_NOTIFICATIONS_MODULE);
    // ── 1. ADMIN push — every installed admin device ──────────────────
    try {
        console.log(`[AdminPush/hook] 🔔 orderCreated — order_id=${order_id}`);
        const subs = await svc.listAdminPushSubscriptions({ is_active: true }, { take: 200 });
        console.log(`[AdminPush/hook] active admin devices = ${subs?.length || 0}`);
        if (subs?.length) {
            const result = await (0, web_push_client_1.sendPushBatch)(subs.map((s) => ({ id: s.id, endpoint: s.endpoint, p256dh: s.p256dh, auth: s.auth })), {
                title: "🛒 New order received",
                body: "A new order just came in — tap to view.",
                url: `/orders/${order_id}`,
                tag: `admin-order-${order_id}`,
                data: { order_id },
            });
            if (result.expiredIds.length) {
                try {
                    await svc.deleteAdminPushSubscriptions(result.expiredIds);
                }
                catch { /* noop */ }
            }
            console.log(`[AdminPush/hook] 📤 sent=${result.sent}/${result.total} failed=${result.failed}`);
        }
    }
    catch (e) {
        console.log(`[AdminPush/hook] ❌ ERROR (ignored): ${e?.message || e}`);
    }
    // ── 2. CUSTOMER "order confirmed" push — the device that ordered ──
    // Same matching as order-push-notification.ts (by push_endpoint from
    // cart/order metadata, else customer_id) but INLINE, because the event
    // bus was not delivering order.placed. Uses the SAME `tag` as the
    // subscriber so if both ever fire, the SW dedupes (no double push).
    try {
        const query = container.resolve("query");
        const { data: [ord] } = await query.graph({
            entity: "order",
            fields: [
                "id", "display_id", "total", "currency_code", "customer_id",
                "shipping_address.country_code", "metadata", "cart.metadata",
            ],
            filters: { id: order_id },
        });
        if (ord) {
            const pushEndpoint = ord.metadata?.push_endpoint || ord.cart?.metadata?.push_endpoint;
            let csubs = [];
            if (pushEndpoint) {
                csubs = await svc.listPushSubscriptions({ endpoint: pushEndpoint, is_active: true }, { take: 1 });
            }
            if (!csubs?.length && ord.customer_id) {
                csubs = await svc.listPushSubscriptions({ customer_id: ord.customer_id, is_active: true }, { take: 50 });
            }
            console.log(`[CustomerPush/hook] order=${order_id} endpoint=${pushEndpoint ? "yes" : "no"} customer_id=${ord.customer_id || "guest"} matches=${csubs?.length || 0}`);
            if (csubs?.length) {
                let storeName = process.env.STORE_NAME || "our store";
                let icon;
                try {
                    const sm = container.resolve("site_settings");
                    const s = sm?.getAll ? await sm.getAll() : {};
                    storeName = s?.site_name || storeName;
                    icon = s?.site_logo_url || undefined;
                }
                catch { /* branding optional */ }
                const cc = (ord.shipping_address?.country_code || process.env.NEXT_PUBLIC_DEFAULT_REGION || "pk").toLowerCase();
                const oid = ord.display_id != null ? `#${ord.display_id}` : `#${String(ord.id).slice(-6)}`;
                const r = await (0, web_push_client_1.sendPushBatch)(csubs.map((s) => ({ id: s.id, endpoint: s.endpoint, p256dh: s.p256dh, auth: s.auth })), {
                    title: "Order confirmed 🎉",
                    body: `Thank you for shopping with ${storeName}! Order ${oid} has been received.`,
                    icon,
                    url: `/${cc}/account/orders/details/${ord.id}`,
                    tag: `order-${ord.id}-order.placed`,
                    data: { order_id: ord.id, event: "order.placed" },
                });
                if (r.expiredIds.length) {
                    try {
                        await svc.deletePushSubscriptions(r.expiredIds);
                    }
                    catch { /* noop */ }
                }
                console.log(`[CustomerPush/hook] 📤 sent=${r.sent}/${r.total} failed=${r.failed}`);
            }
        }
    }
    catch (e) {
        console.log(`[CustomerPush/hook] ❌ ERROR (ignored): ${e?.message || e}`);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGxldGUtY2FydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy93b3JrZmxvd3MvaG9va3MvY29tcGxldGUtY2FydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDREQUFtRTtBQUVuRSxtREFBdUQ7QUFDdkQsNkNBQXNFO0FBQ3RFLHFEQUF3RDtBQUN4RCwrQ0FBZ0U7QUFDaEUseUVBQTZFO0FBQzdFLDBGQUc4RDtBQUU5RCxpQ0FBb0IsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUNqQyxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFO0lBQ3ZDLE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDeEMsTUFBTSxvQkFBb0IsR0FBeUIsU0FBUyxDQUFDLE9BQU8sQ0FDbEUsd0JBQWMsQ0FDZixDQUFBO0lBRUQsTUFBTSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxNQUFNLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDeEMsTUFBTSxFQUFFLE1BQU07UUFDZCxNQUFNLEVBQUU7WUFDTixJQUFJO1lBQ0osY0FBYztZQUNkLFlBQVk7WUFDWixvQkFBb0I7WUFDcEIsMkJBQTJCO1lBQzNCLGlDQUFpQztZQUNqQyxVQUFVO1NBQ1g7UUFDRCxPQUFPLEVBQUU7WUFDUCxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUU7U0FDWjtLQUNGLEVBQUU7UUFDRCxrQkFBa0IsRUFBRSxJQUFJO0tBQ3pCLENBQUMsQ0FBQTtJQUVGLE1BQU0sWUFBWSxHQUFHLElBQUEsK0JBQXVCLEVBQUMsS0FBSyxDQUFDLENBQUMsQ0FBd0IsQ0FBQyxDQUFBO0lBRTdFLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNsQixPQUFNO0lBQ1IsQ0FBQztJQUVELDREQUE0RDtJQUM1RCxrRUFBa0U7SUFDbEUsb0VBQW9FO0lB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