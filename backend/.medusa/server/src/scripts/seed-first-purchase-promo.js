"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = seedFirstPurchasePromo;
const utils_1 = require("@medusajs/framework/utils");
const constants_1 = require("../constants");
/**
 * Seed script: Creates the FIRST_PURCHASE promotion if it doesn't exist.
 *
 * Usage:
 *   npx medusa exec src/scripts/seed-first-purchase-promo.ts
 *
 * This creates a 10% off promotion for first-time customers.
 * The apply-first-purchase subscriber will auto-attach it to carts.
 */
async function seedFirstPurchasePromo({ container }) {
    const logger = container.resolve(utils_1.ContainerRegistrationKeys.LOGGER);
    const promotionModule = container.resolve(utils_1.Modules.PROMOTION);
    // Check if promo already exists
    const existing = await promotionModule.listPromotions({
        code: constants_1.FIRST_PURCHASE_PROMOTION_CODE,
    });
    if (existing.length > 0) {
        logger.info(`[FirstPurchase] Promotion "${constants_1.FIRST_PURCHASE_PROMOTION_CODE}" already exists — skipping.`);
        return;
    }
    const promo = await promotionModule.createPromotions({
        code: constants_1.FIRST_PURCHASE_PROMOTION_CODE,
        is_automatic: true,
        type: "standard",
        status: "active",
        application_method: {
            type: "percentage",
            target_type: "order",
            value: 10, // 10% off entire order
        },
    });
    logger.info(`[FirstPurchase] ✅ Created promotion: ${constants_1.FIRST_PURCHASE_PROMOTION_CODE} (10% off first order)`);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VlZC1maXJzdC1wdXJjaGFzZS1wcm9tby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zY3JpcHRzL3NlZWQtZmlyc3QtcHVyY2hhc2UtcHJvbW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFhQSx5Q0EyQkM7QUF2Q0QscURBQThFO0FBQzlFLDRDQUE0RDtBQUU1RDs7Ozs7Ozs7R0FRRztBQUNZLEtBQUssVUFBVSxzQkFBc0IsQ0FBQyxFQUFFLFNBQVMsRUFBWTtJQUMxRSxNQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLGlDQUF5QixDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ2xFLE1BQU0sZUFBZSxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsZUFBTyxDQUFDLFNBQVMsQ0FBUSxDQUFBO0lBRW5FLGdDQUFnQztJQUNoQyxNQUFNLFFBQVEsR0FBRyxNQUFNLGVBQWUsQ0FBQyxjQUFjLENBQUM7UUFDcEQsSUFBSSxFQUFFLHlDQUE2QjtLQUNwQyxDQUFDLENBQUE7SUFFRixJQUFJLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7UUFDeEIsTUFBTSxDQUFDLElBQUksQ0FBQyw4QkFBOEIseUNBQTZCLDhCQUE4QixDQUFDLENBQUE7UUFDdEcsT0FBTTtJQUNSLENBQUM7SUFFRCxNQUFNLEtBQUssR0FBRyxNQUFNLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQztRQUNuRCxJQUFJLEVBQUUseUNBQTZCO1FBQ25DLFlBQVksRUFBRSxJQUFJO1FBQ2xCLElBQUksRUFBRSxVQUFVO1FBQ2hCLE1BQU0sRUFBRSxRQUFRO1FBQ2hCLGtCQUFrQixFQUFFO1lBQ2xCLElBQUksRUFBRSxZQUFZO1lBQ2xCLFdBQVcsRUFBRSxPQUFPO1lBQ3BCLEtBQUssRUFBRSxFQUFFLEVBQUUsdUJBQXVCO1NBQ25DO0tBQ0YsQ0FBQyxDQUFBO0lBRUYsTUFBTSxDQUFDLElBQUksQ0FBQyx3Q0FBd0MseUNBQTZCLHdCQUF3QixDQUFDLENBQUE7QUFDNUcsQ0FBQyJ9