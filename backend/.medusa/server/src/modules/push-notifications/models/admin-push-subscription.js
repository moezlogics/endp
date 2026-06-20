"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminPushSubscription = void 0;
const utils_1 = require("@medusajs/framework/utils");
/**
 * Admin Web Push subscription — one row per admin browser / installed
 * PWA that has granted notification permission in the admin mobile app.
 *
 * Kept SEPARATE from the customer `push_subscription` table on purpose:
 *   - admins must never receive marketing campaigns / customer pushes,
 *   - and they must not pollute the customer push analytics + segments.
 *
 * `admin_id` links the subscription to the Medusa admin `user` that
 * registered it (so we could target a specific admin later). Sends use
 * the SAME web-push client (`lib/web-push-client.ts`) as customers — a
 * subscription is just endpoint + p256dh + auth.
 */
exports.AdminPushSubscription = utils_1.model.define("admin_push_subscription", {
    id: utils_1.model.id({ prefix: "apsub" }).primaryKey(),
    endpoint: utils_1.model.text().unique(),
    p256dh: utils_1.model.text(),
    auth: utils_1.model.text(),
    admin_id: utils_1.model.text().nullable(),
    label: utils_1.model.text().nullable(),
    device_browser: utils_1.model.text().nullable(),
    is_active: utils_1.model.boolean().default(true),
    last_sent_at: utils_1.model.dateTime().nullable(),
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRtaW4tcHVzaC1zdWJzY3JpcHRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9wdXNoLW5vdGlmaWNhdGlvbnMvbW9kZWxzL2FkbWluLXB1c2gtc3Vic2NyaXB0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFEQUFpRDtBQUVqRDs7Ozs7Ozs7Ozs7O0dBWUc7QUFDVSxRQUFBLHFCQUFxQixHQUFHLGFBQUssQ0FBQyxNQUFNLENBQUMseUJBQXlCLEVBQUU7SUFDM0UsRUFBRSxFQUFFLGFBQUssQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQyxVQUFVLEVBQUU7SUFDOUMsUUFBUSxFQUFFLGFBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUU7SUFDL0IsTUFBTSxFQUFFLGFBQUssQ0FBQyxJQUFJLEVBQUU7SUFDcEIsSUFBSSxFQUFFLGFBQUssQ0FBQyxJQUFJLEVBQUU7SUFDbEIsUUFBUSxFQUFFLGFBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDakMsS0FBSyxFQUFFLGFBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDOUIsY0FBYyxFQUFFLGFBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDdkMsU0FBUyxFQUFFLGFBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO0lBQ3hDLFlBQVksRUFBRSxhQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFO0NBQzFDLENBQUMsQ0FBQSJ9