"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = void 0;
const otp_auth_1 = require("../../../../../modules/otp-auth");
/**
 * POST /store/auth/otp/verify
 *
 * Verifies a 6-digit OTP code.
 *
 * Body: { email: string, code: string, purpose: "signup" | "password_reset" | "email_verify" }
 */
const POST = async (req, res) => {
    const { email, code, purpose } = req.body;
    if (!email || !code || !purpose) {
        return res.status(400).json({
            message: "Email, code, and purpose are required.",
        });
    }
    const otpService = req.scope.resolve(otp_auth_1.OTP_AUTH_MODULE);
    try {
        const verified = await otpService.verifyOtp(email, code, purpose);
        return res.json({
            success: true,
            verified,
            message: "OTP verified successfully.",
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            verified: false,
            message: error.message || "OTP verification failed.",
        });
    }
};
exports.POST = POST;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL2F1dGgvb3RwL3ZlcmlmeS9yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSw4REFBaUU7QUFFakU7Ozs7OztHQU1HO0FBQ0ksTUFBTSxJQUFJLEdBQUcsS0FBSyxFQUFFLEdBQWtCLEVBQUUsR0FBbUIsRUFBRSxFQUFFO0lBQ3BFLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxHQUFHLEdBQUcsQ0FBQyxJQUlwQyxDQUFBO0lBRUQsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2hDLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDMUIsT0FBTyxFQUFFLHdDQUF3QztTQUNsRCxDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsTUFBTSxVQUFVLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsMEJBQWUsQ0FBUSxDQUFBO0lBRTVELElBQUksQ0FBQztRQUNILE1BQU0sUUFBUSxHQUFHLE1BQU0sVUFBVSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFBO1FBRWpFLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQztZQUNkLE9BQU8sRUFBRSxJQUFJO1lBQ2IsUUFBUTtZQUNSLE9BQU8sRUFBRSw0QkFBNEI7U0FDdEMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUFDLE9BQU8sS0FBVSxFQUFFLENBQUM7UUFDcEIsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUMxQixPQUFPLEVBQUUsS0FBSztZQUNkLFFBQVEsRUFBRSxLQUFLO1lBQ2YsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPLElBQUksMEJBQTBCO1NBQ3JELENBQUMsQ0FBQTtJQUNKLENBQUM7QUFDSCxDQUFDLENBQUE7QUE5QlksUUFBQSxJQUFJLFFBOEJoQiJ9