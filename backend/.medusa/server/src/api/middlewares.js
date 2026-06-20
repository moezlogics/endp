"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("@medusajs/framework/http");
const route_1 = require("./admin/bundled-products/route");
const validators_1 = require("@medusajs/medusa/api/utils/validators");
const route_2 = require("./store/carts/[id]/line-item-bundles/route");
const rate_limit_1 = require("./middlewares/rate-limit");
const security_headers_1 = require("./middlewares/security-headers");
const login_lockout_1 = require("./middlewares/login-lockout");
exports.default = (0, http_1.defineMiddlewares)({
    routes: [
        /* ── Baseline security headers on every response ──────────────── */
        {
            matcher: "/*",
            middlewares: [security_headers_1.securityHeaders],
        },
        /* ── Admin login lockout: 3 failed attempts → 1-hour IP ban ───── */
        {
            matcher: "/auth/user/emailpass",
            methods: ["POST"],
            middlewares: [login_lockout_1.loginLockout],
        },
        /* ── Rate limits on abuse-prone, user-action endpoints ────────── *
         * Only endpoints driven by a direct browser action are limited so
         * that server-side (SSR) storefront fetches — which all share one
         * IP — are never throttled. Limits are per-IP, per-bucket.        */
        {
            // Login / token issue — brute-force guard.
            matcher: "/auth/*",
            methods: ["POST"],
            middlewares: [(0, rate_limit_1.rateLimit)({ bucket: "auth", max: 12, windowMs: 60_000 })],
        },
        {
            // OTP send/verify/reset — stops SMS/email abuse & code guessing.
            matcher: "/store/auth/otp/*",
            methods: ["POST"],
            middlewares: [(0, rate_limit_1.rateLimit)({ bucket: "otp", max: 6, windowMs: 60_000 })],
        },
        {
            // Public contact form — spam guard.
            matcher: "/store/contact",
            methods: ["POST"],
            middlewares: [(0, rate_limit_1.rateLimit)({ bucket: "contact", max: 5, windowMs: 60_000 })],
        },
        {
            // AI chat — each message can cost an OpenAI call, so cap it.
            matcher: "/store/chat/message",
            methods: ["POST"],
            middlewares: [(0, rate_limit_1.rateLimit)({ bucket: "chat", max: 20, windowMs: 60_000 })],
        },
        {
            // Review submission — spam guard.
            matcher: "/store/reviews",
            methods: ["POST"],
            middlewares: [(0, rate_limit_1.rateLimit)({ bucket: "reviews", max: 10, windowMs: 60_000 })],
        },
        {
            // AI-assisted (incl. guest COD) order placement — abuse guard.
            matcher: "/store/chat/confirm-order",
            methods: ["POST"],
            middlewares: [(0, rate_limit_1.rateLimit)({ bucket: "chat-order", max: 8, windowMs: 60_000 })],
        },
        {
            // Guest order claiming — strict (an order id is a capability).
            matcher: "/store/my-orders/link-guest",
            methods: ["POST"],
            middlewares: [(0, rate_limit_1.rateLimit)({ bucket: "guest-link", max: 10, windowMs: 60_000 })],
        },
        {
            // Guest order/review reads — generous but bounded.
            matcher: "/store/my-orders/by-guest",
            methods: ["GET"],
            middlewares: [(0, rate_limit_1.rateLimit)({ bucket: "guest-read", max: 60, windowMs: 60_000 })],
        },
        {
            matcher: "/store/my-reviews/by-guest",
            methods: ["GET"],
            middlewares: [(0, rate_limit_1.rateLimit)({ bucket: "guest-read", max: 60, windowMs: 60_000 })],
        },
        {
            matcher: "/admin/bundled-products",
            methods: ["POST"],
            middlewares: [
                (0, http_1.validateAndTransformBody)(route_1.PostBundledProductsSchema),
            ],
        },
        {
            matcher: "/admin/bundled-products",
            methods: ["GET"],
            middlewares: [
                (0, http_1.validateAndTransformQuery)((0, validators_1.createFindParams)(), {
                    defaults: [
                        "id",
                        "title",
                        "product.*",
                        "items.*",
                        "items.product.*",
                    ],
                    isList: true,
                    defaultLimit: 15,
                }),
            ],
        },
        {
            matcher: "/store/carts/:id/line-item-bundles",
            methods: ["POST"],
            middlewares: [
                (0, http_1.validateAndTransformBody)(route_2.PostCartsBundledLineItemsSchema)
            ],
        }
    ]
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlkZGxld2FyZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBpL21pZGRsZXdhcmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbURBQWtIO0FBQ2xILDBEQUEyRTtBQUMzRSxzRUFBeUU7QUFDekUsc0VBQTZGO0FBQzdGLHlEQUFxRDtBQUNyRCxxRUFBaUU7QUFDakUsK0RBQTJEO0FBRTNELGtCQUFlLElBQUEsd0JBQWlCLEVBQUM7SUFDL0IsTUFBTSxFQUFFO1FBQ04scUVBQXFFO1FBQ3JFO1lBQ0UsT0FBTyxFQUFFLElBQUk7WUFDYixXQUFXLEVBQUUsQ0FBQyxrQ0FBZSxDQUFDO1NBQy9CO1FBRUQscUVBQXFFO1FBQ3JFO1lBQ0UsT0FBTyxFQUFFLHNCQUFzQjtZQUMvQixPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUM7WUFDakIsV0FBVyxFQUFFLENBQUMsNEJBQVksQ0FBQztTQUM1QjtRQUVEOzs7NkVBR3FFO1FBQ3JFO1lBQ0UsMkNBQTJDO1lBQzNDLE9BQU8sRUFBRSxTQUFTO1lBQ2xCLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQztZQUNqQixXQUFXLEVBQUUsQ0FBQyxJQUFBLHNCQUFTLEVBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7U0FDeEU7UUFDRDtZQUNFLGlFQUFpRTtZQUNqRSxPQUFPLEVBQUUsbUJBQW1CO1lBQzVCLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQztZQUNqQixXQUFXLEVBQUUsQ0FBQyxJQUFBLHNCQUFTLEVBQUMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7U0FDdEU7UUFDRDtZQUNFLG9DQUFvQztZQUNwQyxPQUFPLEVBQUUsZ0JBQWdCO1lBQ3pCLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQztZQUNqQixXQUFXLEVBQUUsQ0FBQyxJQUFBLHNCQUFTLEVBQUMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7U0FDMUU7UUFDRDtZQUNFLDZEQUE2RDtZQUM3RCxPQUFPLEVBQUUscUJBQXFCO1lBQzlCLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQztZQUNqQixXQUFXLEVBQUUsQ0FBQyxJQUFBLHNCQUFTLEVBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7U0FDeEU7UUFDRDtZQUNFLGtDQUFrQztZQUNsQyxPQUFPLEVBQUUsZ0JBQWdCO1lBQ3pCLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQztZQUNqQixXQUFXLEVBQUUsQ0FBQyxJQUFBLHNCQUFTLEVBQUMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7U0FDM0U7UUFDRDtZQUNFLCtEQUErRDtZQUMvRCxPQUFPLEVBQUUsMkJBQTJCO1lBQ3BDLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQztZQUNqQixXQUFXLEVBQUUsQ0FBQyxJQUFBLHNCQUFTLEVBQUMsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7U0FDN0U7UUFDRDtZQUNFLCtEQUErRDtZQUMvRCxPQUFPLEVBQUUsNkJBQTZCO1lBQ3RDLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQztZQUNqQixXQUFXLEVBQUUsQ0FBQyxJQUFBLHNCQUFTLEVBQUMsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7U0FDOUU7UUFDRDtZQUNFLG1EQUFtRDtZQUNuRCxPQUFPLEVBQUUsMkJBQTJCO1lBQ3BDLE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQztZQUNoQixXQUFXLEVBQUUsQ0FBQyxJQUFBLHNCQUFTLEVBQUMsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7U0FDOUU7UUFDRDtZQUNFLE9BQU8sRUFBRSw0QkFBNEI7WUFDckMsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDO1lBQ2hCLFdBQVcsRUFBRSxDQUFDLElBQUEsc0JBQVMsRUFBQyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztTQUM5RTtRQUNEO1lBQ0UsT0FBTyxFQUFFLHlCQUF5QjtZQUNsQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUM7WUFDakIsV0FBVyxFQUFFO2dCQUNYLElBQUEsK0JBQXdCLEVBQUMsaUNBQXlCLENBQUM7YUFDcEQ7U0FDRjtRQUNEO1lBQ0UsT0FBTyxFQUFFLHlCQUF5QjtZQUNsQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUM7WUFDaEIsV0FBVyxFQUFFO2dCQUNYLElBQUEsZ0NBQXlCLEVBQUMsSUFBQSw2QkFBZ0IsR0FBRSxFQUFFO29CQUM1QyxRQUFRLEVBQUU7d0JBQ1IsSUFBSTt3QkFDSixPQUFPO3dCQUNQLFdBQVc7d0JBQ1gsU0FBUzt3QkFDVCxpQkFBaUI7cUJBQ2xCO29CQUNELE1BQU0sRUFBRSxJQUFJO29CQUNaLFlBQVksRUFBRSxFQUFFO2lCQUNqQixDQUFDO2FBQ0g7U0FDRjtRQUNEO1lBQ0UsT0FBTyxFQUFFLG9DQUFvQztZQUM3QyxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUM7WUFDakIsV0FBVyxFQUFFO2dCQUNYLElBQUEsK0JBQXdCLEVBQUMsdUNBQStCLENBQUM7YUFDMUQ7U0FDRjtLQUNGO0NBQ0YsQ0FBQyxDQUFBIn0=