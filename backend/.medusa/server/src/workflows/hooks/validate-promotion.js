"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_flows_1 = require("@medusajs/medusa/core-flows");
const constants_1 = require("../../constants");
const utils_1 = require("@medusajs/framework/utils");
core_flows_1.updateCartPromotionsWorkflow.hooks.validate((async ({ input, cart }, { container }) => {
    const hasFirstPurchasePromo = input.promo_codes?.some((code) => code === constants_1.FIRST_PURCHASE_PROMOTION_CODE);
    if (!hasFirstPurchasePromo) {
        return;
    }
    if (!cart.customer_id) {
        throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, "First purchase discount can only be applied to carts with a customer");
    }
    const query = container.resolve("query");
    const { data: [customer] } = await query.graph({
        entity: "customer",
        fields: ["orders.*", "has_account"],
        filters: {
            id: cart.customer_id
        }
    });
    if (!customer.has_account || (customer?.orders?.length || 0) > 0) {
        throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, "First purchase discount can only be applied to carts with no previous orders");
    }
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGUtcHJvbW90aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3dvcmtmbG93cy9ob29rcy92YWxpZGF0ZS1wcm9tb3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0REFHb0M7QUFDcEMsK0NBQStEO0FBQy9ELHFEQUF1RDtBQUV2RCx5Q0FBNEIsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUN6QyxDQUFDLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUU7SUFDeEMsTUFBTSxxQkFBcUIsR0FBRyxLQUFLLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxLQUFLLHlDQUE2QixDQUFDLENBQUE7SUFFdkcsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDM0IsT0FBTTtJQUNSLENBQUM7SUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3RCLE1BQU0sSUFBSSxtQkFBVyxDQUNuQixtQkFBVyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQzlCLHNFQUFzRSxDQUN2RSxDQUFBO0lBQ0gsQ0FBQztJQUNELE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUE7SUFFeEMsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEdBQUcsTUFBTSxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQzdDLE1BQU0sRUFBRSxVQUFVO1FBQ2xCLE1BQU0sRUFBRSxDQUFDLFVBQVUsRUFBRSxhQUFhLENBQUM7UUFDbkMsT0FBTyxFQUFFO1lBQ1AsRUFBRSxFQUFFLElBQUksQ0FBQyxXQUFXO1NBQ3JCO0tBQ0YsQ0FBQyxDQUFBO0lBRUYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLElBQUksQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztRQUNqRSxNQUFNLElBQUksbUJBQVcsQ0FDbkIsbUJBQVcsQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUM5Qiw4RUFBOEUsQ0FDL0UsQ0FBQTtJQUNILENBQUM7QUFDSCxDQUFDLENBQUMsQ0FDSCxDQUFBIn0=