"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostCartsBundledLineItemsSchema = void 0;
exports.POST = POST;
const zod_1 = require("@medusajs/framework/zod");
const add_bundle_to_cart_1 = require("../../../../../workflows/add-bundle-to-cart");
exports.PostCartsBundledLineItemsSchema = zod_1.z.object({
    bundle_id: zod_1.z.string(),
    quantity: zod_1.z.number().default(1),
    items: zod_1.z.array(zod_1.z.object({
        item_id: zod_1.z.string(),
        variant_id: zod_1.z.string()
    }))
});
async function POST(req, res) {
    const { result: cart } = await (0, add_bundle_to_cart_1.addBundleToCartWorkflow)(req.scope)
        .run({
        input: {
            cart_id: req.params.id,
            bundle_id: req.validatedBody.bundle_id,
            quantity: req.validatedBody.quantity || 1,
            items: req.validatedBody.items
        }
    });
    res.json({
        cart
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL2NhcnRzL1tpZF0vbGluZS1pdGVtLWJ1bmRsZXMvcm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBZUEsb0JBaUJDO0FBL0JELGlEQUE0QztBQUM1QyxvRkFBc0Y7QUFFekUsUUFBQSwrQkFBK0IsR0FBRyxPQUFDLENBQUMsTUFBTSxDQUFDO0lBQ3RELFNBQVMsRUFBRSxPQUFDLENBQUMsTUFBTSxFQUFFO0lBQ3JCLFFBQVEsRUFBRSxPQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUMvQixLQUFLLEVBQUUsT0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFDLENBQUMsTUFBTSxDQUFDO1FBQ3RCLE9BQU8sRUFBRSxPQUFDLENBQUMsTUFBTSxFQUFFO1FBQ25CLFVBQVUsRUFBRSxPQUFDLENBQUMsTUFBTSxFQUFFO0tBQ3ZCLENBQUMsQ0FBQztDQUNKLENBQUMsQ0FBQTtBQUlLLEtBQUssVUFBVSxJQUFJLENBQ3hCLEdBQW1ELEVBQ25ELEdBQW1CO0lBRW5CLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsTUFBTSxJQUFBLDRDQUF1QixFQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7U0FDOUQsR0FBRyxDQUFDO1FBQ0gsS0FBSyxFQUFFO1lBQ0wsT0FBTyxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUN0QixTQUFTLEVBQUUsR0FBRyxDQUFDLGFBQWEsQ0FBQyxTQUFTO1lBQ3RDLFFBQVEsRUFBRSxHQUFHLENBQUMsYUFBYSxDQUFDLFFBQVEsSUFBSSxDQUFDO1lBQ3pDLEtBQUssRUFBRSxHQUFHLENBQUMsYUFBYSxDQUFDLEtBQUs7U0FDL0I7S0FDRixDQUFDLENBQUE7SUFFSixHQUFHLENBQUMsSUFBSSxDQUFDO1FBQ1AsSUFBSTtLQUNMLENBQUMsQ0FBQTtBQUNKLENBQUMifQ==