"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = void 0;
const otp_auth_1 = require("../../../../../modules/otp-auth");
const utils_1 = require("@medusajs/framework/utils");
const theme_from_settings_1 = require("../../../../../modules/email-notifications/util/theme-from-settings");
/**
 * POST /store/auth/otp/send
 *
 * Generates and sends a 6-digit OTP code to the provided email.
 *
 * Body: { email: string, purpose: "signup" | "password_reset" | "email_verify" }
 */
const POST = async (req, res) => {
    const { email, purpose } = req.body;
    if (!email || !purpose) {
        return res.status(400).json({
            message: "Email and purpose are required.",
        });
    }
    const otpService = req.scope.resolve(otp_auth_1.OTP_AUTH_MODULE);
    try {
        const { code, expires_at } = await otpService.generateOtp(email, purpose);
        // Send OTP via email notification
        const notificationService = req.scope.resolve(utils_1.Modules.NOTIFICATION);
        const subjectMap = {
            signup: "Verify your email address",
            password_reset: "Reset your password",
            email_verify: "Email verification code",
        };
        // Pull branding from site settings so the email reflects current admin config.
        // NOTE: the module is registered as `site_settings` (underscore). The old
        // hyphenated `"site-settings"` threw and was swallowed by the catch, so OTP
        // / password-reset emails always went out with DEFAULT branding + theme
        // (store name "Welcome", no logo, no colours). This was the root cause of
        // "OTP emails don't follow site settings".
        let settings = {};
        try {
            const settingsModule = req.scope.resolve("site_settings");
            if (settingsModule?.getAll) {
                settings = await settingsModule.getAll();
            }
        }
        catch {
            // Site settings module unavailable — fall back to defaults inside template
        }
        // Resolve store name with a sane fallback ladder. The literal
        // "Store" used to leak through when neither admin nor env was
        // configured — that's what made earlier OTP emails feel generic.
        const storeName = settings.site_name ||
            process.env.STORE_NAME ||
            process.env.MEDUSA_STORE_NAME ||
            "Welcome";
        // Prefix the subject with the store name so the inbox preview
        // immediately tells the recipient who the email is from, e.g.
        // "Acme Pharmacy · Verify your email address".
        const baseSubject = subjectMap[purpose] || "Your verification code";
        const subject = `${storeName} · ${baseSubject}`;
        await notificationService.createNotifications({
            to: email,
            channel: "email",
            template: "otp-verification",
            data: {
                otp_code: code,
                purpose,
                subject,
                expires_minutes: 10,
                store_name: storeName,
                logo_url: settings.site_logo_url || undefined,
                copyright: settings.footer_copyright || undefined,
                theme: (0, theme_from_settings_1.buildEmailThemeFromSettings)(settings),
            },
        });
        return res.json({
            success: true,
            message: "OTP code sent to your email.",
            expires_at,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message || "Failed to send OTP.",
        });
    }
};
exports.POST = POST;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL2F1dGgvb3RwL3NlbmQvcm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsOERBQWlFO0FBQ2pFLHFEQUE4RTtBQUM5RSw2R0FBaUg7QUFFakg7Ozs7OztHQU1HO0FBQ0ksTUFBTSxJQUFJLEdBQUcsS0FBSyxFQUFFLEdBQWtCLEVBQUUsR0FBbUIsRUFBRSxFQUFFO0lBQ3BFLE1BQU0sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEdBQUcsR0FBRyxDQUFDLElBRzlCLENBQUE7SUFFRCxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDdkIsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUMxQixPQUFPLEVBQUUsaUNBQWlDO1NBQzNDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFRCxNQUFNLFVBQVUsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQywwQkFBZSxDQUFRLENBQUE7SUFFNUQsSUFBSSxDQUFDO1FBQ0gsTUFBTSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsR0FBRyxNQUFNLFVBQVUsQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFBO1FBRXpFLGtDQUFrQztRQUNsQyxNQUFNLG1CQUFtQixHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGVBQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQTtRQUVuRSxNQUFNLFVBQVUsR0FBMkI7WUFDekMsTUFBTSxFQUFFLDJCQUEyQjtZQUNuQyxjQUFjLEVBQUUscUJBQXFCO1lBQ3JDLFlBQVksRUFBRSx5QkFBeUI7U0FDeEMsQ0FBQTtRQUVELCtFQUErRTtRQUMvRSwwRUFBMEU7UUFDMUUsNEVBQTRFO1FBQzVFLHdFQUF3RTtRQUN4RSwwRUFBMEU7UUFDMUUsMkNBQTJDO1FBQzNDLElBQUksUUFBUSxHQUEyQixFQUFFLENBQUE7UUFDekMsSUFBSSxDQUFDO1lBQ0gsTUFBTSxjQUFjLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFRLENBQUE7WUFDaEUsSUFBSSxjQUFjLEVBQUUsTUFBTSxFQUFFLENBQUM7Z0JBQzNCLFFBQVEsR0FBRyxNQUFNLGNBQWMsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtZQUMxQyxDQUFDO1FBQ0gsQ0FBQztRQUFDLE1BQU0sQ0FBQztZQUNQLDJFQUEyRTtRQUM3RSxDQUFDO1FBRUQsOERBQThEO1FBQzlELDhEQUE4RDtRQUM5RCxpRUFBaUU7UUFDakUsTUFBTSxTQUFTLEdBQ2IsUUFBUSxDQUFDLFNBQVM7WUFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVO1lBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCO1lBQzdCLFNBQVMsQ0FBQTtRQUVYLDhEQUE4RDtRQUM5RCw4REFBOEQ7UUFDOUQsK0NBQStDO1FBQy9DLE1BQU0sV0FBVyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSx3QkFBd0IsQ0FBQTtRQUNuRSxNQUFNLE9BQU8sR0FBRyxHQUFHLFNBQVMsTUFBTSxXQUFXLEVBQUUsQ0FBQTtRQUUvQyxNQUFPLG1CQUEyQixDQUFDLG1CQUFtQixDQUFDO1lBQ3JELEVBQUUsRUFBRSxLQUFLO1lBQ1QsT0FBTyxFQUFFLE9BQU87WUFDaEIsUUFBUSxFQUFFLGtCQUFrQjtZQUM1QixJQUFJLEVBQUU7Z0JBQ0osUUFBUSxFQUFFLElBQUk7Z0JBQ2QsT0FBTztnQkFDUCxPQUFPO2dCQUNQLGVBQWUsRUFBRSxFQUFFO2dCQUNuQixVQUFVLEVBQUUsU0FBUztnQkFDckIsUUFBUSxFQUFFLFFBQVEsQ0FBQyxhQUFhLElBQUksU0FBUztnQkFDN0MsU0FBUyxFQUFFLFFBQVEsQ0FBQyxnQkFBZ0IsSUFBSSxTQUFTO2dCQUNqRCxLQUFLLEVBQUUsSUFBQSxpREFBMkIsRUFBQyxRQUFRLENBQUM7YUFDN0M7U0FDRixDQUFDLENBQUE7UUFFRixPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUM7WUFDZCxPQUFPLEVBQUUsSUFBSTtZQUNiLE9BQU8sRUFBRSw4QkFBOEI7WUFDdkMsVUFBVTtTQUNYLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFBQyxPQUFPLEtBQVUsRUFBRSxDQUFDO1FBQ3BCLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDMUIsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPLElBQUkscUJBQXFCO1NBQ2hELENBQUMsQ0FBQTtJQUNKLENBQUM7QUFDSCxDQUFDLENBQUE7QUFuRlksUUFBQSxJQUFJLFFBbUZoQiJ9