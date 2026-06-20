"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@medusajs/framework/utils");
(0, utils_1.loadEnv)(process.env.NODE_ENV || 'development', process.cwd());
/* ------------------------------------------------------------------ *
 * SECRETS — STABLE across restarts/builds (this is what keeps people
 * logged in) but NOT a public hardcoded value.
 *
 * Why this matters: JWT_SECRET signs every admin AND customer token,
 * and COOKIE_SECRET signs session cookies. If either value changes
 * between restarts, every existing token becomes invalid and EVERYONE
 * (admin + storefront) is logged out. So the #1 rule is: keep these
 * values identical forever.
 *
 *   1. If the env var is set (recommended), use it. As long as the same
 *      value lives in `.env` on every deploy, nobody gets logged out.
 *   2. If it's missing we DO NOT throw — crashing the API would violate
 *      "the site must never go down". Instead we fall back to a STABLE
 *      string (constant across restarts → sessions survive) and log a
 *      loud warning so the operator sets a real secret for security.
 *
 * The fallback is intentionally constant (not random) — a random
 * per-boot value is exactly what causes "logged out on every restart".
 * ------------------------------------------------------------------ */
const resolveSecret = (name, stableFallback) => {
    const val = process.env[name];
    if (val && val.trim().length > 0)
        return val.trim();
    console.error(`[config] ${name} is NOT set. Using a STABLE insecure fallback so sessions survive ` +
        `restarts, but you SHOULD set ${name} in .env for security. Generate one with: ` +
        `openssl rand -hex 32   (then redeploy — note: changing it logs everyone out once).`);
    return stableFallback;
};
const jwtSecret = resolveSecret('JWT_SECRET', 'insecure-stable-jwt-secret-set-JWT_SECRET-in-env');
const cookieSecret = resolveSecret('COOKIE_SECRET', 'insecure-stable-cookie-secret-set-COOKIE_SECRET-in-env');
// Build auth providers list, only including Google when credentials are set
const authProviders = [
    {
        resolve: "@medusajs/medusa/auth-emailpass",
        id: "emailpass",
        options: {
            hashConfig: { logN: 15, r: 8, p: 1 },
        },
    },
];
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    authProviders.push({
        resolve: "@medusajs/medusa/auth-google",
        id: "google",
        options: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackUrl: process.env.GOOGLE_CALLBACK_URL,
        },
    });
}
exports.default = (0, utils_1.defineConfig)({
    admin: {
        path: '/app',
        disable: process.env.NODE_ENV === 'production',
        vite: () => {
            return {
                server: {
                    allowedHosts: ["api.mobilestore.pk", "localhost"]
                }
            };
        }
    },
    projectConfig: {
        databaseUrl: process.env.DATABASE_URL,
        redisUrl: process.env.REDIS_URL,
        http: {
            storeCors: process.env.STORE_CORS,
            adminCors: process.env.ADMIN_CORS,
            authCors: process.env.AUTH_CORS,
            jwtSecret,
            cookieSecret,
            // Token lifetime. Medusa's default is short (~1 day) which logs
            // both admins and customers out daily. 30d keeps sessions alive
            // for a month; the value is overridable via JWT_EXPIRES_IN.
            // (This is the per-token TTL — separate from the cookie maxAge on
            // the storefront, which we match to 30d in cookies.ts.)
            jwtExpiresIn: process.env.JWT_EXPIRES_IN || "30d",
        },
    },
    modules: {
        /* ---------------------------------------------------------------- *
         * Redis-backed CACHE + EVENT BUS + WORKFLOW ENGINE                 *
         *                                                                  *
         * Activated automatically when REDIS_URL is set AND the matching   *
         * provider packages are installed:                                 *
         *   pnpm add @medusajs/cache-redis \                               *
         *           @medusajs/event-bus-redis \                            *
         *           @medusajs/workflow-engine-redis                        *
         *                                                                  *
         * Without these the project falls back to Medusa's in-memory       *
         * defaults (single-node, dev-only). Production should always use   *
         * Redis so multi-replica deploys share state and high-traffic      *
         * pages don't re-query the DB on every hit.                        *
         * ---------------------------------------------------------------- */
        /* EVENT BUS — ALWAYS local (in-memory), NOT Redis.
         *
         * This is a single shared process (ecosystem.config.js: instances:1,
         * fork). The local event bus delivers events synchronously IN-PROCESS,
         * which is reliable for this setup. The Redis event bus was configured
         * but was NOT delivering events (order.placed, customer.created, etc.)
         * to subscribers — orders completed fine over HTTP, but NO subscriber
         * (customer push, transactional emails, welcome, admin push) ever
         * fired. Switching the event bus to local makes every subscriber fire
         * again. Cache + workflow engine stay on Redis. */
        [utils_1.Modules.EVENT_BUS]: {
            resolve: "@medusajs/event-bus-local",
        },
        ...(process.env.REDIS_URL
            ? {
                [utils_1.Modules.CACHE]: {
                    resolve: "@medusajs/cache-redis",
                    options: { redisUrl: process.env.REDIS_URL, ttl: 60 },
                },
                [utils_1.Modules.WORKFLOW_ENGINE]: {
                    resolve: "@medusajs/workflow-engine-redis",
                    options: {
                        redis: { url: process.env.REDIS_URL },
                    },
                },
            }
            : {}),
        [utils_1.Modules.AUTH]: {
            resolve: "@medusajs/medusa/auth",
            dependencies: [utils_1.Modules.CACHE, utils_1.ContainerRegistrationKeys.LOGGER],
            options: {
                providers: authProviders,
            },
        },
        [utils_1.Modules.NOTIFICATION]: {
            resolve: "@medusajs/medusa/notification",
            options: {
                providers: [
                    {
                        resolve: "./src/modules/email-notifications",
                        id: "smtp-notification",
                        // CRITICAL: `channels` MUST live at the provider top-level in
                        // Medusa V2. When nested inside `options` (as it was before),
                        // the notification module sees no provider registered for the
                        // "email" channel, so every `createNotifications({ channel:
                        // "email", ... })` call silently no-ops — explaining why
                        // order-placed, contact-form, OTP and password-reset emails
                        // were all going nowhere. See:
                        // https://docs.medusajs.com/resources/architectural-modules/notification
                        channels: ["email"],
                        options: {
                            host: process.env.SMTP_HOST || "smtp.gmail.com",
                            port: Number(process.env.SMTP_PORT) || 587,
                            user: process.env.SMTP_USER || "",
                            pass: process.env.SMTP_PASS || "",
                            from: process.env.SMTP_FROM || process.env.SMTP_USER || "",
                        },
                    },
                ],
            },
        },
        [utils_1.Modules.FILE]: {
            resolve: "@medusajs/file",
            options: {
                providers: [
                    {
                        resolve: "./src/modules/cdn-file",
                        id: "cdn",
                        options: {
                            url: process.env.CDN_PUBLIC_URL,
                            key: process.env.CDN_API_KEY,
                        },
                    },
                ],
            },
        },
        // Custom modules (using underscores instead of hyphens)
        "blog": {
            resolve: "./src/modules/blog",
        },
        "site_settings": {
            resolve: "./src/modules/site-settings",
        },
        "banners": {
            resolve: "./src/modules/banners",
        },
        "search_log": {
            resolve: "./src/modules/search-log",
        },
        "contact_leads": {
            resolve: "./src/modules/contact-leads",
        },
        "advanced_reviews": {
            resolve: "./src/modules/advanced_reviews",
        },
        "brand": {
            resolve: "./src/modules/brand",
        },
        "push_notifications": {
            resolve: "./src/modules/push-notifications",
        },
        // --- NEW MODULES (from Medusa examples + custom) ---
        // OTP Auth Module — 6-digit OTP for signup/password reset
        "otp_auth": {
            resolve: "./src/modules/otp-auth",
        },
        // Loyalty Points Module — earn & redeem points
        "loyalty": {
            resolve: "./src/modules/loyalty",
        },
        // Bundled Products Module — product bundles with discount
        "bundledProduct": {
            resolve: "./src/modules/bundled-product",
        },
        // Agentic Commerce Module — AI agent (ChatGPT) integration +
        // storefront AI shopping-assistant chatbot.
        "agenticCommerce": {
            resolve: "./src/modules/agentic-commerce",
            options: {
                signatureKey: resolveSecret("AGENTIC_COMMERCE_SIGNATURE_KEY", "insecure-stable-agentic-signature-set-in-env"),
                openaiApiKey: process.env.OPENAI_API_KEY,
                openaiModel: process.env.OPENAI_MODEL || "gpt-4o-mini",
            },
        },
        // Custom Spec Template Module
        "specTemplate": {
            resolve: "./src/modules/spec-template",
        },
    },
    plugins: [
        {
            resolve: "@rokmohar/medusa-plugin-meilisearch",
            options: {
                config: {
                    host: process.env.MEILISEARCH_HOST || "http://127.0.0.1:7700",
                    apiKey: process.env.MEILISEARCH_API_KEY || "",
                },
                settings: {
                    products: {
                        indexSettings: {
                            searchableAttributes: ["title", "description", "variant_sku"],
                            displayedAttributes: ["id", "title", "description", "variant_sku", "thumbnail", "handle"],
                        },
                        primaryKey: "id",
                    },
                },
            },
        },
        ...(process.env.GA_MEASUREMENT_ID && process.env.GA_API_SECRET
            ? [
                {
                    resolve: "@variablevic/google-analytics-medusa",
                    options: {
                        measurementId: process.env.GA_MEASUREMENT_ID,
                        apiSecret: process.env.GA_API_SECRET,
                        debug: process.env.NODE_ENV !== "production",
                    },
                },
            ]
            : []),
    ],
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkdXNhLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL21lZHVzYS1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxREFBcUc7QUFFckcsSUFBQSxlQUFPLEVBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksYUFBYSxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFBO0FBRTdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O3dFQW1Cd0U7QUFDeEUsTUFBTSxhQUFhLEdBQUcsQ0FBQyxJQUFZLEVBQUUsY0FBc0IsRUFBVSxFQUFFO0lBQ3JFLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDN0IsSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDO1FBQUUsT0FBTyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUE7SUFDbkQsT0FBTyxDQUFDLEtBQUssQ0FDWCxZQUFZLElBQUksb0VBQW9FO1FBQ2xGLGdDQUFnQyxJQUFJLDRDQUE0QztRQUNoRixvRkFBb0YsQ0FDdkYsQ0FBQTtJQUNELE9BQU8sY0FBYyxDQUFBO0FBQ3ZCLENBQUMsQ0FBQTtBQUVELE1BQU0sU0FBUyxHQUFHLGFBQWEsQ0FBQyxZQUFZLEVBQUUsa0RBQWtELENBQUMsQ0FBQTtBQUNqRyxNQUFNLFlBQVksR0FBRyxhQUFhLENBQUMsZUFBZSxFQUFFLHdEQUF3RCxDQUFDLENBQUE7QUFFN0csNEVBQTRFO0FBQzVFLE1BQU0sYUFBYSxHQUFVO0lBQzNCO1FBQ0UsT0FBTyxFQUFFLGlDQUFpQztRQUMxQyxFQUFFLEVBQUUsV0FBVztRQUNmLE9BQU8sRUFBRTtZQUNQLFVBQVUsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO1NBQ3JDO0tBQ0Y7Q0FDRixDQUFBO0FB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