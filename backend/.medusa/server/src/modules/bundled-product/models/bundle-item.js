"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BundleItem = void 0;
const utils_1 = require("@medusajs/framework/utils");
const bundle_1 = require("./bundle");
exports.BundleItem = utils_1.model.define("bundle_item", {
    id: utils_1.model.id().primaryKey(),
    quantity: utils_1.model.number().default(1),
    bundle: utils_1.model.belongsTo(() => bundle_1.Bundle, {
        mappedBy: "items",
    }),
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLWl0ZW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9idW5kbGVkLXByb2R1Y3QvbW9kZWxzL2J1bmRsZS1pdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFEQUFpRDtBQUNqRCxxQ0FBaUM7QUFFcEIsUUFBQSxVQUFVLEdBQUcsYUFBSyxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUU7SUFDcEQsRUFBRSxFQUFFLGFBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxVQUFVLEVBQUU7SUFDM0IsUUFBUSxFQUFFLGFBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ25DLE1BQU0sRUFBRSxhQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLGVBQU0sRUFBRTtRQUNwQyxRQUFRLEVBQUUsT0FBTztLQUNsQixDQUFDO0NBQ0gsQ0FBQyxDQUFBIn0=