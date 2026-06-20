"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogCategory = void 0;
const utils_1 = require("@medusajs/framework/utils");
exports.BlogCategory = utils_1.model.define("blog_category", {
    id: utils_1.model.id({ prefix: "bcat" }).primaryKey(),
    name: utils_1.model.text().searchable(),
    handle: utils_1.model.text().unique(),
    description: utils_1.model.text().nullable(),
    posts: utils_1.model.manyToMany(() => require("./post").BlogPost, {
        mappedBy: "categories",
    }),
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0ZWdvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9ibG9nL21vZGVscy9jYXRlZ29yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxREFBaUQ7QUFFcEMsUUFBQSxZQUFZLEdBQVEsYUFBSyxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUU7SUFDN0QsRUFBRSxFQUFFLGFBQUssQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxVQUFVLEVBQUU7SUFDN0MsSUFBSSxFQUFFLGFBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxVQUFVLEVBQUU7SUFDL0IsTUFBTSxFQUFFLGFBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUU7SUFDN0IsV0FBVyxFQUFFLGFBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDcEMsS0FBSyxFQUFFLGFBQUssQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsRUFBRTtRQUN4RCxRQUFRLEVBQUUsWUFBWTtLQUN2QixDQUFDO0NBQ0gsQ0FBQyxDQUFBIn0=