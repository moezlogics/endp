"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecTemplate = void 0;
const utils_1 = require("@medusajs/framework/utils");
/**
 * Spec Template — a reusable schema of specification fields.
 *
 * Admin creates templates on the `/admin/spec-templates` page,
 * then links them to product categories. Products in that
 * category inherit the template's groups/fields and render
 * a structured spec form + storefront spec sheet.
 *
 * `template_data` stores the full JSON payload:
 *   { groups: [{ name, icon, fields: [{ key, label, unit, type, options, placeholder, highlight }] }] }
 */
exports.SpecTemplate = utils_1.model.define("spec_template", {
    id: utils_1.model.id({ prefix: "sptpl" }).primaryKey(),
    /** Human-readable label, e.g. "Mobile Phone", "Laptop". */
    name: utils_1.model.text().searchable(),
    /** URL-safe slug, e.g. "mobile-phone". Unique per store. */
    handle: utils_1.model.text().unique(),
    /** Short description shown in the admin list. */
    description: utils_1.model.text().nullable(),
    /** Phosphor icon class for the template, e.g. "ph-device-mobile". */
    icon: utils_1.model.text().default("ph-list-checks"),
    /** Whether this is a built-in preset (true) or user-created (false). */
    is_preset: utils_1.model.boolean().default(false),
    /** Sort order for the admin list. */
    sort_order: utils_1.model.number().default(0),
    /**
     * The full template JSON — stored as JSONB.
     * Shape: { groups: SpecTemplateGroup[] }
     */
    template_data: utils_1.model.json().default({ groups: [] }),
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BlYy10ZW1wbGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL3NwZWMtdGVtcGxhdGUvbW9kZWxzL3NwZWMtdGVtcGxhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscURBQWlEO0FBRWpEOzs7Ozs7Ozs7O0dBVUc7QUFDVSxRQUFBLFlBQVksR0FBRyxhQUFLLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRTtJQUN4RCxFQUFFLEVBQUUsYUFBSyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLFVBQVUsRUFBRTtJQUM5QywyREFBMkQ7SUFDM0QsSUFBSSxFQUFFLGFBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxVQUFVLEVBQUU7SUFDL0IsNERBQTREO0lBQzVELE1BQU0sRUFBRSxhQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFO0lBQzdCLGlEQUFpRDtJQUNqRCxXQUFXLEVBQUUsYUFBSyxDQUFDLElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRTtJQUNwQyxxRUFBcUU7SUFDckUsSUFBSSxFQUFFLGFBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUM7SUFDNUMsd0VBQXdFO0lBQ3hFLFNBQVMsRUFBRSxhQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztJQUN6QyxxQ0FBcUM7SUFDckMsVUFBVSxFQUFFLGFBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ3JDOzs7T0FHRztJQUNILGFBQWEsRUFBRSxhQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxDQUFDO0NBQ3BELENBQUMsQ0FBQSJ9