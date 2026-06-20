"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCartCancelationStep = void 0;
const utils_1 = require("@medusajs/framework/utils");
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
exports.validateCartCancelationStep = (0, workflows_sdk_1.createStep)("validate-cart-cancelation", async ({ cart }) => {
    if (cart.metadata?.checkout_session_canceled) {
        throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, "Cart is already canceled");
    }
    if (!!cart.order) {
        throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, "Cart is already associated with an order");
    }
    const invalidPaymentSessions = cart.payment_collection?.payment_sessions
        ?.some((session) => session.status === "authorized" || session.status === "canceled");
    if (!!cart.completed_at || !!invalidPaymentSessions) {
        throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, "Cart cannot be canceled");
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGUtY2FydC1jYW5jZWxhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy93b3JrZmxvd3Mvc3RlcHMvdmFsaWRhdGUtY2FydC1jYW5jZWxhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxxREFBdUQ7QUFDdkQscUVBQThEO0FBU2pELFFBQUEsMkJBQTJCLEdBQUcsSUFBQSwwQkFBVSxFQUNuRCwyQkFBMkIsRUFDM0IsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFvQyxFQUFFLEVBQUU7SUFDbkQsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLHlCQUF5QixFQUFFLENBQUM7UUFDN0MsTUFBTSxJQUFJLG1CQUFXLENBQ25CLG1CQUFXLENBQUMsS0FBSyxDQUFDLFlBQVksRUFDOUIsMEJBQTBCLENBQzNCLENBQUE7SUFDSCxDQUFDO0lBQ0QsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2pCLE1BQU0sSUFBSSxtQkFBVyxDQUNuQixtQkFBVyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQzlCLDBDQUEwQyxDQUMzQyxDQUFBO0lBQ0gsQ0FBQztJQUNELE1BQU0sc0JBQXNCLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixFQUFFLGdCQUFnQjtRQUN0RSxFQUFFLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sS0FBSyxZQUFZLElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxVQUFVLENBQUMsQ0FBQTtJQUV2RixJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxJQUFJLENBQUMsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1FBQ3BELE1BQU0sSUFBSSxtQkFBVyxDQUNuQixtQkFBVyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQzlCLHlCQUF5QixDQUMxQixDQUFBO0lBQ0gsQ0FBQztBQUNILENBQUMsQ0FDRixDQUFBIn0=