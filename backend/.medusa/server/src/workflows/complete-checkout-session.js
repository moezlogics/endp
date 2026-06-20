"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.completeCheckoutSessionWorkflow = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const core_flows_1 = require("@medusajs/medusa/core-flows");
const prepare_checkout_session_data_1 = require("./prepare-checkout-session-data");
exports.completeCheckoutSessionWorkflow = (0, workflows_sdk_1.createWorkflow)("complete-checkout-session", (input) => {
    // Retrieve cart details
    const { data: carts } = (0, core_flows_1.useQueryGraphStep)({
        entity: "cart",
        fields: ["id", "region.*", "region.payment_providers.*", "shipping_address.*"],
        filters: {
            id: input.cart_id,
        },
        options: {
            throwIfKeyNotFound: true,
        },
    });
    (0, core_flows_1.acquireLockStep)({
        key: input.cart_id,
        timeout: 2,
        ttl: 10,
    });
    (0, workflows_sdk_1.when)(input, (input) => !!input.payment_data.billing_address)
        .then(() => {
        const updateData = (0, workflows_sdk_1.transform)({
            input,
            carts,
        }, (data) => {
            return {
                id: data.carts[0].id,
                billing_address: {
                    first_name: data.input.payment_data.billing_address.name.split(" ")[0],
                    last_name: data.input.payment_data.billing_address.name.split(" ")[1],
                    address_1: data.input.payment_data.billing_address.line_one,
                    address_2: data.input.payment_data.billing_address.line_two,
                    city: data.input.payment_data.billing_address.city,
                    province: data.input.payment_data.billing_address.state,
                    postal_code: data.input.payment_data.billing_address.postal_code,
                    country_code: data.input.payment_data.billing_address.country,
                    phone: data.input.payment_data.billing_address.phone_number,
                }
            };
        });
        return core_flows_1.updateCartWorkflow.runAsStep({
            input: updateData,
        });
    });
    const preparationInput = (0, workflows_sdk_1.transform)({
        carts,
        input,
    }, (data) => {
        return {
            cart_id: data.carts[0].id,
            buyer: data.input.buyer,
            fulfillment_address: data.carts[0].shipping_address ? {
                name: data.carts[0].shipping_address.first_name + " " + data.carts[0].shipping_address.last_name,
                line_one: data.carts[0].shipping_address.address_1 || "",
                line_two: data.carts[0].shipping_address.address_2 || "",
                city: data.carts[0].shipping_address.city || "",
                state: data.carts[0].shipping_address.province || "",
                postal_code: data.carts[0].shipping_address.postal_code || "",
                country: data.carts[0].shipping_address.country_code || "",
                phone_number: data.carts[0].shipping_address.phone || "",
            } : undefined,
        };
    });
    const paymentProviderId = (0, workflows_sdk_1.transform)({
        input
    }, (data) => {
        switch (data.input.payment_data.provider) {
            case "stripe":
                return "pp_stripe_stripe";
            default:
                return data.input.payment_data.provider;
        }
    });
    const completeCartResponse = (0, workflows_sdk_1.when)({
        carts,
        paymentProviderId
    }, (data) => {
        // @ts-ignore
        return !!data.carts[0].region?.payment_providers?.find((provider) => provider?.id === data.paymentProviderId);
    })
        .then(() => {
        const paymentCollection = core_flows_1.createPaymentCollectionForCartWorkflow.runAsStep({
            input: {
                cart_id: carts[0].id,
            }
        });
        core_flows_1.createPaymentSessionsWorkflow.runAsStep({
            input: {
                payment_collection_id: paymentCollection.id,
                provider_id: paymentProviderId,
                data: {
                    shared_payment_token: input.payment_data.token,
                }
            }
        });
        core_flows_1.completeCartWorkflow.runAsStep({
            input: {
                id: carts[0].id,
            }
        });
        return prepare_checkout_session_data_1.prepareCheckoutSessionDataWorkflow.runAsStep({
            input: preparationInput,
        });
    });
    const invalidPaymentResponse = (0, workflows_sdk_1.when)({
        carts,
        paymentProviderId
    }, (data) => {
        return !data.carts[0].region?.payment_providers?.find((provider) => provider?.id === data.paymentProviderId);
    })
        .then(() => {
        core_flows_1.refreshPaymentCollectionForCartWorkflow.runAsStep({
            input: {
                cart_id: carts[0].id,
            }
        });
        const prepareDataWithMessages = (0, workflows_sdk_1.transform)({
            prepareData: preparationInput,
        }, (data) => {
            return {
                ...data.prepareData,
                messages: [
                    {
                        type: "error",
                        code: "invalid",
                        content_type: "plain",
                        content: "Invalid payment provider",
                    }
                ]
            };
        });
        return prepare_checkout_session_data_1.prepareCheckoutSessionDataWorkflow.runAsStep({
            input: prepareDataWithMessages
        }).config({ name: "prepare-checkout-session-data-with-messages" });
    });
    const responseData = (0, workflows_sdk_1.transform)({
        completeCartResponse,
        invalidPaymentResponse
    }, (data) => {
        return data.completeCartResponse || data.invalidPaymentResponse;
    });
    (0, core_flows_1.releaseLockStep)({
        key: input.cart_id,
    });
    return new workflows_sdk_1.WorkflowResponse(responseData);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGxldGUtY2hlY2tvdXQtc2Vzc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy93b3JrZmxvd3MvY29tcGxldGUtY2hlY2tvdXQtc2Vzc2lvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxRUFLMEM7QUFDMUMsNERBU29DO0FBQ3BDLG1GQUd3QztBQXlCM0IsUUFBQSwrQkFBK0IsR0FBRyxJQUFBLDhCQUFjLEVBQzNELDJCQUEyQixFQUMzQixDQUFDLEtBQW9CLEVBQUUsRUFBRTtJQUN2Qix3QkFBd0I7SUFDeEIsTUFBTSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxJQUFBLDhCQUFpQixFQUFDO1FBQ3hDLE1BQU0sRUFBRSxNQUFNO1FBQ2QsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSw0QkFBNEIsRUFBRSxvQkFBb0IsQ0FBQztRQUM5RSxPQUFPLEVBQUU7WUFDUCxFQUFFLEVBQUUsS0FBSyxDQUFDLE9BQU87U0FDbEI7UUFDRCxPQUFPLEVBQUU7WUFDUCxrQkFBa0IsRUFBRSxJQUFJO1NBQ3pCO0tBQ0YsQ0FBQyxDQUFBO0lBQ0YsSUFBQSw0QkFBZSxFQUFDO1FBQ2QsR0FBRyxFQUFFLEtBQUssQ0FBQyxPQUFPO1FBQ2xCLE9BQU8sRUFBRSxDQUFDO1FBQ1YsR0FBRyxFQUFFLEVBQUU7S0FDUixDQUFDLENBQUE7SUFFRixJQUFBLG9CQUFJLEVBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUM7U0FDM0QsSUFBSSxDQUFDLEdBQUcsRUFBRTtRQUNULE1BQU0sVUFBVSxHQUFHLElBQUEseUJBQVMsRUFBQztZQUMzQixLQUFLO1lBQ0wsS0FBSztTQUNOLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNWLE9BQU87Z0JBQ0wsRUFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLENB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