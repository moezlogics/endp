"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCartLoyaltyPromoStep = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const promo_1 = require("../../utils/promo");
const utils_1 = require("@medusajs/framework/utils");
exports.getCartLoyaltyPromoStep = (0, workflows_sdk_1.createStep)("get-cart-loyalty-promo", async ({ cart, throwErrorOn }) => {
    const loyaltyPromo = (0, promo_1.getCartLoyaltyPromotion)(cart);
    if (throwErrorOn === "found" && loyaltyPromo) {
        throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, "Loyalty promotion already applied to cart");
    }
    else if (throwErrorOn === "not-found" && !loyaltyPromo) {
        throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, "No loyalty promotion found on cart");
    }
    return new workflows_sdk_1.StepResponse(loyaltyPromo);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LWNhcnQtbG95YWx0eS1wcm9tby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy93b3JrZmxvd3Mvc3RlcHMvZ2V0LWNhcnQtbG95YWx0eS1wcm9tby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxRUFBNEU7QUFDNUUsNkNBQXFFO0FBQ3JFLHFEQUF1RDtBQU8xQyxRQUFBLHVCQUF1QixHQUFHLElBQUEsMEJBQVUsRUFDL0Msd0JBQXdCLEVBQ3hCLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQWdDLEVBQUUsRUFBRTtJQUM3RCxNQUFNLFlBQVksR0FBRyxJQUFBLCtCQUF1QixFQUFDLElBQUksQ0FBQyxDQUFBO0lBRWxELElBQUksWUFBWSxLQUFLLE9BQU8sSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM3QyxNQUFNLElBQUksbUJBQVcsQ0FDbkIsbUJBQVcsQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUM5QiwyQ0FBMkMsQ0FDNUMsQ0FBQTtJQUNILENBQUM7U0FBTSxJQUFJLFlBQVksS0FBSyxXQUFXLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN6RCxNQUFNLElBQUksbUJBQVcsQ0FDbkIsbUJBQVcsQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUM5QixvQ0FBb0MsQ0FDckMsQ0FBQTtJQUNILENBQUM7SUFFRCxPQUFPLElBQUksNEJBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQTtBQUN2QyxDQUFDLENBQ0YsQ0FBQSJ9