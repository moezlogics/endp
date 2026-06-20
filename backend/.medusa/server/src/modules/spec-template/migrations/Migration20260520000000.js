"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20260520000000 = void 0;
const migrations_1 = require("@medusajs/framework/mikro-orm/migrations");
class Migration20260520000000 extends migrations_1.Migration {
    async up() {
        this.addSql(`CREATE TABLE IF NOT EXISTS "spec_template" (` +
            `"id" TEXT NOT NULL, ` +
            `"name" TEXT NOT NULL, ` +
            `"handle" TEXT NOT NULL, ` +
            `"description" TEXT NULL, ` +
            `"icon" TEXT NOT NULL DEFAULT 'ph-list-checks', ` +
            `"is_preset" BOOLEAN NOT NULL DEFAULT false, ` +
            `"sort_order" INTEGER NOT NULL DEFAULT 0, ` +
            `"template_data" JSONB NOT NULL DEFAULT '{}', ` +
            `"created_at" TIMESTAMPTZ NOT NULL DEFAULT now(), ` +
            `"updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(), ` +
            `"deleted_at" TIMESTAMPTZ NULL, ` +
            `CONSTRAINT "spec_template_pkey" PRIMARY KEY ("id")` +
            `);`);
        this.addSql(`CREATE UNIQUE INDEX IF NOT EXISTS "IDX_spec_template_handle_unique" ON "spec_template" ("handle") WHERE "deleted_at" IS NULL;`);
        this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_spec_template_deleted_at" ON "spec_template" ("deleted_at") WHERE "deleted_at" IS NULL;`);
        this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_spec_template_is_preset" ON "spec_template" ("is_preset") WHERE "deleted_at" IS NULL;`);
        this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_spec_template_sort_order" ON "spec_template" ("sort_order") WHERE "deleted_at" IS NULL;`);
    }
    async down() {
        this.addSql(`DROP TABLE IF EXISTS "spec_template" CASCADE;`);
    }
}
exports.Migration20260520000000 = Migration20260520000000;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWlncmF0aW9uMjAyNjA1MjAwMDAwMDAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9zcGVjLXRlbXBsYXRlL21pZ3JhdGlvbnMvTWlncmF0aW9uMjAyNjA1MjAwMDAwMDAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEseUVBQW9FO0FBRXBFLE1BQWEsdUJBQXdCLFNBQVEsc0JBQVM7SUFDM0MsS0FBSyxDQUFDLEVBQUU7UUFDZixJQUFJLENBQUMsTUFBTSxDQUNULDhDQUE4QztZQUM1QyxzQkFBc0I7WUFDdEIsd0JBQXdCO1lBQ3hCLDBCQUEwQjtZQUMxQiwyQkFBMkI7WUFDM0IsaURBQWlEO1lBQ2pELDhDQUE4QztZQUM5QywyQ0FBMkM7WUFDM0MsK0NBQStDO1lBQy9DLG1EQUFtRDtZQUNuRCxtREFBbUQ7WUFDbkQsaUNBQWlDO1lBQ2pDLG9EQUFvRDtZQUN0RCxJQUFJLENBQ0wsQ0FBQTtRQUNELElBQUksQ0FBQyxNQUFNLENBQ1QsK0hBQStILENBQ2hJLENBQUE7UUFDRCxJQUFJLENBQUMsTUFBTSxDQUNULHlIQUF5SCxDQUMxSCxDQUFBO1FBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FDVCx1SEFBdUgsQ0FDeEgsQ0FBQTtRQUNELElBQUksQ0FBQyxNQUFNLENBQ1QseUhBQXlILENBQzFILENBQUE7SUFDSCxDQUFDO0lBRVEsS0FBSyxDQUFDLElBQUk7UUFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQywrQ0FBK0MsQ0FBQyxDQUFBO0lBQzlELENBQUM7Q0FDRjtBQW5DRCwwREFtQ0MifQ==