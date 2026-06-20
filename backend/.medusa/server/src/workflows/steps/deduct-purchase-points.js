"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deductPurchasePointsStep = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const loyalty_1 = require("../../modules/loyalty");
exports.deductPurchasePointsStep = (0, workflows_sdk_1.createStep)("deduct-purchase-points", async ({ customer_id, amount }, { container }) => {
    const loyaltyModuleService = container.resolve(loyalty_1.LOYALTY_MODULE);
    const pointsToDeduct = await loyaltyModuleService.calculatePointsFromAmount(amount);
    const result = await loyaltyModuleService.deductPoints(customer_id, pointsToDeduct);
    return new workflows_sdk_1.StepResponse(result, {
        customer_id,
        points: pointsToDeduct
    });
}, async (data, { container }) => {
    if (!data) {
        return;
    }
    const loyaltyModuleService = container.resolve(loyalty_1.LOYALTY_MODULE);
    // Restore points in case of failure
    await loyaltyModuleService.addPoints(data.customer_id, data.points);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVkdWN0LXB1cmNoYXNlLXBvaW50cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy93b3JrZmxvd3Mvc3RlcHMvZGVkdWN0LXB1cmNoYXNlLXBvaW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxRUFHMEM7QUFDMUMsbURBQXNEO0FBUXpDLFFBQUEsd0JBQXdCLEdBQUcsSUFBQSwwQkFBVSxFQUNoRCx3QkFBd0IsRUFDeEIsS0FBSyxFQUFFLEVBQ0wsV0FBVyxFQUFFLE1BQU0sRUFDTyxFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRTtJQUM3QyxNQUFNLG9CQUFvQixHQUF5QixTQUFTLENBQUMsT0FBTyxDQUNsRSx3QkFBYyxDQUNmLENBQUE7SUFFRCxNQUFNLGNBQWMsR0FBRyxNQUFNLG9CQUFvQixDQUFDLHlCQUF5QixDQUN6RSxNQUFNLENBQ1AsQ0FBQTtJQUVELE1BQU0sTUFBTSxHQUFHLE1BQU0sb0JBQW9CLENBQUMsWUFBWSxDQUNwRCxXQUFXLEVBQ1gsY0FBYyxDQUNmLENBQUE7SUFFRCxPQUFPLElBQUksNEJBQVksQ0FBQyxNQUFNLEVBQUU7UUFDOUIsV0FBVztRQUNYLE1BQU0sRUFBRSxjQUFjO0tBQ3ZCLENBQUMsQ0FBQTtBQUNKLENBQUMsRUFDRCxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRTtJQUM1QixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDVixPQUFNO0lBQ1IsQ0FBQztJQUVELE1BQU0sb0JBQW9CLEdBQXlCLFNBQVMsQ0FBQyxPQUFPLENBQ2xFLHdCQUFjLENBQ2YsQ0FBQTtJQUVELG9DQUFvQztJQUNwQyxNQUFNLG9CQUFvQixDQUFDLFNBQVMsQ0FDbEMsSUFBSSxDQUFDLFdBQVcsRUFDaEIsSUFBSSxDQUFDLE1BQU0sQ0FDWixDQUFBO0FBQ0gsQ0FBQyxDQUNGLENBQUEifQ==