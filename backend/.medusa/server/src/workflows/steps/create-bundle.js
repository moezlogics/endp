"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBundleStep = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const bundled_product_1 = require("../../modules/bundled-product");
exports.createBundleStep = (0, workflows_sdk_1.createStep)("create-bundle", async ({ title }, { container }) => {
    const bundledProductModuleService = container.resolve(bundled_product_1.BUNDLED_PRODUCT_MODULE);
    const bundle = await bundledProductModuleService.createBundles({
        title,
    });
    return new workflows_sdk_1.StepResponse(bundle, bundle.id);
}, async (bundleId, { container }) => {
    if (!bundleId) {
        return;
    }
    const bundledProductModuleService = container.resolve(bundled_product_1.BUNDLED_PRODUCT_MODULE);
    await bundledProductModuleService.deleteBundles(bundleId);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWJ1bmRsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy93b3JrZmxvd3Mvc3RlcHMvY3JlYXRlLWJ1bmRsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxRUFBNEU7QUFFNUUsbUVBQXNFO0FBTXpELFFBQUEsZ0JBQWdCLEdBQUcsSUFBQSwwQkFBVSxFQUN4QyxlQUFlLEVBQ2YsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUF5QixFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRTtJQUN4RCxNQUFNLDJCQUEyQixHQUMvQixTQUFTLENBQUMsT0FBTyxDQUFDLHdDQUFzQixDQUFDLENBQUE7SUFFM0MsTUFBTSxNQUFNLEdBQUcsTUFBTSwyQkFBMkIsQ0FBQyxhQUFhLENBQUM7UUFDN0QsS0FBSztLQUNOLENBQUMsQ0FBQTtJQUVGLE9BQU8sSUFBSSw0QkFBWSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUE7QUFDNUMsQ0FBQyxFQUNELEtBQUssRUFBRSxRQUFRLEVBQUUsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFO0lBQ2hDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNkLE9BQU07SUFDUixDQUFDO0lBQ0QsTUFBTSwyQkFBMkIsR0FDL0IsU0FBUyxDQUFDLE9BQU8sQ0FBQyx3Q0FBc0IsQ0FBQyxDQUFBO0lBRTNDLE1BQU0sMkJBQTJCLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0FBQzNELENBQUMsQ0FDRixDQUFBIn0=