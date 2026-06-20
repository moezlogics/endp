"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20260507000000 = void 0;
const migrations_1 = require("@medusajs/framework/mikro-orm/migrations");
/**
 * Adds a demographic `gender` column to push_subscription and a matching
 * `filter_genders` JSON column to push_campaign so marketers can target
 * pushes at male / female / other audiences.
 *
 * `gender` is a free-text column (not a Postgres enum) on purpose —
 * we may accept "other", "prefer_not_to_say", or locale-specific
 * values later and don't want another migration for each one. Indexed
 * for fast segmentation queries.
 */
class Migration20260507000000 extends migrations_1.Migration {
    async up() {
        // ── push_subscription: gender demographic ──
        this.addSql(`ALTER TABLE "push_subscription" ` +
            `ADD COLUMN IF NOT EXISTS "gender" TEXT NULL;`);
        this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_push_subscription_gender" ` +
            `ON "push_subscription" ("gender") WHERE "deleted_at" IS NULL;`);
        // ── push_campaign: gender filter ──
        this.addSql(`ALTER TABLE "push_campaign" ` +
            `ADD COLUMN IF NOT EXISTS "filter_genders" TEXT NULL;`);
    }
    async down() {
        this.addSql(`DROP INDEX IF EXISTS "IDX_push_subscription_gender";`);
        this.addSql(`ALTER TABLE "push_subscription" DROP COLUMN IF EXISTS "gender";`);
        this.addSql(`ALTER TABLE "push_campaign" DROP COLUMN IF EXISTS "filter_genders";`);
    }
}
exports.Migration20260507000000 = Migration20260507000000;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWlncmF0aW9uMjAyNjA1MDcwMDAwMDAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9wdXNoLW5vdGlmaWNhdGlvbnMvbWlncmF0aW9ucy9NaWdyYXRpb24yMDI2MDUwNzAwMDAwMC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx5RUFBb0U7QUFFcEU7Ozs7Ozs7OztHQVNHO0FBQ0gsTUFBYSx1QkFBd0IsU0FBUSxzQkFBUztJQUMzQyxLQUFLLENBQUMsRUFBRTtRQUNmLDhDQUE4QztRQUM5QyxJQUFJLENBQUMsTUFBTSxDQUNULGtDQUFrQztZQUNoQyw4Q0FBOEMsQ0FDakQsQ0FBQTtRQUNELElBQUksQ0FBQyxNQUFNLENBQ1QsNERBQTREO1lBQzFELCtEQUErRCxDQUNsRSxDQUFBO1FBRUQscUNBQXFDO1FBQ3JDLElBQUksQ0FBQyxNQUFNLENBQ1QsOEJBQThCO1lBQzVCLHNEQUFzRCxDQUN6RCxDQUFBO0lBQ0gsQ0FBQztJQUVRLEtBQUssQ0FBQyxJQUFJO1FBQ2pCLElBQUksQ0FBQyxNQUFNLENBQ1Qsc0RBQXNELENBQ3ZELENBQUE7UUFDRCxJQUFJLENBQUMsTUFBTSxDQUNULGlFQUFpRSxDQUNsRSxDQUFBO1FBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FDVCxxRUFBcUUsQ0FDdEUsQ0FBQTtJQUNILENBQUM7Q0FDRjtBQTlCRCwwREE4QkMifQ==