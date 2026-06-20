"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = orderNotificationHandler;
const utils_1 = require("@medusajs/framework/utils");
const theme_from_settings_1 = require("../modules/email-notifications/util/theme-from-settings");
/**
 * Resolve an order from whatever id the event carries.
 *
 * Medusa v2 emits different events with different payload shapes:
 *   - `order.placed|completed|canceled` carry `data.id = order_id`
 *   - `order.fulfillment_created` carries `data.id = order_id`
 *   - `shipment.created|delivery.created` carry `data.id = fulfillment_id`
 *   - `payment.refunded` carries `data.id = payment_id`
 *
 * Earlier versions of this subscriber assumed the id was always an
 * order id, so any "shipment" event silently failed with
 * "Order shp_xxx not found". This helper normalizes the lookup
 * so we get the order regardless of which event fired.
 */
async function resolveOrderId(container, eventName, id, logger) {
    const query = container.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    try {
        if (eventName === "shipment.created" ||
            eventName === "delivery.created" ||
            eventName === "order.fulfillment_created") {
            // Try fulfillment lookup first — works for shipment/delivery,
            // also works for order.fulfillment_created in some Medusa
            // versions which actually pass the fulfillment id.
            const { data } = await query.graph({
                entity: "fulfillment",
                fields: ["id", "order.id"],
                filters: { id },
            });
            const orderId = data?.[0]?.order?.id;
            if (orderId)
                return orderId;
            // Fall through to direct order lookup — the id was already
            // an order id (older Medusa version).
        }
        if (eventName === "payment.refunded") {
            const { data } = await query.graph({
                entity: "payment",
                fields: ["id", "payment_collection.order.id"],
                filters: { id },
            });
            return data?.[0]?.payment_collection?.order?.id ?? null;
        }
        // Default: id is an order id
        return id;
    }
    catch (e) {
        logger?.error?.(`[OrderNotification] resolveOrderId failed for ${eventName}/${id}: ${e.message}`);
        return null;
    }
}
/**
 * Order lifecycle notification subscriber.
 *
 * Listens to order events and sends branded emails to:
 *   - Customer: confirmation, shipped, canceled, completed
 *   - Admin:    new order alert
 *
 * Site settings (logo, store name, copyright, contact email) are fetched
 * dynamically so emails always reflect the latest admin configuration.
 */
async function orderNotificationHandler({ event, container, }) {
    const logger = container.resolve("logger");
    const eventName = event.name || "";
    const rawId = event.data?.id;
    if (!rawId) {
        logger.warn(`[OrderNotification] No id in ${eventName} event data — skipping.`);
        return;
    }
    logger.info(`[OrderNotification] received ${eventName} for id=${rawId} — resolving order…`);
    try {
        // Normalize to an order id regardless of event shape.
        const orderId = await resolveOrderId(container, eventName, rawId, logger);
        if (!orderId) {
            logger.warn(`[OrderNotification] Could not resolve order id for ${eventName}/${rawId} — skipping.`);
            return;
        }
        // Resolve services
        const notificationService = container.resolve(utils_1.Modules.NOTIFICATION);
        const query = container.resolve(utils_1.ContainerRegistrationKeys.QUERY);
        // Fetch full order with items + addresses using query.graph for Medusa v2 compatibility
        const { data: [order] } = await query.graph({
            entity: "order",
            fields: [
                "id",
                "email",
                "currency_code",
                "total",
                "subtotal",
                "tax_total",
                "discount_total",
                "shipping_total",
                "metadata",
                "items.*",
                "items.variant.*",
                "shipping_address.*",
                "billing_address.*"
            ],
            filters: { id: orderId },
        });
        if (!order) {
            logger.warn(`[OrderNotification] Order ${orderId} not found — skipping.`);
            return;
        }
        // Fetch site settings for branding.
        //
        // CRITICAL: module identifier is `site_settings` (underscore) — matches
        // `SITE_SETTINGS_MODULE` in `src/modules/site-settings/index.ts` and the
        // key in `medusa-config.ts`. The hyphenated `"site-settings"` used here
        // earlier was silently caught and dropped, which meant every email went
        // out with default branding and the admin recipient fell back to
        // `SMTP_FROM` (i.e. the sender mailbox) — a common cause of "I never
        // got the admin alert" reports.
        let settings = {};
        try {
            const settingsModule = container.resolve("site_settings");
            if (settingsModule?.getAll) {
                settings = await settingsModule.getAll();
            }
        }
        catch (e) {
            logger?.warn?.(`[OrderNotification] site_settings resolve failed (${e?.message}) — using env defaults`);
        }
        const brandData = {
            store_name: settings.site_name ||
                process.env.STORE_NAME ||
                process.env.MEDUSA_STORE_NAME ||
                "Welcome",
            logo_url: settings.site_logo_url || undefined,
            copyright: settings.footer_copyright || undefined,
            theme: (0, theme_from_settings_1.buildEmailThemeFromSettings)(settings),
        };
        const adminEmail = settings.contact_email || process.env.SMTP_FROM || "";
        const customerEmail = order.email;
        // Map events to template + recipient
        if (eventName.includes("placed")) {
            // Send customer confirmation
            if (customerEmail) {
                await notificationService.createNotifications({
                    to: customerEmail,
                    channel: "email",
                    template: "order-placed",
                    data: { ...brandData, order },
                });
                logger.info(`[OrderNotification] Sent order-placed email to ${customerEmail}`);
            }
            // Send admin alert
            if (adminEmail) {
                await notificationService.createNotifications({
                    to: adminEmail,
                    channel: "email",
                    template: "order-placed-admin",
                    data: { ...brandData, order },
                });
                logger.info(`[OrderNotification] Sent order-placed-admin email to ${adminEmail}`);
            }
        }
        if (eventName.includes("fulfillment_created") ||
            eventName === "shipment.created" ||
            eventName === "delivery.created") {
            if (customerEmail) {
                await notificationService.createNotifications({
                    to: customerEmail,
                    channel: "email",
                    template: "order-shipped",
                    data: { ...brandData, order },
                });
                logger.info(`[OrderNotification] Sent order-shipped email to ${customerEmail}`);
            }
            else {
                logger.warn(`[OrderNotification] order-shipped: order ${order.id} has no email — skipping.`);
            }
        }
        if (eventName.includes("canceled")) {
            if (customerEmail) {
                await notificationService.createNotifications({
                    to: customerEmail,
                    channel: "email",
                    template: "order-canceled",
                    data: { ...brandData, order },
                });
                logger.info(`[OrderNotification] Sent order-canceled email to ${customerEmail}`);
            }
        }
        if (eventName.includes("completed")) {
            if (customerEmail) {
                await notificationService.createNotifications({
                    to: customerEmail,
                    channel: "email",
                    template: "order-completed",
                    data: { ...brandData, order },
                });
                logger.info(`[OrderNotification] Sent order-completed email to ${customerEmail}`);
            }
        }
    }
    catch (err) {
        // Loud + structured so pm2 logs surface the exact failure. Earlier
        // version logged the error object directly which formatted as
        // "[Object object]" in some setups, hiding the real cause.
        logger.error(`[OrderNotification] FAILED event=${eventName} id=${rawId} message=${err?.message || err}`);
        if (err?.stack) {
            logger.error(`[OrderNotification] stack: ${err.stack.split("\n").slice(0, 5).join(" | ")}`);
        }
    }
}
exports.config = {
    event: [
        "order.placed",
        "order.completed",
        "order.canceled",
        // Fulfillment in Medusa v2 fires under multiple names depending on
        // the version. Listen to all so the email goes regardless.
        "order.fulfillment_created",
        "shipment.created",
        "delivery.created",
    ],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItbm90aWZpY2F0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3N1YnNjcmliZXJzL29yZGVyLW5vdGlmaWNhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUEyRUEsMkNBMktDO0FBclBELHFEQUE4RTtBQUM5RSxpR0FBcUc7QUFFckc7Ozs7Ozs7Ozs7Ozs7R0FhRztBQUNILEtBQUssVUFBVSxjQUFjLENBQzNCLFNBQWMsRUFDZCxTQUFpQixFQUNqQixFQUFVLEVBQ1YsTUFBVztJQUVYLE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsaUNBQXlCLENBQUMsS0FBSyxDQUFDLENBQUE7SUFFaEUsSUFBSSxDQUFDO1FBQ0gsSUFDRSxTQUFTLEtBQUssa0JBQWtCO1lBQ2hDLFNBQVMsS0FBSyxrQkFBa0I7WUFDaEMsU0FBUyxLQUFLLDJCQUEyQixFQUN6QyxDQUFDO1lBQ0QsOERBQThEO1lBQzlELDBEQUEwRDtZQUMxRCxtREFBbUQ7WUFDbkQsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLE1BQU0sS0FBSyxDQUFDLEtBQUssQ0FBQztnQkFDakMsTUFBTSxFQUFFLGFBQWE7Z0JBQ3JCLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxVQUFVLENBQUM7Z0JBQzFCLE9BQU8sRUFBRSxFQUFFLEVBQUUsRUFBRTthQUNoQixDQUFDLENBQUE7WUFDRixNQUFNLE9BQU8sR0FBRyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFBO1lBQ3BDLElBQUksT0FBTztnQkFBRSxPQUFPLE9BQU8sQ0FBQTtZQUMzQiwyREFBMkQ7WUFDM0Qsc0NBQXNDO1FBQ3hDLENBQUM7UUFFRCxJQUFJLFNBQVMsS0FBSyxrQkFBa0IsRUFBRSxDQUFDO1lBQ3JDLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxNQUFNLEtBQUssQ0FBQyxLQUFLLENBQUM7Z0JBQ2pDLE1BQU0sRUFB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