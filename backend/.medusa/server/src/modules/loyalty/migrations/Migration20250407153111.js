"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20250407153111 = void 0;
const migrations_1 = require("@medusajs/framework/mikro-orm/migrations");
class Migration20250407153111 extends migrations_1.Migration {
    async up() {
        this.addSql(`create table if not exists "loyalty_point" ("id" text not null, "points" integer not null default 0, "customer_id" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "loyalty_point_pkey" primary key ("id"));`);
        this.addSql(`CREATE UNIQUE INDEX IF NOT EXISTS "IDX_LOYALTY_CUSTOMER_ID" ON "loyalty_point" (customer_id) WHERE deleted_at IS NULL;`);
        this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_loyalty_point_deleted_at" ON "loyalty_point" (deleted_at) WHERE deleted_at IS NULL;`);
    }
    async down() {
        this.addSql(`drop table if exists "loyalty_point" cascade;`);
    }
}
exports.Migration20250407153111 = Migration20250407153111;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWlncmF0aW9uMjAyNTA0MDcxNTMxMTEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9sb3lhbHR5L21pZ3JhdGlvbnMvTWlncmF0aW9uMjAyNTA0MDcxNTMxMTEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEseUVBQXFFO0FBRXJFLE1BQWEsdUJBQXdCLFNBQVEsc0JBQVM7SUFFM0MsS0FBSyxDQUFDLEVBQUU7UUFDZixJQUFJLENBQUMsTUFBTSxDQUFDLHlUQUF5VCxDQUFDLENBQUM7UUFDdlUsSUFBSSxDQUFDLE1BQU0sQ0FBQyx3SEFBd0gsQ0FBQyxDQUFDO1FBQ3RJLElBQUksQ0FBQyxNQUFNLENBQUMscUhBQXFILENBQUMsQ0FBQztJQUNySSxDQUFDO0lBRVEsS0FBSyxDQUFDLElBQUk7UUFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQywrQ0FBK0MsQ0FBQyxDQUFDO0lBQy9ELENBQUM7Q0FFRjtBQVpELDBEQVlDIn0=