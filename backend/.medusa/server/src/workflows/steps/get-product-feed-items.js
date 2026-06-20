"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductFeedItemsStep = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const utils_1 = require("@medusajs/framework/utils");
const formatPrice = (price, currency_code) => {
    return `${new Intl.NumberFormat("en-US", {
        currency: currency_code,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(price)} ${currency_code.toUpperCase()}`;
};
exports.getProductFeedItemsStep = (0, workflows_sdk_1.createStep)("get-product-feed-items", async (input, { container }) => {
    const feedItems = [];
    const query = container.resolve("query");
    const configModule = container.resolve("configModule");
    const storefrontUrl = configModule.admin.storefrontUrl || process.env.STOREFRONT_URL;
    const limit = 100;
    let offset = 0;
    let count = 0;
    const countryCode = input.country_code.toLowerCase();
    const currencyCode = input.currency_code.toLowerCase();
    do {
        const { data: products, metadata } = await query.graph({
            entity: "product",
            fields: [
                "id",
                "title",
                "description",
                "handle",
                "thumbnail",
                "images.*",
                "status",
                "variants.*",
                "variants.calculated_price.*",
                "sales_channels.*",
                "sales_channels.stock_locations.*",
                "sales_channels.stock_locations.address.*",
                "categories.*"
            ],
            filters: {
                status: "published",
            },
            context: {
                variants: {
                    calculated_price: (0, utils_1.QueryContext)({
                        currency_code: currencyCode,
                    }),
                }
            },
            pagination: {
                take: limit,
                skip: offset,
            }
        });
        count = metadata?.count ?? 0;
        offset += limit;
        for (const product of products) {
            if (!product.variants.length)
                continue;
            const salesChannel = product.sales_channels?.find((channel) => {
                return channel?.stock_locations?.some((location) => {
                    return location?.address?.country_code.toLowerCase() === countryCode;
                });
            });
            const availability = salesChannel?.id ? await (0, utils_1.getVariantAvailability)(query, {
                variant_ids: product.variants.map((variant) => variant.id),
                sales_channel_id: salesChannel?.id,
            }) : undefined;
            const categories = product.categories?.map((cat) => cat?.name)
                .filter((name) => !!name).join(">");
            for (const variant of product.variants) {
                // @ts-ignore
                const calculatedPrice = variant.calculated_price;
                const hasOriginalPrice = calculatedPrice?.original_amount !== calculatedPrice?.calculated_amount;
                const originalPrice = hasOriginalPrice ? calculatedPrice.original_amount : calculatedPrice.calculated_amount;
                const salePrice = hasOriginalPrice ? calculatedPrice.calculated_amount : undefined;
                const stockStatus = !variant.manage_inventory ? "in stock" :
                    !availability?.[variant.id]?.availability ? "out of stock" : "in stock";
                const inventoryQuantity = !variant.manage_inventory ? 100000 : availability?.[variant.id]?.availability || 0;
                const color = variant.options?.find((o) => o.option?.title.toLowerCase() === "color")?.value;
                const size = variant.options?.find((o) => o.option?.title.toLowerCase() === "size")?.value;
                feedItems.push({
                    id: variant.id,
                    title: product.title,
                    description: product.description ?? "",
                    link: `${storefrontUrl || ""}/${input.country_code}/${product.handle}`,
                    image_link: product.thumbnail ?? "",
                    additional_image_link: product.images?.map((image) => image.url)?.join(","),
                    availability: stockStatus,
                    inventory_quantity: inventoryQuantity,
                    price: formatPrice(originalPrice, currencyCode),
                    sale_price: salePrice ? formatPrice(salePrice, currencyCode) : undefined,
                    item_group_id: product.id,
                    item_group_title: product.title,
                    gtin: variant.upc || undefined,
                    condition: "new", // TODO add condition if supported
                    product_category: categories,
                    material: variant.material || undefined,
                    weight: `${variant.weight || 0} kg`,
                    brand: "", // TODO add brands if supported
                    color: color || undefined,
                    size: size || undefined,
                    seller_name: "Medusa", // TODO add seller name if supported
                    seller_url: storefrontUrl || "",
                    seller_privacy_policy: `${storefrontUrl}/privacy-policy`, // TODO update
                    seller_tos: `${storefrontUrl}/terms-of-service`, // TODO update
                    return_policy: `${storefrontUrl}/return-policy`, // TODO update
                    return_window: 0, // TODO update
                });
            }
        }
    } while (count > offset);
    return new workflows_sdk_1.StepResponse({ items: feedItems });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LXByb2R1Y3QtZmVlZC1pdGVtcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy93b3JrZmxvd3Mvc3RlcHMvZ2V0LXByb2R1Y3QtZmVlZC1pdGVtcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxRUFBNEU7QUFDNUUscURBQWdGO0FBcUNoRixNQUFNLFdBQVcsR0FBRyxDQUFDLEtBQWEsRUFBRSxhQUFxQixFQUFFLEVBQUU7SUFDM0QsT0FBTyxHQUFHLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUU7UUFDdkMsUUFBUSxFQUFFLGFBQWE7UUFDdkIscUJBQXFCLEVBQUUsQ0FBQztRQUN4QixxQkFBcUIsRUFBRSxDQUFDO0tBQ3pCLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksYUFBYSxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUE7QUFDbkQsQ0FBQyxDQUFBO0FBRVksUUFBQSx1QkFBdUIsR0FBRyxJQUFBLDBCQUFVLEVBQy9DLHdCQUF3QixFQUN4QixLQUFLLEVBQUUsS0FBZ0IsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUU7SUFDMUMsTUFBTSxTQUFTLEdBQWUsRUFBRSxDQUFBO0lBQ2hDLE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDeEMsTUFBTSxZQUFZLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQTtJQUN0RCxNQUFNLGFBQWEsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDLGFBQWEsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQTtJQUVwRixNQUFNLEtBQUssR0FBRyxHQUFHLENBQUE7SUFDakIsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFBO0lBQ2QsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFBO0lBQ2IsTUFBTSxXQUFXLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FB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