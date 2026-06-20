"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = contactNotificationHandler;
const utils_1 = require("@medusajs/framework/utils");
const theme_from_settings_1 = require("../modules/email-notifications/util/theme-from-settings");
/**
 * Contact form notification subscriber.
 *
 * Listens to the custom `contact.created` event (emitted by the store
 * contact API route) and sends an admin alert email with the submission.
 */
async function contactNotificationHandler({ event, container, }) {
    const logger = container.resolve("logger");
    try {
        const notificationService = container.resolve(utils_1.Modules.NOTIFICATION);
        // Fetch site settings for branding + admin email.
        // Module is registered as `site_settings` (underscore) — see
        // `src/modules/site-settings/index.ts`. The hyphenated lookup used
        // here previously was silently swallowed and `adminEmail` always
        // fell back to `SMTP_FROM`, so admin alerts effectively went to the
        // sender mailbox instead of the configured contact address.
        let settings = {};
        try {
            const settingsModule = container.resolve("site_settings");
            if (settingsModule?.getAll) {
                settings = await settingsModule.getAll();
            }
        }
        catch (e) {
            const logger = container.resolve("logger");
            logger?.warn?.(`[ContactNotification] site_settings resolve failed (${e?.message}) — using env defaults`);
        }
        const adminEmail = settings.contact_email || process.env.SMTP_FROM || "";
        if (!adminEmail) {
            logger.warn("[ContactNotification] No admin email configured — skipping.");
            return;
        }
        const contactData = event.data;
        await notificationService.createNotifications({
            to: adminEmail,
            channel: "email",
            template: "contact-received",
            data: {
                store_name: settings.site_name ||
                    process.env.STORE_NAME ||
                    process.env.MEDUSA_STORE_NAME ||
                    "Welcome",
                logo_url: settings.site_logo_url || undefined,
                copyright: settings.footer_copyright || undefined,
                theme: (0, theme_from_settings_1.buildEmailThemeFromSettings)(settings),
                name: contactData.name,
                email: contactData.email,
                phone: contactData.phone || "",
                subject: contactData.subject || "No Subject",
                message: contactData.message,
            },
        });
        logger.info(`[ContactNotification] Sent contact alert to ${adminEmail} for submission from ${contactData.email}`);
    }
    catch (err) {
        logger.error("[ContactNotification] Failed:", err);
    }
}
exports.config = {
    event: "contact.created",
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGFjdC1ub3RpZmljYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc3Vic2NyaWJlcnMvY29udGFjdC1ub3RpZmljYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBVUEsNkNBb0VDO0FBN0VELHFEQUFtRDtBQUNuRCxpR0FBcUc7QUFFckc7Ozs7O0dBS0c7QUFDWSxLQUFLLFVBQVUsMEJBQTBCLENBQUMsRUFDdkQsS0FBSyxFQUNMLFNBQVMsR0FPVDtJQUNBLE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUE7SUFFMUMsSUFBSSxDQUFDO1FBQ0gsTUFBTSxtQkFBbUIsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLGVBQU8sQ0FBQyxZQUFZLENBQVEsQ0FBQTtRQUUxRSxrREFBa0Q7UUFDbEQsNkRBQTZEO1FBQzdELG1FQUFtRTtRQUNuRSxpRUFBaUU7UUFDakUsb0VBQW9FO1FBQ3BFLDREQUE0RDtRQUM1RCxJQUFJLFFBQVEsR0FBMkIsRUFBRSxDQUFBO1FBQ3pDLElBQUksQ0FBQztZQUNILE1BQU0sY0FBYyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFRLENBQUE7WUFDaEUsSUFBSSxjQUFjLEVBQUUsTUFBTSxFQUFFLENBQUM7Z0JBQzNCLFFBQVEsR0FBRyxNQUFNLGNBQWMsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtZQUMxQyxDQUFDO1FBQ0gsQ0FBQztRQUFDLE9BQU8sQ0FBTSxFQUFFLENBQUM7WUFDaEIsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtZQUMxQyxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQ1osdURBQXVELENBQUMsRUFBRSxPQUFPLHdCQUF3QixDQUMxRixDQUFBO1FBQ0gsQ0FBQztRQUVELE1BQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFhLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLElBQUksRUFBRSxDQUFBO1FBQ3hFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLDZEQUE2RCxDQUFDLENBQUE7WUFDMUUsT0FBTTtRQUNSLENBQUM7UUFFRCxNQUFNLFdBQVcsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFBO1FBQzlCLE1BQU0sbUJBQW1CLENBQUMsbUJBQW1CLENBQUM7WUFDNUMsRUFBRSxFQUFFLFVBQVU7WUFDZCxPQUFPLEVBQUUsT0FBTztZQUNoQixRQUFRLEVBQUUsa0JBQWtCO1lBQzVCLElBQUksRUFBRTtnQkFDSixVQUFVLEVBQ1IsUUFBUSxDQUFDLFNBQVM7b0JBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVTtvQkFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUI7b0JBQzdCLFNBQVM7Z0JBQ1gsUUFBUSxFQUFFLFFBQVEsQ0FBQyxhQUFhLElBQUksU0FBUztnQkFDN0MsU0FBUyxFQUFFLFFBQVEsQ0FBQyxnQkFBZ0IsSUFBSSxTQUFTO2dCQUNqRCxLQUFLLEVBQUUsSUFBQSxpREFBMkIsRUFBQyxRQUFRLENBQUM7Z0JBQzVDLElBQUksRUFBRSxXQUFXLENBQUMsSUFBSTtnQkFDdEIsS0FBSyxFQUFFLFdBQVcsQ0FBQyxLQUFLO2dCQUN4QixLQUFLLEVBQUUsV0FBVyxDQUFDLEtBQUssSUFBSSxFQUFFO2dCQUM5QixPQUFPLEVBQUUsV0FBVyxDQUFDLE9BQU8sSUFBSSxZQUFZO2dCQUM1QyxPQUFPLEVBQUUsV0FBVyxDQUFDLE9BQU87YUFDN0I7U0FDRixDQUFDLENBQUE7UUFFRixNQUFNLENBQUMsSUFBSSxDQUNULCtDQUErQyxVQUFVLHdCQUF3QixXQUFXLENBQUMsS0FBSyxFQUFFLENBQ3JHLENBQUE7SUFDSCxDQUFDO0lBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNiLE1BQU0sQ0FBQyxLQUFLLENBQUMsK0JBQStCLEVBQUUsR0FBRyxDQUFDLENBQUE7SUFDcEQsQ0FBQztBQUNILENBQUM7QUFFWSxRQUFBLE1BQU0sR0FBcUI7SUFDdEMsS0FBSyxFQUFFLGlCQUFpQjtDQUN6QixDQUFBIn0=