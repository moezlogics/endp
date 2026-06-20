"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactLead = void 0;
const utils_1 = require("@medusajs/framework/utils");
exports.ContactLead = utils_1.model.define("contact_lead", {
    id: utils_1.model.id({ prefix: "clead" }).primaryKey(),
    name: utils_1.model.text(),
    email: utils_1.model.text(),
    phone: utils_1.model.text().nullable(),
    subject: utils_1.model.text().nullable(),
    message: utils_1.model.text(),
    status: utils_1.model.enum(["new", "read", "replied", "archived"]).default("new"),
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGFjdC1sZWFkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvY29udGFjdC1sZWFkcy9tb2RlbHMvY29udGFjdC1sZWFkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFEQUFpRDtBQUVwQyxRQUFBLFdBQVcsR0FBRyxhQUFLLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRTtJQUN0RCxFQUFFLEVBQUUsYUFBSyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLFVBQVUsRUFBRTtJQUM5QyxJQUFJLEVBQUUsYUFBSyxDQUFDLElBQUksRUFBRTtJQUNsQixLQUFLLEVBQUUsYUFBSyxDQUFDLElBQUksRUFBRTtJQUNuQixLQUFLLEVBQUUsYUFBSyxDQUFDLElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRTtJQUM5QixPQUFPLEVBQUUsYUFBSyxDQUFDLElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRTtJQUNoQyxPQUFPLEVBQUUsYUFBSyxDQUFDLElBQUksRUFBRTtJQUNyQixNQUFNLEVBQUUsYUFBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztDQUMxRSxDQUFDLENBQUEifQ==