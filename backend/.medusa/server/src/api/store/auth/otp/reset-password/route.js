"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = void 0;
const utils_1 = require("@medusajs/framework/utils");
const otp_auth_1 = require("../../../../../modules/otp-auth");
/**
 * POST /store/auth/otp/reset-password
 *
 * Final step of forgot-password flow. The caller must already have a
 * valid OTP for purpose="password_reset" — we re-verify here for safety,
 * which also marks the OTP as consumed so it can't be reused.
 *
 * Body: { email, code, new_password }
 *
 * Calls Medusa's auth module → emailpass provider → `update()` which
 * hashes the new password using the same scrypt config as registration.
 */
const POST = async (req, res) => {
    const { email, code, new_password } = (req.body || {});
    if (!email || !code || !new_password) {
        return res
            .status(400)
            .json({ message: "email, code and new_password are required" });
    }
    if (new_password.length < 6) {
        return res
            .status(400)
            .json({ message: "Password must be at least 6 characters" });
    }
    const otpService = req.scope.resolve(otp_auth_1.OTP_AUTH_MODULE);
    try {
        await otpService.verifyOtp(email, code, "password_reset");
    }
    catch (error) {
        return res
            .status(400)
            .json({ message: error?.message || "OTP verification failed" });
    }
    const authModule = req.scope.resolve(utils_1.Modules.AUTH);
    const result = await authModule.updateProvider("emailpass", {
        entity_id: email,
        password: new_password,
    });
    if (!result?.success) {
        return res.status(400).json({
            success: false,
            message: result?.error ||
                "Failed to update password — make sure an account exists with this email.",
        });
    }
    return res.json({ success: true, message: "Password updated successfully." });
};
exports.POST = POST;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL2F1dGgvb3RwL3Jlc2V0LXBhc3N3b3JkL3JvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHFEQUFtRDtBQUNuRCw4REFBaUU7QUFFakU7Ozs7Ozs7Ozs7O0dBV0c7QUFDSSxNQUFNLElBQUksR0FBRyxLQUFLLEVBQUUsR0FBa0IsRUFBRSxHQUFtQixFQUFFLEVBQUU7SUFDcEUsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FJcEQsQ0FBQTtJQUVELElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNyQyxPQUFPLEdBQUc7YUFDUCxNQUFNLENBQUMsR0FBRyxDQUFDO2FBQ1gsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLDJDQUEyQyxFQUFFLENBQUMsQ0FBQTtJQUNuRSxDQUFDO0lBQ0QsSUFBSSxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDO1FBQzVCLE9BQU8sR0FBRzthQUNQLE1BQU0sQ0FBQyxHQUFHLENBQUM7YUFDWCxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsd0NBQXdDLEVBQUUsQ0FBQyxDQUFBO0lBQ2hFLENBQUM7SUFFRCxNQUFNLFVBQVUsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQywwQkFBZSxDQUFRLENBQUE7SUFDNUQsSUFBSSxDQUFDO1FBQ0gsTUFBTSxVQUFVLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQTtJQUMzRCxDQUFDO0lBQUMsT0FBTyxLQUFVLEVBQUUsQ0FBQztRQUNwQixPQUFPLEdBQUc7YUFDUCxNQUFNLENBQUMsR0FBRyxDQUFDO2FBQ1gsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLElBQUkseUJBQXlCLEVBQUUsQ0FBQyxDQUFBO0lBQ25FLENBQUM7SUFFRCxNQUFNLFVBQVUsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxlQUFPLENBQUMsSUFBSSxDQUFRLENBQUE7SUFDekQsTUFBTSxNQUFNLEdBQUcsTUFBTSxVQUFVLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRTtRQUMxRCxTQUFTLEVBQUUsS0FBSztRQUNoQixRQUFRLEVBQUUsWUFBWTtLQUN2QixDQUFDLENBQUE7SUFFRixJQUFJLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxDQUFDO1FBQ3JCLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDMUIsT0FBTyxFQUFFLEtBQUs7WUFDZCxPQUFPLEVBQ0wsTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsMEVBQTBFO1NBQzdFLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFRCxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxDQUFDLENBQUE7QUFDL0UsQ0FBQyxDQUFBO0FBM0NZLFFBQUEsSUFBSSxRQTJDaEIifQ==