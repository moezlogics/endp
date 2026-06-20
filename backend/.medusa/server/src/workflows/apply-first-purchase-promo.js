"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyFirstPurchasePromoWorkflow = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const core_flows_1 = require("@medusajs/medusa/core-flows");
const constants_1 = require("../constants");
const utils_1 = require("@medusajs/framework/utils");
exports.applyFirstPurchasePromoWorkflow = (0, workflows_sdk_1.createWorkflow)("apply-first-purchase-promo", (input) => {
    const { data: carts } = (0, core_flows_1.useQueryGraphStep)({
        entity: "cart",
        fields: ["promotions.*", "customer.*", "customer.orders.*"],
        filters: {
            id: input.cart_id
        }
    });
    const { data: promotions } = (0, core_flows_1.useQueryGraphStep)({
        entity: "promotion",
        fields: ["code"],
        filters: {
            code: constants_1.FIRST_PURCHASE_PROMOTION_CODE
        }
    }).config({ name: "retrieve-promotions" });
    (0, workflows_sdk_1.when)({
        carts,
        promotions
    }, (data) => {
        return data.promotions.length > 0 &&
            !data.carts[0].promotions?.some((promo) => promo?.id === data.promotions[0].id) &&
            data.carts[0].customer !== null &&
            data.carts[0].customer.orders?.length === 0;
    })
        .then(() => {
        (0, core_flows_1.updateCartPromotionsStep)({
            id: carts[0].id,
            promo_codes: [promotions[0].code],
            action: utils_1.PromotionActions.ADD
        });
    });
    // retrieve updated cart
    const { data: updatedCarts } = (0, core_flows_1.useQueryGraphStep)({
        entity: "cart",
        fields: ["*", "promotions.*"],
        filters: {
            id: input.cart_id
        }
    }).config({ name: "retrieve-updated-cart" });
    return new workflows_sdk_1.WorkflowResponse(updatedCarts[0]);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbHktZmlyc3QtcHVyY2hhc2UtcHJvbW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvd29ya2Zsb3dzL2FwcGx5LWZpcnN0LXB1cmNoYXNlLXByb21vLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFFQUEwRjtBQUMxRiw0REFBeUY7QUFDekYsNENBQTREO0FBQzVELHFEQUE0RDtBQU0vQyxRQUFBLCtCQUErQixHQUFHLElBQUEsOEJBQWMsRUFDM0QsNEJBQTRCLEVBQzVCLENBQUMsS0FBb0IsRUFBRSxFQUFFO0lBQ3ZCLE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsSUFBQSw4QkFBaUIsRUFBQztRQUN4QyxNQUFNLEVBQUUsTUFBTTtRQUNkLE1BQU0sRUFBRSxDQUFDLGNBQWMsRUFBRSxZQUFZLEVBQUUsbUJBQW1CLENBQUM7UUFDM0QsT0FBTyxFQUFFO1lBQ1AsRUFBRSxFQUFFLEtBQUssQ0FBQyxPQUFPO1NBQ2xCO0tBQ0YsQ0FBQyxDQUFBO0lBRUYsTUFBTSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsR0FBRyxJQUFBLDhCQUFpQixFQUFDO1FBQzdDLE1BQU0sRUFBRSxXQUFXO1FBQ25CLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQztRQUNoQixPQUFPLEVBQUU7WUFDUCxJQUFJLEVBQUUseUNBQTZCO1NBQ3BDO0tBQ0YsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxxQkFBcUIsRUFBRSxDQUFDLENBQUE7SUFFMUMsSUFBQSxvQkFBSSxFQUFDO1FBQ0gsS0FBSztRQUNMLFVBQVU7S0FDWCxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDVixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUM7WUFDL0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFLEtBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDL0UsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEtBQUssSUFBSTtZQUMvQixJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsTUFBTSxLQUFLLENBQUMsQ0FBQTtJQUMvQyxDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsR0FBRyxFQUFFO1FBQ1QsSUFBQSxxQ0FBd0IsRUFBQztZQUN2QixFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDZixXQUFXLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSyxDQUFDO1lBQ2xDLE1BQU0sRUFBRSx3QkFBZ0IsQ0FBQyxHQUFHO1NBQzdCLENBQUMsQ0FBQTtJQUNKLENBQUMsQ0FBQyxDQUFBO0lBRUYsd0JBQXdCO0lBQ3hCLE1BQU0sRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEdBQUcsSUFBQSw4QkFBaUIsRUFBQztRQUMvQyxNQUFNLEVBQUUsTUFBTTtRQUNkLE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRSxjQUFjLENBQUM7UUFDN0IsT0FBTyxFQUFFO1lBQ1AsRUFBRSxFQUFFLEtBQUssQ0FBQyxPQUFPO1NBQ2xCO0tBQ0YsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksRUFBRSx1QkFBdUIsRUFBRSxDQUFDLENBQUE7SUFFNUMsT0FBTyxJQUFJLGdDQUFnQixDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQzlDLENBQUMsQ0FDRixDQUFBIn0=