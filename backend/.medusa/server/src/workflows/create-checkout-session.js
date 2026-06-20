"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCheckoutSessionWorkflow = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const core_flows_1 = require("@medusajs/medusa/core-flows");
const prepare_checkout_session_data_1 = require("./prepare-checkout-session-data");
exports.createCheckoutSessionWorkflow = (0, workflows_sdk_1.createWorkflow)("create-checkout-session", (input) => {
    // validate item IDs
    const variantIds = (0, workflows_sdk_1.transform)({
        input
    }, (data) => {
        return data.input.items.map((item) => item.id);
    });
    // Will fail if any variant IDs are not found
    (0, core_flows_1.useQueryGraphStep)({
        entity: "variant",
        fields: ["id"],
        filters: {
            id: variantIds
        },
        options: {
            throwIfKeyNotFound: true
        }
    });
    // Find the region ID for US
    const { data: regions } = (0, core_flows_1.useQueryGraphStep)({
        entity: "region",
        fields: ["id"],
        filters: {
            countries: {
                iso_2: "us"
            }
        }
    }).config({ name: "find-region" });
    // get sales channel
    const { data: salesChannels } = (0, core_flows_1.useQueryGraphStep)({
        entity: "sales_channel",
        fields: ["id"],
        // You can filter by name for a specific sales channel
        // filters: {
        //   name: "Agentic Commerce"
        // }
    }).config({ name: "find-sales-channel" });
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
                        has_account: false,
                    }
                ]
            }
        });
    });
    const customerId = (0, workflows_sdk_1.transform)({
        customers,
        createdCustomers,
    }, (data) => {
        return data.customers.length > 0 ? data.customers[0].id : data.createdCustomers?.[0].id;
    });
    const cartInput = (0, workflows_sdk_1.transform)({
        input,
        regions,
        salesChannels,
        customerId,
    }, (data) => {
        const splitAddressName = data.input.fulfillment_address?.name.split(" ") || [];
        return {
            items: data.input.items.map((item) => ({
                variant_id: item.id,
                quantity: item.quantity
            })),
            region_id: data.regions[0]?.id,
            email: data.input.buyer?.email,
            customer_id: data.customerId,
            shipping_address: data.input.fulfillment_address ? {
                first_name: splitAddressName[0],
                last_name: splitAddressName.slice(1).join(" "),
                address_1: data.input.fulfillment_address?.line_one,
                address_2: data.input.fulfillment_address?.line_two,
                city: data.input.fulfillment_address?.city,
                province: data.input.fulfillment_address?.state,
                postal_code: data.input.fulfillment_address?.postal_code,
                country_code: data.input.fulfillment_address?.country,
            } : undefined,
            currency_code: data.regions[0]?.currency_code,
            sales_channel_id: data.salesChannels[0]?.id,
            metadata: {
                is_checkout_session: true,
            }
        };
    });
    const createdCart = core_flows_1.createCartWorkflow.runAsStep({
        input: cartInput
    });
    // Select the cheapest shipping option if a fulfillment address is provided
    (0, workflows_sdk_1.when)(input, (input) => !!input.fulfillment_address)
        .then(() => {
        // Retrieve shipping options
        const shippingOptions = core_flows_1.listShippingOptionsForCartWithPricingWorkflow.runAsStep({
            input: {
                cart_id: createdCart.id,
            }
        });
        const shippingMethodData = (0, workflows_sdk_1.transform)({
            createdCart,
            shippingOptions,
        }, (data) => {
            // get the cheapest shipping option
            const cheapestShippingOption = data.shippingOptions.sort((a, b) => a.price - b.price)[0];
            return {
                cart_id: data.createdCart.id,
                options: [{
                        id: cheapestShippingOption.id,
                    }]
            };
        });
        (0, core_flows_1.acquireLockStep)({
            key: createdCart.id,
            timeout: 2,
            ttl: 10,
        });
        core_flows_1.addShippingMethodToCartWorkflow.runAsStep({
            input: shippingMethodData
        });
        (0, core_flows_1.releaseLockStep)({
            key: createdCart.id,
        });
    });
    // Prepare response data
    const responseData = prepare_checkout_session_data_1.prepareCheckoutSessionDataWorkflow.runAsStep({
        input: {
            buyer: input.buyer,
            fulfillment_address: input.fulfillment_address,
            cart_id: createdCart.id,
        }
    });
    return new workflows_sdk_1.WorkflowResponse(responseData);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWNoZWNrb3V0LXNlc3Npb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvd29ya2Zsb3dzL2NyZWF0ZS1jaGVja291dC1zZXNzaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFFQUFxRztBQUNyRyw0REFTb0M7QUFDcEMsbUZBQW9GO0FBd0J2RSxRQUFBLDZCQUE2QixHQUFHLElBQUEsOEJBQWMsRUFDekQseUJBQXlCLEVBQ3pCLENBQUMsS0FBb0IsRUFBRSxFQUFFO0lBQ3ZCLG9CQUFvQjtJQUNwQixNQUFNLFVBQVUsR0FBRyxJQUFBLHlCQUFTLEVBQUM7UUFDM0IsS0FBSztLQUNOLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNWLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7SUFDaEQsQ0FBQyxDQUFDLENBQUE7SUFFRiw2Q0FBNkM7SUFDN0MsSUFBQSw4QkFBaUIsRUFBQztRQUNoQixNQUFNLEVBQUUsU0FBUztRQUNqQixNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUM7UUFDZCxPQUFPLEVBQUU7WUFDUCxFQUFFLEVBQUUsVUFBVTtTQUNmO1FBQ0QsT0FBTyxFQUFFO1lBQ1Asa0JBQWtCLEVBQUUsSUFBSTtTQUN6QjtLQUNGLENBQUMsQ0FBQTtJQUVGLDRCQUE0QjtJQUM1QixNQUFNLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxHQUFHLElBQUEsOEJBQWlCLEVBQUM7UUFDMUMsTUFBTSxFQUFFLFFBQVE7UUFDaEIsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDO1FBQ2QsT0FBTyxFQUFFO1lBQ1AsU0FBUyxFQUFFO2dCQUNULEtBQUssRUFBRSxJQUFJO2FBQ1o7U0FDRjtLQUNGLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFF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