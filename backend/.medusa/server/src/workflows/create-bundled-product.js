"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBundledProductWorkflow = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const create_bundle_1 = require("./steps/create-bundle");
const create_bundle_items_1 = require("./steps/create-bundle-items");
const core_flows_1 = require("@medusajs/medusa/core-flows");
const bundled_product_1 = require("../modules/bundled-product");
const utils_1 = require("@medusajs/framework/utils");
exports.createBundledProductWorkflow = (0, workflows_sdk_1.createWorkflow)("create-bundled-product", ({ bundle: bundleData }) => {
    const bundle = (0, create_bundle_1.createBundleStep)({
        title: bundleData.title,
    });
    const bundleItems = (0, create_bundle_items_1.createBundleItemsStep)({
        bundle_id: bundle.id,
        items: bundleData.items,
    });
    const bundleProduct = core_flows_1.createProductsWorkflow.runAsStep({
        input: {
            products: [bundleData.product],
        }
    });
    (0, core_flows_1.createRemoteLinkStep)([{
            [bundled_product_1.BUNDLED_PRODUCT_MODULE]: {
                bundle_id: bundle.id,
            },
            [utils_1.Modules.PRODUCT]: {
                product_id: bundleProduct[0].id,
            },
        }]);
    const bundleProducttemLinks = (0, workflows_sdk_1.transform)({
        bundleData,
        bundleItems
    }, (data) => {
        return data.bundleItems.map((item, index) => ({
            [bundled_product_1.BUNDLED_PRODUCT_MODULE]: {
                bundle_item_id: item.id,
            },
            [utils_1.Modules.PRODUCT]: {
                product_id: data.bundleData.items[index].product_id,
            },
        }));
    });
    (0, core_flows_1.createRemoteLinkStep)(bundleProducttemLinks).config({
        name: "create-bundle-product-items-links",
    });
    // retrieve bundle product wit items
    const { data } = (0, core_flows_1.useQueryGraphStep)({
        entity: "bundle",
        fields: ["*", "items.*"],
        filters: {
            id: bundle.id,
        },
    });
    return new workflows_sdk_1.WorkflowResponse(data[0]);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWJ1bmRsZWQtcHJvZHVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy93b3JrZmxvd3MvY3JlYXRlLWJ1bmRsZWQtcHJvZHVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxxRUFBK0Y7QUFDL0YseURBQXdEO0FBQ3hELHFFQUFtRTtBQUNuRSw0REFBNkc7QUFDN0csZ0VBQW1FO0FBQ25FLHFEQUFtRDtBQWF0QyxRQUFBLDRCQUE0QixHQUFHLElBQUEsOEJBQWMsRUFDeEQsd0JBQXdCLEVBQ3hCLENBQUMsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFxQyxFQUFFLEVBQUU7SUFDNUQsTUFBTSxNQUFNLEdBQUcsSUFBQSxnQ0FBZ0IsRUFBQztRQUM5QixLQUFLLEVBQUUsVUFBVSxDQUFDLEtBQUs7S0FDeEIsQ0FBQyxDQUFBO0lBRUYsTUFBTSxXQUFXLEdBQUcsSUFBQSwyQ0FBcUIsRUFBQztRQUN4QyxTQUFTLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDcEIsS0FBSyxFQUFFLFVBQVUsQ0FBQyxLQUFLO0tBQ3hCLENBQUMsQ0FBQTtJQUVGLE1BQU0sYUFBYSxHQUFHLG1DQUFzQixDQUFDLFNBQVMsQ0FBQztRQUNyRCxLQUFLLEVBQUU7WUFDTCxRQUFRLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDO1NBQy9CO0tBQ0YsQ0FBQyxDQUFBO0lBRUYsSUFBQSxpQ0FBb0IsRUFBQyxDQUFDO1lBQ3BCLENBQUMsd0NBQXNCLENBQUMsRUFBRTtnQkFDeEIsU0FBUyxFQUFFLE1BQU0sQ0FBQyxFQUFFO2FBQ3JCO1lBQ0QsQ0FBQyxlQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ2pCLFVBQVUsRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTthQUNoQztTQUNGLENBQUMsQ0FBQyxDQUFBO0lBRUgsTUFBTSxxQkFBcUIsR0FBRyxJQUFBLHlCQUFTLEVBQUM7UUFDdEMsVUFBVTtRQUNWLFdBQVc7S0FDWixFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDVixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztZQUM1QyxDQUFDLHdDQUFzQixDQUFDLEVBQUU7Z0JBQ3hCLGNBQWMsRUFBRSxJQUFJLENBQUMsRUFBRTthQUN4QjtZQUNELENBQUMsZUFBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNqQixVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsVUFBVTthQUNwRDtTQUNGLENBQUMsQ0FBQyxDQUFBO0lBQ0wsQ0FBQyxDQUFDLENBQUE7SUFFRixJQUFBLGlDQUFvQixFQUFDLHFCQUFxQixDQUFDLENBQUMsTUFBTSxDQUFDO1FBQ2pELElBQUksRUFBRSxtQ0FBbUM7S0FDMUMsQ0FBQyxDQUFBO0lBRUYsb0NBQW9DO0lBQ3BDLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxJQUFBLDhCQUFpQixFQUFDO1FBQ2pDLE1BQU0sRUFBRSxRQUFRO1FBQ2hCLE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUM7UUFDeEIsT0FBTyxFQUFFO1lBQ1AsRUFBRSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1NBQ2Q7S0FDRixDQUFDLENBQUE7SUFFRixPQUFPLElBQUksZ0NBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDdEMsQ0FBQyxDQUNGLENBQUEifQ==