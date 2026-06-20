"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareCheckoutSessionDataWorkflow = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const core_flows_1 = require("@medusajs/medusa/core-flows");
exports.prepareCheckoutSessionDataWorkflow = (0, workflows_sdk_1.createWorkflow)("prepare-checkout-session-data", (input) => {
    // Retrieve cart
    const { data: carts } = (0, core_flows_1.useQueryGraphStep)({
        entity: "cart",
        fields: [
            "id",
            "items.*",
            "shipping_address.*",
            "shipping_methods.*",
            "region.*",
            "region.payment_providers.*",
            "currency_code",
            "email",
            "phone",
            "payment_collection.*",
            "total",
            "subtotal",
            "tax_total",
            "discount_total",
            "original_item_total",
            "shipping_total",
            "metadata",
            "order.id"
        ],
        filters: {
            id: input.cart_id,
        },
        options: {
            throwIfKeyNotFound: true
        }
    });
    // Retrieve shipping options
    const shippingOptions = core_flows_1.listShippingOptionsForCartWithPricingWorkflow.runAsStep({
        input: {
            cart_id: carts[0].id,
        }
    });
    const responseData = (0, workflows_sdk_1.transform)({
        input,
        carts,
        shippingOptions,
    }, (data) => {
        // @ts-ignore
        const hasStripePaymentProvider = data.carts[0].region?.payment_providers?.some((provider) => provider?.id.includes("stripe"));
        const hasPaymentSession = data.carts[0].payment_collection?.payment_sessions?.some((session) => session?.status === "pending");
        return {
            id: data.carts[0].id,
            buyer: data.input.buyer,
            payment_provider: {
                provider: hasStripePaymentProvider ? "stripe" : undefined,
                supported_payment_methods: hasStripePaymentProvider ? ["card"] : undefined,
            },
            status: hasPaymentSession ? "ready_for_payment" :
                data.carts[0].metadata?.checkout_session_canceled ? "canceled" :
                    data.carts[0].order?.id ? "completed" : "not_ready_for_payment",
            currency: data.carts[0].currency_code,
            line_items: data.carts[0].items.map((item) => ({
                id: item?.id,
                title: item?.title,
                // @ts-ignore
                base_amount: item?.original_total,
                // @ts-ignore
                discount: item?.discount_total,
                // @ts-ignore
                subtotal: item?.subtotal,
                // @ts-ignore
                tax: item?.tax_total,
                // @ts-ignore
                total: item?.total,
                item: {
                    id: item?.variant_id,
                    quantity: item?.quantity,
                }
            })),
            fulfillment_address: data.input.fulfillment_address,
            fulfillment_options: data.shippingOptions?.map((option) => ({
                type: "shipping",
                id: option?.id,
                title: option?.name,
                subtitle: "",
                carrier_info: option?.provider?.id,
                earliest_delivery_time: option?.type.code === "express" ?
                    new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString() : // RFC 3339 string - 24 hours
                    new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // RFC 3339 string - 48 hours
                latest_delivery_time: option?.type.code === "express" ?
                    new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString() : // RFC 3339 string - 24 hours
                    new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // RFC 3339 string - 48 hours
                subtotal: option?.calculated_price.calculated_amount,
                // @ts-ignore
                tax: data.carts[0].shipping_methods?.[0]?.tax_total || 0,
                // @ts-ignore
                total: data.carts[0].shipping_methods?.[0]?.total || option?.calculated_price.calculated_amount,
            })),
            fulfillment_option_id: data.carts[0].shipping_methods?.[0]?.shipping_option_id,
            totals: [
                {
                    type: "item_base_amount",
                    display_name: "Item Base Amount",
                    // @ts-ignore
                    amount: data.carts[0].original_item_total,
                },
                {
                    type: "subtotal",
                    display_name: "Subtotal",
                    // @ts-ignore
                    amount: data.carts[0].subtotal,
                },
                {
                    type: "discount",
                    display_name: "Discount",
                    // @ts-ignore
                    amount: data.carts[0].discount_total,
                },
                {
                    type: "fulfillment",
                    display_name: "Fulfillment",
                    // @ts-ignore
                    amount: data.carts[0].shipping_total,
                },
                {
                    type: "tax",
                    display_name: "Tax",
                    // @ts-ignore
                    amount: data.carts[0].tax_total,
                },
                {
                    type: "total",
                    display_name: "Total",
                    // @ts-ignore
                    amount: data.carts[0].total,
                }
            ],
            messages: data.input.messages || [],
            links: [
                {
                    type: "terms_of_use",
                    value: "https://www.medusa-commerce.com/terms-of-use", // TODO: replace with actual terms of use
                },
                {
                    type: "privacy_policy",
                    value: "https://www.medusa-commerce.com/privacy-policy", // TODO: replace with actual privacy policy
                },
                {
                    type: "seller_shop_policy",
                    value: "https://www.medusa-commerce.com/seller-shop-policy", // TODO: replace with actual seller shop policy
                }
            ]
        };
    });
    return new workflows_sdk_1.WorkflowResponse(responseData);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlcGFyZS1jaGVja291dC1zZXNzaW9uLWRhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvd29ya2Zsb3dzL3ByZXBhcmUtY2hlY2tvdXQtc2Vzc2lvbi1kYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFFQUErRjtBQUMvRiw0REFBOEc7QUEyQmpHLFFBQUEsa0NBQWtDLEdBQUcsSUFBQSw4QkFBYyxFQUM5RCwrQkFBK0IsRUFDL0IsQ0FBQyxLQUE4QyxFQUFFLEVBQUU7SUFDakQsZ0JBQWdCO0lBQ2hCLE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsSUFBQSw4QkFBaUIsRUFBQztRQUN4QyxNQUFNLEVBQUUsTUFBTTtRQUNkLE1BQU0sRUFBRTtZQUNOLElBQUk7WUFDSixTQUFTO1lBQ1Qsb0JBQW9CO1lBQ3BCLG9CQUFvQjtZQUNwQixVQUFVO1lBQ1YsNEJBQTRCO1lBQzVCLGVBQWU7WUFDZixPQUFPO1lBQ1AsT0FBTztZQUNQLHNCQUFzQjtZQUN0QixPQUFPO1lBQ1AsVUFBVTtZQUNWLFdBQVc7WUFDWCxnQkFBZ0I7WUFDaEIscUJBQXFCO1lBQ3JCLGdCQUFnQjtZQUNoQixVQUFVO1lBQ1YsVUFBVTtTQUNYO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsRUFBRSxFQUFFLEtBQUssQ0FBQyxPQUFPO1NBQ2xCO1FBQ0QsT0FBTyxFQUFFO1lBQ1Asa0JBQWtCLEVBQUUsSUFBSTtTQUN6QjtLQUNGLENBQUMsQ0FBQTtJQUVGLDRCQUE0QjtJQUM1QixNQUFNLGVBQWUsR0FBRywwREFBNkMsQ0FBQyxTQUFTLENBQUM7UUFDOUUsS0FBSyxFQUFFO1lBQ0wsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1NBQ3JCO0tBQ0YsQ0FBQyxDQUFBO0lBRUYsTUFBTSxZQUFZLEdBQUcsSUFBQSx5QkFBUyxFQUFDO1FBQzdCLEtBQUs7UUFDTCxLQUFLO1FBQ0wsZUFBZTtLQUNoQixFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDVixhQUFhO1FBQ2IsTUFBTSx3QkFBd0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUE7UUFDN0gsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixFQUFFLGdCQUFnQixFQUFFLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTyxFQUFFLE1BQU0sS0FBSyxTQUFTLENBQUMsQ0FBQTtRQUM5SCxPQUFPO1lBQ0wsRUFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNwQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLO1lBQ3ZCLGdCQUFnQixFQUFFO2dCQUNoQixRQUFRLEVBQUUsd0JBQXdCLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUztnQkFDekQseUJBQXlCLEVBQUUsd0JBQXdCLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVM7YUFDM0U7WUFDRCxNQUFNLEVBQUUsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUM7Z0JBQy9DLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLHlCQUF5QixDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDaEUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLHVCQUF1QjtZQUNqRSxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhO1lBQ3JDLFVBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQzdDLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRTtnQkFDWixLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUs7Z0JBQ2xCLGFBQWE7Z0JBQ2IsV0FBVyxFQUFFLElBQUksRUFBRSxjQUFjO2dCQUNqQyxhQUFhO2dCQUNiLFFBQVEsRUFBRSxJQUFJLEVBQUUsY0FBYztnQkFDOUIsYUFBYTtnQkFDYixRQUFRLEVBQUUsSUFBSSxFQUFFLFFBQVE7Z0JBQ3hCLGFBQWE7Z0JBQ2IsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTO2dCQUNwQixhQUFhO2dCQUNiLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSztnQkFDbEIsSUFBSSxFQUFFO29CQUNKLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVTtvQkFDcEIsUUFBUSxFQUFFLElBQUksRUFBRSxRQUFRO2lCQUN6QjthQUNGLENBQUMsQ0FBQztZQUNILG1CQUFtQixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsbUJBQW1CO1lBQ25ELG1CQUFtQixFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUUsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUMxRCxJQUFJLEVBQUUsVUFBVTtnQkFDaEIsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFO2dCQUNkLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSTtnQkFDbkIsUUFBUSxFQUFFLEVBQUU7Z0JBQ1osWUFBWSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRTtnQkFDbEMsc0JBQXNCLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLENBQUM7b0JBQ3ZELElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFFLDZCQUE2QjtvQkFDN0YsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRSw2QkFBNkI7Z0JBQzdGLG9CQUFvQixFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVMsQ0FBQyxDQUFDO29CQUNyRCxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBRSw2QkFBNkI7b0JBQzdGLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUUsNkJBQTZCO2dCQUM3RixRQUFRLEVBQUUsTUFBTSxFQUFFLGdCQUFnQixDQUFDLGlCQUFpQjtnQkFDcEQsYUFBYTtnQkFDYixHQUFHLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsSUFBSSxDQUFDO2dCQUN4RCxhQUFhO2dCQUNiLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxJQUFJLE1BQU0sRUFBRSxnQkFBZ0IsQ0FBQyxpQkFBaUI7YUFDaEcsQ0FBQyxDQUFDO1lBQ0gscUJBQXFCLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLGtCQUFrQjtZQUM5RSxNQUFNLEVBQUU7Z0JBQ047b0JBQ0UsSUFBSSxFQUFFLGtCQUFrQjtvQkFDeEIsWUFBWSxFQUFFLGtCQUFrQjtvQkFDaEMsYUFBYTtvQkFDYixNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxtQkFBbUI7aUJBQzFDO2dCQUNEO29CQUNFLElBQUksRUFBRSxVQUFVO29CQUNoQixZQUFZLEVBQUUsVUFBVTtvQkFDeEIsYUFBYTtvQkFDYixNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRO2lCQUMvQjtnQkFDRDtvQkFDRSxJQUFJLEVBQUUsVUFBVTtvQkFDaEIsWUFBWSxFQUFFLFVBQVU7b0JBQ3hCLGFBQWE7b0JBQ2IsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYztpQkFDckM7Z0JBQ0Q7b0JBQ0UsSUFBSSxFQUFFLGFBQWE7b0JBQ25CLFlBQVksRUFBRSxhQUFhO29CQUMzQixhQUFhO29CQUNiLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWM7aUJBQ3JDO2dCQUNEO29CQUNFLElBQUksRUFBRSxLQUFLO29CQUNYLFlBQVksRUFBRSxLQUFLO29CQUNuQixhQUFhO29CQUNiLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVM7aUJBQ2hDO2dCQUNEO29CQUNFLElBQUksRUFBRSxPQUFPO29CQUNiLFlBQVksRUFBRSxPQUFPO29CQUNyQixhQUFhO29CQUNiLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUs7aUJBQzVCO2FBQ0Y7WUFDRCxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLElBQUksRUFBRTtZQUNuQyxLQUFLLEVBQUU7Z0JBQ0w7b0JBQ0UsSUFBSSxFQUFFLGNBQWM7b0JBQ3BCLEtBQUssRUFBRSw4Q0FBOEMsRUFBRSx5Q0FBeUM7aUJBQ2pHO2dCQUNEO29CQUNFLElBQUksRUFBRSxnQkFBZ0I7b0JBQ3RCLEtBQUssRUFBRSxnREFBZ0QsRUFBRSwyQ0FBMkM7aUJBQ3JHO2dCQUNEO29CQUNFLElBQUksRUFBRSxvQkFBb0I7b0JBQzFCLEtBQUssRUFBRSxvREFBb0QsRUFBRSwrQ0FBK0M7aUJBQzdHO2FBQ0Y7U0FDRixDQUFBO0lBQ0gsQ0FBQyxDQUFDLENBQUE7SUFFRixPQUFPLElBQUksZ0NBQWdCLENBQUMsWUFBWSxDQUFDLENBQUE7QUFDM0MsQ0FBQyxDQUNGLENBQUEifQ==