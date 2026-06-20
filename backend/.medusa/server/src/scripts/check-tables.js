"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
async function default_1({ container }) {
    const manager = container.resolve("__pg_connection__");
    const result = await manager.raw("SELECT tablename FROM pg_tables WHERE schemaname='public' ORDER BY tablename");
    const rows = result.rows || result;
    console.log(`TABLE_COUNT=${rows.length}`);
    for (const r of rows)
        console.log(`T: ${r.tablename}`);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2stdGFibGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NjcmlwdHMvY2hlY2stdGFibGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsNEJBUUM7QUFSYyxLQUFLLG9CQUFXLEVBQUUsU0FBUyxFQUFZO0lBQ3BELE1BQU0sT0FBTyxHQUFRLFNBQVMsQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtJQUMzRCxNQUFNLE1BQU0sR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQzlCLDhFQUE4RSxDQUMvRSxDQUFBO0lBQ0QsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksSUFBSSxNQUFNLENBQUE7SUFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFBO0lBQ3pDLEtBQUssTUFBTSxDQUFDLElBQUksSUFBSTtRQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQTtBQUN4RCxDQUFDIn0=