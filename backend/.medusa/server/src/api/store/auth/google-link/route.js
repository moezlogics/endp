"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = void 0;
const utils_1 = require("@medusajs/framework/utils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * POST /store/auth/google-link
 *
 * Verifies a Google OAuth callback token, extracts the email, and links
 * the Google AuthIdentity to an existing Customer with the same email if found.
 */
const POST = async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(400).json({ message: "Authorization header with Bearer token is required" });
    }
    const token = authHeader.substring(7);
    const jwtSecret = process.env.JWT_SECRET || "15afa7452e440137afbb3e3c0d48e653ef91d3fe422ded68e60e5b71cc76f32c4a708f43367f5ff512e7a1dfcd392f13";
    let decoded;
    try {
        decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
    }
    catch (error) {
        return res.status(401).json({ message: "Invalid or expired token", error: error?.message });
    }
    const authIdentityId = decoded.auth_identity_id;
    if (!authIdentityId) {
        return res.status(400).json({ message: "Token does not contain auth_identity_id" });
    }
    const userMeta = decoded.user_metadata || {};
    const appMeta = decoded.app_metadata || {};
    const googleMeta = appMeta.google || {};
    const email = userMeta.email ||
        googleMeta.email ||
        decoded.email ||
        appMeta.email ||
        null;
    if (!email) {
        return res.status(400).json({ message: "Token does not contain an email address" });
    }
    const customerModuleService = req.scope.resolve(utils_1.Modules.CUSTOMER);
    const customers = await customerModuleService.listCustomers({ email });
    if (customers.length === 0) {
        return res.json({ linked: false, message: "No customer exists with this email address" });
    }
    const customer = customers[0];
    // Link the auth identity to the existing customer
    const authModuleService = req.scope.resolve(utils_1.Modules.AUTH);
    const link = req.scope.resolve(utils_1.ContainerRegistrationKeys.LINK);
    // Update app_metadata with customer_id
    await authModuleService.updateAuthIdentities([
        {
            id: authIdentityId,
            app_metadata: {
                customer_id: customer.id,
            },
        },
    ]);
    // Create remote link between AuthIdentity and Customer
    try {
        await link.create({
            [utils_1.Modules.AUTH]: {
                auth_identity_id: authIdentityId,
            },
            [utils_1.Modules.CUSTOMER]: {
                customer_id: customer.id,
            },
        });
    }
    catch (linkError) {
        // Already linked or unique constraint, safe to ignore
    }
    return res.json({ linked: true, customer_id: customer.id });
};
exports.POST = POST;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL2F1dGgvZ29vZ2xlLWxpbmsvcm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EscURBQThFO0FBQzlFLGdFQUE4QjtBQUU5Qjs7Ozs7R0FLRztBQUNJLE1BQU0sSUFBSSxHQUFHLEtBQUssRUFBRSxHQUFrQixFQUFFLEdBQW1CLEVBQUUsRUFBRTtJQUNwRSxNQUFNLFVBQVUsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQTtJQUM1QyxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDO1FBQ3JELE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsb0RBQW9ELEVBQUUsQ0FBQyxDQUFBO0lBQ2hHLENBQUM7SUFFRCxNQUFNLEtBQUssR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ3JDLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxJQUFJLGtHQUFrRyxDQUFBO0lBRTlJLElBQUksT0FBWSxDQUFBO0lBQ2hCLElBQUksQ0FBQztRQUNILE9BQU8sR0FBRyxzQkFBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLENBQUE7SUFDeEMsQ0FBQztJQUFDLE9BQU8sS0FBVSxFQUFFLENBQUM7UUFDcEIsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUE7SUFDN0YsQ0FBQztJQUVELE1BQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQTtJQUMvQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDcEIsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSx5Q0FBeUMsRUFBRSxDQUFDLENBQUE7SUFDckYsQ0FBQztJQUVELE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxhQUFhLElBQUksRUFBRSxDQUFBO0lBQzVDLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxZQUFZLElBQUksRUFBRSxDQUFBO0lBQzFDLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFBO0lBRXZDLE1BQU0sS0FBSyxHQUNULFFBQVEsQ0FBQyxLQUFLO1FBQ2QsVUFBVSxDQUFDLEtBQUs7UUFDaEIsT0FBTyxDQUFDLEtBQUs7UUFDYixPQUFPLENBQUMsS0FBSztRQUNiLElBQUksQ0FBQTtJQUVOLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNYLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUseUNBQXlDLEVBQUUsQ0FBQyxDQUFBO0lBQ3JGLENBQUM7SUFFRCxNQUFNLHFCQUFxQixHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGVBQU8sQ0FBQyxRQUFRLENBQVEsQ0FBQTtJQUN4RSxNQUFNLFNBQVMsR0FBRyxNQUFNLHFCQUFxQixDQUFDLGFBQWEsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUE7SUFFdEUsSUFBSSxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRSxDQUFDO1FBQzNCLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLDRDQUE0QyxFQUFFLENBQUMsQ0FBQTtJQUMzRixDQUFDO0lBRUQsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBRTdCLGtEQUFrRDtJQUNsRCxNQUFNLGlCQUFpQixHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGVBQU8sQ0FBQyxJQUFJLENBQVEsQ0FBQTtJQUNoRSxNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxpQ0FBeUIsQ0FBQyxJQUFJLENBQVEsQ0FBQTtJQUVyRSx1Q0FBdUM7SUFDdkMsTUFBTSxpQkFBaUIsQ0FBQyxvQkFBb0IsQ0FBQztRQUMzQztZQUNFLEVBQUUsRUFBRSxjQUFjO1lBQ2xCLFlBQVksRUFBRTtnQkFDWixXQUFXLEVBQUUsUUFBUSxDQUFDLEVBQUU7YUFDekI7U0FDRjtLQUNGLENBQUMsQ0FBQTtJQUVGLHVEQUF1RDtJQUN2RCxJQUFJLENBQUM7UUFDSCxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDaEIsQ0FBQyxlQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ2QsZ0JBQWdCLEVBQUUsY0FBYzthQUNqQztZQUNELENBQUMsZUFBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUNsQixXQUFXLEVBQUUsUUFBUSxDQUFDLEVBQUU7YUFDekI7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDO0lBQUMsT0FBTyxTQUFTLEVBQUUsQ0FBQztRQUNuQixzREFBc0Q7SUFDeEQsQ0FBQztJQUVELE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLFFBQVEsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFBO0FBQzdELENBQUMsQ0FBQTtBQTFFWSxRQUFBLElBQUksUUEwRWhCIn0=