"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPurchaseAsPointsStep = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const loyalty_1 = require("../../modules/loyalty");
exports.addPurchaseAsPointsStep = (0, workflows_sdk_1.createStep)("add-purchase-as-points", async (input, { container }) => {
    const loyaltyModuleService = container.resolve(loyalty_1.LOYALTY_MODULE);
    // EARN conversion: 2 points per 100 currency units of cash spent.
    // Caller passes `amount = order.item_subtotal − loyalty_amount`
    // so only the cash portion of the order earns points (the
    // loyalty-redeemed slice doesn't compound back into the balance).
    const pointsToAdd = await loyaltyModuleService.calculateEarnPoints(input.amount);
    const result = await loyaltyModuleService.addPoints(input.customer_id, pointsToAdd, {
        kind: "earn",
        order_id: input.order_id || null,
        description: input.order_id
            ? `Earned from order #${input.order_id.slice(-8)}`
            : "Earned points",
    });
    return new workflows_sdk_1.StepResponse(result, {
        customer_id: input.customer_id,
        points: pointsToAdd
    });
}, async (data, { container }) => {
    if (!data) {
        return;
    }
    const loyaltyModuleService = container.resolve(loyalty_1.LOYALTY_MODULE);
    await loyaltyModuleService.deductPoints(data.customer_id, data.points);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLXB1cmNoYXNlLWFzLXBvaW50cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy93b3JrZmxvd3Mvc3RlcHMvYWRkLXB1cmNoYXNlLWFzLXBvaW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxRUFHMEM7QUFDMUMsbURBQXNEO0FBU3pDLFFBQUEsdUJBQXVCLEdBQUcsSUFBQSwwQkFBVSxFQUMvQyx3QkFBd0IsRUFDeEIsS0FBSyxFQUFFLEtBQWdCLEVBQUUsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFO0lBQ3hDLE1BQU0sb0JBQW9CLEdBQXlCLFNBQVMsQ0FBQyxPQUFPLENBQ2xFLHdCQUFjLENBQ2YsQ0FBQTtJQUVELGtFQUFrRTtJQUNsRSxnRUFBZ0U7SUFDaEUsMERBQTBEO0lBQzFELGtFQUFrRTtJQUNsRSxNQUFNLFdBQVcsR0FBRyxNQUFNLG9CQUFvQixDQUFDLG1CQUFtQixDQUNoRSxLQUFLLENBQUMsTUFBTSxDQUNiLENBQUE7SUFFRCxNQUFNLE1BQU0sR0FBRyxNQUFNLG9CQUFvQixDQUFDLFNBQVMsQ0FDakQsS0FBSyxDQUFDLFdBQVcsRUFDakIsV0FBVyxFQUNYO1FBQ0UsSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsS0FBSyxDQUFDLFFBQVEsSUFBSSxJQUFJO1FBQ2hDLFdBQVcsRUFBRSxLQUFLLENBQUMsUUFBUTtZQUN6QixDQUFDLENBQUMsc0JBQXNCLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDbEQsQ0FBQyxDQUFDLGVBQWU7S0FDcEIsQ0FDRixDQUFBO0lBRUQsT0FBTyxJQUFJLDRCQUFZLENBQUMsTUFBTSxFQUFFO1FBQzlCLFdBQVcsRUFBRSxLQUFLLENBQUMsV0FBVztRQUM5QixNQUFNLEVBQUUsV0FBVztLQUNwQixDQUFDLENBQUE7QUFDSixDQUFDLEVBQ0QsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUU7SUFDNUIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1YsT0FBTTtJQUNSLENBQUM7SUFFRCxNQUFNLG9CQUFvQixHQUF5QixTQUFTLENBQUMsT0FBTyxDQUNsRSx3QkFBYyxDQUNmLENBQUE7SUFFRCxNQUFNLG9CQUFvQixDQUFDLFlBQVksQ0FDckMsSUFBSSxDQUFDLFdBQVcsRUFDaEIsSUFBSSxDQUFDLE1BQU0sQ0FDWixDQUFBO0FBQ0gsQ0FBQyxDQUNGLENBQUEifQ==