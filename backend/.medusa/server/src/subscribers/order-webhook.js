"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = orderWebhookHandler;
const agentic_commerce_1 = require("../modules/agentic-commerce");
async function orderWebhookHandler({ event: { data, name }, container, }) {
    const orderId = data.id;
    const query = container.resolve("query");
    const agenticCommerceModuleService = container.resolve(agentic_commerce_1.AGENTIC_COMMERCE_MODULE);
    const configModule = container.resolve("configModule");
    const storefrontUrl = configModule.admin.storefrontUrl || process.env.STOREFRONT_URL;
    const { data: [order] } = await query.graph({
        entity: "order",
        fields: [
            "id",
            "cart.id",
            "cart.metadata",
            "status",
            "fulfillments.*",
            "transactions.*",
        ],
        filters: {
            id: orderId,
        }
    });
    if (!order || !order.cart?.metadata?.is_checkout_session) {
        return;
    }
    const webhookEvent = {
        type: name === "order.placed" ? "order.created" : "order.updated",
        data: {
            type: "order",
            checkout_session_id: order.cart.id,
            permalink_url: `${storefrontUrl}/orders/${order.id}`,
            status: "confirmed",
            refunds: order.transactions?.filter((transaction) => transaction?.reference === "refund").map((transaction) => ({
                type: "original_payment",
                amount: transaction.amount * -1,
            })) || [],
        }
    };
    // set status
    if (order.status === "canceled") {
        webhookEvent.data.status = "canceled";
    }
    else {
        const allFulfillmentsShipped = order.fulfillments?.every((fulfillment) => !!fulfillment?.shipped_at);
        const allFulfillmentsDelivered = order.fulfillments?.every((fulfillment) => !!fulfillment?.delivered_at);
        if (allFulfillmentsShipped) {
            webhookEvent.data.status = "shipping";
        }
        else if (allFulfillmentsDelivered) {
            webhookEvent.data.status = "fulfilled";
        }
    }
    await agenticCommerceModuleService.sendWebhookEvent(webhookEvent);
}
exports.config = {
    event: ["order.placed", "order.updated"],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItd2ViaG9vay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zdWJzY3JpYmVycy9vcmRlci13ZWJob29rLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQU9BLHNDQTJEQztBQTlERCxrRUFBcUU7QUFHdEQsS0FBSyxVQUFVLG1CQUFtQixDQUFDLEVBQ2hELEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFDckIsU0FBUyxHQUNzQjtJQUMvQixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFBO0lBQ3ZCLE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDeEMsTUFBTSw0QkFBNEIsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLDBDQUF1QixDQUFDLENBQUE7SUFDL0UsTUFBTSxZQUFZLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQTtJQUN0RCxNQUFNLGFBQWEsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDLGFBQWEsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQTtJQUVwRixNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxNQUFNLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDMUMsTUFBTSxFQUFFLE9BQU87UUFDZixNQUFNLEVBQUU7WUFDTixJQUFJO1lBQ0osU0FBUztZQUNULGVBQWU7WUFDZixRQUFRO1lBQ1IsZ0JBQWdCO1lBQ2hCLGdCQUFnQjtTQUNqQjtRQUNELE9BQU8sRUFBRTtZQUNQLEVBQUUsRUFBRSxPQUFPO1NBQ1o7S0FDRixDQUFDLENBQUE7SUFFRixJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsbUJBQW1CLEVBQUUsQ0FBQztRQUN6RCxPQUFNO0lBQ1IsQ0FBQztJQUVELE1BQU0sWUFBWSxHQUFnQztRQUNoRCxJQUFJLEVBQUUsSUFBSSxLQUFLLGNBQWMsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxlQUFlO1FBQ2pFLElBQUksRUFBRTtZQUNKLElBQUksRUFBRSxPQUFPO1lBQ2IsbUJBQW1CLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2xDLGFBQWEsRUFBRSxHQUFHLGFBQWEsV0FBVyxLQUFLLENBQUMsRUFBRSxFQUFFO1lBQ3BELE1BQU0sRUFBRSxXQUFXO1lBQ25CLE9BQU8sRUFBRSxLQUFLLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FDakMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLFdBQVcsRUFBRSxTQUFTLEtBQUssUUFBUSxDQUNyRCxDQUFDLEdBQUcsQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDdEIsSUFBSSxFQUFFLGtCQUFrQjtnQkFDeEIsTUFBTSxFQUFFLFdBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2FBQ2pDLENBQUMsQ0FBQyxJQUFJLEVBQUU7U0FDVjtLQUNGLENBQUE7SUFFRCxhQUFhO0lBQ2IsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLFVBQVUsRUFBRSxDQUFDO1FBQ2hDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQTtJQUN2QyxDQUFDO1NBQU0sQ0FBQztRQUNOLE1BQU0sc0JBQXNCLEdBQUcsS0FBSyxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsVUFBVSxDQUFDLENBQUE7UUFDcEcsTUFBTSx3QkFBd0IsR0FBRyxLQUFLLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxZQUFZLENBQUMsQ0FBQTtRQUN4RyxJQUFJLHNCQUFzQixFQUFFLENBQUM7WUFDM0IsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFBO1FBQ3ZDLENBQUM7YUFBTSxJQUFJLHdCQUF3QixFQUFFLENBQUM7WUFDcEMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsV0FBVyxDQUFBO1FBQ3hDLENBQUM7SUFDSCxDQUFDO0lBRUQsTUFBTSw0QkFBNEIsQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsQ0FBQTtBQUNuRSxDQUFDO0FBRVksUUFBQSxNQUFNLEdBQXFCO0lBQ3RDLEtBQUssRUFBRSxDQUFDLGNBQWMsRUFBRSxlQUFlLENBQUM7Q0FDekMsQ0FBQSJ9