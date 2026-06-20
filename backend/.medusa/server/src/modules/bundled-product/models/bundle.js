"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bundle = void 0;
const utils_1 = require("@medusajs/framework/utils");
const bundle_item_1 = require("./bundle-item");
exports.Bundle = utils_1.model.define("bundle", {
    id: utils_1.model.id().primaryKey(),
    title: utils_1.model.text(),
    items: utils_1.model.hasMany(() => bundle_item_1.BundleItem, {
        mappedBy: "bundle",
    }),
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvYnVuZGxlZC1wcm9kdWN0L21vZGVscy9idW5kbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscURBQWlEO0FBQ2pELCtDQUEwQztBQUU3QixRQUFBLE1BQU0sR0FBRyxhQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRTtJQUMzQyxFQUFFLEVBQUUsYUFBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLFVBQVUsRUFBRTtJQUMzQixLQUFLLEVBQUUsYUFBSyxDQUFDLElBQUksRUFBRTtJQUNuQixLQUFLLEVBQUUsYUFBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyx3QkFBVSxFQUFFO1FBQ3JDLFFBQVEsRUFBRSxRQUFRO0tBQ25CLENBQUM7Q0FDSCxDQUFDLENBQUEifQ==