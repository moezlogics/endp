"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCartLoyaltyPromoAmountStep = void 0;
const utils_1 = require("@medusajs/framework/utils");
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const loyalty_1 = require("../../modules/loyalty");
exports.getCartLoyaltyPromoAmountStep = (0, workflows_sdk_1.createStep)("get-cart-loyalty-promo-amount", async ({ cart }, { container }) => {
    // Check if customer has any loyalty points
    const loyaltyModuleService = container.resolve(loyalty_1.LOYALTY_MODULE);
    const loyaltyPoints = await loyaltyModuleService.getPoints(cart.customer.id);
    if (loyaltyPoints <= 0) {
        throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, "Customer has no loyalty points");
    }
    const pointsAmount = await loyaltyModuleService.calculatePointsFromAmount(loyaltyPoints);
    const amount = Math.min(pointsAmount, cart.total);
    return new workflows_sdk_1.StepResponse(amount);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LWNhcnQtbG95YWx0eS1wcm9tby1hbW91bnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvd29ya2Zsb3dzL3N0ZXBzL2dldC1jYXJ0LWxveWFsdHktcHJvbW8tYW1vdW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHFEQUF1RDtBQUN2RCxxRUFBNEU7QUFFNUUsbURBQXNEO0FBV3pDLFFBQUEsNkJBQTZCLEdBQUcsSUFBQSwwQkFBVSxFQUNyRCwrQkFBK0IsRUFDL0IsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFzQyxFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRTtJQUNwRSwyQ0FBMkM7SUFDM0MsTUFBTSxvQkFBb0IsR0FBeUIsU0FBUyxDQUFDLE9BQU8sQ0FDbEUsd0JBQWMsQ0FDZixDQUFBO0lBQ0QsTUFBTSxhQUFhLEdBQUcsTUFBTSxvQkFBb0IsQ0FBQyxTQUFTLENBQ3hELElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUNqQixDQUFBO0lBRUQsSUFBSSxhQUFhLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDdkIsTUFBTSxJQUFJLG1CQUFXLENBQ25CLG1CQUFXLENBQUMsS0FBSyxDQUFDLFlBQVksRUFDOUIsZ0NBQWdDLENBQ2pDLENBQUE7SUFDSCxDQUFDO0lBRUQsTUFBTSxZQUFZLEdBQUcsTUFBTSxvQkFBb0IsQ0FBQyx5QkFBeUIsQ0FDdkUsYUFBYSxDQUNkLENBQUE7SUFFRCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7SUFFakQsT0FBTyxJQUFJLDRCQUFZLENBQUMsTUFBTSxDQUFDLENBQUE7QUFDakMsQ0FBQyxDQUNGLENBQUEifQ==