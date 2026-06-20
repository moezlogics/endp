"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20260501000000 = void 0;
const migrations_1 = require("@medusajs/framework/mikro-orm/migrations");
/**
 * Adds `loyalty_transaction` for the customer-facing points history.
 * The original `loyalty_point` table from Migration20250407153111 stays
 * unchanged — `loyalty_transaction` is a sibling, not a replacement.
 */
class Migration20260501000000 extends migrations_1.Migration {
    async up() {
        this.addSql(`CREATE TABLE IF NOT EXISTS "loyalty_transaction" (` +
            `"id" TEXT NOT NULL, ` +
            `"customer_id" TEXT NOT NULL, ` +
            `"points" INTEGER NOT NULL, ` +
            `"balance_after" INTEGER NOT NULL DEFAULT 0, ` +
            `"kind" TEXT NOT NULL DEFAULT 'earn', ` +
            `"order_id" TEXT NULL, ` +
            `"cart_id" TEXT NULL, ` +
            `"description" TEXT NULL, ` +
            `"created_at" TIMESTAMPTZ NOT NULL DEFAULT now(), ` +
            `"updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(), ` +
            `"deleted_at" TIMESTAMPTZ NULL, ` +
            `CONSTRAINT "loyalty_transaction_pkey" PRIMARY KEY ("id")` +
            `);`);
        this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_loyalty_transaction_customer_id" ON "loyalty_transaction" ("customer_id") WHERE "deleted_at" IS NULL;`);
        this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_loyalty_transaction_kind" ON "loyalty_transaction" ("kind") WHERE "deleted_at" IS NULL;`);
        this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_loyalty_transaction_created_at" ON "loyalty_transaction" ("created_at") WHERE "deleted_at" IS NULL;`);
    }
    async down() {
        this.addSql(`DROP TABLE IF EXISTS "loyalty_transaction" CASCADE;`);
    }
}
exports.Migration20260501000000 = Migration20260501000000;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWlncmF0aW9uMjAyNjA1MDEwMDAwMDAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9sb3lhbHR5L21pZ3JhdGlvbnMvTWlncmF0aW9uMjAyNjA1MDEwMDAwMDAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEseUVBQW9FO0FBRXBFOzs7O0dBSUc7QUFDSCxNQUFhLHVCQUF3QixTQUFRLHNCQUFTO0lBQzNDLEtBQUssQ0FBQyxFQUFFO1FBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FDVCxvREFBb0Q7WUFDbEQsc0JBQXNCO1lBQ3RCLCtCQUErQjtZQUMvQiw2QkFBNkI7WUFDN0IsOENBQThDO1lBQzlDLHVDQUF1QztZQUN2Qyx3QkFBd0I7WUFDeEIsdUJBQXVCO1lBQ3ZCLDJCQUEyQjtZQUMzQixtREFBbUQ7WUFDbkQsbURBQW1EO1lBQ25ELGlDQUFpQztZQUNqQywwREFBMEQ7WUFDNUQsSUFBSSxDQUNMLENBQUE7UUFDRCxJQUFJLENBQUMsTUFBTSxDQUNULHVJQUF1SSxDQUN4SSxDQUFBO1FBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FDVCx5SEFBeUgsQ0FDMUgsQ0FBQTtRQUNELElBQUksQ0FBQyxNQUFNLENBQ1QscUlBQXFJLENBQ3RJLENBQUE7SUFDSCxDQUFDO0lBRVEsS0FBSyxDQUFDLElBQUk7UUFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxxREFBcUQsQ0FBQyxDQUFBO0lBQ3BFLENBQUM7Q0FDRjtBQWhDRCwwREFnQ0MifQ==