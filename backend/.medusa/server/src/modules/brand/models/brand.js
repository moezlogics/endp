"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandProduct = exports.Brand = void 0;
const utils_1 = require("@medusajs/framework/utils");
/**
 * Brand — supports nested hierarchy (sub-brands) via `parent_id`.
 *
 *   parent_id = null  → top-level brand (e.g. "Apple")
 *   parent_id = "..." → sub-brand (e.g. "Apple Mac" parent="brand_apple")
 *
 * Hierarchy depth is intentionally unrestricted; in practice the
 * storefront URL builder caps at the depth Medusa categories use
 * (~5 levels). The FK is declared at the SQL level (see migration
 * + sync-db script) — Medusa's `model.define()` doesn't expose a
 * self-referencing FK helper, so we just keep `parent_id` as a
 * plain nullable text column on the model layer.
 */
exports.Brand = utils_1.model.define("brand", {
    id: utils_1.model.id({ prefix: "brand" }).primaryKey(),
    name: utils_1.model.text().searchable(),
    handle: utils_1.model.text().unique(),
    logo_url: utils_1.model.text().nullable(),
    description: utils_1.model.text().nullable(),
    website_url: utils_1.model.text().nullable(),
    seo_title: utils_1.model.text().nullable(),
    seo_description: utils_1.model.text().nullable(),
    sort_order: utils_1.model.number().default(0),
    is_active: utils_1.model.boolean().default(true),
    parent_id: utils_1.model.text().nullable(),
});
exports.BrandProduct = utils_1.model.define("brand_product", {
    id: utils_1.model.id({ prefix: "bp" }).primaryKey(),
    product_id: utils_1.model.text(),
    brand_id: utils_1.model.text(),
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJhbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9icmFuZC9tb2RlbHMvYnJhbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscURBQWlEO0FBRWpEOzs7Ozs7Ozs7Ozs7R0FZRztBQUNVLFFBQUEsS0FBSyxHQUFHLGFBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFO0lBQ3pDLEVBQUUsRUFBRSxhQUFLLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUMsVUFBVSxFQUFFO0lBQzlDLElBQUksRUFBRSxhQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsVUFBVSxFQUFFO0lBQy9CLE1BQU0sRUFBRSxhQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFO0lBQzdCLFFBQVEsRUFBRSxhQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFO0lBQ2pDLFdBQVcsRUFBRSxhQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFO0lBQ3BDLFdBQVcsRUFBRSxhQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFO0lBQ3BDLFNBQVMsRUFBRSxhQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFO0lBQ2xDLGVBQWUsRUFBRSxhQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFO0lBQ3hDLFVBQVUsRUFBRSxhQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNyQyxTQUFTLEVBQUUsYUFBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7SUFDeEMsU0FBUyxFQUFFLGFBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUU7Q0FDbkMsQ0FBQyxDQUFBO0FBRVcsUUFBQSxZQUFZLEdBQUcsYUFBSyxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUU7SUFDeEQsRUFBRSxFQUFFLGFBQUssQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxVQUFVLEVBQUU7SUFDM0MsVUFBVSxFQUFFLGFBQUssQ0FBQyxJQUFJLEVBQUU7SUFDeEIsUUFBUSxFQUFFLGFBQUssQ0FBQyxJQUFJLEVBQUU7Q0FDdkIsQ0FBQyxDQUFBIn0=