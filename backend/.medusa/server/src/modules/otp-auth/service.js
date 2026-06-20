"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@medusajs/framework/utils");
const otp_code_1 = __importDefault(require("./models/otp-code"));
const crypto_1 = __importDefault(require("crypto"));
/**
 * OTP Auth Module Service
 *
 * Handles:
 *   - Generating 6-digit OTP codes
 *   - Verifying codes with rate limiting (max 5 attempts)
 *   - Auto-expiration (10 minutes)
 *   - Invalidating old codes for same email+purpose
 */
class OtpAuthModuleService extends (0, utils_1.MedusaService)({
    OtpCode: otp_code_1.default,
}) {
    /**
     * Generate a new 6-digit OTP for the given email and purpose.
     * Invalidates any previous unused codes for the same email+purpose.
     */
    async generateOtp(email, purpose) {
        // Invalidate old codes for same email+purpose
        const existingCodes = await this.listOtpCodes({
            email,
            purpose,
            verified: false,
        });
        for (const old of existingCodes) {
            await this.deleteOtpCodes(old.id);
        }
        // Generate 6-digit OTP
        const code = crypto_1.default.randomInt(100000, 999999).toString();
        // Expires in 10 minutes
        const expires_at = new Date(Date.now() + 10 * 60 * 1000);
        await this.createOtpCodes({
            email,
            code,
            purpose,
            attempts: 0,
            expires_at,
            verified: false,
        });
        return { code, expires_at };
    }
    /**
     * Verify an OTP code.
     *
     * Returns true if the code is valid.
     * Throws MedusaError if:
     *   - Code not found or expired
     *   - Already verified
     *   - Too many attempts (max 5)
     *   - Code mismatch
     */
    async verifyOtp(email, code, purpose) {
        const codes = await this.listOtpCodes({
            email,
            purpose,
            verified: false,
        });
        if (codes.length === 0) {
            throw new utils_1.MedusaError(utils_1.MedusaError.Types.NOT_FOUND, "No OTP code found. Please request a new code.");
        }
        const otpRecord = codes[codes.length - 1]; // Get the latest one
        // Check expiration
        if (new Date(otpRecord.expires_at) < new Date()) {
            await this.deleteOtpCodes(otpRecord.id);
            throw new utils_1.MedusaError(utils_1.MedusaError.Types.NOT_ALLOWED, "OTP code has expired. Please request a new code.");
        }
        // Check rate limiting
        if (otpRecord.attempts >= 5) {
            await this.deleteOtpCodes(otpRecord.id);
            throw new utils_1.MedusaError(utils_1.MedusaError.Types.NOT_ALLOWED, "Too many failed attempts. Please request a new code.");
        }
        // Verify code
        if (otpRecord.code !== code) {
            await this.updateOtpCodes({
                id: otpRecord.id,
                attempts: otpRecord.attempts + 1,
            });
            throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, `Invalid OTP code. ${4 - otpRecord.attempts} attempts remaining.`);
        }
        // Mark as verified
        await this.updateOtpCodes({
            id: otpRecord.id,
            verified: true,
        });
        return true;
    }
}
exports.default = OtpAuthModuleService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL290cC1hdXRoL3NlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxxREFBc0U7QUFDdEUsaUVBQXVDO0FBQ3ZDLG9EQUEyQjtBQUUzQjs7Ozs7Ozs7R0FRRztBQUNILE1BQU0sb0JBQXFCLFNBQVEsSUFBQSxxQkFBYSxFQUFDO0lBQy9DLE9BQU8sRUFBUCxrQkFBTztDQUNSLENBQUM7SUFDQTs7O09BR0c7SUFDSCxLQUFLLENBQUMsV0FBVyxDQUNmLEtBQWEsRUFDYixPQUFxRDtRQUVyRCw4Q0FBOEM7UUFDOUMsTUFBTSxhQUFhLEdBQUcsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQzVDLEtBQUs7WUFDTCxPQUFPO1lBQ1AsUUFBUSxFQUFFLEtBQUs7U0FDaEIsQ0FBQyxDQUFBO1FBRUYsS0FBSyxNQUFNLEdBQUcsSUFBSSxhQUFhLEVBQUUsQ0FBQztZQUNoQyxNQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQ25DLENBQUM7UUFFRCx1QkFBdUI7UUFDdkIsTUFBTSxJQUFJLEdBQUcsZ0JBQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFBO1FBRXhELHdCQUF3QjtRQUN4QixNQUFNLFVBQVUsR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQTtRQUV4RCxNQUFNLElBQUksQ0FBQyxjQUFjLENBQUM7WUFDeEIsS0FBSztZQUNMLElBQUk7WUFDSixPQUFPO1lBQ1AsUUFBUSxFQUFFLENBQUM7WUFDWCxVQUFVO1lBQ1YsUUFBUSxFQUFFLEtBQUs7U0FDaEIsQ0FBQyxDQUFBO1FBRUYsT0FBTyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FBQTtJQUM3QixDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsS0FBSyxDQUFDLFNBQVMsQ0FDYixLQUFhLEVBQ2IsSUFBWSxFQUNaLE9BQXFEO1FBRXJELE1BQU0sS0FBSyxHQUFHLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQztZQUNwQyxLQUFLO1lBQ0wsT0FBTztZQUNQLFFBQVEsRUFBRSxLQUFLO1NBQ2hCLENBQUMsQ0FBQTtRQUVGLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUUsQ0FBQztZQUN2QixNQUFNLElBQUksbUJBQVcsQ0FDbkIsbUJBQVcsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUMzQiwrQ0FBK0MsQ0FDaEQsQ0FBQTtRQUNILENBQUM7UUFFRCxNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQSxDQUFDLHFCQUFxQjtRQUUvRCxtQkFBbUI7UUFDbkIsSUFBSSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEdBQUcsSUFBSSxJQUFJLEVBQUUsRUFBRSxDQUFDO1lBQ2hELE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUE7WUFDdkMsTUFBTSxJQUFJLG1CQUFXLENBQ25CLG1CQUFXLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFDN0Isa0RBQWtELENBQ25ELENBQUE7UUFDSCxDQUFDO1FBRUQsc0JBQXNCO1FBQ3RCLElBQUksU0FBUyxDQUFDLFFBQVEsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUM1QixNQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1lBQ3ZDLE1BQU0sSUFBSSxtQkFBVyxDQUNuQixtQkFBVyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQzdCLHNEQUFzRCxDQUN2RCxDQUFBO1FBQ0gsQ0FBQztRQUVELGNBQWM7UUFDZCxJQUFJLFNBQVMsQ0FBQyxJQUFJLEtBQUssSUFBSSxFQUFFLENBQUM7WUFDNUIsTUFBTSxJQUFJLENBQUMsY0FBYyxDQUFDO2dCQUN4QixFQUFFLEVBQUUsU0FBUyxDQUFDLEVBQUU7Z0JBQ2hCLFFBQVEsRUFBRSxTQUFTLENBQUMsUUFBUSxHQUFHLENBQUM7YUFDakMsQ0FBQyxDQUFBO1lBQ0YsTUFBTSxJQUFJLG1CQUFXLENBQ25CLG1CQUFXLENBQUMsS0FBSyxDQUFDLFlBQVksRUFDOUIscUJBQXFCLENBQUMsR0FBRyxTQUFTLENBQUMsUUFBUSxzQkFBc0IsQ0FDbEUsQ0FBQTtRQUNILENBQUM7UUFFRCxtQkFBbUI7UUFDbkIsTUFBTSxJQUFJLENBQUMsY0FBYyxDQUFDO1lBQ3hCLEVBQUUsRUFBRSxTQUFTLENBQUMsRUFBRTtZQUNoQixRQUFRLEVBQUUsSUFBSTtTQUNmLENBQUMsQ0FBQTtRQUVGLE9BQU8sSUFBSSxDQUFBO0lBQ2IsQ0FBQztDQUNGO0FBRUQsa0JBQWUsb0JBQW9CLENBQUEifQ==