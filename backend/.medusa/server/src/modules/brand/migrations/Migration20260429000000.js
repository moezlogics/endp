"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20260429000000 = void 0;
const migrations_1 = require("@medusajs/framework/mikro-orm/migrations");
class Migration20260429000000 extends migrations_1.Migration {
    async up() {
        this.addSql(`CREATE TABLE IF NOT EXISTS "brand" (` +
            `"id" TEXT NOT NULL, ` +
            `"name" TEXT NOT NULL, ` +
            `"handle" TEXT NOT NULL, ` +
            `"logo_url" TEXT NULL, ` +
            `"description" TEXT NULL, ` +
            `"website_url" TEXT NULL, ` +
            `"seo_title" TEXT NULL, ` +
            `"seo_description" TEXT NULL, ` +
            `"sort_order" INTEGER NOT NULL DEFAULT 0, ` +
            `"is_active" BOOLEAN NOT NULL DEFAULT true, ` +
            `"created_at" TIMESTAMPTZ NOT NULL DEFAULT now(), ` +
            `"updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(), ` +
            `"deleted_at" TIMESTAMPTZ NULL, ` +
            `CONSTRAINT "brand_pkey" PRIMARY KEY ("id")` +
            `);`);
        this.addSql(`CREATE UNIQUE INDEX IF NOT EXISTS "IDX_brand_handle_unique" ON "brand" ("handle") WHERE "deleted_at" IS NULL;`);
        this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_brand_deleted_at" ON "brand" ("deleted_at") WHERE "deleted_at" IS NULL;`);
        this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_brand_is_active" ON "brand" ("is_active") WHERE "deleted_at" IS NULL;`);
        this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_brand_sort_order" ON "brand" ("sort_order") WHERE "deleted_at" IS NULL;`);
        this.addSql(`CREATE TABLE IF NOT EXISTS "brand_product" (` +
            `"id" TEXT NOT NULL, ` +
            `"product_id" TEXT NOT NULL, ` +
            `"brand_id" TEXT NOT NULL, ` +
            `"created_at" TIMESTAMPTZ NOT NULL DEFAULT now(), ` +
            `"updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(), ` +
            `"deleted_at" TIMESTAMPTZ NULL, ` +
            `CONSTRAINT "brand_product_pkey" PRIMARY KEY ("id")` +
            `);`);
        this.addSql(`CREATE UNIQUE INDEX IF NOT EXISTS "IDX_brand_product_unique" ON "brand_product" ("product_id") WHERE "deleted_at" IS NULL;`);
        this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_brand_product_brand_id" ON "brand_product" ("brand_id") WHERE "deleted_at" IS NULL;`);
        this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_brand_product_deleted_at" ON "brand_product" ("deleted_at") WHERE "deleted_at" IS NULL;`);
    }
    async down() {
        this.addSql(`DROP TABLE IF EXISTS "brand_product" CASCADE;`);
        this.addSql(`DROP TABLE IF EXISTS "brand" CASCADE;`);
    }
}
exports.Migration20260429000000 = Migration20260429000000;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWlncmF0aW9uMjAyNjA0MjkwMDAwMDAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9icmFuZC9taWdyYXRpb25zL01pZ3JhdGlvbjIwMjYwNDI5MDAwMDAwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHlFQUFvRTtBQUVwRSxNQUFhLHVCQUF3QixTQUFRLHNCQUFTO0lBQzNDLEtBQUssQ0FBQyxFQUFFO1FBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FDVCxzQ0FBc0M7WUFDcEMsc0JBQXNCO1lBQ3RCLHdCQUF3QjtZQUN4QiwwQkFBMEI7WUFDMUIsd0JBQXdCO1lBQ3hCLDJCQUEyQjtZQUMzQiwyQkFBMkI7WUFDM0IseUJBQXlCO1lBQ3pCLCtCQUErQjtZQUMvQiwyQ0FBMkM7WUFDM0MsNkNBQTZDO1lBQzdDLG1EQUFtRDtZQUNuRCxtREFBbUQ7WUFDbkQsaUNBQWlDO1lBQ2pDLDRDQUE0QztZQUM5QyxJQUFJLENBQ0wsQ0FBQTtRQUNELElBQUksQ0FBQyxNQUFNLENBQ1QsK0dBQStHLENBQ2hILENBQUE7UUFDRCxJQUFJLENBQUMsTUFBTSxDQUNULHlHQUF5RyxDQUMxRyxDQUFBO1FBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FDVCx1R0FBdUcsQ0FDeEcsQ0FBQTtRQUNELElBQUksQ0FBQyxNQUFNLENBQ1QseUdBQXlHLENBQzFHLENBQUE7UUFFRCxJQUFJLENBQUMsTUFBTSxDQUNULDhDQUE4QztZQUM1QyxzQkFBc0I7WUFDdEIsOEJBQThCO1lBQzlCLDRCQUE0QjtZQUM1QixtREFBbUQ7WUFDbkQsbURBQW1EO1lBQ25ELGlDQUFpQztZQUNqQyxvREFBb0Q7WUFDdEQsSUFBSSxDQUNMLENBQUE7UUFDRCxJQUFJLENBQUMsTUFBTSxDQUNULDRIQUE0SCxDQUM3SCxDQUFBO1FBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FDVCxxSEFBcUgsQ0FDdEgsQ0FBQTtRQUNELElBQUksQ0FBQyxNQUFNLENBQ1QseUhBQXlILENBQzFILENBQUE7SUFDSCxDQUFDO0lBRVEsS0FBSyxDQUFDLElBQUk7UUFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQywrQ0FBK0MsQ0FBQyxDQUFBO1FBQzVELElBQUksQ0FBQyxNQUFNLENBQUMsdUNBQXVDLENBQUMsQ0FBQTtJQUN0RCxDQUFDO0NBQ0Y7QUEzREQsMERBMkRDIn0=