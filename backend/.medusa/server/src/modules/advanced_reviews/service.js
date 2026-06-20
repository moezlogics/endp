"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@medusajs/framework/utils");
// Aliased so MedusaService auto-generates `listAndCountAdvancedReviews`,
// `createAdvancedReviews`, `updateAdvancedReviews`, etc. — the names every
// route in /api/(store|admin)/(reviews|advanced-reviews) already calls.
// Without this alias the methods would be `listAndCountReviews`, breaking
// product detail pages with a TypeError on every PDP load.
const review_1 = require("./models/review");
class AdvancedReviewsModuleService extends (0, utils_1.MedusaService)({
    AdvancedReview: review_1.Review,
}) {
}
exports.default = AdvancedReviewsModuleService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2FkdmFuY2VkX3Jldmlld3Mvc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFEQUF5RDtBQUN6RCx5RUFBeUU7QUFDekUsMkVBQTJFO0FBQzNFLHdFQUF3RTtBQUN4RSwwRUFBMEU7QUFDMUUsMkRBQTJEO0FBQzNELDRDQUEwRDtBQUUxRCxNQUFxQiw0QkFBNkIsU0FBUSxJQUFBLHFCQUFhLEVBQUM7SUFDdEUsY0FBYyxFQUFkLGVBQWM7Q0FDZixDQUFDO0NBQUc7QUFGTCwrQ0FFSyJ9