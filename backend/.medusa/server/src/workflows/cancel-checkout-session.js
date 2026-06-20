"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelCheckoutSessionWorkflow = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const validate_cart_cancelation_1 = require("./steps/validate-cart-cancelation");
const core_flows_1 = require("@medusajs/medusa/core-flows");
const cancel_payment_sessions_1 = require("./steps/cancel-payment-sessions");
const prepare_checkout_session_data_1 = require("./prepare-checkout-session-data");
exports.cancelCheckoutSessionWorkflow = (0, workflows_sdk_1.createWorkflow)("cancel-checkout-session", (input) => {
    const { data: carts } = (0, core_flows_1.useQueryGraphStep)({
        entity: "cart",
        fields: [
            "id",
            "payment_collection.*",
            "payment_collection.payment_sessions.*",
            "order.id"
        ],
        filters: {
            id: input.cart_id,
        },
        options: {
            throwIfKeyNotFound: true,
        }
    });
    (0, validate_cart_cancelation_1.validateCartCancelationStep)({
        cart: carts[0],
    });
    (0, core_flows_1.acquireLockStep)({
        key: input.cart_id,
        timeout: 2,
        ttl: 10,
    });
    (0, workflows_sdk_1.when)({
        carts
    }, (data) => !!data.carts[0].payment_collection?.payment_sessions?.length)
        .then(() => {
        const paymentSessionIds = (0, workflows_sdk_1.transform)({
            carts
        }, (data) => {
            return data.carts[0].payment_collection?.payment_sessions?.map((session) => session.id);
        });
        (0, cancel_payment_sessions_1.cancelPaymentSessionsStep)({
            payment_session_ids: paymentSessionIds,
        });
    });
    core_flows_1.updateCartWorkflow.runAsStep({
        input: {
            id: carts[0].id,
            metadata: {
                checkout_session_canceled: true,
            }
        }
    });
    const responseData = prepare_checkout_session_data_1.prepareCheckoutSessionDataWorkflow.runAsStep({
        input: {
            cart_id: carts[0].id,
        }
    });
    (0, core_flows_1.releaseLockStep)({
        key: input.cart_id,
    });
    return new workflows_sdk_1.WorkflowResponse(responseData);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FuY2VsLWNoZWNrb3V0LXNlc3Npb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvd29ya2Zsb3dzL2NhbmNlbC1jaGVja291dC1zZXNzaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFFQUFxRztBQUNyRyxpRkFBaUg7QUFDakgsNERBQXFIO0FBQ3JILDZFQUEyRTtBQUMzRSxtRkFBb0Y7QUFNdkUsUUFBQSw2QkFBNkIsR0FBRyxJQUFBLDhCQUFjLEVBQ3pELHlCQUF5QixFQUN6QixDQUFDLEtBQW9CLEVBQUUsRUFBRTtJQUN2QixNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLElBQUEsOEJBQWlCLEVBQUM7UUFDeEMsTUFBTSxFQUFFLE1BQU07UUFDZCxNQUFNLEVBQUU7WUFDTixJQUFJO1lBQ0osc0JBQXNCO1lBQ3RCLHVDQUF1QztZQUN2QyxVQUFVO1NBQ1g7UUFDRCxPQUFPLEVBQUU7WUFDUCxFQUFFLEVBQUUsS0FBSyxDQUFDLE9BQU87U0FDbEI7UUFDRCxPQUFPLEVBQUU7WUFDUCxrQkFBa0IsRUFBRSxJQUFJO1NBQ3pCO0tBQ0YsQ0FBQyxDQUFBO0lBRUYsSUFBQSx1REFBMkIsRUFBQztRQUMxQixJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztLQUNnQyxDQUFDLENBQUE7SUFFakQsSUFBQSw0QkFBZSxFQUFDO1FBQ2QsR0FBRyxFQUFFLEtBQUssQ0FBQyxPQUFPO1FBQ2xCLE9BQU8sRUFBRSxDQUFDO1FBQ1YsR0FBRyxFQUFFLEVBQUU7S0FDUixDQUFDLENBQUE7SUFFRixJQUFBLG9CQUFJLEVBQUM7UUFDSCxLQUFLO0tBQ04sRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDO1NBQ3pFLElBQUksQ0FBQyxHQUFHLEVBQUU7UUFDVCxNQUFNLGlCQUFpQixHQUFHLElBQUEseUJBQVMsRUFBQztZQUNsQyxLQUFLO1NBQ04sRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ1YsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixFQUFFLGdCQUFnQixFQUFFLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBUSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQzFGLENBQUMsQ0FBQyxDQUFBO1FBQ0YsSUFBQSxtREFBeUIsRUFBQztZQUN4QixtQkFBbUIsRUFBRSxpQkFBaUI7U0FDdkMsQ0FBQyxDQUFBO0lBQ0osQ0FBQyxDQUFDLENBQUE7SUFFRiwrQkFBa0IsQ0FBQyxTQUFTLENBQUM7UUFDM0IsS0FBSyxFQUFFO1lBQ0wsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ2YsUUFBUSxFQUFFO2dCQUNSLHlCQUF5QixFQUFFLElBQUk7YUFDaEM7U0FDRjtLQUNGLENBQUMsQ0FBQTtJQUVGLE1BQU0sWUFBWSxHQUFHLGtFQUFrQyxDQUFDLFNBQVMsQ0FBQztRQUNoRSxLQUFLLEVBQUU7WUFDTCxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7U0FDckI7S0FDRixDQUFDLENBQUE7SUFFRixJQUFBLDRCQUFlLEVBQUM7UUFDZCxHQUFHLEVBQUUsS0FBSyxDQUFDLE9BQU87S0FDbkIsQ0FBQyxDQUFBO0lBRUYsT0FBTyxJQUFJLGdDQUFnQixDQUFDLFlBQVksQ0FBQyxDQUFBO0FBQzNDLENBQUMsQ0FDRixDQUFBIn0=