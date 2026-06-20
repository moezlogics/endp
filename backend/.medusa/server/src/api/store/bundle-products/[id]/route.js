"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
const utils_1 = require("@medusajs/framework/utils");
async function GET(req, res) {
    const { id } = req.params;
    const query = req.scope.resolve("query");
    const { currency_code, region_id } = req.query;
    const { data } = await query.graph({
        entity: "bundle",
        fields: [
            "*",
            "items.*",
            "items.product.*",
            "items.product.options.*",
            "items.product.options.values.*",
            "items.product.variants.*",
            "items.product.variants.calculated_price.*",
            "items.product.variants.options.*",
        ],
        filters: {
            id
        },
        context: {
            items: {
                product: {
                    variants: {
                        calculated_price: (0, utils_1.QueryContext)({
                            region_id,
                            currency_code,
                        }),
                    },
                }
            }
        },
    }, {
        throwIfKeyNotFound: true
    });
    res.json({
        bundle_product: data[0]
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL2J1bmRsZS1wcm9kdWN0cy9baWRdL3JvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0Esa0JBMkNDO0FBN0NELHFEQUF5RDtBQUVsRCxLQUFLLFVBQVUsR0FBRyxDQUN2QixHQUFrQixFQUNsQixHQUFtQjtJQUVuQixNQUFNLEVBQUUsRUFBRSxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQTtJQUN6QixNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUN4QyxNQUFNLEVBQUUsYUFBYSxFQUFFLFNBQVMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUE7SUFFOUMsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLE1BQU0sS0FBSyxDQUFDLEtBQUssQ0FBQztRQUNqQyxNQUFNLEVBQUUsUUFBUTtRQUNoQixNQUFNLEVBQUU7WUFDTixHQUFHO1lBQ0gsU0FBUztZQUNULGlCQUFpQjtZQUNqQix5QkFBeUI7WUFDekIsZ0NBQWdDO1lBQ2hDLDBCQUEwQjtZQUMxQiwyQ0FBMkM7WUFDM0Msa0NBQWtDO1NBQ25DO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsRUFBRTtTQUNIO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsS0FBSyxFQUFFO2dCQUNMLE9BQU8sRUFBRTtvQkFDUCxRQUFRLEVBQUU7d0JBQ1IsZ0JBQWdCLEVBQUUsSUFBQSxvQkFBWSxFQUFDOzRCQUM3QixTQUFTOzRCQUNULGFBQWE7eUJBQ2QsQ0FBQztxQkFDSDtpQkFDRjthQUNGO1NBQ0Y7S0FFRixFQUFFO1FBQ0Qsa0JBQWtCLEVBQUUsSUFBSTtLQUN6QixDQUFDLENBQUE7SUFFRixHQUFHLENBQUMsSUFBSSxDQUFDO1FBQ1AsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7S0FDeEIsQ0FBQyxDQUFBO0FBQ0osQ0FBQyJ9