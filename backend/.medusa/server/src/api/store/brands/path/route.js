"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
const brand_1 = require("../../../../modules/brand");
/**
 * GET /store/brands/path?path=apple/mac
 *
 * Resolves a slash-separated chain of brand handles into a single
 * brand. Each segment must be a direct child of the previous one,
 * so `?path=apple/mac` 404s if Mac is not actually a sub-brand of
 * Apple — preventing URL-guessing from surfacing the wrong product
 * set.
 *
 * NOTE: This route originally lived at `/store/brands/path/[...path]`
 * but Medusa V2's file-based router (path-to-regexp under the hood)
 * does not support catch-all dynamic segments and crashed on startup.
 * Switching to a single query parameter keeps the same semantics
 * without breaking the route loader.
 *
 * Successful response shape:
 *   {
 *     brand:       { ...the deepest matched brand },
 *     chain:       [ { id, name, handle } ...root → leaf ],
 *     children:    [ ...the immediate sub-brands of `brand` ],
 *     product_ids: [ ...products on `brand` AND its descendants ]
 *   }
 *
 * 404 with `{ error }` if any handle in the chain doesn't resolve.
 * 400 with `{ error }` if no path segments were supplied.
 */
async function GET(req, res) {
    const svc = req.scope.resolve(brand_1.BRAND_MODULE);
    const rawPath = req.query.path;
    const segments = Array.isArray(rawPath)
        ? rawPath.flatMap((s) => String(s).split("/")).filter(Boolean)
        : rawPath
            ? String(rawPath).split("/").filter(Boolean)
            : [];
    if (segments.length === 0) {
        return res.status(400).json({ error: "Empty brand path" });
    }
    // Walk the path segment-by-segment, verifying parent_id at each
    // step. Each level looks up `{ handle, parent_id }` so a stray
    // top-level brand can't impersonate a sub-brand.
    let parentId = null;
    const chain = [];
    for (const handle of segments) {
        const found = (await svc.listBrands({ handle, is_active: true, parent_id: parentId }, { take: 1 }));
        if (!found.length) {
            return res.status(404).json({ error: "Brand path not found", failed_at: handle });
        }
        const b = found[0];
        chain.push({
            id: b.id,
            name: b.name,
            handle: b.handle,
            parent_id: b.parent_id ?? null,
        });
        parentId = b.id;
    }
    const leafId = chain[chain.length - 1].id;
    const brand = await svc.retrieveBrand(leafId).catch(() => null);
    if (!brand) {
        return res.status(404).json({ error: "Brand path not found" });
    }
    const { brand_ids, product_ids } = await svc.retrieveBrandWithProducts(leafId);
    const childIds = brand_ids.filter((id) => id !== leafId);
    const children = childIds.length
        ? await svc.listBrands({ id: childIds, is_active: true }, { order: { sort_order: "ASC" }, take: 500 })
        : [];
    return res.json({
        brand,
        chain,
        children,
        product_ids,
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL2JyYW5kcy9wYXRoL3JvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBOEJBLGtCQTREQztBQXpGRCxxREFBd0Q7QUFHeEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Qkc7QUFDSSxLQUFLLFVBQVUsR0FBRyxDQUFDLEdBQWtCLEVBQUUsR0FBbUI7SUFDL0QsTUFBTSxHQUFHLEdBQXVCLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLG9CQUFZLENBQUMsQ0FBQTtJQUUvRCxNQUFNLE9BQU8sR0FBSSxHQUFHLENBQUMsS0FBSyxDQUFDLElBQWlELENBQUE7SUFDNUUsTUFBTSxRQUFRLEdBQWEsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFDL0MsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQzlELENBQUMsQ0FBQyxPQUFPO1lBQ1QsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztZQUM1QyxDQUFDLENBQUMsRUFBRSxDQUFBO0lBRU4sSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRSxDQUFDO1FBQzFCLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsa0JBQWtCLEVBQUUsQ0FBQyxDQUFBO0lBQzVELENBQUM7SUFFRCxnRUFBZ0U7SUFDaEUsK0RBQStEO0lBQy9ELGlEQUFpRDtJQUNqRCxJQUFJLFFBQVEsR0FBa0IsSUFBSSxDQUFBO0lBQ2xDLE1BQU0sS0FBSyxHQUE2RSxFQUFFLENBQUE7SUFFMUYsS0FBSyxNQUFNLE1BQU0sSUFBSSxRQUFRLEVBQUUsQ0FBQztRQUM5QixNQUFNLEtBQUssR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLFVBQVUsQ0FDakMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFTLEVBQ3ZELEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUNaLENBQVUsQ0FBQTtRQUNYLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDbEIsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxzQkFBc0IsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQTtRQUNuRixDQUFDO1FBQ0QsTUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ2xCLEtBQUssQ0FBQyxJQUFJLENBQUM7WUFDVCxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUU7WUFDUixJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUk7WUFDWixNQUFNLEVBQUUsQ0FBQyxDQUFDLE1BQU07WUFDaEIsU0FBUyxFQUFFLENBQUMsQ0FBQyxTQUFTLElBQUksSUFBSTtTQUMvQixDQUFDLENBQUE7UUFDRixRQUFRLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQTtJQUNqQixDQUFDO0lBRUQsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFBO0lBQ3pDLE1BQU0sS0FBSyxHQUFHLE1BQU0sR0FBRyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDL0QsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ1gsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxzQkFBc0IsRUFBRSxDQUFDLENBQUE7SUFDaEUsQ0FBQztJQUVELE1BQU0sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLEdBQUcsTUFBTSxHQUFHLENBQUMseUJBQXlCLENBQUMsTUFBTSxDQUFDLENBQUE7SUFFOUUsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxLQUFLLE1BQU0sQ0FBQyxDQUFBO0lBQ3hELE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxNQUFNO1FBQzlCLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxVQUFVLENBQ2xCLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFTLEVBQ3hDLEVBQUUsS0FBSyxFQUFFLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBUyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FDbkQ7UUFDSCxDQUFDLENBQUMsRUFBRSxDQUFBO0lBRU4sT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDO1FBQ2QsS0FBSztRQUNMLEtBQUs7UUFDTCxRQUFRO1FBQ1IsV0FBVztLQUNaLENBQUMsQ0FBQTtBQUNKLENBQUMifQ==