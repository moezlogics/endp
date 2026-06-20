"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBundleItemsStep = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const bundled_product_1 = require("../../modules/bundled-product");
exports.createBundleItemsStep = (0, workflows_sdk_1.createStep)("create-bundle-items", async ({ bundle_id, items }, { container }) => {
    const bundledProductModuleService = container.resolve(bundled_product_1.BUNDLED_PRODUCT_MODULE);
    const bundleItems = await bundledProductModuleService.createBundleItems(items.map(item => ({
        bundle_id,
        quantity: item.quantity,
    })));
    return new workflows_sdk_1.StepResponse(bundleItems, bundleItems.map(item => item.id));
}, async (itemIds, { container }) => {
    if (!itemIds?.length) {
        return;
    }
    const bundledProductModuleService = container.resolve(bundled_product_1.BUNDLED_PRODUCT_MODULE);
    await bundledProductModuleService.deleteBundleItems(itemIds);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWJ1bmRsZS1pdGVtcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy93b3JrZmxvd3Mvc3RlcHMvY3JlYXRlLWJ1bmRsZS1pdGVtcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxRUFBNEU7QUFDNUUsbUVBQXNFO0FBVXpELFFBQUEscUJBQXFCLEdBQUcsSUFBQSwwQkFBVSxFQUM3QyxxQkFBcUIsRUFDckIsS0FBSyxFQUFFLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBOEIsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUU7SUFDeEUsTUFBTSwyQkFBMkIsR0FBZ0MsU0FBUyxDQUFDLE9BQU8sQ0FDaEYsd0NBQXNCLENBQ3ZCLENBQUE7SUFFRCxNQUFNLFdBQVcsR0FBRyxNQUFNLDJCQUEyQixDQUFDLGlCQUFpQixDQUNyRSxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNqQixTQUFTO1FBQ1QsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO0tBQ3hCLENBQUMsQ0FBQyxDQUNKLENBQUE7SUFFRCxPQUFPLElBQUksNEJBQVksQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO0FBQ3hFLENBQUMsRUFDRCxLQUFLLEVBQUUsT0FBTyxFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRTtJQUMvQixJQUFJLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDO1FBQ3JCLE9BQU07SUFDUixDQUFDO0lBRUQsTUFBTSwyQkFBMkIsR0FBZ0MsU0FBUyxDQUFDLE9BQU8sQ0FDaEYsd0NBQXNCLENBQ3ZCLENBQUE7SUFFRCxNQUFNLDJCQUEyQixDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBQzlELENBQUMsQ0FDRixDQUFBIn0=