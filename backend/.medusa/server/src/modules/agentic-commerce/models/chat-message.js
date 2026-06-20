"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatMessage = void 0;
const utils_1 = require("@medusajs/framework/utils");
/**
 * Single message in a chat session — user or assistant role.
 *
 * `metadata` is JSON-stringified data the assistant can attach to a
 * message (e.g. recommended product IDs, action suggestions). Kept as
 * text for portability across DB providers.
 */
exports.ChatMessage = utils_1.model.define("chat_message", {
    id: utils_1.model.id({ prefix: "msg" }).primaryKey(),
    session_id: utils_1.model.text(),
    role: utils_1.model.enum(["user", "assistant", "system"]).default("user"),
    content: utils_1.model.text(),
    metadata: utils_1.model.text().nullable(),
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdC1tZXNzYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvYWdlbnRpYy1jb21tZXJjZS9tb2RlbHMvY2hhdC1tZXNzYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFEQUFpRDtBQUVqRDs7Ozs7O0dBTUc7QUFDVSxRQUFBLFdBQVcsR0FBRyxhQUFLLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRTtJQUN0RCxFQUFFLEVBQUUsYUFBSyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLFVBQVUsRUFBRTtJQUM1QyxVQUFVLEVBQUUsYUFBSyxDQUFDLElBQUksRUFBRTtJQUN4QixJQUFJLEVBQUUsYUFBSyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO0lBQ2pFLE9BQU8sRUFBRSxhQUFLLENBQUMsSUFBSSxFQUFFO0lBQ3JCLFFBQVEsRUFBRSxhQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFO0NBQ2xDLENBQUMsQ0FBQSJ9