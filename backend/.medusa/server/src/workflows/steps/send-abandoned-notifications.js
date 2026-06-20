"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendAbandonedNotificationsStep = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const utils_1 = require("@medusajs/framework/utils");
const theme_from_settings_1 = require("../../modules/email-notifications/util/theme-from-settings");
/**
 * Step: Send abandoned cart email notifications.
 *
 * Uses our custom "abandoned-cart" SMTP template instead of SendGrid.
 */
exports.sendAbandonedNotificationsStep = (0, workflows_sdk_1.createStep)("send-abandoned-notifications", async (input, { container }) => {
    const notificationModuleService = container.resolve(utils_1.Modules.NOTIFICATION);
    // Pull branding from site settings; fall back to env / defaults.
    // Module is registered as `site_settings` (underscore). The old
    // hyphenated lookup threw and was swallowed, so abandoned-cart
    // emails went out unbranded/unthemed.
    let settings = {};
    try {
        const settingsModule = container.resolve("site_settings");
        if (settingsModule?.getAll) {
            settings = await settingsModule.getAll();
        }
    }
    catch {
        // Site settings module unavailable
    }
    const storeUrl = settings.store_url ||
        process.env.STORE_URL ||
        process.env.STORE_CORS?.split(",")[0] ||
        "http://localhost:3060";
    const storeName = settings.site_name ||
        process.env.STORE_NAME ||
        process.env.MEDUSA_STORE_NAME ||
        "Welcome";
    const logoUrl = settings.site_logo_url || undefined;
    const copyright = settings.footer_copyright || undefined;
    const theme = (0, theme_from_settings_1.buildEmailThemeFromSettings)(settings);
    const notificationData = input.carts.map((cart) => ({
        to: cart.email,
        channel: "email",
        template: "abandoned-cart",
        data: {
            first_name: cart.customer?.first_name || cart.shipping_address?.first_name || "there",
            store_name: storeName,
            logo_url: logoUrl,
            copyright,
            theme,
            cart_url: `${storeUrl}/cart`,
            items: cart.items?.map((item) => ({
                title: item.title,
                quantity: item.quantity,
                unit_price: item.unit_price,
                thumbnail: item.thumbnail,
            })) || [],
        }
    }));
    const notifications = await notificationModuleService.createNotifications(notificationData);
    return new workflows_sdk_1.StepResponse({
        notifications
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZC1hYmFuZG9uZWQtbm90aWZpY2F0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy93b3JrZmxvd3Mvc3RlcHMvc2VuZC1hYmFuZG9uZWQtbm90aWZpY2F0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxRUFHMEM7QUFDMUMscURBQW1EO0FBRW5ELG9HQUF3RztBQVF4Rzs7OztHQUlHO0FBQ1UsUUFBQSw4QkFBOEIsR0FBRyxJQUFBLDBCQUFVLEVBQ3RELDhCQUE4QixFQUM5QixLQUFLLEVBQUUsS0FBMEMsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUU7SUFDbEUsTUFBTSx5QkFBeUIsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUNqRCxlQUFPLENBQUMsWUFBWSxDQUNyQixDQUFBO0lBRUQsaUVBQWlFO0lBQ2pFLGdFQUFnRTtJQUNoRSwrREFBK0Q7SUFDL0Qsc0NBQXNDO0lBQ3RDLElBQUksUUFBUSxHQUEyQixFQUFFLENBQUE7SUFDekMsSUFBSSxDQUFDO1FBQ0gsTUFBTSxjQUFjLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQVEsQ0FBQTtRQUNoRSxJQUFJLGNBQWMsRUFBRSxNQUFNLEVBQUUsQ0FBQztZQUMzQixRQUFRLEdBQUcsTUFBTSxjQUFjLENBQUMsTUFBTSxFQUFFLENBQUE7UUFDMUMsQ0FBQztJQUNILENBQUM7SUFBQyxNQUFNLENBQUM7UUFDUCxtQ0FBbUM7SUFDckMsQ0FBQztJQUVELE1BQU0sUUFBUSxHQUNaLFFBQVEsQ0FBQyxTQUFTO1FBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUztRQUNyQixPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLHVCQUF1QixDQUFBO0lBQ3pCLE1BQU0sU0FBUyxHQUNiLFFBQVEsQ0FBQyxTQUFTO1FBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVTtRQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQjtRQUM3QixTQUFTLENBQUE7SUFDWCxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxJQUFJLFNBQVMsQ0FBQTtJQUNuRCxNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLElBQUksU0FBUyxDQUFBO0lBQ3hELE1BQU0sS0FBSyxHQUFHLElBQUEsaURBQTJCLEVBQUMsUUFBUSxDQUFDLENBQUE7SUFFbkQsTUFBTSxnQkFBZ0IsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNsRCxFQUFFLEVBQUUsSUFBSSxDQUFDLEtBQU07UUFDZixPQUFPLEVBQUUsT0FBTztRQUNoQixRQUFRLEVBQUUsZ0JBQWdCO1FBQzFCLElBQUksRUFBRTtZQUNKLFVBQVUsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLFVBQVUsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsVUFBVSxJQUFJLE9BQU87WUFDckYsVUFBVSxFQUFFLFNBQVM7WUFDckIsUUFBUSxFQUFFLE9BQU87WUFDakIsU0FBUztZQUNULEtBQUs7WUFDTCxRQUFRLEVBQUUsR0FBRyxRQUFRLE9BQU87WUFDNUIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUNoQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7Z0JBQ2pCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtnQkFDdkIsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVO2dCQUMzQixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7YUFDMUIsQ0FBQyxDQUFDLElBQUksRUFBRTtTQUNWO0tBQ0YsQ0FBQyxDQUFDLENBQUE7SUFFSCxNQUFNLGFBQWEsR0FBRyxNQUFNLHlCQUF5QixDQUFDLG1CQUFtQixDQUN2RSxnQkFBZ0IsQ0FDakIsQ0FBQTtJQUVELE9BQU8sSUFBSSw0QkFBWSxDQUFDO1FBQ3RCLGFBQWE7S0FDZCxDQUFDLENBQUE7QUFDSixDQUFDLENBQ0YsQ0FBQSJ9