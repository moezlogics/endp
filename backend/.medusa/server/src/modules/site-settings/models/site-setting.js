"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteSetting = void 0;
const utils_1 = require("@medusajs/framework/utils");
exports.SiteSetting = utils_1.model.define("site_setting", {
    id: utils_1.model.id({ prefix: "sset" }).primaryKey(),
    key: utils_1.model.text().unique(),
    value: utils_1.model.text().nullable(),
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l0ZS1zZXR0aW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvc2l0ZS1zZXR0aW5ncy9tb2RlbHMvc2l0ZS1zZXR0aW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFEQUFpRDtBQUVwQyxRQUFBLFdBQVcsR0FBRyxhQUFLLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRTtJQUN0RCxFQUFFLEVBQUUsYUFBSyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLFVBQVUsRUFBRTtJQUM3QyxHQUFHLEVBQUUsYUFBSyxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRTtJQUMxQixLQUFLLEVBQUUsYUFBSyxDQUFDLElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRTtDQUMvQixDQUFDLENBQUEifQ==