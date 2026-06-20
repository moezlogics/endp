"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogPost = void 0;
const utils_1 = require("@medusajs/framework/utils");
const category_1 = require("./category");
exports.BlogPost = utils_1.model.define("blog_post", {
    id: utils_1.model.id({ prefix: "bpost" }).primaryKey(),
    title: utils_1.model.text().searchable(),
    handle: utils_1.model.text().unique(),
    excerpt: utils_1.model.text().nullable(),
    content: utils_1.model.text().nullable(), // rich HTML (from TipTap)
    featured_image: utils_1.model.text().nullable(),
    featured_image_alt: utils_1.model.text().nullable(),
    status: utils_1.model.enum(["draft", "published"]).default("draft"),
    published_at: utils_1.model.dateTime().nullable(),
    // SEO
    seo_title: utils_1.model.text().nullable(),
    seo_description: utils_1.model.text().nullable(),
    seo_keywords: utils_1.model.text().nullable(),
    // Relations
    categories: utils_1.model.manyToMany(() => category_1.BlogCategory, {
        pivotTable: "blog_post_categories",
    }),
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2Jsb2cvbW9kZWxzL3Bvc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscURBQWlEO0FBQ2pELHlDQUF5QztBQUU1QixRQUFBLFFBQVEsR0FBRyxhQUFLLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRTtJQUNoRCxFQUFFLEVBQUUsYUFBSyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLFVBQVUsRUFBRTtJQUM5QyxLQUFLLEVBQUUsYUFBSyxDQUFDLElBQUksRUFBRSxDQUFDLFVBQVUsRUFBRTtJQUNoQyxNQUFNLEVBQUUsYUFBSyxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRTtJQUM3QixPQUFPLEVBQUUsYUFBSyxDQUFDLElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRTtJQUNoQyxPQUFPLEVBQUUsYUFBSyxDQUFDLElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUFFLDBCQUEwQjtJQUM1RCxjQUFjLEVBQUUsYUFBSyxDQUFDLElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRTtJQUN2QyxrQkFBa0IsRUFBRSxhQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFO0lBQzNDLE1BQU0sRUFBRSxhQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztJQUMzRCxZQUFZLEVBQUUsYUFBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRTtJQUN6QyxNQUFNO0lBQ04sU0FBUyxFQUFFLGFBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDbEMsZUFBZSxFQUFFLGFBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDeEMsWUFBWSxFQUFFLGFBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDckMsWUFBWTtJQUNaLFVBQVUsRUFBRSxhQUFLLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLHVCQUFZLEVBQUU7UUFDL0MsVUFBVSxFQUFFLHNCQUFzQjtLQUNuQyxDQUFDO0NBQ0gsQ0FBQyxDQUFBIn0=