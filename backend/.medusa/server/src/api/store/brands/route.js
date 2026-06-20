"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
const brand_1 = require("../../../modules/brand");
const cache_response_1 = require("../../../utils/cache-response");
async function GET(req, res) {
    const svc = req.scope.resolve(brand_1.BRAND_MODULE);
    const product_id = req.query.product_id;
    if (product_id) {
        const links = await svc.listBrandProducts({ product_id }, { take: 1 });
        if (!links.length)
            return res.json({ brand: null });
        const brand = await svc.retrieveBrand(links[0].brand_id).catch(() => null);
        return res.json({ brand });
    }
    // Optional `?parent_id=` filter exposed to the storefront so the
    // brand-tree sidebar can lazy-load children if it ever needs to.
    const rawParent = req.query.parent_id;
    const filter = { is_active: true };
    if (typeof rawParent === "string") {
        filter.parent_id =
            rawParent === "null" || rawParent === "" ? null : rawParent;
    }
    // The full brand tree changes rarely but is read on most catalog
    // pages (sidebar) — cache by the parent filter.
    const cacheKey = `store:brands:${typeof rawParent === "string" ? rawParent || "root" : "all"}`;
    const brands = await (0, cache_response_1.cached)(req.scope, cacheKey, 300, () => svc.listBrands(filter, { order: { sort_order: "ASC" }, take: 500 }));
    // We return the full flat list (with parent_id on each row) so the
    // storefront can build the tree locally without an extra request
    // per level. 500 cap is fine — even huge electronics catalogs rarely
    // exceed 200 brands.
    res.setHeader("Cache-Control", "public, max-age=120, s-maxage=300");
    res.json({ brands });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL2JyYW5kcy9yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUtBLGtCQW1DQztBQXZDRCxrREFBcUQ7QUFFckQsa0VBQXNEO0FBRS9DLEtBQUssVUFBVSxHQUFHLENBQUMsR0FBa0IsRUFBRSxHQUFtQjtJQUMvRCxNQUFNLEdBQUcsR0FBdUIsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsb0JBQVksQ0FBQyxDQUFBO0lBQy9ELE1BQU0sVUFBVSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBZ0MsQ0FBQTtJQUU3RCxJQUFJLFVBQVUsRUFBRSxDQUFDO1FBQ2YsTUFBTSxLQUFLLEdBQUcsTUFBTSxHQUFHLENBQUMsaUJBQWlCLENBQUMsRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQ3RFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTTtZQUFFLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO1FBQ25ELE1BQU0sS0FBSyxHQUFHLE1BQU0sR0FBRyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzFFLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUE7SUFDNUIsQ0FBQztJQUVELGlFQUFpRTtJQUNqRSxpRUFBaUU7SUFDakUsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUE7SUFDckMsTUFBTSxNQUFNLEdBQXdCLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFBO0lBQ3ZELElBQUksT0FBTyxTQUFTLEtBQUssUUFBUSxFQUFFLENBQUM7UUFDbEMsTUFBTSxDQUFDLFNBQVM7WUFDZCxTQUFTLEtBQUssTUFBTSxJQUFJLFNBQVMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFBO0lBQy9ELENBQUM7SUFFRCxpRUFBaUU7SUFDakUsZ0RBQWdEO0lBQ2hELE1BQU0sUUFBUSxHQUFHLGdCQUNmLE9BQU8sU0FBUyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FDeEQsRUFBRSxDQUFBO0lBQ0YsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFBLHVCQUFNLEVBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUN6RCxHQUFHLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQVMsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FDM0UsQ0FBQTtJQUVELG1FQUFtRTtJQUNuRSxpRUFBaUU7SUFDakUscUVBQXFFO0lBQ3JFLHFCQUFxQjtJQUNyQixHQUFHLENBQUMsU0FBUyxDQUFDLGVBQWUsRUFBRSxtQ0FBbUMsQ0FBQyxDQUFBO0lBQ25FLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFBO0FBQ3RCLENBQUMifQ==