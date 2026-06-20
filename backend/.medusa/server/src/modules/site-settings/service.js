"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@medusajs/framework/utils");
const site_setting_1 = require("./models/site-setting");
class SiteSettingsModuleService extends (0, utils_1.MedusaService)({
    SiteSetting: site_setting_1.SiteSetting,
}) {
    /**
     * Returns all settings as a plain key/value object.
     * Missing keys simply don't appear.
     */
    async getAll() {
        const rows = await this.listSiteSettings({}, { take: 1000 });
        const result = {};
        for (const row of rows) {
            if (row.key)
                result[row.key] = row.value ?? "";
        }
        return result;
    }
    /**
     * Creates or updates a single setting by key.
     */
    async upsert(key, value) {
        const [existing] = await this.listSiteSettings({ key }, { take: 1 });
        if (existing) {
            await this.updateSiteSettings([{ id: existing.id, value }]);
        }
        else {
            await this.createSiteSettings([{ key, value }]);
        }
    }
    /**
     * Bulk upsert — used by the admin settings page save action.
     */
    async bulkUpsert(settings) {
        const keys = Object.keys(settings);
        if (keys.length === 0)
            return;
        const existing = await this.listSiteSettings({ key: keys }, { take: 1000 });
        const byKey = new Map(existing.map((r) => [r.key, r]));
        const toUpdate = [];
        const toCreate = [];
        for (const key of keys) {
            const raw = settings[key];
            const value = raw === null || raw === undefined ? null : String(raw);
            const existingRow = byKey.get(key);
            if (existingRow) {
                toUpdate.push({ id: existingRow.id, value });
            }
            else {
                toCreate.push({ key, value });
            }
        }
        if (toUpdate.length)
            await this.updateSiteSettings(toUpdate);
        if (toCreate.length)
            await this.createSiteSettings(toCreate);
    }
}
exports.default = SiteSettingsModuleService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL3NpdGUtc2V0dGluZ3Mvc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFEQUF5RDtBQUN6RCx3REFBbUQ7QUFFbkQsTUFBTSx5QkFBMEIsU0FBUSxJQUFBLHFCQUFhLEVBQUM7SUFDcEQsV0FBVyxFQUFYLDBCQUFXO0NBQ1osQ0FBQztJQUNBOzs7T0FHRztJQUNILEtBQUssQ0FBQyxNQUFNO1FBQ1YsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBUyxDQUFDLENBQUE7UUFDbkUsTUFBTSxNQUFNLEdBQTJCLEVBQUUsQ0FBQTtRQUN6QyxLQUFLLE1BQU0sR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1lBQ3ZCLElBQUksR0FBRyxDQUFDLEdBQUc7Z0JBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQTtRQUNoRCxDQUFDO1FBQ0QsT0FBTyxNQUFNLENBQUE7SUFDZixDQUFDO0lBRUQ7O09BRUc7SUFDSCxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQVcsRUFBRSxLQUFvQjtRQUM1QyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsTUFBTSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQVMsQ0FBQyxDQUFBO1FBQzNFLElBQUksUUFBUSxFQUFFLENBQUM7WUFDYixNQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLFFBQVEsQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFTLENBQUMsQ0FBQyxDQUFBO1FBQ3BFLENBQUM7YUFBTSxDQUFDO1lBQ04sTUFBTSxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQVMsQ0FBQyxDQUFDLENBQUE7UUFDeEQsQ0FBQztJQUNILENBQUM7SUFFRDs7T0FFRztJQUNILEtBQUssQ0FBQyxVQUFVLENBQUMsUUFBNkI7UUFDNUMsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUNsQyxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQztZQUFFLE9BQU07UUFFN0IsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsZ0JBQWdCLENBQzFDLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBUyxFQUNwQixFQUFFLElBQUksRUFBRSxJQUFJLEVBQVMsQ0FDdEIsQ0FBQTtRQUNELE1BQU0sS0FBSyxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFFM0QsTUFBTSxRQUFRLEdBQVUsRUFBRSxDQUFBO1FBQzFCLE1BQU0sUUFBUSxHQUFVLEVBQUUsQ0FBQTtRQUUxQixLQUFLLE1BQU0sR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1lBQ3ZCLE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUN6QixNQUFNLEtBQUssR0FBRyxHQUFHLEtBQUssSUFBSSxJQUFJLEdBQUcsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ3BFLE1BQU0sV0FBVyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDbEMsSUFBSSxXQUFXLEVBQUUsQ0FBQztnQkFDaEIsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRyxXQUFtQixDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFBO1lBQ3ZELENBQUM7aUJBQU0sQ0FBQztnQkFDTixRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUE7WUFDL0IsQ0FBQztRQUNILENBQUM7UUFFRCxJQUFJLFFBQVEsQ0FBQyxNQUFNO1lBQUUsTUFBTSxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDNUQsSUFBSSxRQUFRLENBQUMsTUFBTTtZQUFFLE1BQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQzlELENBQUM7Q0FDRjtBQUVELGtCQUFlLHlCQUF5QixDQUFBIn0=