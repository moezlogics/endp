"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostBundledProductsSchema = void 0;
exports.POST = POST;
exports.GET = GET;
const zod_1 = require("@medusajs/framework/zod");
const validators_1 = require("@medusajs/medusa/api/admin/products/validators");
const create_bundled_product_1 = require("../../../workflows/create-bundled-product");
exports.PostBundledProductsSchema = zod_1.z.object({
    title: zod_1.z.string(),
    product: (0, validators_1.AdminCreateProduct)(),
    items: zod_1.z.array(zod_1.z.object({
        product_id: zod_1.z.string(),
        quantity: zod_1.z.number(),
    })),
});
async function POST(req, res) {
    const { result: bundledProduct } = await (0, create_bundled_product_1.createBundledProductWorkflow)(req.scope)
        .run({
        input: {
            bundle: req.validatedBody,
        }
    });
    res.json({
        bundled_product: bundledProduct,
    });
}
async function GET(req, res) {
    const query = req.scope.resolve("query");
    const { data: bundledProducts, metadata: { count, take, skip } = {} } = await query.graph({
        entity: "bundle",
        ...req.queryConfig
    });
    res.json({
        bundled_products: bundledProducts,
        count: count || 0,
        limit: take || 15,
        offset: skip || 0,
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL2J1bmRsZWQtcHJvZHVjdHMvcm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBd0JBLG9CQWNDO0FBRUQsa0JBbUJDO0FBdkRELGlEQUE0QztBQUM1QywrRUFFdUQ7QUFDdkQsc0ZBR21EO0FBRXRDLFFBQUEseUJBQXlCLEdBQUcsT0FBQyxDQUFDLE1BQU0sQ0FBQztJQUNoRCxLQUFLLEVBQUUsT0FBQyxDQUFDLE1BQU0sRUFBRTtJQUNqQixPQUFPLEVBQUUsSUFBQSwrQkFBa0IsR0FBRTtJQUM3QixLQUFLLEVBQUUsT0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFDLENBQUMsTUFBTSxDQUFDO1FBQ3RCLFVBQVUsRUFBRSxPQUFDLENBQUMsTUFBTSxFQUFFO1FBQ3RCLFFBQVEsRUFBRSxPQUFDLENBQUMsTUFBTSxFQUFFO0tBQ3JCLENBQUMsQ0FBQztDQUNKLENBQUMsQ0FBQTtBQUlLLEtBQUssVUFBVSxJQUFJLENBQ3hCLEdBQTBELEVBQzFELEdBQW1CO0lBRW5CLE1BQU0sRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLEdBQUcsTUFBTSxJQUFBLHFEQUE0QixFQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7U0FDN0UsR0FBRyxDQUFDO1FBQ0gsS0FBSyxFQUFFO1lBQ0wsTUFBTSxFQUFFLEdBQUcsQ0FBQyxhQUFhO1NBQ1c7S0FDdkMsQ0FBQyxDQUFBO0lBRUosR0FBRyxDQUFDLElBQUksQ0FBQztRQUNQLGVBQWUsRUFBRSxjQUFjO0tBQ2hDLENBQUMsQ0FBQTtBQUNKLENBQUM7QUFFTSxLQUFLLFVBQVUsR0FBRyxDQUN2QixHQUErQixFQUMvQixHQUFtQjtJQUVuQixNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUN4QyxNQUFNLEVBQ0osSUFBSSxFQUFFLGVBQWUsRUFDckIsUUFBUSxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEVBQ3JDLEdBQUcsTUFBTSxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQ3BCLE1BQU0sRUFBRSxRQUFRO1FBQ2hCLEdBQUcsR0FBRyxDQUFDLFdBQVc7S0FDbkIsQ0FBQyxDQUFBO0lBRUYsR0FBRyxDQUFDLElBQUksQ0FBQztRQUNQLGdCQUFnQixFQUFFLGVBQWU7UUFDakMsS0FBSyxFQUFFLEtBQUssSUFBSSxDQUFDO1FBQ2pCLEtBQUssRUFBRSxJQUFJLElBQUksRUFBRTtRQUNqQixNQUFNLEVBQUUsSUFBSSxJQUFJLENBQUM7S0FDbEIsQ0FBQyxDQUFBO0FBQ0osQ0FBQyJ9