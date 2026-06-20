"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20260414145446 = void 0;
const migrations_1 = require("@medusajs/framework/mikro-orm/migrations");
class Migration20260414145446 extends migrations_1.Migration {
    async up() {
        this.addSql(`alter table if exists "blog_post" drop constraint if exists "blog_post_handle_unique";`);
        this.addSql(`alter table if exists "blog_category" drop constraint if exists "blog_category_handle_unique";`);
        this.addSql(`create table if not exists "blog_category" ("id" text not null, "name" text not null, "handle" text not null, "description" text null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "blog_category_pkey" primary key ("id"));`);
        this.addSql(`CREATE UNIQUE INDEX IF NOT EXISTS "IDX_blog_category_handle_unique" ON "blog_category" ("handle") WHERE deleted_at IS NULL;`);
        this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_blog_category_deleted_at" ON "blog_category" ("deleted_at") WHERE deleted_at IS NULL;`);
        this.addSql(`create table if not exists "blog_post" ("id" text not null, "title" text not null, "handle" text not null, "excerpt" text null, "content" text null, "featured_image" text null, "featured_image_alt" text null, "status" text check ("status" in ('draft', 'published')) not null default 'draft', "published_at" timestamptz null, "seo_title" text null, "seo_description" text null, "seo_keywords" text null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "blog_post_pkey" primary key ("id"));`);
        this.addSql(`CREATE UNIQUE INDEX IF NOT EXISTS "IDX_blog_post_handle_unique" ON "blog_post" ("handle") WHERE deleted_at IS NULL;`);
        this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_blog_post_deleted_at" ON "blog_post" ("deleted_at") WHERE deleted_at IS NULL;`);
        this.addSql(`create table if not exists "blog_post_categories" ("blog_post_id" text not null, "blog_category_id" text not null, constraint "blog_post_categories_pkey" primary key ("blog_post_id", "blog_category_id"));`);
        this.addSql(`alter table if exists "blog_post_categories" add constraint "blog_post_categories_blog_post_id_foreign" foreign key ("blog_post_id") references "blog_post" ("id") on update cascade on delete cascade;`);
        this.addSql(`alter table if exists "blog_post_categories" add constraint "blog_post_categories_blog_category_id_foreign" foreign key ("blog_category_id") references "blog_category" ("id") on update cascade on delete cascade;`);
    }
    async down() {
        this.addSql(`alter table if exists "blog_post_categories" drop constraint if exists "blog_post_categories_blog_category_id_foreign";`);
        this.addSql(`alter table if exists "blog_post_categories" drop constraint if exists "blog_post_categories_blog_post_id_foreign";`);
        this.addSql(`drop table if exists "blog_category" cascade;`);
        this.addSql(`drop table if exists "blog_post" cascade;`);
        this.addSql(`drop table if exists "blog_post_categories" cascade;`);
    }
}
exports.Migration20260414145446 = Migration20260414145446;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWlncmF0aW9uMjAyNjA0MTQxNDU0NDYuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9ibG9nL21pZ3JhdGlvbnMvTWlncmF0aW9uMjAyNjA0MTQxNDU0NDYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEseUVBQXFFO0FBRXJFLE1BQWEsdUJBQXdCLFNBQVEsc0JBQVM7SUFFM0MsS0FBSyxDQUFDLEVBQUU7UUFDZixJQUFJLENBQUMsTUFBTSxDQUFDLHdGQUF3RixDQUFDLENBQUM7UUFDdEcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnR0FBZ0csQ0FBQyxDQUFDO1FBQzlHLElBQUksQ0FBQyxNQUFNLENBQUMsOFRBQThULENBQUMsQ0FBQztRQUM1VSxJQUFJLENBQUMsTUFBTSxDQUFDLDZIQUE2SCxDQUFDLENBQUM7UUFDM0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyx1SEFBdUgsQ0FBQyxDQUFDO1FBRXJJLElBQUksQ0FBQyxNQUFNLENBQUMsc2tCQUFza0IsQ0FBQyxDQUFDO1FBQ3BsQixJQUFJLENBQUMsTUFBTSxDQUFDLHFIQUFxSCxDQUFDLENBQUM7UUFDbkksSUFBSSxDQUFDLE1BQU0sQ0FBQywrR0FBK0csQ0FBQyxDQUFDO1FBRTdILElBQUksQ0FBQyxNQUFNLENBQUMsOE1BQThNLENBQUMsQ0FBQztRQUU1TixJQUFJLENBQUMsTUFBTSxDQUFDLHlNQUF5TSxDQUFDLENBQUM7UUFDdk4sSUFBSSxDQUFDLE1BQU0sQ0FBQyxxTkFBcU4sQ0FBQyxDQUFDO0lBQ3JPLENBQUM7SUFFUSxLQUFLLENBQUMsSUFBSTtRQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDLHlIQUF5SCxDQUFDLENBQUM7UUFFdkksSUFBSSxDQUFDLE1BQU0sQ0FBQyxxSEFBcUgsQ0FBQyxDQUFDO1FBRW5JLElBQUksQ0FBQyxNQUFNLENBQUMsK0NBQStDLENBQUMsQ0FBQztRQUU3RCxJQUFJLENBQUMsTUFBTSxDQUFDLDJDQUEyQyxDQUFDLENBQUM7UUFFekQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxzREFBc0QsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7Q0FFRjtBQS9CRCwwREErQkMifQ==