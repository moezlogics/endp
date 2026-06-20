"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CUSTOMER_ID_PROMOTION_RULE_ATTRIBUTE = void 0;
exports.getCartLoyaltyPromotion = getCartLoyaltyPromotion;
exports.orderHasLoyaltyPromotion = orderHasLoyaltyPromotion;
exports.CUSTOMER_ID_PROMOTION_RULE_ATTRIBUTE = "customer_id";
function getCartLoyaltyPromotion(cart) {
    if (!cart?.metadata?.loyalty_promo_id) {
        return;
    }
    return cart.promotions?.find((promotion) => promotion.id === cart.metadata.loyalty_promo_id);
}
function orderHasLoyaltyPromotion(order) {
    const loyaltyPromotion = getCartLoyaltyPromotion(order.cart);
    return loyaltyPromotion?.rules?.some((rule) => {
        return rule?.attribute === exports.CUSTOMER_ID_PROMOTION_RULE_ATTRIBUTE && (rule?.values?.some((value) => value.value === order.customer?.id) || false);
    }) || false;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvbW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdXRpbHMvcHJvbW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBa0JBLDBEQVFDO0FBRUQsNERBUUM7QUFwQlksUUFBQSxvQ0FBb0MsR0FBRyxhQUFhLENBQUE7QUFFakUsU0FBZ0IsdUJBQXVCLENBQUMsSUFBYztJQUNwRCxJQUFJLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3RDLE9BQU07SUFDUixDQUFDO0lBRUQsT0FBTyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FDMUIsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FDL0QsQ0FBQTtBQUNILENBQUM7QUFFRCxTQUFnQix3QkFBd0IsQ0FBQyxLQUFnQjtJQUN2RCxNQUFNLGdCQUFnQixHQUFHLHVCQUF1QixDQUFDLEtBQUssQ0FBQyxJQUEyQixDQUFDLENBQUE7SUFFbkYsT0FBTyxnQkFBZ0IsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDNUMsT0FBTyxJQUFJLEVBQUUsU0FBUyxLQUFLLDRDQUFvQyxJQUFJLENBQ2pFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLElBQUksS0FBSyxDQUMzRSxDQUFBO0lBQ0gsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFBO0FBQ2IsQ0FBQyJ9