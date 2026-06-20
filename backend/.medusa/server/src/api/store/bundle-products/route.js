"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
const utils_1 = require("@medusajs/framework/utils");
/**
 * GET /store/bundle-products
 *   Public: list bundles for the storefront. Used by the PDP "Buy as
 *   bundle" card to surface any bundles where a given product appears
 *   as the showcased item or as one of the bundle items.
 *
 * Query:
 *   ?product_id=xxx       — return only bundles featuring this product
 *   ?currency_code=usd    — required for variant pricing
 *   ?region_id=reg_xxx    — required for variant pricing
 */
async function GET(req, res) {
    const query = req.scope.resolve("query");
    const { product_id, currency_code, region_id } = req.query;
    const { data: bundles } = await query.graph({
        entity: "bundle",
        fields: [
            "id",
            "title",
            "product.id",
            "product.title",
            "product.handle",
            "product.thumbnail",
            "items.id",
            "items.quantity",
            "items.product.id",
            "items.product.title",
            "items.product.handle",
            "items.product.thumbnail",
            "items.product.variants.id",
            "items.product.variants.title",
            "items.product.variants.calculated_price.*",
            "items.product.variants.options.*",
            "items.product.options.*",
            "items.product.options.values.*",
        ],
        context: {
            items: {
                product: {
                    variants: {
                        calculated_price: (0, utils_1.QueryContext)({
                            region_id,
                            currency_code,
                        }),
                    },
                },
            },
        },
    });
    let filtered = bundles || [];
    if (product_id) {
        filtered = filtered.filter((b) => b?.product?.id === product_id ||
            (b?.items || []).some((i) => i?.product?.id === product_id));
    }
    res.json({ bundle_products: filtered });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL2J1bmRsZS1wcm9kdWN0cy9yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQWNBLGtCQXVEQztBQXBFRCxxREFBd0Q7QUFFeEQ7Ozs7Ozs7Ozs7R0FVRztBQUNJLEtBQUssVUFBVSxHQUFHLENBQUMsR0FBa0IsRUFBRSxHQUFtQjtJQUMvRCxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUN4QyxNQUFNLEVBQUUsVUFBVSxFQUFFLGFBQWEsRUFBRSxTQUFTLEVBQUUsR0FBRyxHQUFHLENBQUMsS0FHcEQsQ0FBQTtJQUVELE1BQU0sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEdBQUcsTUFBTSxLQUFLLENBQUMsS0FBSyxDQUN6QztRQUNFLE1BQU0sRUFBRSxRQUFRO1FBQ2hCLE1BQU0sRUFBRTtZQUNOLElBQUk7WUFDSixPQUFPO1lBQ1AsWUFBWTtZQUNaLGVBQWU7WUFDZixnQkFBZ0I7WUFDaEIsbUJBQW1CO1lBQ25CLFVBQVU7WUFDVixnQkFBZ0I7WUFDaEIsa0JBQWtCO1lBQ2xCLHFCQUFxQjtZQUNyQixzQkFBc0I7WUFDdEIseUJBQXlCO1lBQ3pCLDJCQUEyQjtZQUMzQiw4QkFBOEI7WUFDOUIsMkNBQTJDO1lBQzNDLGtDQUFrQztZQUNsQyx5QkFBeUI7WUFDekIsZ0NBQWdDO1NBQ2pDO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsS0FBSyxFQUFFO2dCQUNMLE9BQU8sRUFBRTtvQkFDUCxRQUFRLEVBQUU7d0JBQ1IsZ0JBQWdCLEVBQUUsSUFBQSxvQkFBWSxFQUFDOzRCQUM3QixTQUFTOzRCQUNULGFBQWE7eUJBQ2QsQ0FBQztxQkFDSDtpQkFDRjthQUNGO1NBQ0Y7S0FDRixDQUNGLENBQUE7SUFFRCxJQUFJLFFBQVEsR0FBRyxPQUFPLElBQUksRUFBRSxDQUFBO0lBQzVCLElBQUksVUFBVSxFQUFFLENBQUM7UUFDZixRQUFRLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FDeEIsQ0FBQyxDQUFNLEVBQUUsRUFBRSxDQUNULENBQUMsRUFBRSxPQUFPLEVBQUUsRUFBRSxLQUFLLFVBQVU7WUFDN0IsQ0FBQyxDQUFDLEVBQUUsS0FBSyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxFQUFFLEtBQUssVUFBVSxDQUFDLENBQ25FLENBQUE7SUFDSCxDQUFDO0lBRUQsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFBO0FBQ3pDLENBQUMifQ==