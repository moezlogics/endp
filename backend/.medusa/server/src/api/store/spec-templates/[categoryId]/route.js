"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
const spec_template_1 = require("../../../../modules/spec-template");
async function GET(req, res) {
    const { categoryId } = req.params;
    if (!categoryId) {
        return res.status(400).json({ error: "categoryId is required" });
    }
    const query = req.scope.resolve("query");
    const specTemplateSvc = req.scope.resolve(spec_template_1.SPEC_TEMPLATE_MODULE);
    let category = null;
    try {
        const { data } = await query.graph({
            entity: "product_category",
            fields: [
                "id",
                "name",
                "metadata",
                "parent_category.id",
                "parent_category.name",
                "parent_category.metadata",
                "parent_category.parent_category.id",
                "parent_category.parent_category.name",
                "parent_category.parent_category.metadata",
                "parent_category.parent_category.parent_category.id",
                "parent_category.parent_category.parent_category.name",
                "parent_category.parent_category.parent_category.metadata",
            ],
            filters: { id: categoryId },
        });
        category = (data || [])[0];
    }
    catch (e) {
        return res.status(500).json({
            error: "Failed to load category",
            detail: e?.message || String(e),
        });
    }
    if (!category) {
        return res.status(404).json({ error: "Category not found" });
    }
    // Helper guard for inline backward-compatible template objects
    const isSpecTemplate = (x) => {
        return (!!x &&
            typeof x === "object" &&
            Array.isArray(x.groups) &&
            x.groups.every((g) => g &&
                typeof g.name === "string" &&
                Array.isArray(g.fields) &&
                g.fields.every((f) => f && typeof f.key === "string" && typeof f.label === "string")));
    };
    // Walk parents to find the nearest `spec_template_id` or inline `spec_template`
    const visited = new Set();
    let cur = category;
    let depth = 0;
    let isSelf = true;
    while (cur && depth++ < 10) {
        if (cur.id && visited.has(cur.id))
            break;
        if (cur.id)
            visited.add(cur.id);
        const meta = (cur.metadata || {});
        // 1. Try DB spec_template_id first
        const templateId = meta.spec_template_id;
        if (typeof templateId === "string" && templateId.trim()) {
            try {
                const specTemplate = await specTemplateSvc.retrieveSpecTemplate(templateId);
                if (specTemplate && specTemplate.template_data) {
                    return res.json({
                        template: specTemplate.template_data,
                        source: isSelf ? "self" : "ancestor",
                        source_id: cur.id || null,
                        source_name: cur.name || null,
                        template_id: specTemplate.id,
                        template_name: specTemplate.name,
                    });
                }
            }
            catch (e) {
                // Fall through if template not found in DB
            }
        }
        // 2. Try inline template object (backward-compatibility)
        const candidate = meta.spec_template;
        if (isSpecTemplate(candidate)) {
            return res.json({
                template: candidate,
                source: isSelf ? "self" : "ancestor",
                source_id: cur.id || null,
                source_name: cur.name || null,
                template_id: null,
                template_name: "Legacy Template",
            });
        }
        isSelf = false;
        cur = cur.parent_category;
    }
    return res.json({
        template: null,
        source: "none",
        source_id: null,
        source_name: null,
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL3NwZWMtdGVtcGxhdGVzL1tjYXRlZ29yeUlkXS9yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUlBLGtCQWtIQztBQXJIRCxxRUFBd0U7QUFHakUsS0FBSyxVQUFVLEdBQUcsQ0FBQyxHQUFrQixFQUFFLEdBQW1CO0lBQy9ELE1BQU0sRUFBRSxVQUFVLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFBO0lBQ2pDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNoQixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLHdCQUF3QixFQUFFLENBQUMsQ0FBQTtJQUNsRSxDQUFDO0lBRUQsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFRLENBQUE7SUFDL0MsTUFBTSxlQUFlLEdBQThCLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLG9DQUFvQixDQUFDLENBQUE7SUFFMUYsSUFBSSxRQUFRLEdBQVEsSUFBSSxDQUFBO0lBQ3hCLElBQUksQ0FBQztRQUNILE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxNQUFNLEtBQUssQ0FBQyxLQUFLLENBQUM7WUFDakMsTUFBTSxFQUFFLGtCQUFrQjtZQUMxQixNQUFNLEVBQUU7Z0JBQ04sSUFBSTtnQkFDSixNQUFNO2dCQUNOLFVBQVU7Z0JBQ1Ysb0JBQW9CO2dCQUNwQixzQkFBc0I7Z0JBQ3RCLDBCQUEwQjtnQkFDMUIsb0NBQW9DO2dCQUNwQyxzQ0FBc0M7Z0JBQ3RDLDBDQUEwQztnQkFDMUMsb0RBQW9EO2dCQUNwRCxzREFBc0Q7Z0JBQ3RELDBEQUEwRDthQUMzRDtZQUNELE9BQU8sRUFBRSxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUU7U0FDNUIsQ0FB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