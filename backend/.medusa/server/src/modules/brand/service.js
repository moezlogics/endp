"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@medusajs/framework/utils");
const brand_1 = require("./models/brand");
class BrandModuleService extends (0, utils_1.MedusaService)({
    Brand: brand_1.Brand,
    BrandProduct: brand_1.BrandProduct,
}) {
    /**
     * Collect the brand ID itself + every descendant brand ID by
     * walking the `parent_id` chain breadth-first.
     *
     * Used by:
     *   • GET /store/brands/[handle]            — parent brand pages
     *     surface products from sub-brands too (e.g. /brands/apple
     *     shows all Apple + Mac + iPhone products).
     *   • GET /store/brands/path/[...path]      — nested resolution
     *     for /brands/apple/mac.
     *
     * Cycle-safe: we track visited IDs so a corrupted parent_id loop
     * can't hang the request.
     *
     * Performance:
     *   One brand-list query per level. Real-world brand trees are
     *   shallow (2-3 levels) so this is fine without recursion-in-SQL.
     *   If a store ever grows to 10k+ brands we can swap to a
     *   `WITH RECURSIVE` CTE without changing the call sites.
     */
    async listDescendantBrandIds(brandId) {
        const visited = new Set();
        const queue = [brandId];
        while (queue.length) {
            const current = queue.shift();
            if (visited.has(current))
                continue;
            visited.add(current);
            const children = await this.listBrands({ parent_id: current }, { take: 500 });
            for (const c of children) {
                if (c?.id && !visited.has(c.id))
                    queue.push(c.id);
            }
        }
        return Array.from(visited);
    }
    /**
     * Return the brand + product IDs belonging to it OR any of its
     * descendants. Used by both the legacy /store/brands/[handle]
     * endpoint and the new /store/brands/path/[...path] endpoint so
     * callers don't have to compose the two queries themselves.
     */
    async retrieveBrandWithProducts(brandId) {
        const brand_ids = await this.listDescendantBrandIds(brandId);
        if (!brand_ids.length)
            return { brand_ids: [], product_ids: [] };
        const links = await this.listBrandProducts({ brand_id: brand_ids }, { take: 2000 });
        const product_ids = Array.from(new Set(links.map((l) => l.product_id).filter(Boolean)));
        return { brand_ids, product_ids };
    }
}
exports.default = BrandModuleService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2JyYW5kL3NlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxREFBeUQ7QUFDekQsMENBQW9EO0FBRXBELE1BQU0sa0JBQW1CLFNBQVEsSUFBQSxxQkFBYSxFQUFDO0lBQzdDLEtBQUssRUFBTCxhQUFLO0lBQ0wsWUFBWSxFQUFaLG9CQUFZO0NBQ2IsQ0FBQztJQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BbUJHO0lBQ0gsS0FBSyxDQUFDLHNCQUFzQixDQUFDLE9BQWU7UUFDMUMsTUFBTSxPQUFPLEdBQUcsSUFBSSxHQUFHLEVBQVUsQ0FBQTtRQUNqQyxNQUFNLEtBQUssR0FBYSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ2pDLE9BQU8sS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3BCLE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxLQUFLLEVBQUcsQ0FBQTtZQUM5QixJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDO2dCQUFFLFNBQVE7WUFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUNwQixNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxVQUFVLENBQ3BDLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBUyxFQUM3QixFQUFFLElBQUksRUFBRSxHQUFHLEVBQVMsQ0FDckIsQ0FBQTtZQUNELEtBQUssTUFBTSxDQUFDLElBQUksUUFBaUIsRUFBRSxDQUFDO2dCQUNsQyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7b0JBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUE7WUFDbkQsQ0FBQztRQUNILENBQUM7UUFDRCxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDNUIsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsS0FBSyxDQUFDLHlCQUF5QixDQUM3QixPQUFlO1FBRWYsTUFBTSxTQUFTLEdBQUcsTUFBTSxJQUFJLENBQUMsc0JBQXNCLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDNUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNO1lBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRSxDQUFBO1FBRWhFLE1BQU0sS0FBSyxHQUFHLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUN4QyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQVMsRUFDOUIsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFTLENBQ3RCLENBQUE7UUFDRCxNQUFNLFdBQVcsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUM1QixJQUFJLEdBQUcsQ0FBRSxLQUFlLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQ25FLENBQUE7UUFDRCxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxDQUFBO0lBQ25DLENBQUM7Q0FDRjtBQUVELGtCQUFlLGtCQUFrQixDQUFBIn0=