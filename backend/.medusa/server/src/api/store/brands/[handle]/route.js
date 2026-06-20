"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
const brand_1 = require("../../../../modules/brand");
async function GET(req, res) {
    const svc = req.scope.resolve(brand_1.BRAND_MODULE);
    const { handle } = req.params;
    const brands = await svc.listBrands({ handle, is_active: true }, { take: 1 });
    if (!brands.length) {
        return res.status(404).json({ error: "Brand not found" });
    }
    const brand = brands[0];
    // Roll up: this brand's products PLUS every descendant brand's
    // products. So `/brands/apple` returns Apple + Apple Mac + Apple
    // iPhone products in one shot. Descendant resolution is BFS in the
    // service so cycles are safe.
    const { brand_ids, product_ids } = await svc.retrieveBrandWithProducts(brand.id);
    // Fetch the descendant brand records (one query) so the storefront
    // can render a "Browse Apple Mac · iPhone · Watch" rail without
    // doing N follow-up requests.
    const childIds = brand_ids.filter((id) => id !== brand.id);
    const children = childIds.length
        ? await svc.listBrands({ id: childIds, is_active: true }, { order: { sort_order: "ASC" }, take: 500 })
        : [];
    res.json({ brand, product_ids, children });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL2JyYW5kcy9baGFuZGxlXS9yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUlBLGtCQW1DQztBQXRDRCxxREFBd0Q7QUFHakQsS0FBSyxVQUFVLEdBQUcsQ0FBQyxHQUFrQixFQUFFLEdBQW1CO0lBQy9ELE1BQU0sR0FBRyxHQUF1QixHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxvQkFBWSxDQUFDLENBQUE7SUFDL0QsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUE7SUFFN0IsTUFBTSxNQUFNLEdBQUcsTUFBTSxHQUFHLENBQUMsVUFBVSxDQUNqQyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQzNCLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUNaLENBQUE7SUFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ25CLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQyxDQUFBO0lBQzNELENBQUM7SUFFRCxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFRLENBQUE7SUFFOUIsK0RBQStEO0lBQy9ELGlFQUFpRTtJQUNqRSxtRUFBbUU7SUFDbkUsOEJBQThCO0lBQzlCLE1BQU0sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLEdBQUcsTUFBTSxHQUFHLENBQUMseUJBQXlCLENBQ3BFLEtBQUssQ0FBQyxFQUFFLENBQ1QsQ0FBQTtJQUVELG1FQUFtRTtJQUNuRSxnRUFBZ0U7SUFDaEUsOEJBQThCO0lBQzlCLE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsS0FBSyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUE7SUFDMUQsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLE1BQU07UUFDOUIsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLFVBQVUsQ0FDbEIsRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQVMsRUFDeEMsRUFBRSxLQUFLLEVBQUUsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFTLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUNuRDtRQUNILENBQUMsQ0FBQyxFQUFFLENBQUE7SUFFTixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFBO0FBQzVDLENBQUMifQ==