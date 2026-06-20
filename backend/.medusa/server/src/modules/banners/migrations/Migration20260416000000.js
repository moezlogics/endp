"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20260416000000 = void 0;
const migrations_1 = require("@medusajs/framework/mikro-orm/migrations");
class Migration20260416000000 extends migrations_1.Migration {
    async up() {
        this.addSql(`create table if not exists "banner" (` +
            `"id" text not null, ` +
            `"title" text null, ` +
            `"subtitle" text null, ` +
            `"image_url" text not null, ` +
            `"image_url_mobile" text null, ` +
            `"link_url" text null, ` +
            `"cta_label" text null, ` +
            `"sort_order" integer not null default 0, ` +
            `"is_active" boolean not null default true, ` +
            `"created_at" timestamptz not null default now(), ` +
            `"updated_at" timestamptz not null default now(), ` +
            `"deleted_at" timestamptz null, ` +
            `constraint "banner_pkey" primary key ("id"));`);
        this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_banner_deleted_at" ON "banner" ("deleted_at") WHERE deleted_at IS NULL;`);
        this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_banner_sort_order" ON "banner" ("sort_order") WHERE deleted_at IS NULL;`);
        this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_banner_is_active" ON "banner" ("is_active") WHERE deleted_at IS NULL;`);
    }
    async down() {
        this.addSql(`drop table if exists "banner" cascade;`);
    }
}
exports.Migration20260416000000 = Migration20260416000000;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWlncmF0aW9uMjAyNjA0MTYwMDAwMDAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9iYW5uZXJzL21pZ3JhdGlvbnMvTWlncmF0aW9uMjAyNjA0MTYwMDAwMDAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEseUVBQXFFO0FBRXJFLE1BQWEsdUJBQXdCLFNBQVEsc0JBQVM7SUFFM0MsS0FBSyxDQUFDLEVBQUU7UUFDZixJQUFJLENBQUMsTUFBTSxDQUNULHVDQUF1QztZQUNyQyxzQkFBc0I7WUFDdEIscUJBQXFCO1lBQ3JCLHdCQUF3QjtZQUN4Qiw2QkFBNkI7WUFDN0IsZ0NBQWdDO1lBQ2hDLHdCQUF3QjtZQUN4Qix5QkFBeUI7WUFDekIsMkNBQTJDO1lBQzNDLDZDQUE2QztZQUM3QyxtREFBbUQ7WUFDbkQsbURBQW1EO1lBQ25ELGlDQUFpQztZQUNqQywrQ0FBK0MsQ0FDbEQsQ0FBQztRQUNGLElBQUksQ0FBQyxNQUFNLENBQ1QseUdBQXlHLENBQzFHLENBQUM7UUFDRixJQUFJLENBQUMsTUFBTSxDQUNULHlHQUF5RyxDQUMxRyxDQUFDO1FBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FDVCx1R0FBdUcsQ0FDeEcsQ0FBQztJQUNKLENBQUM7SUFFUSxLQUFLLENBQUMsSUFBSTtRQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDLHdDQUF3QyxDQUFDLENBQUM7SUFDeEQsQ0FBQztDQUVGO0FBbENELDBEQWtDQyJ9