"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@medusajs/framework/utils");
const nodemailer_1 = __importDefault(require("nodemailer"));
const order_placed_1 = require("./templates/order-placed");
const order_placed_admin_1 = require("./templates/order-placed-admin");
const order_shipped_1 = require("./templates/order-shipped");
const order_canceled_1 = require("./templates/order-canceled");
const order_completed_1 = require("./templates/order-completed");
const contact_received_1 = require("./templates/contact-received");
const otp_verification_1 = require("./templates/otp-verification");
const welcome_1 = require("./templates/welcome");
const password_reset_1 = require("./templates/password-reset");
const abandoned_cart_1 = require("./templates/abandoned-cart");
/**
 * Custom SMTP Notification Provider for Medusa v2.
 *
 * Uses nodemailer with Gmail (or any SMTP) to send transactional emails.
 * Templates are branded with the storefront theme.
 *
 * Supported template keys:
 *   - order-placed           → Customer order confirmation
 *   - order-placed-admin     → Admin new-order alert
 *   - order-shipped          → Customer shipment notification
 *   - order-canceled         → Customer cancellation notice
 *   - order-completed        → Customer order-complete thank-you
 *   - contact-received       → Admin contact form alert
 *   - otp-verification       → OTP verification code
 *   - welcome                → New customer welcome email
 *   - password-reset         → Password reset instructions
 *   - abandoned-cart         → Abandoned cart reminder
 */
class SmtpNotificationService extends utils_1.AbstractNotificationProviderService {
    constructor(container, options) {
        super();
        const smtpOpts = {
            host: options.host || "smtp.gmail.com",
            port: Number(options.port) || 587,
            user: options.user || "",
            pass: options.pass || "",
            from: options.from || options.user || "",
        };
        this.fromAddress = smtpOpts.from;
        this.transporter = nodemailer_1.default.createTransport({
            host: smtpOpts.host,
            port: smtpOpts.port,
            secure: smtpOpts.port === 465,
            auth: {
                user: smtpOpts.user,
                pass: smtpOpts.pass,
            },
        });
    }
    async send(notification) {
        const templateMap = {
            "order-placed": order_placed_1.buildOrderPlacedEmail,
            "order-placed-admin": order_placed_admin_1.buildOrderPlacedAdminEmail,
            "order-shipped": order_shipped_1.buildOrderShippedEmail,
            "order-canceled": order_canceled_1.buildOrderCanceledEmail,
            "order-completed": order_completed_1.buildOrderCompletedEmail,
            "contact-received": contact_received_1.buildContactReceivedEmail,
            "otp-verification": otp_verification_1.buildOtpVerificationEmail,
            "welcome": welcome_1.buildWelcomeEmail,
            "password-reset": password_reset_1.buildPasswordResetEmail,
            "abandoned-cart": abandoned_cart_1.buildAbandonedCartEmail,
        };
        const builder = templateMap[notification.template];
        if (!builder) {
            console.warn(`[SmtpNotification] Unknown template "${notification.template}" — skipping.`);
            return { id: "skipped" };
        }
        const { subject, html } = builder(notification.data);
        // Compose a "Brand Name <noreply@…>" From header so the recipient
        // sees the brand in their inbox instead of a raw e-mail address
        // (or, on Gmail-to-Gmail, the sender's Google profile name —
        // which is what most users see when no display name is set).
        //
        // Priority order for the display name:
        //   1. `SMTP_FROM_NAME` env — explicit per-store override, wins
        //      even over the template data so multi-tenant deployments
        //      that share an SMTP account can each brand their own mail.
        //   2. `notification.data.store_name` — passed by callers from
        //      `site_settings.site_name`. Admin re-branding without a
        //      redeploy.
        //   3. `STORE_NAME` / `MEDUSA_STORE_NAME` env — legacy fallback.
        //   4. Local part of the SMTP from-address, title-cased — way
        //      better than the bare email and avoids the "Welcome"
        //      placeholder leaking into production inboxes.
        //
        // We also parse out any display name already baked into
        // `SMTP_FROM` (e.g. `SMTP_FROM='"My Brand" <a@b.com>'`) so we
        // don't double-wrap and produce a malformed header.
        const rawStoreName = typeof notification.data?.store_name === "string"
            ? notification.data.store_name.trim()
            : "";
        // Parse `"Display" <email>` shape if SMTP_FROM was set that way.
        const fromAddressMatch = this.fromAddress.match(/<([^>]+)>/);
        const bareEmail = fromAddressMatch
            ? fromAddressMatch[1].trim()
            : this.fromAddress.trim();
        const embeddedDisplayName = (() => {
            const m = this.fromAddress.match(/^\s*"?([^"<]+?)"?\s*</);
            return m ? m[1].trim() : "";
        })();
        const localPartFallback = (() => {
            const local = bareEmail.split("@")[0] || "";
            if (!local)
                return "";
            // Replace separators with spaces and title-case so
            // `abdul.moez_store` → `Abdul Moez Store`.
            return local
                .replace(/[._-]+/g, " ")
                .replace(/\s+/g, " ")
                .trim()
                .replace(/\b\w/g, (c) => c.toUpperCase());
        })();
        const displayName = process.env.SMTP_FROM_NAME?.trim() ||
            (rawStoreName && rawStoreName.toLowerCase() !== "welcome"
                ? rawStoreName
                : "") ||
            process.env.STORE_NAME?.trim() ||
            process.env.MEDUSA_STORE_NAME?.trim() ||
            embeddedDisplayName ||
            localPartFallback ||
            "";
        const fromHeader = displayName
            ? `"${displayName.replace(/"/g, '\\"')}" <${bareEmail}>`
            : bareEmail;
        try {
            const info = await this.transporter.sendMail({
                from: fromHeader,
                to: notification.to,
                subject,
                html,
            });
            return { id: info.messageId || "sent" };
        }
        catch (err) {
            console.error("[SmtpNotification] Send failed:", err);
            throw err;
        }
    }
}
SmtpNotificationService.identifier = "smtp-notification";
exports.default = SmtpNotificationService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2VtYWlsLW5vdGlmaWNhdGlvbnMvc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHFEQUErRTtBQUMvRSw0REFBbUM7QUFFbkMsMkRBQWdFO0FBQ2hFLHVFQUEyRTtBQUMzRSw2REFBa0U7QUFDbEUsK0RBQW9FO0FBQ3BFLGlFQUFzRTtBQUN0RSxtRUFBd0U7QUFDeEUsbUVBQXdFO0FBQ3hFLGlEQUF1RDtBQUN2RCwrREFBb0U7QUFDcEUsK0RBQW9FO0FBVXBFOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUNILE1BQXFCLHVCQUF3QixTQUFRLDJDQUFtQztJQU10RixZQUFZLFNBQWMsRUFBRSxPQUFZO1FBQ3RDLEtBQUssRUFBRSxDQUFBO1FBRVAsTUFBTSxRQUFRLEdBQWdCO1lBQzVCLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSSxJQUFJLGdCQUFnQjtZQUN0QyxJQUFJLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHO1lBQ2pDLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSSxJQUFJLEVBQUU7WUFDeEIsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJLElBQUksRUFBRTtZQUN4QixJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUksSUFBSSxPQUFPLENBQUMsSUFBSSxJQUFJLEVBQUU7U0FDekMsQ0FBQTtRQUVELElBQUksQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQTtRQUVoQyxJQUFJLENBQUMsV0FBVyxHQUFHLG9CQUFVLENBQUMsZUFBZSxDQUFDO1lBQzVDLElBQUksRUFBRSxRQUFRLENBQUMsSUFBSTtZQUNuQixJQUFJLEVBQUUsUUFBUSxDQUFDLElBQUk7WUFDbkIsTUFBTSxFQUFFLFFBQVEsQ0FBQyxJQUFJLEtBQUssR0FBRztZQUM3QixJQUFJLEVBQUU7Z0JBQ0os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