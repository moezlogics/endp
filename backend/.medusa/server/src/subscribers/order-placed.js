"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = orderPlacedHandler;
const utils_1 = require("@medusajs/framework/utils");
const handle_order_points_1 = require("../workflows/handle-order-points");
async function orderPlacedHandler({ event: { data }, container, }) {
    const logger = container.resolve("logger");
    const query = container.resolve("query");
    const orderModuleService = container.resolve(utils_1.Modules.ORDER);
    try {
        const { data: [order] } = await query.graph({
            entity: "order",
            fields: ["id", "metadata", "cart.metadata"],
            filters: { id: data.id },
        });
        if (order && order.cart?.metadata) {
            const cartMeta = order.cart.metadata;
            const orderMeta = order.metadata || {};
            const hasCoords = cartMeta.map_lat !== undefined && cartMeta.map_lng !== undefined;
            const hasPrescription = cartMeta.prescription_url !== undefined;
            const hasPushEndpoint = cartMeta.push_endpoint !== undefined;
            // Loyalty redemption details — `loyalty_promo_id` identifies the
            // one-shot promotion created by `applyLoyaltyOnCartWorkflow`, and
            // `loyalty_amount` is the cash-equivalent value of the points that
            // were already debited at apply time. Both are required downstream
            // by `handleOrderPointsWorkflow` (to skip earning on the redeemed
            // slice + deactivate the promo) and by `order-canceled` (to refund
            // the right number of points).
            const hasLoyaltyPromo = typeof cartMeta.loyalty_promo_id === "string" &&
                cartMeta.loyalty_promo_id.length > 0;
            // Guest ownership: if the storefront stamped a guest_id on the cart
            // at checkout, copy it onto the order at CREATION so the order is
            // owned from birth (no "unclaimed window" for link-guest to race).
            const hasGuestId = typeof cartMeta.guest_id === "string" && cartMeta.guest_id.length > 0;
            if (hasCoords || hasPrescription || hasPushEndpoint || hasLoyaltyPromo || hasGuestId) {
                const updateData = { ...orderMeta };
                if (hasGuestId && !updateData.guest_id) {
                    updateData.guest_id = cartMeta.guest_id;
                }
                if (hasCoords) {
                    updateData.map_lat = cartMeta.map_lat;
                    updateData.map_lng = cartMeta.map_lng;
                    updateData.map_address = cartMeta.map_address;
                    updateData.map_source = cartMeta.map_source;
                }
                if (hasPrescription) {
                    updateData.prescription_url = cartMeta.prescription_url;
                    updateData.prescription_uploaded_at = cartMeta.prescription_uploaded_at;
                }
                if (hasPushEndpoint) {
                    updateData.push_endpoint = cartMeta.push_endpoint;
                }
                if (hasLoyaltyPromo) {
                    updateData.loyalty_promo_id = cartMeta.loyalty_promo_id;
                    updateData.loyalty_amount = Number(cartMeta.loyalty_amount) || 0;
                }
                await orderModuleService.updateOrders(data.id, {
                    metadata: updateData,
                });
                logger.info(`[orderPlacedHandler] Successfully copied cart metadata to order ${data.id}`);
            }
        }
    }
    catch (err) {
        logger.error(`[orderPlacedHandler] Failed to copy metadata from cart to order: ${err?.message || err}`);
    }
    await (0, handle_order_points_1.handleOrderPointsWorkflow)(container).run({
        input: {
            order_id: data.id,
        },
    });
}
exports.config = {
    event: "order.placed",
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItcGxhY2VkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3N1YnNjcmliZXJzL29yZGVyLXBsYWNlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFPQSxxQ0FvRkM7QUF2RkQscURBQW1EO0FBQ25ELDBFQUE0RTtBQUU3RCxLQUFLLFVBQVUsa0JBQWtCLENBQUMsRUFDL0MsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQ2YsU0FBUyxHQUNzQjtJQUMvQixNQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQzFDLE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDeEMsTUFBTSxrQkFBa0IsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLGVBQU8sQ0FBQyxLQUFLLENBQVEsQ0FBQTtJQUVsRSxJQUFJLENBQUM7UUFDSCxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxNQUFNLEtBQUssQ0FBQyxLQUFLLENBQUM7WUFDMUMsTUFBTSxFQUFFLE9BQU87WUFDZixNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLGVBQWUsQ0FBQztZQUMzQyxPQUFPLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRTtTQUN6QixDQUFDLENBQUE7UUFFRixJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFDO1lBQ2xDLE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFBO1lBQ3BDLE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFBO1lBRXRDLE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxPQUFPLEtBQUssU0FBUyxJQUFJLFFBQVEsQ0FBQyxPQUFPLEtBQUssU0FBUyxDQUFBO1lB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