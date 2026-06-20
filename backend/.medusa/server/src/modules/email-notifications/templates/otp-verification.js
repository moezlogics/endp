"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildOtpVerificationEmail = buildOtpVerificationEmail;
const base_1 = require("./base");
/**
 * OTP Verification Email Template
 *
 * Used for: signup verification, password reset codes, email verification.
 *
 * Honours the admin-configured site theme — the OTP code box and
 * security stripe inherit `theme.primary` / `theme.accent` so the
 * email matches whatever palette is live on the storefront. Falls
 * back to the original Anvogue purple/amber when no theme tokens
 * are passed (e.g. legacy callers that haven't been updated yet).
 */
function buildOtpVerificationEmail(data) {
    const otpCode = data.otp_code || "------";
    const purpose = data.purpose || "email_verify";
    const expiresMinutes = data.expires_minutes || 10;
    const storeName = data.store_name ||
        process.env.STORE_NAME ||
        process.env.MEDUSA_STORE_NAME ||
        "Welcome";
    const logoUrl = data.logo_url;
    const copyright = data.copyright;
    const theme = data.theme || undefined;
    const t = (0, base_1.resolveTheme)(theme);
    const purposeText = {
        signup: "Complete Your Registration",
        password_reset: "Reset Your Password",
        email_verify: "Verify Your Email Address",
    };
    const purposeDescription = {
        signup: "Thank you for signing up! Use the code below to verify your email and complete your registration.",
        password_reset: "We received a request to reset your password. Use the code below to proceed.",
        email_verify: "Use the code below to verify your email address.",
    };
    const subject = data.subject ||
        purposeText[purpose] ||
        "Your Verification Code";
    const body = `
    <h2 style="margin:0 0 16px;font-size:22px;font-weight:700;color:#111827;">
      ${purposeText[purpose] || "Verification Code"}
    </h2>
    <p style="margin:0 0 24px;font-size:15px;color:#4b5563;line-height:1.6;">
      ${purposeDescription[purpose] || "Use the code below to verify your identity."}
    </p>

    <!-- OTP Code Box — gradient borrowed from the live site palette -->
    <div style="text-align:center;margin:24px 0;">
      <div style="display:inline-block;background:linear-gradient(135deg, ${t.primary} 0%, ${t.accent} 100%);padding:4px;border-radius:12px;">
        <div style="background:#ffffff;border-radius:10px;padding:20px 40px;">
          <span style="font-size:36px;font-weight:800;letter-spacing:12px;color:#1a1a1a;font-family:'Courier New',monospace;">
            ${otpCode}
          </span>
        </div>
      </div>
    </div>

    <p style="margin:24px 0 8px;font-size:13px;color:#9ca3af;text-align:center;">
      This code expires in <strong>${expiresMinutes} minutes</strong>.
    </p>
    <p style="margin:0 0 16px;font-size:13px;color:#9ca3af;text-align:center;">
      If you didn't request this code, you can safely ignore this email.
    </p>

    <!-- Security Notice -->
    <div style="margin-top:24px;padding:16px;background:#fef3c7;border-radius:8px;border-left:4px solid ${t.primary};">
      <p style="margin:0;font-size:13px;color:#92400e;">
        <strong>Security tip:</strong> Never share this code with anyone. Our team will never ask for your verification code.
      </p>
    </div>
  `;
    return {
        subject,
        html: (0, base_1.baseLayout)({
            storeName,
            logoUrl,
            copyright,
            theme,
            body,
        }),
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3RwLXZlcmlmaWNhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2VtYWlsLW5vdGlmaWNhdGlvbnMvdGVtcGxhdGVzL290cC12ZXJpZmljYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFhQSw4REFnRkM7QUE3RkQsaUNBQWtFO0FBRWxFOzs7Ozs7Ozs7O0dBVUc7QUFDSCxTQUFnQix5QkFBeUIsQ0FBQyxJQUE2QjtJQUlyRSxNQUFNLE9BQU8sR0FBSSxJQUFJLENBQUMsUUFBbUIsSUFBSSxRQUFRLENBQUE7SUFDckQsTUFBTSxPQUFPLEdBQUksSUFBSSxDQUFDLE9BQWtCLElBQUksY0FBYyxDQUFBO0lBQzFELE1BQU0sY0FBYyxHQUFJLElBQUksQ0FBQyxlQUEwQixJQUFJLEVBQUUsQ0FBQTtJQUM3RCxNQUFNLFNBQVMsR0FDWixJQUFJLENBQUMsVUFBcUI7UUFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVO1FBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCO1FBQzdCLFNBQVMsQ0FBQTtJQUNYLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxRQUE4QixDQUFBO0lBQ25ELE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxTQUErQixDQUFBO0lBQ3RELE1BQU0sS0FBSyxHQUFJLElBQUksQ0FBQyxLQUFnQyxJQUFJLFNBQVMsQ0FBQTtJQUNqRSxNQUFNLENBQUMsR0FBRyxJQUFBLG1CQUFZLEVBQUMsS0FBSyxDQUFDLENBQUE7SUFFN0IsTUFBTSxXQUFXLEdBQTJCO1FBQzFDLE1BQU0sRUFBRSw0QkFBNEI7UUFDcEMsY0FBYyxFQUFFLHFCQUFxQjtRQUNyQyxZQUFZLEVBQUUsMkJBQTJCO0tBQzFDLENBQUE7SUFFRCxNQUFNLGtCQUFrQixHQUEyQjtRQUNqRCxNQUFNLEVBQ0osbUdBQW1HO1FBQ3JHLGNBQWMsRUFDWiw4RUFBOEU7UUFDaEYsWUFBWSxFQUFFLGtEQUFrRDtLQUNqRSxDQUFBO0lBRUQsTUFBTSxPQUFPLEdBQ1YsSUFBSSxDQUFDLE9BQWtCO1FBQ3hCLFdBQVcsQ0FBQyxPQUFPLENBQUM7UUFDcEIsd0JBQXdCLENBQUE7SUFFMUIsTUFBTSxJQUFJLEdBQUc7O1FBRVAsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLG1CQUFtQjs7O1FBRzNDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxJQUFJLDZDQUE2Qzs7Ozs7NEVBS1IsQ0FBQyxDQUFDLE9BQU8sUUFBUSxDQUFDLENBQUMsTUFBTTs7O2NBR3ZGLE9BQU87Ozs7Ozs7cUNBT2dCLGNBQWM7Ozs7Ozs7MEdBT3VELENBQUMsQ0FBQyxPQUFPOzs7OztHQUtoSCxDQUFBO0lBRUQsT0FBTztRQUNMLE9BQU87UUFDUCxJQUFJLEVBQUUsSUFBQSxpQkFBVSxFQUFDO1lBQ2YsU0FBUztZQUNULE9BQU87WUFDUCxTQUFTO1lBQ1QsS0FBSztZQUNMLElBQUk7U0FDTCxDQUFDO0tBQ0gsQ0FBQTtBQUNILENBQUMifQ==