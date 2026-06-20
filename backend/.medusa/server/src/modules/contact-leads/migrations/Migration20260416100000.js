"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20260416100000 = void 0;
const migrations_1 = require("@medusajs/framework/mikro-orm/migrations");
class Migration20260416100000 extends migrations_1.Migration {
    async up() {
        this.addSql(`create table if not exists "contact_lead" (` +
            `"id" text not null, ` +
            `"name" text not null, ` +
            `"email" text not null, ` +
            `"phone" text null, ` +
            `"subject" text null, ` +
            `"message" text not null, ` +
            `"status" text not null default 'new', ` +
            `"created_at" timestamptz not null default now(), ` +
            `"updated_at" timestamptz not null default now(), ` +
            `"deleted_at" timestamptz null, ` +
            `constraint "contact_lead_pkey" primary key ("id"));`);
        this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_contact_lead_deleted_at" ON "contact_lead" ("deleted_at") WHERE deleted_at IS NULL;`);
        this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_contact_lead_status" ON "contact_lead" ("status") WHERE deleted_at IS NULL;`);
        this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_contact_lead_created_at" ON "contact_lead" ("created_at") WHERE deleted_at IS NULL;`);
    }
    async down() {
        this.addSql(`drop table if exists "contact_lead" cascade;`);
    }
}
exports.Migration20260416100000 = Migration20260416100000;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWlncmF0aW9uMjAyNjA0MTYxMDAwMDAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9jb250YWN0LWxlYWRzL21pZ3JhdGlvbnMvTWlncmF0aW9uMjAyNjA0MTYxMDAwMDAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEseUVBQW9FO0FBRXBFLE1BQWEsdUJBQXdCLFNBQVEsc0JBQVM7SUFDM0MsS0FBSyxDQUFDLEVBQUU7UUFDZixJQUFJLENBQUMsTUFBTSxDQUNULDZDQUE2QztZQUMzQyxzQkFBc0I7WUFDdEIsd0JBQXdCO1lBQ3hCLHlCQUF5QjtZQUN6QixxQkFBcUI7WUFDckIsdUJBQXVCO1lBQ3ZCLDJCQUEyQjtZQUMzQix3Q0FBd0M7WUFDeEMsbURBQW1EO1lBQ25ELG1EQUFtRDtZQUNuRCxpQ0FBaUM7WUFDakMscURBQXFELENBQ3hELENBQUE7UUFDRCxJQUFJLENBQUMsTUFBTSxDQUNULHFIQUFxSCxDQUN0SCxDQUFBO1FBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FDVCw2R0FBNkcsQ0FDOUcsQ0FBQTtRQUNELElBQUksQ0FBQyxNQUFNLENBQ1QscUhBQXFILENBQ3RILENBQUE7SUFDSCxDQUFDO0lBRVEsS0FBSyxDQUFDLElBQUk7UUFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFBO0lBQzdELENBQUM7Q0FDRjtBQTlCRCwwREE4QkMifQ==