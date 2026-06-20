"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareBundleCartDataStep = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const utils_1 = require("@medusajs/framework/utils");
exports.prepareBundleCartDataStep = (0, workflows_sdk_1.createStep)("prepare-bundle-cart-data", async ({ bundle, quantity, items }) => {
    const bundleItems = bundle.items.map((item) => {
        const selectedItem = items.find((i) => i.item_id === item.id);
        if (!selectedItem) {
            throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, `No variant selected for bundle item ${item.id}`);
        }
        const variant = item.product.variants.find((v) => v.id === selectedItem.variant_id);
        if (!variant) {
            throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, `Variant ${selectedItem.variant_id} is invalid for bundle item ${item.id}`);
        }
        return {
            variant_id: selectedItem.variant_id,
            quantity: item.quantity * quantity,
            metadata: {
                bundle_id: bundle.id,
                quantity: quantity
            }
        };
    });
    return new workflows_sdk_1.StepResponse(bundleItems);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlcGFyZS1idW5kbGUtY2FydC1kYXRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3dvcmtmbG93cy9zdGVwcy9wcmVwYXJlLWJ1bmRsZS1jYXJ0LWRhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEscUVBQTRFO0FBQzVFLHFEQUF1RDtBQWtCMUMsUUFBQSx5QkFBeUIsR0FBRyxJQUFBLDBCQUFVLEVBQ2pELDBCQUEwQixFQUMxQixLQUFLLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBa0MsRUFBRSxFQUFFO0lBQ3BFLE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBMkIsRUFBRSxFQUFFO1FBQ25FLE1BQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQzdELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUNsQixNQUFNLElBQUksbUJBQVcsQ0FDbkIsbUJBQVcsQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUM5Qix1Q0FBdUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUNqRCxDQUFBO1FBQ0gsQ0FBQztRQUNELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDbkYsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ2IsTUFBTSxJQUFJLG1CQUFXLENBQ25CLG1CQUFXLENBQUMsS0FBSyxDQUFDLFlBQVksRUFDOUIsV0FBVyxZQUFZLENBQUMsVUFBVSwrQkFBK0IsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUMzRSxDQUFBO1FBQ0gsQ0FBQztRQUNELE9BQU87WUFDTCxVQUFVLEVBQUUsWUFBWSxDQUFDLFVBQVU7WUFDbkMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUTtZQUNsQyxRQUFRLEVBQUU7Z0JBQ1IsU0FBUyxFQUFFLE1BQU0sQ0FBQyxFQUFFO2dCQUNwQixRQUFRLEVBQUUsUUFBUTthQUNuQjtTQUNGLENBQUE7SUFDSCxDQUFDLENBQUMsQ0FBQTtJQUVGLE9BQU8sSUFBSSw0QkFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFBO0FBQ3RDLENBQUMsQ0FDRixDQUFBIn0=