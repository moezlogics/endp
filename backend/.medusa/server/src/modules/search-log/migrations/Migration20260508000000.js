"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20260508000000 = void 0;
const migrations_1 = require("@medusajs/framework/mikro-orm/migrations");
class Migration20260508000000 extends migrations_1.Migration {
    async up() {
        this.addSql(`create table if not exists "search_log" (` +
            `"id" text not null, ` +
            `"query" text not null, ` +
            `"count" integer not null default 1, ` +
            `"last_used_at" timestamptz null, ` +
            `"created_at" timestamptz not null default now(), ` +
            `"updated_at" timestamptz not null default now(), ` +
            `"deleted_at" timestamptz null, ` +
            `constraint "search_log_pkey" primary key ("id"));`);
        this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_search_log_deleted_at" ON "search_log" ("deleted_at") WHERE deleted_at IS NULL;`);
        this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_search_log_query" ON "search_log" ("query") WHERE deleted_at IS NULL;`);
        this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_search_log_count" ON "search_log" ("count" DESC) WHERE deleted_at IS NULL;`);
    }
    async down() {
        this.addSql(`drop table if exists "search_log" cascade;`);
    }
}
exports.Migration20260508000000 = Migration20260508000000;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWlncmF0aW9uMjAyNjA1MDgwMDAwMDAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9zZWFyY2gtbG9nL21pZ3JhdGlvbnMvTWlncmF0aW9uMjAyNjA1MDgwMDAwMDAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEseUVBQW9FO0FBRXBFLE1BQWEsdUJBQXdCLFNBQVEsc0JBQVM7SUFDM0MsS0FBSyxDQUFDLEVBQUU7UUFDZixJQUFJLENBQUMsTUFBTSxDQUNULDJDQUEyQztZQUN6QyxzQkFBc0I7WUFDdEIseUJBQXlCO1lBQ3pCLHNDQUFzQztZQUN0QyxtQ0FBbUM7WUFDbkMsbURBQW1EO1lBQ25ELG1EQUFtRDtZQUNuRCxpQ0FBaUM7WUFDakMsbURBQW1ELENBQ3RELENBQUE7UUFDRCxJQUFJLENBQUMsTUFBTSxDQUNULGlIQUFpSCxDQUNsSCxDQUFBO1FBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FDVCx1R0FBdUcsQ0FDeEcsQ0FBQTtRQUNELElBQUksQ0FBQyxNQUFNLENBQ1QsNEdBQTRHLENBQzdHLENBQUE7SUFDSCxDQUFDO0lBRVEsS0FBSyxDQUFDLElBQUk7UUFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFBO0lBQzNELENBQUM7Q0FDRjtBQTNCRCwwREEyQkMifQ==