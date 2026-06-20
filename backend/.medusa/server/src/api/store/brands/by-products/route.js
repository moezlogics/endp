"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
const brand_1 = require("../../../../modules/brand");
/**
 * GET /store/brands/by-products?product_ids=p1,p2,...
 *
 * Bulk resolver: returns the DIRECT brand each product is linked to,
 * keyed by product id.
 *
 *   { brands: { [product_id]: { ...brand } } }
 *
 * Why this exists:
 *   The storefront product grid needs to label each card with its
 *   brand (and build the brand-prefixed canonical URL). Previously it
 *   looped over EVERY brand and called `/store/brands/[handle]` —
 *   which returns the brand's own + DESCENDANT products (a roll-up).
 *   That caused two bugs:
 *     1. N+1 requests (one per brand) on every product listing.
 *     2. A sub-brand product (e.g. linked to "Apple Mac") would be
 *        non-deterministically labelled with the PARENT brand
 *        ("Apple") because the parent's roll-up also contained it and
 *        the concurrent writes raced.
 *
 *   This endpoint reads the `brand_product` link table directly, so a
 *   product always maps to the exact (leaf) brand the admin assigned
 *   — no roll-up, no race, one round-trip.
 */
async function GET(req, res) {
    const svc = req.scope.resolve(brand_1.BRAND_MODULE);
    const raw = (req.query.product_ids || "").toString().trim();
    const productIds = raw
        ? raw
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
            .slice(0, 2000)
        : [];
    // No product_ids supplied → return the FULL direct map. Used by the
    // search index, which labels the whole catalog at once and can't fit
    // thousands of ids in a query string. Still direct-links-only.
    const links = (await svc.listBrandProducts(productIds.length ? { product_id: productIds } : {}, { take: 100000 }));
    const brandIds = Array.from(new Set(links.map((l) => l.brand_id).filter(Boolean)));
    const brands = brandIds.length
        ? (await svc.listBrands({ id: brandIds }, { take: 500 }))
        : [];
    const brandById = new Map(brands.map((b) => [b.id, b]));
    const map = {};
    for (const l of links) {
        const brand = brandById.get(l.brand_id);
        // A product can only carry one direct link (the admin widget
        // enforces this), but guard against duplicates by keeping the
        // first resolvable brand we see.
        if (brand && !map[l.product_id]) {
            map[l.product_id] = brand;
        }
    }
    res.setHeader("Cache-Control", "public, max-age=60");
    res.json({ brands: map });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL2JyYW5kcy9ieS1wcm9kdWN0cy9yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQTRCQSxrQkE4Q0M7QUF6RUQscURBQXdEO0FBR3hEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUNJLEtBQUssVUFBVSxHQUFHLENBQUMsR0FBa0IsRUFBRSxHQUFtQjtJQUMvRCxNQUFNLEdBQUcsR0FBdUIsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsb0JBQVksQ0FBQyxDQUFBO0lBRS9ELE1BQU0sR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUE7SUFDM0QsTUFBTSxVQUFVLEdBQUcsR0FBRztRQUNwQixDQUFDLENBQUMsR0FBRzthQUNBLEtBQUssQ0FBQyxHQUFHLENBQUM7YUFDVixHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNwQixNQUFNLENBQUMsT0FBTyxDQUFDO2FBQ2YsS0FBSyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUM7UUFDbkIsQ0FBQyxDQUFDLEVBQUUsQ0FBQTtJQUVOLG9FQUFvRTtJQUNwRSxxRUFBcUU7SUFDckUsK0RBQStEO0lBQy9ELE1BQU0sS0FBSyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsaUJBQWlCLENBQ3hDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFFLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBVSxDQUFDLENBQUMsQ0FBRSxFQUFVLEVBQ3JFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBUyxDQUN4QixDQUFVLENBQUE7SUFFWCxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUN6QixJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQ3RELENBQUE7SUFFRCxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsTUFBTTtRQUM1QixDQUFDLENBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxVQUFVLENBQ3BCLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBUyxFQUN2QixFQUFFLElBQUksRUFBRSxHQUFHLEVBQVMsQ0FDckIsQ0FBVztRQUNkLENBQUMsQ0FBQyxFQUFFLENBQUE7SUFFTixNQUFNLFNBQVMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBRXZELE1BQU0sR0FBRyxHQUF3QixFQUFFLENBQUE7SUFDbkMsS0FBSyxNQUFNLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUN0QixNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUN2Qyw2REFBNkQ7UUFDN0QsOERBQThEO1FBQzlELGlDQUFpQztRQUNqQyxJQUFJLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztZQUNoQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEtBQUssQ0FBQTtRQUMzQixDQUFDO0lBQ0gsQ0FBQztJQUVELEdBQUcsQ0FBQyxTQUFTLENBQUMsZUFBZSxFQUFFLG9CQUFvQixDQUFDLENBQUE7SUFDcEQsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFBO0FBQzNCLENBQUMifQ==