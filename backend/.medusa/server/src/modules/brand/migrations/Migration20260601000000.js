"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20260601000000 = void 0;
const migrations_1 = require("@medusajs/framework/mikro-orm/migrations");
/**
 * Brand hierarchy — add `parent_id` to the brand table so brands
 * can have sub-brands (e.g. Apple → Apple Mac, Apple iPhone).
 *
 * Schema changes:
 *   • brand.parent_id  TEXT NULL  — points at brand.id (self-FK,
 *                                    ON DELETE SET NULL so deleting
 *                                    a parent orphans its children
 *                                    instead of removing them).
 *   • Two indexes:
 *       - idx_brand_parent_id              for breadcrumb walks
 *       - idx_brand_active_parent          for storefront filters
 *
 * Idempotent: every statement uses IF NOT EXISTS so re-running this
 * migration (or replaying through sync-db-completely.js) is safe.
 */
class Migration20260601000000 extends migrations_1.Migration {
    async up() {
        this.addSql(`ALTER TABLE "brand" ADD COLUMN IF NOT EXISTS "parent_id" TEXT NULL;`);
        // Self-referencing FK. Wrapped in DO-block so re-runs don't
        // fail with "constraint already exists".
        this.addSql(`DO $$ BEGIN
         ALTER TABLE "brand"
           ADD CONSTRAINT "fk_brand_parent"
           FOREIGN KEY ("parent_id") REFERENCES "brand"("id") ON DELETE SET NULL;
       EXCEPTION
         WHEN duplicate_object THEN NULL;
       END $$;`);
        this.addSql(`CREATE INDEX IF NOT EXISTS "idx_brand_parent_id" ON "brand" ("parent_id") WHERE "deleted_at" IS NULL;`);
        this.addSql(`CREATE INDEX IF NOT EXISTS "idx_brand_active_parent" ON "brand" ("is_active", "parent_id") WHERE "deleted_at" IS NULL;`);
    }
    async down() {
        this.addSql(`DROP INDEX IF EXISTS "idx_brand_active_parent";`);
        this.addSql(`DROP INDEX IF EXISTS "idx_brand_parent_id";`);
        this.addSql(`ALTER TABLE "brand" DROP CONSTRAINT IF EXISTS "fk_brand_parent";`);
        this.addSql(`ALTER TABLE "brand" DROP COLUMN IF EXISTS "parent_id";`);
    }
}
exports.Migration20260601000000 = Migration20260601000000;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWlncmF0aW9uMjAyNjA2MDEwMDAwMDAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9icmFuZC9taWdyYXRpb25zL01pZ3JhdGlvbjIwMjYwNjAxMDAwMDAwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHlFQUFvRTtBQUVwRTs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFDSCxNQUFhLHVCQUF3QixTQUFRLHNCQUFTO0lBQzNDLEtBQUssQ0FBQyxFQUFFO1FBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FDVCxxRUFBcUUsQ0FDdEUsQ0FBQTtRQUNELDREQUE0RDtRQUM1RCx5Q0FBeUM7UUFDekMsSUFBSSxDQUFDLE1BQU0sQ0FDVDs7Ozs7O2VBTVMsQ0FDVixDQUFBO1FBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FDVCx1R0FBdUcsQ0FDeEcsQ0FBQTtRQUNELElBQUksQ0FBQyxNQUFNLENBQ1Qsd0hBQXdILENBQ3pILENBQUE7SUFDSCxDQUFDO0lBRVEsS0FBSyxDQUFDLElBQUk7UUFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpREFBaUQsQ0FBQyxDQUFBO1FBQzlELElBQUksQ0FBQyxNQUFNLENBQUMsNkNBQTZDLENBQUMsQ0FBQTtRQUMxRCxJQUFJLENBQUMsTUFBTSxDQUFDLGtFQUFrRSxDQUFDLENBQUE7UUFDL0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyx3REFBd0QsQ0FBQyxDQUFBO0lBQ3ZFLENBQUM7Q0FDRjtBQTlCRCwwREE4QkMifQ==