"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Banner = void 0;
const utils_1 = require("@medusajs/framework/utils");
/**
 * Homepage hero banner.
 *
 * Operators manage these from the admin panel — each banner has an image,
 * optional headline/subhead overlay, optional click-through URL, a sort
 * order and an active flag. The storefront pulls active banners ordered
 * by `sort_order ASC` and renders them as a full-width fade/slide carousel.
 */
exports.Banner = utils_1.model.define("banner", {
    id: utils_1.model.id({ prefix: "banner" }).primaryKey(),
    title: utils_1.model.text().nullable(),
    subtitle: utils_1.model.text().nullable(),
    image_url: utils_1.model.text(),
    image_url_mobile: utils_1.model.text().nullable(),
    link_url: utils_1.model.text().nullable(),
    cta_label: utils_1.model.text().nullable(),
    text_position: utils_1.model.text().default("bottom-left"), // "bottom-left", "center", "bottom-right", "top-left"
    theme: utils_1.model.text().default("dark"), // "dark" (glass dark) or "light" (glass light)
    sort_order: utils_1.model.number().default(0),
    is_active: utils_1.model.boolean().default(true),
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFubmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvYmFubmVycy9tb2RlbHMvYmFubmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFEQUFpRDtBQUVqRDs7Ozs7OztHQU9HO0FBQ1UsUUFBQSxNQUFNLEdBQUcsYUFBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUU7SUFDM0MsRUFBRSxFQUFFLGFBQUssQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQyxVQUFVLEVBQUU7SUFDL0MsS0FBSyxFQUFFLGFBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDOUIsUUFBUSxFQUFFLGFBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDakMsU0FBUyxFQUFFLGFBQUssQ0FBQyxJQUFJLEVBQUU7SUFDdkIsZ0JBQWdCLEVBQUUsYUFBSyxDQUFDLElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRTtJQUN6QyxRQUFRLEVBQUUsYUFBSyxDQUFDLElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRTtJQUNqQyxTQUFTLEVBQUUsYUFBSyxDQUFDLElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRTtJQUNsQyxhQUFhLEVBQUUsYUFBSyxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsRUFBRSxzREFBc0Q7SUFDMUcsS0FBSyxFQUFFLGFBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsK0NBQStDO0lBQ3BGLFVBQVUsRUFBRSxhQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNyQyxTQUFTLEVBQUUsYUFBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7Q0FDekMsQ0FBQyxDQUFBIn0=