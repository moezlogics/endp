"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = abandonedCartJob;
const send_abandoned_carts_1 = require("../workflows/send-abandoned-carts");
/**
 * Daily abandoned-cart sweep.
 *
 * Picks up carts that:
 *   - haven't been touched for >= 24h
 *   - have a usable email (not null AND not empty string)
 *   - aren't completed
 *   - still have items
 *   - haven't already received an abandoned-cart email
 *
 * Logs a structured breakdown per page so we can see *why* a cart
 * was skipped without grepping. The previous implementation logged
 * only the final "sent N" total, hiding the case where 0 emails
 * went out because every cart was filtered for a recoverable reason
 * (e.g. all emails were empty strings, which the `$ne: null` check
 * lets through).
 */
async function abandonedCartJob(container) {
    const logger = container.resolve("logger");
    const query = container.resolve("query");
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);
    // oneDayAgo.setMinutes(oneDayAgo.getMinutes() - 1) // For testing
    const limit = 100;
    let offset = 0;
    let totalCount = 0;
    let abandonedCartsCount = 0;
    let skippedNoEmail = 0;
    let skippedNoItems = 0;
    let skippedAlreadyNotified = 0;
    let workflowFailures = 0;
    logger.info(`[AbandonedCart] Starting sweep: cutoff=${oneDayAgo.toISOString()}`);
    do {
        const { data: abandonedCarts, metadata } = await query.graph({
            entity: "cart",
            fields: [
                "id",
                "email",
                "items.*",
                "metadata",
                "customer.*",
                "shipping_address.*"
            ],
            filters: {
                updated_at: {
                    $lt: oneDayAgo
                },
                email: {
                    $ne: null
                },
                completed_at: null,
            },
            pagination: {
                skip: offset,
                take: limit
            }
        });
        totalCount = metadata?.count ?? 0;
        // Apply the in-memory filters and tally each skip reason so the
        // operator can debug without rerunning. `$ne: null` doesn't catch
        // empty strings (Medusa stores those in some cart flows) so we
        // re-validate here.
        const cartsWithItems = abandonedCarts.filter((cart) => {
            const hasEmail = typeof cart.email === "string" && cart.email.trim().length > 0;
            const hasItems = (cart.items?.length || 0) > 0;
            const alreadyNotified = !!cart.metadata?.abandoned_notification;
            if (!hasEmail) {
                skippedNoEmail++;
                return false;
            }
            if (!hasItems) {
                skippedNoItems++;
                return false;
            }
            if (alreadyNotified) {
                skippedAlreadyNotified++;
                return false;
            }
            return true;
        });
        if (cartsWithItems.length > 0) {
            try {
                await (0, send_abandoned_carts_1.sendAbandonedCartsWorkflow)(container).run({
                    input: {
                        carts: cartsWithItems
                    }
                });
                abandonedCartsCount += cartsWithItems.length;
            }
            catch (error) {
                workflowFailures++;
                // Surface the real reason. The previous handler did
                // `error.message` only — if `error` was a string, that
                // returned `undefined` and the operator saw
                // "Failed to send abandoned cart notification: undefined".
                const reason = error?.message || (typeof error === "string" ? error : JSON.stringify(error));
                logger.error(`[AbandonedCart] Workflow failed for ${cartsWithItems.length} carts: ${reason}`);
                if (error?.stack) {
                    logger.error(`[AbandonedCart] stack: ${error.stack.split("\n").slice(0, 5).join(" | ")}`);
                }
            }
        }
        offset += limit;
    } while (offset < totalCount);
    logger.info(`[AbandonedCart] Done. sent=${abandonedCartsCount} ` +
        `skipped_no_email=${skippedNoEmail} ` +
        `skipped_no_items=${skippedNoItems} ` +
        `skipped_already_notified=${skippedAlreadyNotified} ` +
        `workflow_failures=${workflowFailures} ` +
        `total_scanned=${totalCount}`);
}
exports.config = {
    name: "abandoned-cart-notification",
    schedule: "0 0 * * *" // Run at midnight every day
    // schedule: "* * * * *" // Run every minute for testing
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZC1hYmFuZG9uZWQtY2FydC1ub3RpZmljYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvam9icy9zZW5kLWFiYW5kb25lZC1jYXJ0LW5vdGlmaWNhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFvQkEsbUNBOEdDO0FBaklELDRFQUErRztBQUUvRzs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUNZLEtBQUssVUFBVSxnQkFBZ0IsQ0FDNUMsU0FBMEI7SUFFMUIsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUMxQyxNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBRXhDLE1BQU0sU0FBUyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUE7SUFDNUIsU0FBUyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUE7SUFDMUMsa0VBQWtFO0lBQ2xFLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQTtJQUNqQixJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUE7SUFDZCxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUE7SUFDbEIsSUFBSSxtQkFBbUIsR0FBRyxDQUFDLENBQUE7SUFDM0IsSUFBSSxjQUFjLEdBQUcsQ0FBQyxDQUFBO0lBQ3RCLElBQUksY0FBYyxHQUFHLENBQUMsQ0FBQTtJQUN0QixJQUFJLHNCQUFzQixHQUFHLENBQUMsQ0FBQTtJQUM5QixJQUFJLGdCQUFnQixHQUFHLENBQUMsQ0FBQTtJQUV4QixNQUFNLENBQUMsSUFBSSxDQUFDLDBDQUEwQyxTQUFTLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBRWhGLEdBQUcsQ0FBQztRQUNGLE1BQU0sRUFDSixJQUFJLEVBQUUsY0FBYyxFQUNwQixRQUFRLEVBQ1QsR0FBRyxNQUFNLEtBQUssQ0FBQyxLQUFLLENB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