"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
exports.POST = POST;
exports.PATCH = PATCH;
exports.DELETE = DELETE;
const brand_1 = require("../../../../modules/brand");
async function GET(req, res) {
    const svc = req.scope.resolve(brand_1.BRAND_MODULE);
    const { id } = req.params;
    const brand = await svc.retrieveBrand(id);
    res.json({ brand });
}
async function POST(req, res) {
    return PATCH(req, res);
}
async function PATCH(req, res) {
    const svc = req.scope.resolve(brand_1.BRAND_MODULE);
    const { id } = req.params;
    const body = (req.body || {});
    const update = { id };
    const allowed = [
        "name",
        "handle",
        "logo_url",
        "description",
        "website_url",
        "seo_title",
        "seo_description",
        "sort_order",
        "is_active",
        "parent_id",
    ];
    for (const key of allowed) {
        if (key in body)
            update[key] = body[key];
    }
    if (typeof update.sort_order === "string") {
        update.sort_order = parseInt(update.sort_order, 10) || 0;
    }
    // Guard against three edge cases when re-parenting a brand:
    //   1. parent_id === id            → brand can't be its own parent
    //   2. parent_id pointing to a non-existent brand
    //   3. parent_id pointing to a descendant of this brand (would
    //      create a cycle — Apple cannot have Mac as parent if Mac is
    //      a child of Apple).
    if ("parent_id" in update) {
        if (update.parent_id === "" || update.parent_id === undefined) {
            update.parent_id = null;
        }
        if (update.parent_id !== null) {
            if (update.parent_id === id) {
                return res.status(400).json({ error: "A brand cannot be its own parent" });
            }
            const parent = await svc.retrieveBrand(update.parent_id).catch(() => null);
            if (!parent) {
                return res.status(400).json({ error: "parent_id does not refer to an existing brand" });
            }
            const descendants = await svc.listDescendantBrandIds(id);
            if (descendants.includes(update.parent_id)) {
                return res.status(400).json({ error: "Cycle detected: new parent is a descendant of this brand" });
            }
        }
    }
    const [brand] = await svc.updateBrands([update]);
    res.json({ brand });
}
async function DELETE(req, res) {
    const svc = req.scope.resolve(brand_1.BRAND_MODULE);
    const { id } = req.params;
    await svc.deleteBrands([id]);
    res.json({ id, deleted: true });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL2JyYW5kcy9baWRdL3JvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUEsa0JBS0M7QUFFRCxvQkFFQztBQUVELHNCQXFEQztBQUVELHdCQUtDO0FBMUVELHFEQUF3RDtBQUdqRCxLQUFLLFVBQVUsR0FBRyxDQUFDLEdBQWtCLEVBQUUsR0FBbUI7SUFDL0QsTUFBTSxHQUFHLEdBQXVCLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLG9CQUFZLENBQUMsQ0FBQTtJQUMvRCxNQUFNLEVBQUUsRUFBRSxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQTtJQUN6QixNQUFNLEtBQUssR0FBRyxNQUFNLEdBQUcsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUE7SUFDekMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUE7QUFDckIsQ0FBQztBQUVNLEtBQUssVUFBVSxJQUFJLENBQUMsR0FBa0IsRUFBRSxHQUFtQjtJQUNoRSxPQUFPLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUE7QUFDeEIsQ0FBQztBQUVNLEtBQUssVUFBVSxLQUFLLENBQUMsR0FBa0IsRUFBRSxHQUFtQjtJQUNqRSxNQUFNLEdBQUcsR0FBdUIsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsb0JBQVksQ0FBQyxDQUFBO0lBQy9ELE1BQU0sRUFBRSxFQUFFLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFBO0lBQ3pCLE1BQU0sSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxFQUFFLENBQXdCLENBQUE7SUFFcEQsTUFBTSxNQUFNLEdBQXdCLEVBQUUsRUFBRSxFQUFFLENBQUE7SUFDMUMsTUFBTSxPQUFPLEdBQUc7UUFDZCxNQUFNO1FBQ04sUUFBUTtRQUNSLFVBQVU7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