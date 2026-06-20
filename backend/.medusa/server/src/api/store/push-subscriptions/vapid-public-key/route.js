"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
/**
 * GET /store/push-subscriptions/vapid-public-key
 *   Returns the VAPID public key the storefront needs to call
 *   `pushManager.subscribe({ applicationServerKey })`.
 *
 *   The public key is safe to expose. The private key MUST stay on the
 *   server — never returned by this endpoint.
 */
async function GET(_req, res) {
    const publicKey = process.env.VAPID_PUBLIC_KEY || "";
    if (!publicKey) {
        return res.status(503).json({
            error: "VAPID public key is not configured. Run `npx web-push generate-vapid-keys` and set VAPID_PUBLIC_KEY / VAPID_PRIVATE_KEY in the backend .env.",
        });
    }
    res.json({ publicKey });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL3B1c2gtc3Vic2NyaXB0aW9ucy92YXBpZC1wdWJsaWMta2V5L3JvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBVUEsa0JBU0M7QUFqQkQ7Ozs7Ozs7R0FPRztBQUNJLEtBQUssVUFBVSxHQUFHLENBQUMsSUFBbUIsRUFBRSxHQUFtQjtJQUNoRSxNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixJQUFJLEVBQUUsQ0FBQTtJQUNwRCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDZixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQzFCLEtBQUssRUFDSCw4SUFBOEk7U0FDakosQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUNELEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFBO0FBQ3pCLENBQUMifQ==