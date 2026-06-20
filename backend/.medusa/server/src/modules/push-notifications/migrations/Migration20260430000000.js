"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20260430000000 = void 0;
const migrations_1 = require("@medusajs/framework/mikro-orm/migrations");
class Migration20260430000000 extends migrations_1.Migration {
    async up() {
        this.addSql(`CREATE TABLE IF NOT EXISTS "push_subscription" (` +
            `"id" TEXT NOT NULL, ` +
            `"endpoint" TEXT NOT NULL, ` +
            `"p256dh" TEXT NOT NULL, ` +
            `"auth" TEXT NOT NULL, ` +
            `"customer_id" TEXT NULL, ` +
            `"city" TEXT NULL, ` +
            `"state" TEXT NULL, ` +
            `"country" TEXT NULL, ` +
            `"user_agent" TEXT NULL, ` +
            `"device_browser" TEXT NULL, ` +
            `"is_active" BOOLEAN NOT NULL DEFAULT true, ` +
            `"last_sent_at" TIMESTAMPTZ NULL, ` +
            `"created_at" TIMESTAMPTZ NOT NULL DEFAULT now(), ` +
            `"updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(), ` +
            `"deleted_at" TIMESTAMPTZ NULL, ` +
            `CONSTRAINT "push_subscription_pkey" PRIMARY KEY ("id")` +
            `);`);
        this.addSql(`CREATE UNIQUE INDEX IF NOT EXISTS "IDX_push_subscription_endpoint_unique" ON "push_subscription" ("endpoint") WHERE "deleted_at" IS NULL;`);
        this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_push_subscription_customer_id" ON "push_subscription" ("customer_id") WHERE "deleted_at" IS NULL;`);
        this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_push_subscription_city" ON "push_subscription" ("city") WHERE "deleted_at" IS NULL;`);
        this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_push_subscription_state" ON "push_subscription" ("state") WHERE "deleted_at" IS NULL;`);
        this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_push_subscription_is_active" ON "push_subscription" ("is_active") WHERE "deleted_at" IS NULL;`);
        this.addSql(`CREATE TABLE IF NOT EXISTS "push_campaign" (` +
            `"id" TEXT NOT NULL, ` +
            `"title" TEXT NOT NULL, ` +
            `"body" TEXT NOT NULL, ` +
            `"icon_url" TEXT NULL, ` +
            `"image_url" TEXT NULL, ` +
            `"action_url" TEXT NULL, ` +
            `"filter_cities" TEXT NULL, ` +
            `"filter_states" TEXT NULL, ` +
            `"total_targeted" INTEGER NOT NULL DEFAULT 0, ` +
            `"total_sent" INTEGER NOT NULL DEFAULT 0, ` +
            `"total_failed" INTEGER NOT NULL DEFAULT 0, ` +
            `"status" TEXT NOT NULL DEFAULT 'draft', ` +
            `"sent_at" TIMESTAMPTZ NULL, ` +
            `"created_at" TIMESTAMPTZ NOT NULL DEFAULT now(), ` +
            `"updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(), ` +
            `"deleted_at" TIMESTAMPTZ NULL, ` +
            `CONSTRAINT "push_campaign_pkey" PRIMARY KEY ("id")` +
            `);`);
        this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_push_campaign_status" ON "push_campaign" ("status") WHERE "deleted_at" IS NULL;`);
        this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_push_campaign_created_at" ON "push_campaign" ("created_at") WHERE "deleted_at" IS NULL;`);
    }
    async down() {
        this.addSql(`DROP TABLE IF EXISTS "push_campaign" CASCADE;`);
        this.addSql(`DROP TABLE IF EXISTS "push_subscription" CASCADE;`);
    }
}
exports.Migration20260430000000 = Migration20260430000000;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWlncmF0aW9uMjAyNjA0MzAwMDAwMDAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9wdXNoLW5vdGlmaWNhdGlvbnMvbWlncmF0aW9ucy9NaWdyYXRpb24yMDI2MDQzMDAwMDAwMC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx5RUFBb0U7QUFFcEUsTUFBYSx1QkFBd0IsU0FBUSxzQkFBUztJQUMzQyxLQUFLLENBQUMsRUFBRTtRQUNmLElBQUksQ0FBQyxNQUFNLENBQ1Qsa0RBQWtEO1lBQ2hELHNCQUFzQjtZQUN0Qiw0QkFBNEI7WUFDNUIsMEJBQTBCO1lBQzFCLHdCQUF3QjtZQUN4QiwyQkFBMkI7WUFDM0Isb0JBQW9CO1lBQ3BCLHFCQUFxQjtZQUNyQix1QkFBdUI7WUFDdkIsMEJBQTBCO1lBQzFCLDhCQUE4QjtZQUM5Qiw2Q0FBNkM7WUFDN0MsbUNBQW1DO1lBQ25DLG1EQUFtRDtZQUNuRCxtREFBbUQ7WUFDbkQsaUNBQWlDO1lBQ2pDLHdEQUF3RDtZQUMxRCxJQUFJLENBQ0wsQ0FBQTtRQUNELElBQUksQ0FBQyxNQUFNLENBQ1QsMklBQTJJLENBQzVJLENBQUE7UUFDRCxJQUFJLENBQUMsTUFBTSxDQUNULG1JQUFtSSxDQUNwSSxDQUFBO1FBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FDVCxxSEFBcUgsQ0FDdEgsQ0FBQTtRQUNELElBQUksQ0FBQyxNQUFNLENBQ1QsdUhBQXVILENBQ3hILENBQUE7UUFDRCxJQUFJLENBQUMsTUFBTSxDQUNULCtIQUErSCxDQUNoSSxDQUFBO1FBRUQsSUFBSSxDQUFDLE1BQU0sQ0FDVCw4Q0FBOEM7WUFDNUMsc0JBQXNCO1lBQ3RCLHlCQUF5QjtZQUN6Qix3QkFBd0I7WUFDeEIsd0JBQXdCO1lBQ3hCLHlCQUF5QjtZQUN6QiwwQkFBMEI7WUFDMUIsNkJBQTZCO1lBQzdCLDZCQUE2QjtZQUM3QiwrQ0FBK0M7WUFDL0MsMkNBQTJDO1lBQzNDLDZDQUE2QztZQUM3QywwQ0FBMEM7WUFDMUMsOEJBQThCO1lBQzlCLG1EQUFtRDtZQUNuRCxtREFBbUQ7WUFDbkQsaUNBQWlDO1lBQ2pDLG9EQUFvRDtZQUN0RCxJQUFJLENBQ0wsQ0FBQTtRQUNELElBQUksQ0FBQyxNQUFNLENBQ1QsaUhBQWlILENBQ2xILENBQUE7UUFDRCxJQUFJLENBQUMsTUFBTSxDQUNULHlIQUF5SCxDQUMxSCxDQUFBO0lBQ0gsQ0FBQztJQUVRLEtBQUssQ0FBQyxJQUFJO1FBQ2pCLElBQUksQ0FBQyxNQUFNLENBQUMsK0NBQStDLENBQUMsQ0FBQTtRQUM1RCxJQUFJLENBQUMsTUFBTSxDQUFDLG1EQUFtRCxDQUFDLENBQUE7SUFDbEUsQ0FBQztDQUNGO0FBdkVELDBEQXVFQyJ9