"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatSession = void 0;
const utils_1 = require("@medusajs/framework/utils");
/**
 * Conversational AI chat session.
 *
 * One row per visitor conversation. Anonymous visitors get a session
 * keyed by a client-generated id stored in localStorage. Logged-in
 * customers have `customer_id` populated so the conversation can be
 * picked up across devices.
 */
exports.ChatSession = utils_1.model.define("chat_session", {
    id: utils_1.model.id({ prefix: "chat" }).primaryKey(),
    customer_id: utils_1.model.text().nullable(),
    // Browser-side identifier for anonymous sessions
    visitor_token: utils_1.model.text().nullable(),
    title: utils_1.model.text().nullable(),
    // Human-readable summary for the admin/history view
    last_message_preview: utils_1.model.text().nullable(),
    message_count: utils_1.model.number().default(0),
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdC1zZXNzaW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvYWdlbnRpYy1jb21tZXJjZS9tb2RlbHMvY2hhdC1zZXNzaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFEQUFpRDtBQUVqRDs7Ozs7OztHQU9HO0FBQ1UsUUFBQSxXQUFXLEdBQUcsYUFBSyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUU7SUFDdEQsRUFBRSxFQUFFLGFBQUssQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxVQUFVLEVBQUU7SUFDN0MsV0FBVyxFQUFFLGFBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDcEMsaURBQWlEO0lBQ2pELGFBQWEsRUFBRSxhQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFO0lBQ3RDLEtBQUssRUFBRSxhQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFO0lBQzlCLG9EQUFvRDtJQUNwRCxvQkFBb0IsRUFBRSxhQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFO0lBQzdDLGFBQWEsRUFBRSxhQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztDQUN6QyxDQUFDLENBQUEifQ==