"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
exports.POST = POST;
const brand_1 = require("../../../modules/brand");
async function GET(req, res) {
    const svc = req.scope.resolve(brand_1.BRAND_MODULE);
    // Optional `parent_id` filter — `?parent_id=null` (literal string)
    // returns top-level brands, `?parent_id=brand_xxx` returns children
    // of that brand. Useful for the admin sub-brand picker.
    const rawParent = req.query.parent_id;
    const filter = {};
    if (typeof rawParent === "string") {
        filter.parent_id = rawParent === "null" || rawParent === "" ? null : rawParent;
    }
    const [brands, count] = await svc.listAndCountBrands(filter, { order: { sort_order: "ASC" }, take: 500 });
    res.json({ brands, count });
}
async function POST(req, res) {
    const svc = req.scope.resolve(brand_1.BRAND_MODULE);
    const body = (req.body || {});
    if (!body.name || typeof body.name !== "string") {
        return res.status(400).json({ error: "name is required" });
    }
    const handle = body.handle ||
        body.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");
    // Validate parent_id: must be either null or an existing brand
    // (we don't let an admin point a child at a non-existent parent).
    let parentId = null;
    if (body.parent_id) {
        const parent = await svc.retrieveBrand(body.parent_id).catch(() => null);
        if (!parent) {
            return res.status(400).json({ error: "parent_id does not refer to an existing brand" });
        }
        parentId = parent.id;
    }
    const [brand] = await svc.createBrands([
        {
            name: body.name,
            handle,
            logo_url: body.logo_url ?? null,
            description: body.description ?? null,
            website_url: body.website_url ?? null,
            seo_title: body.seo_title ?? null,
            seo_description: body.seo_description ?? null,
            sort_order: typeof body.sort_order === "number"
                ? body.sort_order
                : parseInt(body.sort_order, 10) || 0,
            is_active: body.is_active !== false,
            parent_id: parentId,
        },
    ]);
    res.status(201).json({ brand });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL2JyYW5kcy9yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUlBLGtCQWtCQztBQUVELG9CQTZDQztBQXBFRCxrREFBcUQ7QUFHOUMsS0FBSyxVQUFVLEdBQUcsQ0FBQyxHQUFrQixFQUFFLEdBQW1CO0lBQy9ELE1BQU0sR0FBRyxHQUF1QixHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxvQkFBWSxDQUFDLENBQUE7SUFFL0QsbUVBQW1FO0lBQ25FLG9FQUFvRTtJQUNwRSx3REFBd0Q7SUFDeEQsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUE7SUFDckMsTUFBTSxNQUFNLEdBQXdCLEVBQUUsQ0FBQTtJQUN0QyxJQUFJLE9BQU8sU0FBUyxLQUFLLFFBQVEsRUFBRSxDQUFDO1FBQ2xDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsU0FBUyxLQUFLLE1BQU0sSUFBSSxTQUFTLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQTtJQUNoRixDQUFDO0lBRUQsTUFBTSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsR0FBRyxNQUFNLEdBQUcsQ0FBQyxrQkFBa0IsQ0FDbEQsTUFBTSxFQUNOLEVBQUUsS0FBSyxFQUFFLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBUyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FDbkQsQ0FBQTtJQUVELEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQTtBQUM3QixDQUFDO0FBRU0sS0FBSyxVQUFVLElBQUksQ0FBQyxHQUFrQixFQUFFLEdBQW1CO0lBQ2hFLE1BQU0sR0FBRyxHQUF1QixHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxvQkFBWSxDQUFDLENBQUE7SUFDL0QsTUFBTSxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBd0IsQ0FBQTtJQUVwRCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFLENBQUM7UUFDaEQsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxrQkFBa0IsRUFBRSxDQUFDLENBQUE7SUFDNUQsQ0FBQztJQUVELE1BQU0sTUFBTSxHQUNWLElBQUksQ0FBQyxNQUFNO1FBQ1gsSUFBSSxDQUFDLElBQUk7YUFDTixXQUFXLEVBQUU7YUFDYixPQUFPLENBQUMsYUFBYSxFQUFFLEdBQUcsQ0FBQzthQUMzQixPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBRTFCLCtEQUErRDtJQUMvRCxrRUFBa0U7SUFDbEUsSUFBSSxRQUFRLEdBQWtCLElBQUksQ0FBQTtJQUNsQyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNuQixNQUFNLE1BQU0sR0FBRyxNQUFNLEdBQUcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUN4RSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDWixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLCtDQUErQyxFQUFFLENBQUMsQ0FBQTtRQUN6RixDQUFDO1FBQ0QsUUFBUSxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUE7SUFDdEIsQ0FBQztJQUVELE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxNQUFNLEdBQUcsQ0FBQyxZQUFZLENBQUM7UUFDckM7WUFDRSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixNQUFNO1lBQ04sUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSTtZQUMvQixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJO1lBQ3JDLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUk7WUFDckMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSTtZQUNqQyxlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWUsSUFBSSxJQUFJO1lBQzdDLFVBQVUsRUFDUixPQUFPLElBQUksQ0FBQyxVQUFVLEtBQUssUUFBUTtnQkFDakMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVO2dCQUNqQixDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQztZQUN4QyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsS0FBSyxLQUFLO1lBQ25DLFNBQVMsRUFBRSxRQUFRO1NBQ2I7S0FDVCxDQUFDLENBQUE7SUFFRixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUE7QUFDakMsQ0FBQyJ9