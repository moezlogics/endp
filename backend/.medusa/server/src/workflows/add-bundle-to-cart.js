"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addBundleToCartWorkflow = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const core_flows_1 = require("@medusajs/medusa/core-flows");
const prepare_bundle_cart_data_1 = require("./steps/prepare-bundle-cart-data");
exports.addBundleToCartWorkflow = (0, workflows_sdk_1.createWorkflow)("add-bundle-to-cart", ({ cart_id, bundle_id, quantity, items }) => {
    const { data } = (0, core_flows_1.useQueryGraphStep)({
        entity: "bundle",
        fields: [
            "id",
            "items.*",
            "items.product.*",
            "items.product.variants.*"
        ],
        filters: {
            id: bundle_id
        },
        options: {
            throwIfKeyNotFound: true
        }
    });
    const itemsToAdd = (0, prepare_bundle_cart_data_1.prepareBundleCartDataStep)({
        bundle: data[0],
        quantity,
        items
    });
    (0, core_flows_1.acquireLockStep)({
        key: cart_id,
        timeout: 2,
        ttl: 10,
    });
    core_flows_1.addToCartWorkflow.runAsStep({
        input: {
            cart_id,
            items: itemsToAdd
        }
    });
    const { data: updatedCarts } = (0, core_flows_1.useQueryGraphStep)({
        entity: "cart",
        filters: { id: cart_id },
        fields: ["id", "items.*"],
    }).config({ name: "refetch-cart" });
    (0, core_flows_1.releaseLockStep)({
        key: cart_id,
    });
    return new workflows_sdk_1.WorkflowResponse(updatedCarts[0]);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLWJ1bmRsZS10by1jYXJ0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3dvcmtmbG93cy9hZGQtYnVuZGxlLXRvLWNhcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUVBQW9GO0FBQ3BGLDREQUFvSDtBQUNwSCwrRUFBNEc7QUFZL0YsUUFBQSx1QkFBdUIsR0FBRyxJQUFBLDhCQUFjLEVBQ25ELG9CQUFvQixFQUNwQixDQUFDLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFnQyxFQUFFLEVBQUU7SUFDeEUsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLElBQUEsOEJBQWlCLEVBQUM7UUFDakMsTUFBTSxFQUFFLFFBQVE7UUFDaEIsTUFBTSxFQUFFO1lBQ04sSUFBSTtZQUNKLFNBQVM7WUFDVCxpQkFBaUI7WUFDakIsMEJBQTBCO1NBQzNCO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsRUFBRSxFQUFFLFNBQVM7U0FDZDtRQUNELE9BQU8sRUFBRTtZQUNQLGtCQUFrQixFQUFFLElBQUk7U0FDekI7S0FDRixDQUFDLENBQUE7SUFFRixNQUFNLFVBQVUsR0FBRyxJQUFBLG9EQUF5QixFQUFDO1FBQzNDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2YsUUFBUTtRQUNSLEtBQUs7S0FDdUMsQ0FBQyxDQUFBO0lBRS9DLElBQUEsNEJBQWUsRUFBQztRQUNkLEdBQUcsRUFBRSxPQUFPO1FBQ1osT0FBTyxFQUFFLENBQUM7UUFDVixHQUFHLEVBQUUsRUFBRTtLQUNSLENBQUMsQ0FBQTtJQUVGLDhCQUFpQixDQUFDLFNBQVMsQ0FBQztRQUMxQixLQUFLLEVBQUU7WUFDTCxPQUFPO1lBQ1AsS0FBSyxFQUFFLFVBQVU7U0FDbEI7S0FDRixDQUFDLENBQUE7SUFFRixNQUFNLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxHQUFHLElBQUEsOEJBQWlCLEVBQUM7UUFDL0MsTUFBTSxFQUFFLE1BQU07UUFDZCxPQUFPLEVBQUUsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFO1FBQ3hCLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUM7S0FDMUIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsQ0FBQyxDQUFBO0lBRW5DLElBQUEsNEJBQWUsRUFBQztRQUNkLEdBQUcsRUFBRSxPQUFPO0tBQ2IsQ0FBQyxDQUFBO0lBRUYsT0FBTyxJQUFJLGdDQUFnQixDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQzlDLENBQUMsQ0FDRixDQUFBIn0=