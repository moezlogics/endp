"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20260415153028 = void 0;
const migrations_1 = require("@medusajs/framework/mikro-orm/migrations");
class Migration20260415153028 extends migrations_1.Migration {
    async up() {
        this.addSql(`alter table if exists "site_setting" drop constraint if exists "site_setting_key_unique";`);
        this.addSql(`create table if not exists "site_setting" ("id" text not null, "key" text not null, "value" text null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "site_setting_pkey" primary key ("id"));`);
        this.addSql(`CREATE UNIQUE INDEX IF NOT EXISTS "IDX_site_setting_key_unique" ON "site_setting" ("key") WHERE deleted_at IS NULL;`);
        this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_site_setting_deleted_at" ON "site_setting" ("deleted_at") WHERE deleted_at IS NULL;`);
    }
    async down() {
        this.addSql(`drop table if exists "site_setting" cascade;`);
    }
}
exports.Migration20260415153028 = Migration20260415153028;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWlncmF0aW9uMjAyNjA0MTUxNTMwMjguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9zaXRlLXNldHRpbmdzL21pZ3JhdGlvbnMvTWlncmF0aW9uMjAyNjA0MTUxNTMwMjgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEseUVBQXFFO0FBRXJFLE1BQWEsdUJBQXdCLFNBQVEsc0JBQVM7SUFFM0MsS0FBSyxDQUFDLEVBQUU7UUFDZixJQUFJLENBQUMsTUFBTSxDQUFDLDJGQUEyRixDQUFDLENBQUM7UUFDekcsSUFBSSxDQUFDLE1BQU0sQ0FBQyw2UkFBNlIsQ0FBQyxDQUFDO1FBQzNTLElBQUksQ0FBQyxNQUFNLENBQUMscUhBQXFILENBQUMsQ0FBQztRQUNuSSxJQUFJLENBQUMsTUFBTSxDQUFDLHFIQUFxSCxDQUFDLENBQUM7SUFDckksQ0FBQztJQUVRLEtBQUssQ0FBQyxJQUFJO1FBQ2pCLElBQUksQ0FBQyxNQUFNLENBQUMsOENBQThDLENBQUMsQ0FBQztJQUM5RCxDQUFDO0NBRUY7QUFiRCwwREFhQyJ9