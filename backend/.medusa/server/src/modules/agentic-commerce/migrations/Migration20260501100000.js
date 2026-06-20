"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20260501100000 = void 0;
const migrations_1 = require("@medusajs/framework/mikro-orm/migrations");
/**
 * Adds chat_session + chat_message tables for the storefront AI chatbot.
 * The legacy webhook-only service stays untouched — these tables power
 * a new feature on top of the same module.
 */
class Migration20260501100000 extends migrations_1.Migration {
    async up() {
        this.addSql(`CREATE TABLE IF NOT EXISTS "chat_session" (` +
            `"id" TEXT NOT NULL, ` +
            `"customer_id" TEXT NULL, ` +
            `"visitor_token" TEXT NULL, ` +
            `"title" TEXT NULL, ` +
            `"last_message_preview" TEXT NULL, ` +
            `"message_count" INTEGER NOT NULL DEFAULT 0, ` +
            `"created_at" TIMESTAMPTZ NOT NULL DEFAULT now(), ` +
            `"updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(), ` +
            `"deleted_at" TIMESTAMPTZ NULL, ` +
            `CONSTRAINT "chat_session_pkey" PRIMARY KEY ("id")` +
            `);`);
        this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_chat_session_customer_id" ON "chat_session" ("customer_id") WHERE "deleted_at" IS NULL;`);
        this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_chat_session_visitor_token" ON "chat_session" ("visitor_token") WHERE "deleted_at" IS NULL;`);
        this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_chat_session_created_at" ON "chat_session" ("created_at") WHERE "deleted_at" IS NULL;`);
        this.addSql(`CREATE TABLE IF NOT EXISTS "chat_message" (` +
            `"id" TEXT NOT NULL, ` +
            `"session_id" TEXT NOT NULL, ` +
            `"role" TEXT NOT NULL DEFAULT 'user', ` +
            `"content" TEXT NOT NULL, ` +
            `"metadata" TEXT NULL, ` +
            `"created_at" TIMESTAMPTZ NOT NULL DEFAULT now(), ` +
            `"updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(), ` +
            `"deleted_at" TIMESTAMPTZ NULL, ` +
            `CONSTRAINT "chat_message_pkey" PRIMARY KEY ("id")` +
            `);`);
        this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_chat_message_session_id" ON "chat_message" ("session_id") WHERE "deleted_at" IS NULL;`);
        this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_chat_message_created_at" ON "chat_message" ("created_at") WHERE "deleted_at" IS NULL;`);
    }
    async down() {
        this.addSql(`DROP TABLE IF EXISTS "chat_message" CASCADE;`);
        this.addSql(`DROP TABLE IF EXISTS "chat_session" CASCADE;`);
    }
}
exports.Migration20260501100000 = Migration20260501100000;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWlncmF0aW9uMjAyNjA1MDExMDAwMDAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9hZ2VudGljLWNvbW1lcmNlL21pZ3JhdGlvbnMvTWlncmF0aW9uMjAyNjA1MDExMDAwMDAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEseUVBQW9FO0FBRXBFOzs7O0dBSUc7QUFDSCxNQUFhLHVCQUF3QixTQUFRLHNCQUFTO0lBQzNDLEtBQUssQ0FBQyxFQUFFO1FBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FDVCw2Q0FBNkM7WUFDM0Msc0JBQXNCO1lBQ3RCLDJCQUEyQjtZQUMzQiw2QkFBNkI7WUFDN0IscUJBQXFCO1lBQ3JCLG9DQUFvQztZQUNwQyw4Q0FBOEM7WUFDOUMsbURBQW1EO1lBQ25ELG1EQUFtRDtZQUNuRCxpQ0FBaUM7WUFDakMsbURBQW1EO1lBQ3JELElBQUksQ0FDTCxDQUFBO1FBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FDVCx5SEFBeUgsQ0FDMUgsQ0FBQTtRQUNELElBQUksQ0FBQyxNQUFNLENBQ1QsNkhBQTZILENBQzlILENBQUE7UUFDRCxJQUFJLENBQUMsTUFBTSxDQUNULHVIQUF1SCxDQUN4SCxDQUFBO1FBRUQsSUFBSSxDQUFDLE1BQU0sQ0FDVCw2Q0FBNkM7WUFDM0Msc0JBQXNCO1lBQ3RCLDhCQUE4QjtZQUM5Qix1Q0FBdUM7WUFDdkMsMkJBQTJCO1lBQzNCLHdCQUF3QjtZQUN4QixtREFBbUQ7WUFDbkQsbURBQW1EO1lBQ25ELGlDQUFpQztZQUNqQyxtREFBbUQ7WUFDckQsSUFBSSxDQUNMLENBQUE7UUFDRCxJQUFJLENBQUMsTUFBTSxDQUNULHVIQUF1SCxDQUN4SCxDQUFBO1FBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FDVCx1SEFBdUgsQ0FDeEgsQ0FBQTtJQUNILENBQUM7SUFFUSxLQUFLLENBQUMsSUFBSTtRQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDLDhDQUE4QyxDQUFDLENBQUE7UUFDM0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFBO0lBQzdELENBQUM7Q0FDRjtBQW5ERCwwREFtREMifQ==