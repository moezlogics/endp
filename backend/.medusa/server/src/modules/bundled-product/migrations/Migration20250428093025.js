"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20250428093025 = void 0;
const migrations_1 = require("@medusajs/framework/mikro-orm/migrations");
class Migration20250428093025 extends migrations_1.Migration {
    async up() {
        this.addSql(`create table if not exists "bundle" ("id" text not null, "title" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "bundle_pkey" primary key ("id"));`);
        this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_bundle_deleted_at" ON "bundle" (deleted_at) WHERE deleted_at IS NULL;`);
        this.addSql(`create table if not exists "bundle_item" ("id" text not null, "quantity" integer not null default 1, "bundle_id" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "bundle_item_pkey" primary key ("id"));`);
        this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_bundle_item_bundle_id" ON "bundle_item" (bundle_id) WHERE deleted_at IS NULL;`);
        this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_bundle_item_deleted_at" ON "bundle_item" (deleted_at) WHERE deleted_at IS NULL;`);
        this.addSql(`alter table if exists "bundle_item" add constraint "bundle_item_bundle_id_foreign" foreign key ("bundle_id") references "bundle" ("id") on update cascade;`);
    }
    async down() {
        this.addSql(`alter table if exists "bundle_item" drop constraint if exists "bundle_item_bundle_id_foreign";`);
        this.addSql(`drop table if exists "bundle" cascade;`);
        this.addSql(`drop table if exists "bundle_item" cascade;`);
    }
}
exports.Migration20250428093025 = Migration20250428093025;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWlncmF0aW9uMjAyNTA0MjgwOTMwMjUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9idW5kbGVkLXByb2R1Y3QvbWlncmF0aW9ucy9NaWdyYXRpb24yMDI1MDQyODA5MzAyNS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx5RUFBcUU7QUFFckUsTUFBYSx1QkFBd0IsU0FBUSxzQkFBUztJQUUzQyxLQUFLLENBQUMsRUFBRTtRQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsZ1FBQWdRLENBQUMsQ0FBQztRQUM5USxJQUFJLENBQUMsTUFBTSxDQUFDLHVHQUF1RyxDQUFDLENBQUM7UUFFckgsSUFBSSxDQUFDLE1BQU0sQ0FBQyxxVEFBcVQsQ0FBQyxDQUFDO1FBQ25VLElBQUksQ0FBQyxNQUFNLENBQUMsK0dBQStHLENBQUMsQ0FBQztRQUM3SCxJQUFJLENBQUMsTUFBTSxDQUFDLGlIQUFpSCxDQUFDLENBQUM7UUFFL0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyw0SkFBNEosQ0FBQyxDQUFDO0lBQzVLLENBQUM7SUFFUSxLQUFLLENBQUMsSUFBSTtRQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDLGdHQUFnRyxDQUFDLENBQUM7UUFFOUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO1FBRXRELElBQUksQ0FBQyxNQUFNLENBQUMsNkNBQTZDLENBQUMsQ0FBQztJQUM3RCxDQUFDO0NBRUY7QUFyQkQsMERBcUJDIn0=