"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = pushNotificationOrderHandler;
const utils_1 = require("@medusajs/framework/utils");
const push_notifications_1 = require("../modules/push-notifications");
const web_push_client_1 = require("../modules/push-notifications/lib/web-push-client");
const DEFAULT_COUNTRY = (process.env.NEXT_PUBLIC_DEFAULT_REGION || "us")
    .toLowerCase();
function fmtMoney(amount, currency) {
    if (amount == null)
        return "";
    const c = (currency || "USD").toUpperCase();
    try {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: c,
            maximumFractionDigits: 0,
        }).format(amount);
    }
    catch {
        return `${c} ${Math.round(amount)}`;
    }
}
function shortId(displayId, fallback) {
    if (displayId != null && String(displayId).length > 0)
        return `#${displayId}`;
    // Fallback: last 6 chars of the order id
    return `#${fallback.slice(-6).toUpperCase()}`;
}
/**
 * Build the push payload for an event.
 *
 * `store` is the live store name from site_settings (falls back to a
 * neutral word). It's woven into the copy so every push is clearly
 * branded — and updates automatically when the admin renames the
 * store, with no code change.
 */
function templateFor(event, ctx, store) {
    const { order } = ctx;
    const oid = shortId(order.display_id, order.id);
    const total = fmtMoney(order.total, order.currency_code);
    const orderPath = `/account/orders/details/${order.id}`;
    switch (event) {
        case "order.placed":
            return {
                title: "Order confirmed 🎉",
                body: `Thank you for shopping with ${store}! Order ${oid}${total ? ` (${total})` : ""} has been received.`,
                path: orderPath,
            };
        case "order.canceled":
            return {
                title: "Order cancelled",
                body: `Your ${store} order ${oid} has been cancelled. Any payment will be refunded.`,
                path: orderPath,
            };
        case "order.fulfillment_created":
            return {
                title: "Order packed 📦",
                body: `Good news! Order ${oid} is packed and ready to ship.`,
                path: orderPath,
            };
        case "shipment.created":
            return {
                title: "On the way 🚚",
                body: `Your ${store} order ${oid} has shipped — tap to track it.`,
                path: orderPath,
            };
        case "delivery.created":
            return {
                title: "Delivered ✅",
                body: `Order ${oid} has been delivered. We'd love your review!`,
                path: orderPath,
            };
        case "order.completed":
            return {
                title: "Order complete ✅",
                body: `Order ${oid} is complete. Tap to leave a review and earn points.`,
                path: orderPath,
            };
        case "order.return_requested":
            return {
                title: "Return requested",
                body: `We've received your return request for ${store} order ${oid}.`,
                path: orderPath,
            };
        case "payment.refunded":
            return {
                title: "Refund issued 💰",
                body: `A refund${total ? ` of ${total}` : ""} has been issued for your ${store} order ${oid}.`,
                path: orderPath,
            };
    }
}
async function loadOrderById(query, orderId) {
    const { data } = await query.graph({
        entity: "order",
        fields: [
            "id",
            "display_id",
            "currency_code",
            "total",
            "customer_id",
            "shipping_address.country_code",
            "metadata",
            // Pull `cart.metadata` too so we can read `push_endpoint` from the
            // cart even when `order-placed.ts` hasn't finished copying it onto
            // the order yet. Both subscribers fire on `order.placed` in parallel
            // and Medusa makes no ordering guarantees — without this fallback,
            // every guest-checkout push race-loses and is silently dropped.
            "cart.metadata",
        ],
        filters: { id: orderId },
    });
    return data?.[0] || null;
}
async function resolveOrderId(container, eventName, id, logger) {
    const query = container.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    try {
        if (eventName === "shipment.created" ||
            eventName === "delivery.created" ||
            eventName === "order.fulfillment_created") {
            const { data } = await query.graph({
                entity: "fulfillment",
                fields: ["id", "order.id"],
                filters: { id },
            });
            const orderId = data?.[0]?.order?.id;
            if (orderId)
                return orderId;
        }
        if (eventName === "payment.refunded") {
            const { data } = await query.graph({
                entity: "payment",
                fields: ["id", "payment_collection.order.id"],
                filters: { id },
            });
            return data?.[0]?.payment_collection?.order?.id ?? null;
        }
        return id;
    }
    catch (e) {
        logger?.error?.(`[PushNotification] resolveOrderId failed for ${eventName}/${id}: ${e.message}`);
        return null;
    }
}
async function pushNotificationOrderHandler({ event, container, }) {
    const eventName = event.name;
    const targetId = event.data?.id;
    if (!targetId)
        return;
    const logger = container.resolve(utils_1.ContainerRegistrationKeys.LOGGER);
    logger.info(`[PushNotification] ✅ SUBSCRIBER FIRED for ${eventName} — id=${targetId}`);
    const query = container.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    // VAPID is required to send anything — bail early if unconfigured.
    const cfg = (0, web_push_client_1.configureWebPush)();
    if (!cfg.configured) {
        logger.warn(`[PushNotification] VAPID keys not configured — skipping ${eventName}`);
        return;
    }
    // Resolve to an order regardless of which entity the event carries.
    let order = null;
    try {
        const orderId = await resolveOrderId(container, eventName, targetId, logger);
        if (!orderId) {
            logger.warn(`[PushNotification] Could not resolve order id for ${eventName}/${targetId} — skipping.`);
            return;
        }
        order = await loadOrderById(query, orderId);
    }
    catch (e) {
        logger.error(`[PushNotification] Failed to load order for ${eventName}/${targetId}: ${e.message}`);
        return;
    }
    if (!order) {
        logger.warn(`[PushNotification] No order found for ${eventName}/${targetId} — skipping`);
        return;
    }
    // Anonymous orders can't target a subscription unless we have a
    // `push_endpoint` somewhere reachable. Try order.metadata first, then
    // fall back to cart.metadata — see comment in loadOrderById for the
    // race-condition reasoning.
    const pushEndpoint = order.metadata?.push_endpoint || order.cart?.metadata?.push_endpoint;
    if (!order.customer_id && !pushEndpoint) {
        logger.info(`[PushNotification] Order ${order.id} has no customer_id and no push_endpoint (order.metadata or cart.metadata) — skipping push`);
        return;
    }
    // Pull branding (store name + logo icon) from site settings up front so
    // both the copy and the icon stay in sync with the admin's config.
    // Module identifier is `site_settings` (underscore) with a `getAll()` API.
    let storeName = process.env.STORE_NAME || process.env.MEDUSA_STORE_NAME || "our store";
    let iconUrl;
    try {
        const settingsModule = container.resolve("site_settings");
        const settings = settingsModule?.getAll ? await settingsModule.getAll() : {};
        storeName = settings?.site_name || storeName;
        iconUrl = settings?.site_logo_url || undefined;
    }
    catch {
        // optional — copy uses env/default store name, icon falls back to SW default
    }
    const tpl = templateFor(eventName, {
        order: {
            id: order.id,
            display_id: order.display_id,
            currency_code: order.currency_code,
            total: order.total,
            customer_id: order.customer_id,
        },
    }, storeName);
    // Find active subscriptions for this customer or push endpoint
    const svc = container.resolve(push_notifications_1.PUSH_NOTIFICATIONS_MODULE);
    let subs = [];
    if (pushEndpoint) {
        subs = await svc.listPushSubscriptions({ endpoint: pushEndpoint, is_active: true }, { take: 1 });
    }
    if (!subs?.length && order.customer_id) {
        subs = await svc.listPushSubscriptions({ customer_id: order.customer_id, is_active: true }, { take: 50 });
    }
    if (!subs?.length) {
        logger.info(`[PushNotification] No active subscriptions found for customer ${order.customer_id || "guest"} with endpoint ${pushEndpoint || "none"} (${eventName})`);
        return;
    }
    // Resolve the country prefix from the order's shipping address; fall
    // back to subscription country, then env default. This keeps the SW
    // click target on a route that exists without a redirect hop.
    const orderCountry = order.shipping_address?.country_code?.toLowerCase() || "";
    // (storeName + iconUrl already resolved from site_settings above.)
    // Fan out per-subscription so each push uses the correct country prefix
    let total = 0;
    let sent = 0;
    let failed = 0;
    const expiredIds = [];
    for (const sub of subs) {
        const cc = orderCountry ||
            (sub.country ? String(sub.country).toLowerCase() : "") ||
            DEFAULT_COUNTRY;
        const url = `/${cc}${tpl.path}`;
        const payload = {
            title: tpl.title,
            body: tpl.body,
            icon: iconUrl,
            url,
            tag: `order-${order.id}-${eventName}`,
            // Forward backend URL + publishable key so the SW click handler
            // can record engagement (CTR per transactional event type).
            backend_url: process.env.STORE_PUBLIC_BACKEND_URL ||
                process.env.MEDUSA_BACKEND_URL ||
                undefined,
            publishable_key: process.env.MEDUSA_PUBLISHABLE_KEY ||
                process.env.STORE_PUBLISHABLE_KEY ||
                undefined,
            data: {
                order_id: order.id,
                event: eventName,
            },
        };
        const r = await (0, web_push_client_1.sendPushBatch)([
            {
                id: sub.id,
                endpoint: sub.endpoint,
                p256dh: sub.p256dh,
                auth: sub.auth,
            },
        ], payload);
        total += r.total;
        sent += r.sent;
        failed += r.failed;
        expiredIds.push(...r.expiredIds);
    }
    // Prune dead endpoints
    if (expiredIds.length) {
        try {
            await svc.deletePushSubscriptions(expiredIds);
        }
        catch (e) {
            logger.warn(`[PushNotification] Failed to prune ${expiredIds.length} dead subs: ${e.message}`);
        }
    }
    logger.info(`[PushNotification] ${eventName} order=${order.id} sent=${sent}/${total} failed=${failed} pruned=${expiredIds.length}`);
}
exports.config = {
    event: [
        "order.placed",
        "order.canceled",
        "order.completed",
        "order.fulfillment_created",
        "order.return_requested",
        "shipment.created",
        "delivery.created",
        "payment.refunded",
    ],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItcHVzaC1ub3RpZmljYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc3Vic2NyaWJlcnMvb3JkZXItcHVzaC1ub3RpZmljYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBb05BLCtDQTBMQztBQTdZRCxxREFBcUU7QUFDckUsc0VBQXlFO0FBRXpFLHVGQUcwRDtBQWdEMUQsTUFBTSxlQUFlLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixJQUFJLElBQUksQ0FBQztLQUNyRSxXQUFXLEVBQUUsQ0FBQTtBQUVoQixTQUFTLFFBQVEsQ0FBQyxNQUFxQixFQUFFLFFBQXVCO0lBQzlELElBQUksTUFBTSxJQUFJLElBQUk7UUFBRSxPQUFPLEVBQUUsQ0FBQTtJQUM3QixNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsSUFBSSxLQUFLLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtJQUMzQyxJQUFJLENBQUM7UUFDSCxPQUFPLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUU7WUFDcEMsS0FBSyxFQUFFLFVBQVU7WUFDakIsUUFBUSxFQUFFLENBQUM7WUFDWCxxQkFBcUIsRUFBRSxDQUFDO1NBQ3pCLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDbkIsQ0FBQztJQUFDLE1BQU0sQ0FBQztRQUNQLE9BQU8sR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFBO0lBQ3JDLENBQUM7QUFDSCxDQUFDO0FBRUQsU0FBUyxPQUFPLENBQUMsU0FBaUMsRUFBRSxRQUFnQjtJQUNsRSxJQUFJLFNBQVMsSUFBSSxJQUFJLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDO1FBQUUsT0FBTyxJQUFJLFNBQVMsRUFBRSxDQUFBO0lBQzdFLHlDQUF5QztJQUN6QyxPQUFPLElBQUksUUFB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