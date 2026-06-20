"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = syncProductFeed;
const send_product_feed_1 = __importDefault(require("../workflows/send-product-feed"));
async function syncProductFeed(container) {
    const logger = container.resolve("logger");
    const query = container.resolve("query");
    const { data: regions } = await query.graph({
        entity: "region",
        fields: ["id", "currency_code", "countries.*"],
    });
    for (const region of regions) {
        for (const country of region.countries) {
            await (0, send_product_feed_1.default)(container).run({
                input: {
                    currency_code: region.currency_code,
                    country_code: country.iso_2,
                },
            });
        }
    }
    logger.info("Product feed synced for all regions and countries");
}
exports.config = {
    name: "sync-product-feed",
    schedule: "*/15 * * * *", // Every 15 minutes
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3luYy1wcm9kdWN0LWZlZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvam9icy9zeW5jLXByb2R1Y3QtZmVlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFLQSxrQ0FxQkM7QUF2QkQsdUZBQXFFO0FBRXRELEtBQUssVUFBVSxlQUFlLENBQUMsU0FBMEI7SUFDdEUsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUMxQyxNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBRXhDLE1BQU0sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEdBQUcsTUFBTSxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQzFDLE1BQU0sRUFBRSxRQUFRO1FBQ2hCLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxlQUFlLEVBQUUsYUFBYSxDQUFDO0tBQy9DLENBQUMsQ0FBQTtJQUVGLEtBQUssTUFBTSxNQUFNLElBQUksT0FBTyxFQUFFLENBQUM7UUFDN0IsS0FBSyxNQUFNLE9BQU8sSUFBSSxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDdkMsTUFBTSxJQUFBLDJCQUF1QixFQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztnQkFDM0MsS0FBSyxFQUFFO29CQUNMLGFBQWEsRUFBRSxNQUFNLENBQUMsYUFBYTtvQkFDbkMsWUFBWSxFQUFFLE9BQVEsQ0FBQyxLQUFLO2lCQUM3QjthQUNGLENBQUMsQ0FBQTtRQUNKLENBQUM7SUFDSCxDQUFDO0lBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxtREFBbUQsQ0FBQyxDQUFBO0FBQ2xFLENBQUM7QUFFWSxRQUFBLE1BQU0sR0FBRztJQUNwQixJQUFJLEVBQUUsbUJBQW1CO0lBQ3pCLFFBQVEsRUFBRSxjQUFjLEVBQUUsbUJBQW1CO0NBQzlDLENBQUMifQ==