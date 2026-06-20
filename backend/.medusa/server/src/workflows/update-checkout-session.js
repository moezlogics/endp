"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCheckoutSessionWorkflow = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const core_flows_1 = require("@medusajs/medusa/core-flows");
const prepare_checkout_session_data_1 = require("./prepare-checkout-session-data");
exports.updateCheckoutSessionWorkflow = (0, workflows_sdk_1.createWorkflow)("update-checkout-session", (input) => {
    // Retrieve cart
    const { data: carts } = (0, core_flows_1.useQueryGraphStep)({
        entity: "cart",
        fields: ["id", "customer.*", "email"],
        filters: {
            id: input.cart_id,
        }
    });
    // check if customer already exists
    const { data: customers } = (0, core_flows_1.useQueryGraphStep)({
        entity: "customer",
        fields: ["id"],
        filters: {
            email: input.buyer?.email,
        }
    }).config({ name: "find-customer" });
    const createdCustomers = (0, workflows_sdk_1.when)({ customers }, ({ customers }) => customers.length === 0 && !!input.buyer?.email)
        .then(() => {
        return core_flows_1.createCustomersWorkflow.runAsStep({
            input: {
                customersData: [
                    {
                        email: input.buyer?.email,
                        first_name: input.buyer?.first_name,
                        phone: input.buyer?.phone_number,
                    }
                ],
            }
        });
    });
    const customerId = (0, workflows_sdk_1.transform)({
        customers,
        createdCustomers,
    }, (data) => {
        return data.customers.length > 0 ? data.customers[0].id : data.createdCustomers?.[0].id;
    });
    // validate items
    (0, workflows_sdk_1.when)(input, (input) => !!input.items)
        .then(() => {
        const variantIds = (0, workflows_sdk_1.transform)(input, (input) => input.items?.map((item) => item.id));
        return (0, core_flows_1.useQueryGraphStep)({
            entity: "variant",
            fields: ["id"],
            filters: {
                id: variantIds,
            },
            options: {
                throwIfKeyNotFound: true,
            }
        }).config({ name: "find-variant" });
        (0, core_flows_1.acquireLockStep)({
            key: input.cart_id,
            timeout: 2,
            ttl: 10,
        });
    });
    // Prepare update data
    const updateData = (0, workflows_sdk_1.transform)({
        input,
        carts,
        customerId,
    }, (data) => {
        return {
            id: data.carts[0].id,
            email: data.input.buyer?.email || data.carts[0].email,
            customer_id: data.customerId || data.carts[0].customer?.id,
            items: data.input.items?.map((item) => ({
                variant_id: item.id,
                quantity: item.quantity,
            })),
            shipping_address: data.input.fulfillment_address ? {
                first_name: data.input.fulfillment_address.name.split(" ")[0],
                last_name: data.input.fulfillment_address.name.split(" ")[1],
                address_1: data.input.fulfillment_address.line_one,
                address_2: data.input.fulfillment_address.line_two,
                city: data.input.fulfillment_address.city,
                province: data.input.fulfillment_address.state,
                postal_code: data.input.fulfillment_address.postal_code,
                country_code: data.input.fulfillment_address.country,
                phone: data.input.fulfillment_address.phone_number,
            } : undefined,
        };
    });
    core_flows_1.updateCartWorkflow.runAsStep({
        input: updateData,
    });
    // try to update shipping method
    (0, workflows_sdk_1.when)(input, (input) => !!input.fulfillment_option_id)
        .then(() => {
        core_flows_1.addShippingMethodToCartWorkflow.runAsStep({
            input: {
                cart_id: updateData.id,
                options: [{
                        id: input.fulfillment_option_id,
                    }],
            },
        });
    });
    const responseData = prepare_checkout_session_data_1.prepareCheckoutSessionDataWorkflow.runAsStep({
        input: {
            cart_id: updateData.id,
            buyer: input.buyer,
            fulfillment_address: input.fulfillment_address,
        }
    });
    (0, core_flows_1.releaseLockStep)({
        key: input.cart_id,
    });
    return new workflows_sdk_1.WorkflowResponse(responseData);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLWNoZWNrb3V0LXNlc3Npb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvd29ya2Zsb3dzL3VwZGF0ZS1jaGVja291dC1zZXNzaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFFQUswQztBQUMxQyw0REFPb0M7QUFDcEMsbUZBQW9GO0FBMEJ2RSxRQUFBLDZCQUE2QixHQUFHLElBQUEsOEJBQWMsRUFDekQseUJBQXlCLEVBQ3pCLENBQUMsS0FBb0IsRUFBRSxFQUFFO0lBQ3ZCLGdCQUFnQjtJQUNoQixNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLElBQUEsOEJBQWlCLEVBQUM7UUFDeEMsTUFBTSxFQUFFLE1BQU07UUFDZCxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFLE9BQU8sQ0FBQztRQUNyQyxPQUFPLEVBQUU7WUFDUCxFQUFFLEVBQUUsS0FBSyxDQUFDLE9BQU87U0FDbEI7S0FDRixDQUFDLENBQUE7SUFFRixtQ0FBbUM7SUFDbkMsTUFBTSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsR0FBRyxJQUFBLDhCQUFpQixFQUFDO1FBQzVDLE1BQU0sRUFBRSxVQUFVO1FBQ2xCLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQztRQUNkLE9BQU8sRUFBRTtZQUNQLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUs7U0FDMUI7S0FDRixDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUE7SUFFcEMsTUFBTSxnQkFBZ0IsR0FBRyxJQUFBLG9CQUFJLEVBQUMsRUFBRSxTQUFTLEVBQUUsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQztTQUM5RyxJQUFJLENB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