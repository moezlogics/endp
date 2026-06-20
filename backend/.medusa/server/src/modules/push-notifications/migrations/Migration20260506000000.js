"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20260506000000 = void 0;
const migrations_1 = require("@medusajs/framework/mikro-orm/migrations");
/**
 * Adds marketer-grade segmentation fields and click-tracking counters
 * to push_subscription, plus extra filter/stat columns to push_campaign.
 *
 * All new columns are nullable / defaulted so existing rows stay valid.
 */
class Migration20260506000000 extends migrations_1.Migration {
    async up() {
        // ── push_subscription: enrichment + engagement ──
        this.addSql(`ALTER TABLE "push_subscription" ` +
            `ADD COLUMN IF NOT EXISTS "device_type" TEXT NULL, ` +
            `ADD COLUMN IF NOT EXISTS "os" TEXT NULL, ` +
            `ADD COLUMN IF NOT EXISTS "locale" TEXT NULL, ` +
            `ADD COLUMN IF NOT EXISTS "timezone" TEXT NULL, ` +
            `ADD COLUMN IF NOT EXISTS "subscribe_source" TEXT NULL, ` +
            `ADD COLUMN IF NOT EXISTS "total_clicked" INTEGER NOT NULL DEFAULT 0, ` +
            `ADD COLUMN IF NOT EXISTS "last_clicked_at" TIMESTAMPTZ NULL;`);
        this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_push_subscription_device_type" ON "push_subscription" ("device_type") WHERE "deleted_at" IS NULL;`);
        this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_push_subscription_os" ON "push_subscription" ("os") WHERE "deleted_at" IS NULL;`);
        this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_push_subscription_country" ON "push_subscription" ("country") WHERE "deleted_at" IS NULL;`);
        // ── push_campaign: extra filters + click counter ──
        this.addSql(`ALTER TABLE "push_campaign" ` +
            `ADD COLUMN IF NOT EXISTS "filter_countries" TEXT NULL, ` +
            `ADD COLUMN IF NOT EXISTS "filter_device_types" TEXT NULL, ` +
            `ADD COLUMN IF NOT EXISTS "filter_os" TEXT NULL, ` +
            `ADD COLUMN IF NOT EXISTS "filter_browsers" TEXT NULL, ` +
            `ADD COLUMN IF NOT EXISTS "filter_customers_only" BOOLEAN NOT NULL DEFAULT FALSE, ` +
            `ADD COLUMN IF NOT EXISTS "total_clicked" INTEGER NOT NULL DEFAULT 0;`);
    }
    async down() {
        this.addSql(`ALTER TABLE "push_subscription" ` +
            `DROP COLUMN IF EXISTS "device_type", ` +
            `DROP COLUMN IF EXISTS "os", ` +
            `DROP COLUMN IF EXISTS "locale", ` +
            `DROP COLUMN IF EXISTS "timezone", ` +
            `DROP COLUMN IF EXISTS "subscribe_source", ` +
            `DROP COLUMN IF EXISTS "total_clicked", ` +
            `DROP COLUMN IF EXISTS "last_clicked_at";`);
        this.addSql(`ALTER TABLE "push_campaign" ` +
            `DROP COLUMN IF EXISTS "filter_countries", ` +
            `DROP COLUMN IF EXISTS "filter_device_types", ` +
            `DROP COLUMN IF EXISTS "filter_os", ` +
            `DROP COLUMN IF EXISTS "filter_browsers", ` +
            `DROP COLUMN IF EXISTS "filter_customers_only", ` +
            `DROP COLUMN IF EXISTS "total_clicked";`);
    }
}
exports.Migration20260506000000 = Migration20260506000000;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWlncmF0aW9uMjAyNjA1MDYwMDAwMDAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9wdXNoLW5vdGlmaWNhdGlvbnMvbWlncmF0aW9ucy9NaWdyYXRpb24yMDI2MDUwNjAwMDAwMC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx5RUFBb0U7QUFFcEU7Ozs7O0dBS0c7QUFDSCxNQUFhLHVCQUF3QixTQUFRLHNCQUFTO0lBQzNDLEtBQUssQ0FBQyxFQUFFO1FBQ2YsbURBQW1EO1FBQ25ELElBQUksQ0FBQyxNQUFNLENBQ1Qsa0NBQWtDO1lBQ2hDLG9EQUFvRDtZQUNwRCwyQ0FBMkM7WUFDM0MsK0NBQStDO1lBQy9DLGlEQUFpRDtZQUNqRCx5REFBeUQ7WUFDekQsdUVBQXVFO1lBQ3ZFLDhEQUE4RCxDQUNqRSxDQUFBO1FBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FDVCxtSUFBbUksQ0FDcEksQ0FBQTtRQUNELElBQUksQ0FBQyxNQUFNLENBQ1QsaUhBQWlILENBQ2xILENBQUE7UUFDRCxJQUFJLENBQUMsTUFBTSxDQUNULDJIQUEySCxDQUM1SCxDQUFBO1FBRUQscURBQXFEO1FBQ3JELElBQUksQ0FBQyxNQUFNLENBQ1QsOEJBQThCO1lBQzVCLHlEQUF5RDtZQUN6RCw0REFBNEQ7WUFDNUQsa0RBQWtEO1lBQ2xELHdEQUF3RDtZQUN4RCxtRkFBbUY7WUFDbkYsc0VBQXNFLENBQ3pFLENBQUE7SUFDSCxDQUFDO0lBRVEsS0FBSyxDQUFDLElBQUk7UUFDakIsSUFBSSxDQUFDLE1BQU0sQ0FDVCxrQ0FBa0M7WUFDaEMsdUNBQXVDO1lBQ3ZDLDhCQUE4QjtZQUM5QixrQ0FBa0M7WUFDbEMsb0NBQW9DO1lBQ3BDLDRDQUE0QztZQUM1Qyx5Q0FBeUM7WUFDekMsMENBQTBDLENBQzdDLENBQUE7UUFDRCxJQUFJLENBQUMsTUFBTSxDQUNULDhCQUE4QjtZQUM1Qiw0Q0FBNEM7WUFDNUMsK0NBQStDO1lBQy9DLHFDQUFxQztZQUNyQywyQ0FBMkM7WUFDM0MsaURBQWlEO1lBQ2pELHdDQUF3QyxDQUMzQyxDQUFBO0lBQ0gsQ0FBQztDQUNGO0FBeERELDBEQXdEQyJ9