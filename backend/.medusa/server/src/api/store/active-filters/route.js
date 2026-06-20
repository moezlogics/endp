"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
const brand_1 = require("../../../modules/brand");
/**
 * GET /store/active-filters
 *
 * Returns the set of category_ids and brand_ids that are actually
 * "live" for a given product-set scope. Powers the storefront's
 * hybrid filter sidebar:
 *
 *   • /brands/apple   → activeCategoryIds = categories of Apple's
 *                       products → sidebar hides empty categories
 *   • /electronics    → activeBrandIds = brands appearing in
 *                       Electronics → sidebar hides empty brands
 *   • /store          → both empty → sidebar shows the full list
 *
 * Query params (pick ONE — they're mutually exclusive):
 *   ?category_id=cat_xxx               → resolves brand_ids
 *   ?product_ids=p1,p2,...             → resolves both
 *   (no params)                        → returns empty arrays
 *
 * Response:
 *   { category_ids: string[], brand_ids: string[] }
 *
 * Implementation notes:
 *   • category_id mode hits `query.graph` on product → categories.id.
 *     Single round-trip, no batching needed thanks to Medusa's
 *     join-friendly graph engine.
 *   • product_ids mode does the same for categories AND a small
 *     `listBrandProducts({ product_id: [...] })` for brands.
 *   • Result is cached for 60s at the HTTP layer (`Cache-Control`)
 *     so a brand/category page refresh doesn't re-do the work.
 */
async function GET(req, res) {
    const query = req.scope.resolve("query");
    const brandSvc = req.scope.resolve(brand_1.BRAND_MODULE);
    const categoryId = (req.query.category_id || "").toString().trim();
    const productIdsRaw = (req.query.product_ids || "").toString().trim();
    const productIds = productIdsRaw
        ? productIdsRaw
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
            .slice(0, 2000)
        : [];
    if (!categoryId && !productIds.length) {
        let categoryIds = [];
        let brandIds = [];
        try {
            const { data } = await query.graph({
                entity: "product",
                fields: ["id", "categories.id"],
                pagination: { take: 10000 },
            });
            const resolvedProductIds = (data || []).map((p) => p.id).filter(Boolean);
            const set = new Set();
            for (const p of data || []) {
                for (const c of p.categories || []) {
                    if (c?.id)
                        set.add(c.id);
                }
            }
            categoryIds = Array.from(set);
            const links = (await brandSvc.listBrandProducts({ product_id: resolvedProductIds }, { take: 10000 }));
            brandIds = Array.from(new Set(links.map((l) => l.brand_id).filter(Boolean)));
        }
        catch (e) {
            // Ignore
        }
        res.setHeader("Cache-Control", "public, max-age=60");
        return res.json({ category_ids: categoryIds, brand_ids: brandIds });
    }
    let resolvedProductIds = productIds;
    // category_id mode: pull the products under that category first.
    if (categoryId && !productIds.length) {
        try {
            const { data } = await query.graph({
                entity: "product",
                fields: ["id"],
                filters: { categories: { id: categoryId } },
                pagination: { take: 2000 },
            });
            resolvedProductIds = (data || []).map((p) => p.id).filter(Boolean);
        }
        catch {
            resolvedProductIds = [];
        }
    }
    if (!resolvedProductIds.length) {
        res.setHeader("Cache-Control", "public, max-age=60");
        return res.json({ category_ids: [], brand_ids: [] });
    }
    // categories.id for every product in scope
    let categoryIds = [];
    try {
        const { data } = await query.graph({
            entity: "product",
            fields: ["id", "categories.id"],
            filters: { id: resolvedProductIds },
            pagination: { take: 2000 },
        });
        const set = new Set();
        for (const p of data || []) {
            for (const c of p.categories || []) {
                if (c?.id)
                    set.add(c.id);
            }
        }
        categoryIds = Array.from(set);
    }
    catch {
        categoryIds = [];
    }
    // brand_ids via the brand_product join — one query for the whole set.
    let brandIds = [];
    try {
        const links = (await brandSvc.listBrandProducts({ product_id: resolvedProductIds }, { take: 2000 }));
        brandIds = Array.from(new Set(links.map((l) => l.brand_id).filter(Boolean)));
    }
    catch {
        brandIds = [];
    }
    res.setHeader("Cache-Control", "public, max-age=60");
    return res.json({ category_ids: categoryIds, brand_ids: brandIds });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL2FjdGl2ZS1maWx0ZXJzL3JvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBa0NBLGtCQXdHQztBQXpJRCxrREFBcUQ7QUFHckQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNkJHO0FBQ0ksS0FBSyxVQUFVLEdBQUcsQ0FBQyxHQUFrQixFQUFFLEdBQW1CO0lBQy9ELE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBUSxDQUFBO0lBQy9DLE1BQU0sUUFBUSxHQUF1QixHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxvQkFBWSxDQUFDLENBQUE7SUFFcEUsTUFBTSxVQUFVLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFdBQVcsSUFBSSxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtJQUNsRSxNQUFNLGFBQWEsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFBO0lBQ3JFLE1BQU0sVUFBVSxHQUFHLGFBQWE7UUFDOUIsQ0FBQyxDQUFDLGFBQWE7YUFDVixLQUFLLENBQUMsR0FBRyxDQUFDO2FBQ1YsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDcEIsTUFBTSxDQUFDLE9BQU8sQ0FBQzthQUNmLEtBQUssQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDO1FBQ25CLENBQUMsQ0FBQyxFQUFFLENBQUE7SUFFTixJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3RDLElBQUksV0FBVyxHQUFhLEVBQUUsQ0FBQTtRQUM5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