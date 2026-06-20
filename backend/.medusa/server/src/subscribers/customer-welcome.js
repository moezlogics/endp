"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = customerWelcomeHandler;
const utils_1 = require("@medusajs/framework/utils");
const theme_from_settings_1 = require("../modules/email-notifications/util/theme-from-settings");
/**
 * Welcome email subscriber.
 *
 * Fires on `customer.created` and sends the branded/themed `welcome`
 * email. Until now the `welcome` template existed but NOTHING ever
 * triggered it — so new shoppers never received a welcome message.
 *
 * Branding (store name, logo, copyright) and the palette (theme_*) come
 * from the site_settings module so the email always matches the admin's
 * current configuration without a redeploy.
 */
async function customerWelcomeHandler({ event, container, }) {
    const logger = container.resolve("logger");
    const customerId = event.data?.id;
    if (!customerId) {
        logger.warn("[CustomerWelcome] No customer id in event — skipping.");
        return;
    }
    try {
        const query = container.resolve(utils_1.ContainerRegistrationKeys.QUERY);
        const notificationService = container.resolve(utils_1.Modules.NOTIFICATION);
        const { data: [customer], } = await query.graph({
            entity: "customer",
            fields: ["id", "email", "first_name", "last_name", "has_account"],
            filters: { id: customerId },
        });
        if (!customer?.email) {
            logger.info(`[CustomerWelcome] Customer ${customerId} has no email — skipping.`);
            return;
        }
        // Only welcome real registered accounts, not the guest customer
        // records Medusa auto-creates for anonymous checkouts (those would
        // get an order-placed email instead).
        if (customer.has_account === false) {
            logger.info(`[CustomerWelcome] Customer ${customerId} is a guest (no account) — skipping welcome.`);
            return;
        }
        // Site settings → branding + theme (module key is `site_settings`).
        let settings = {};
        try {
            const settingsModule = container.resolve("site_settings");
            if (settingsModule?.getAll) {
                settings = await settingsModule.getAll();
            }
        }
        catch (e) {
            logger?.warn?.(`[CustomerWelcome] site_settings resolve failed (${e?.message}) — using defaults`);
        }
        const storeUrl = settings.store_url ||
            process.env.STORE_URL ||
            process.env.STOREFRONT_URL ||
            process.env.STORE_CORS?.split(",")[0] ||
            "#";
        await notificationService.createNotifications({
            to: customer.email,
            channel: "email",
            template: "welcome",
            data: {
                first_name: customer.first_name || "there",
                store_name: settings.site_name ||
                    process.env.STORE_NAME ||
                    process.env.MEDUSA_STORE_NAME ||
                    "our store",
                store_url: storeUrl,
                logo_url: settings.site_logo_url || undefined,
                copyright: settings.footer_copyright || undefined,
                theme: (0, theme_from_settings_1.buildEmailThemeFromSettings)(settings),
            },
        });
        logger.info(`[CustomerWelcome] Sent welcome email to ${customer.email}`);
    }
    catch (err) {
        logger.error(`[CustomerWelcome] FAILED customer=${customerId} message=${err?.message || err}`);
    }
}
exports.config = {
    event: "customer.created",
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItd2VsY29tZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zdWJzY3JpYmVycy9jdXN0b21lci13ZWxjb21lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQWVBLHlDQW9GQztBQWxHRCxxREFBOEU7QUFDOUUsaUdBQXFHO0FBRXJHOzs7Ozs7Ozs7O0dBVUc7QUFDWSxLQUFLLFVBQVUsc0JBQXNCLENBQUMsRUFDbkQsS0FBSyxFQUNMLFNBQVMsR0FDc0I7SUFDL0IsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUMxQyxNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQTtJQUNqQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQyx1REFBdUQsQ0FBQyxDQUFBO1FBQ3BFLE9BQU07SUFDUixDQUFDO0lBRUQsSUFBSSxDQUFDO1FBQ0gsTUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxpQ0FBeUIsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUNoRSxNQUFNLG1CQUFtQixHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsZUFBTyxDQUFDLFlBQVksQ0FBUSxDQUFBO1FBRTFFLE1BQU0sRUFDSixJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FDakIsR0FBRyxNQUFNLEtBQUssQ0FBQyxLQUFLLENBQUM7WUFDcEIsTUFBTSxFQUFFLFVBQVU7WUFDbEIsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLGFBQWEsQ0FBQztZQUNqRSxPQUFPLEVBQUUsRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFO1NBQzVCLENBQUMsQ0FBQTtRQUVGLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUM7WUFDckIsTUFBTSxDQUFDLElBQUksQ0FDVCw4QkFBOEIsVUFBVSwyQkFBMkIsQ0FDcEUsQ0FBQTtZQUNELE9BQU07UUFDUixDQUFDO1FBRUQsZ0VBQWdFO1FBQ2hFLG1FQUFtRTtRQUNuRSxzQ0FBc0M7UUFDdEMsSUFBSSxRQUFRLENBQUMsV0FBVyxLQUFLLEtBQUssRUFBRSxDQUFDO1lBQ25DLE1BQU0sQ0FBQyxJQUFJLENBQ1QsOEJBQThCLFVBQVUsOENBQThDLENBQ3ZGLENBQUE7WUFDRCxPQUFNO1FBQ1IsQ0FBQztRQUVELG9FQUFvRTtRQUNwRSxJQUFJLFFBQVEsR0FBMkIsRUFBRSxDQUFBO1FBQ3pDLElBQUksQ0FBQztZQUNILE1BQU0sY0FBYyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFRLENBQUE7WUFDaEUsSUFBSSxjQUFjLEVBQUUsTUFBTSxFQUFFLENBQUM7Z0JBQzNCLFFBQVEsR0FBRyxNQUFNLGNBQWMsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtZQUMxQyxDQUFDO1FBQ0gsQ0FBQztRQUFDLE9BQU8sQ0FBTSxFQUFFLENBQUM7WUFDaEIsTUFBTSxFQUFFLElBQUksRUFBRSxDQUNaLG1EQUFtRCxDQUFDLEVBQUUsT0FBTyxvQkFBb0IsQ0FDbEYsQ0FBQTtRQUNILENBQUM7UUFFRCxNQUFNLFFBQVEsR0FDWixRQUFRLENBQUMsU0FBUztZQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVM7WUFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjO1lBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckMsR0FBRyxDQUFBO1FBRUwsTUFBTSxtQkFBbUIsQ0FBQyxtQkFBbUIsQ0FBQztZQUM1QyxFQUFFLEVBQUUsUUFBUSxDQUFDLEtBQUs7WUFDbEIsT0FBTyxFQUFFLE9BQU87WUFDaEIsUUFBUSxFQUFFLFNBQVM7WUFDbkIsSUFBSSxFQUFFO2dCQUNKLFVBQVUsRUFBRSxRQUFRLENBQUMsVUFBVSxJQUFJLE9BQU87Z0JBQzFDLFVBQVUsRUFDUixRQUFRLENBQUMsU0FBUztvQkFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVO29CQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQjtvQkFDN0IsV0FBVztnQkFDYixTQUFTLEVBQUUsUUFBUTtnQkFDbkIsUUFBUSxFQUFFLFFBQVEsQ0FBQyxhQUFhLElBQUksU0FBUztnQkFDN0MsU0FBUyxFQUFFLFFBQVEsQ0FBQyxnQkFBZ0IsSUFBSSxTQUFTO2dCQUNqRCxLQUFLLEVBQUUsSUFBQSxpREFBMkIsRUFBQyxRQUFRLENBQUM7YUFDN0M7U0FDRixDQUFDLENBQUE7UUFFRixNQUFNLENBQUMsSUFBSSxDQUFDLDJDQUEyQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQTtJQUMxRSxDQUFDO0lBQUMsT0FBTyxHQUFRLEVBQUUsQ0FBQztRQUNsQixNQUFNLENBQUMsS0FBSyxDQUNWLHFDQUFxQyxVQUFVLFlBQVksR0FBRyxFQUFFLE9BQU8sSUFBSSxHQUFHLEVBQUUsQ0FDakYsQ0FBQTtJQUNILENBQUM7QUFDSCxDQUFDO0FBRVksUUFBQSxNQUFNLEdBQXFCO0lBQ3RDLEtBQUssRUFBRSxrQkFBa0I7Q0FDMUIsQ0FBQSJ9