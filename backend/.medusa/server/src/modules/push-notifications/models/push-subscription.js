"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PushCampaign = exports.PushSubscription = void 0;
const utils_1 = require("@medusajs/framework/utils");
/**
 * Web Push subscription. One row per browser/device that has granted
 * notification permission. Keyed by `endpoint` (the unique URL the push
 * service issues for that browser).
 *
 * `customer_id` links the subscription to a logged-in customer so we can
 * target order-specific transactional pushes. Anonymous visitors still
 * subscribe — those rows have `customer_id = null` and only receive
 * marketing campaigns.
 */
exports.PushSubscription = utils_1.model.define("push_subscription", {
    id: utils_1.model.id({ prefix: "psub" }).primaryKey(),
    endpoint: utils_1.model.text().unique(),
    p256dh: utils_1.model.text(),
    auth: utils_1.model.text(),
    customer_id: utils_1.model.text().nullable(),
    // Geo (resolved from IP at subscribe time)
    city: utils_1.model.text().nullable(),
    state: utils_1.model.text().nullable(),
    country: utils_1.model.text().nullable(),
    // Browser fingerprint for the dashboard
    user_agent: utils_1.model.text().nullable(),
    device_browser: utils_1.model.text().nullable(),
    // Marketer-grade segmentation data captured on subscribe
    device_type: utils_1.model.text().nullable(), // mobile / tablet / desktop
    os: utils_1.model.text().nullable(), // Android / iOS / Windows / macOS / Linux / Other
    locale: utils_1.model.text().nullable(), // e.g. en-US, ur-PK
    timezone: utils_1.model.text().nullable(), // e.g. Asia/Karachi
    subscribe_source: utils_1.model.text().nullable(), // path where they subscribed (e.g. /pk/products/foo)
    is_active: utils_1.model.boolean().default(true),
    // Customer-supplied demographic. Populated either at subscribe time
    // (legacy flow — we didn't ask then) or, more commonly, synced from
    // the customer's profile once they finish the onboarding wizard.
    // Stored as free text (not an enum) so we can accept future values
    // ("other", "prefer_not_to_say", etc.) without another migration.
    gender: utils_1.model.text().nullable(),
    // Tracks last successful send so we can prune dead endpoints
    last_sent_at: utils_1.model.dateTime().nullable(),
    // Engagement — populated by the SW click callback. Used for CTR
    // segmentation ("hot" vs "dormant" subscribers).
    total_clicked: utils_1.model.number().default(0),
    last_clicked_at: utils_1.model.dateTime().nullable(),
});
/**
 * Manual marketing campaigns. Each campaign keeps its own copy of the
 * payload (title/body/icon/image/url) so the dashboard can show a
 * permanent send history with stats.
 */
exports.PushCampaign = utils_1.model.define("push_campaign", {
    id: utils_1.model.id({ prefix: "pcamp" }).primaryKey(),
    title: utils_1.model.text(),
    body: utils_1.model.text(),
    icon_url: utils_1.model.text().nullable(),
    image_url: utils_1.model.text().nullable(),
    action_url: utils_1.model.text().nullable(),
    // Audience filters — JSON-stringified arrays of cities/states.
    // Empty / null = send to everyone.
    filter_cities: utils_1.model.text().nullable(),
    filter_states: utils_1.model.text().nullable(),
    filter_countries: utils_1.model.text().nullable(),
    filter_device_types: utils_1.model.text().nullable(), // JSON: ["mobile","desktop"]
    filter_os: utils_1.model.text().nullable(), // JSON: ["Android","iOS"]
    filter_browsers: utils_1.model.text().nullable(), // JSON: ["Chrome","Safari"]
    filter_genders: utils_1.model.text().nullable(), // JSON: ["male","female"]
    filter_customers_only: utils_1.model.boolean().default(false),
    // Stats
    total_targeted: utils_1.model.number().default(0),
    total_sent: utils_1.model.number().default(0),
    total_failed: utils_1.model.number().default(0),
    total_clicked: utils_1.model.number().default(0),
    status: utils_1.model.enum(["draft", "sending", "sent", "failed"]).default("draft"),
    sent_at: utils_1.model.dateTime().nullable(),
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVzaC1zdWJzY3JpcHRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9wdXNoLW5vdGlmaWNhdGlvbnMvbW9kZWxzL3B1c2gtc3Vic2NyaXB0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFEQUFpRDtBQUVqRDs7Ozs7Ozs7O0dBU0c7QUFDVSxRQUFBLGdCQUFnQixHQUFHLGFBQUssQ0FBQyxNQUFNLENBQUMsbUJBQW1CLEVBQUU7SUFDaEUsRUFBRSxFQUFFLGFBQUssQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxVQUFVLEVBQUU7SUFDN0MsUUFBUSxFQUFFLGFBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUU7SUFDL0IsTUFBTSxFQUFFLGFBQUssQ0FBQyxJQUFJLEVBQUU7SUFDcEIsSUFBSSxFQUFFLGFBQUssQ0FBQyxJQUFJLEVBQUU7SUFDbEIsV0FBVyxFQUFFLGFBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDcEMsMkNBQTJDO0lBQzNDLElBQUksRUFBRSxhQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFO0lBQzdCLEtBQUssRUFBRSxhQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFO0lBQzlCLE9BQU8sRUFBRSxhQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFO0lBQ2hDLHdDQUF3QztJQUN4QyxVQUFVLEVBQUUsYUFBSyxDQUFDLElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRTtJQUNuQyxjQUFjLEVBQUUsYUFBSyxDQUFDLElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRTtJQUN2Qyx5REFBeUQ7SUFDekQsV0FBVyxFQUFFLGFBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUUsRUFBRSw0QkFBNEI7SUFDbEUsRUFBRSxFQUFFLGFBQUssQ0FBQyxJ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