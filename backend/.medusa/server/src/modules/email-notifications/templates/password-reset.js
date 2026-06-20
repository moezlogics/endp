"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildPasswordResetEmail = buildPasswordResetEmail;
const base_1 = require("./base");
/**
 * Password Reset Email Template
 *
 * Sent when a user requests a password reset via OTP.
 */
function buildPasswordResetEmail(data) {
    const resetUrl = data.reset_url || "#";
    const firstName = data.first_name || "there";
    const storeName = data.store_name ||
        process.env.STORE_NAME ||
        process.env.MEDUSA_STORE_NAME ||
        "Welcome";
    const logoUrl = data.logo_url;
    const copyright = data.copyright;
    const theme = data.theme || undefined;
    const body = `
    <h2 style="margin:0 0 16px;font-size:22px;font-weight:700;color:#111827;">
      Password Reset Request
    </h2>
    <p style="margin:0 0 20px;font-size:15px;color:#4b5563;line-height:1.6;">
      Hi ${firstName}, we received a request to reset your password. Click the button below to set a new password.
    </p>

    <div style="text-align:center;margin:24px 0;">
      <a href="${resetUrl}" style="display:inline-block;background:linear-gradient(135deg,#ef4444 0%,#dc2626 100%);color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:8px;font-weight:600;font-size:15px;">
        Reset My Password
      </a>
    </div>

    <p style="margin:16px 0;font-size:13px;color:#9ca3af;text-align:center;">
      This link will expire in 30 minutes.
    </p>

    <div style="margin-top:24px;padding:16px;background:#fef2f2;border-radius:8px;border-left:4px solid #ef4444;">
      <p style="margin:0;font-size:13px;color:#991b1b;">
        🔒 If you didn't request this password reset, please ignore this email. Your password will remain unchanged.
      </p>
    </div>
  `;
    return {
        subject: "Password Reset Request",
        html: (0, base_1.baseLayout)({
            storeName,
            logoUrl,
            copyright,
            theme,
            body,
        }),
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFzc3dvcmQtcmVzZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9lbWFpbC1ub3RpZmljYXRpb25zL3RlbXBsYXRlcy9wYXNzd29yZC1yZXNldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQU9BLDBEQWtEQztBQXpERCxpQ0FBb0Q7QUFFcEQ7Ozs7R0FJRztBQUNILFNBQWdCLHVCQUF1QixDQUFDLElBQTZCO0lBSW5FLE1BQU0sUUFBUSxHQUFJLElBQUksQ0FBQyxTQUFvQixJQUFJLEdBQUcsQ0FBQTtJQUNsRCxNQUFNLFNBQVMsR0FBSSxJQUFJLENBQUMsVUFBcUIsSUFBSSxPQUFPLENBQUE7SUFDeEQsTUFBTSxTQUFTLEdBQ1osSUFBSSxDQUFDLFVBQXFCO1FBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVTtRQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQjtRQUM3QixTQUFTLENBQUE7SUFDWCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBOEIsQ0FBQTtJQUNuRCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBK0IsQ0FBQTtJQUN0RCxNQUFNLEtBQUssR0FBSSxJQUFJLENBQUMsS0FBZ0MsSUFBSSxTQUFTLENBQUE7SUFFakUsTUFBTSxJQUFJLEdBQUc7Ozs7O1dBS0osU0FBUzs7OztpQkFJSCxRQUFROzs7Ozs7Ozs7Ozs7OztHQWN0QixDQUFBO0lBRUQsT0FBTztRQUNMLE9BQU8sRUFBRSx3QkFBd0I7UUFDakMsSUFBSSxFQUFFLElBQUEsaUJBQVUsRUFBQztZQUNmLFNBQVM7WUFDVCxPQUFPO1lBQ1AsU0FBUztZQUNULEtBQUs7WUFDTCxJQUFJO1NBQ0wsQ0FBQztLQUNILENBQUE7QUFDSCxDQUFDIn0=