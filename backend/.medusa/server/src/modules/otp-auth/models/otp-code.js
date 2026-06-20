"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@medusajs/framework/utils");
/**
 * OTP Code model — stores 6-digit OTP codes for email verification.
 *
 * Fields:
 *   - email: The target email address
 *   - code: 6-digit OTP string
 *   - purpose: "signup" | "password_reset" | "email_verify"
 *   - attempts: Number of failed verification attempts (rate limiting)
 *   - expires_at: When this OTP expires
 *   - verified: Whether it has been successfully verified
 */
const OtpCode = utils_1.model.define("otp_code", {
    id: utils_1.model.id().primaryKey(),
    email: utils_1.model.text(),
    code: utils_1.model.text(),
    purpose: utils_1.model.enum(["signup", "password_reset", "email_verify"]),
    attempts: utils_1.model.number().default(0),
    expires_at: utils_1.model.dateTime(),
    verified: utils_1.model.boolean().default(false),
});
exports.default = OtpCode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3RwLWNvZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9vdHAtYXV0aC9tb2RlbHMvb3RwLWNvZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxREFBaUQ7QUFFakQ7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQU0sT0FBTyxHQUFHLGFBQUssQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFO0lBQ3ZDLEVBQUUsRUFBRSxhQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsVUFBVSxFQUFFO0lBQzNCLEtBQUssRUFBRSxhQUFLLENBQUMsSUFBSSxFQUFFO0lBQ25CLElBQUksRUFBRSxhQUFLLENBQUMsSUFBSSxFQUFFO0lBQ2xCLE9BQU8sRUFBRSxhQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFLGdCQUFnQixFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBQ2pFLFFBQVEsRUFBRSxhQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNuQyxVQUFVLEVBQUUsYUFBSyxDQUFDLFFBQVEsRUFBRTtJQUM1QixRQUFRLEVBQUUsYUFBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7Q0FDekMsQ0FBQyxDQUFBO0FBRUYsa0JBQWUsT0FBTyxDQUFBIn0=