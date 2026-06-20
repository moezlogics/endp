"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20260430170000 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20260430170000 extends migrations_1.Migration {
    async up() {
        this.addSql(`
      CREATE TABLE IF NOT EXISTS "otp_code" (
        "id" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "code" TEXT NOT NULL,
        "purpose" TEXT CHECK ("purpose" IN ('signup', 'password_reset', 'email_verify')) NOT NULL,
        "attempts" INTEGER NOT NULL DEFAULT 0,
        "expires_at" TIMESTAMPTZ NOT NULL,
        "verified" BOOLEAN NOT NULL DEFAULT FALSE,
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMPTZ NULL,
        CONSTRAINT "otp_code_pkey" PRIMARY KEY ("id")
      );
    `);
        this.addSql(`
      CREATE INDEX IF NOT EXISTS "IDX_otp_code_email" ON "otp_code" ("email");
    `);
        this.addSql(`
      CREATE INDEX IF NOT EXISTS "IDX_otp_code_email_purpose" ON "otp_code" ("email", "purpose");
    `);
    }
    async down() {
        this.addSql(`DROP TABLE IF EXISTS "otp_code";`);
    }
}
exports.Migration20260430170000 = Migration20260430170000;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWlncmF0aW9uMjAyNjA0MzAxNzAwMDAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9vdHAtYXV0aC9taWdyYXRpb25zL01pZ3JhdGlvbjIwMjYwNDMwMTcwMDAwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHNEQUFpRDtBQUVqRCxNQUFhLHVCQUF3QixTQUFRLHNCQUFTO0lBQ3BELEtBQUssQ0FBQyxFQUFFO1FBQ04sSUFBSSxDQUFDLE1BQU0sQ0FBQzs7Ozs7Ozs7Ozs7Ozs7S0FjWCxDQUFDLENBQUE7UUFFRixJQUFJLENBQUMsTUFBTSxDQUFDOztLQUVYLENBQUMsQ0FBQTtRQUVGLElBQUksQ0FBQyxNQUFNLENBQUM7O0tBRVgsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELEtBQUssQ0FBQyxJQUFJO1FBQ1IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFBO0lBQ2pELENBQUM7Q0FDRjtBQTlCRCwwREE4QkMifQ==