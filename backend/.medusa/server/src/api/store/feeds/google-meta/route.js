"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
const utils_1 = require("@medusajs/framework/utils");
async function GET(req, res) {
    const query = req.scope.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    // Parse query params
    const currencyCode = (req.query.currency || "PKR").toLowerCase();
    const countryCode = (req.query.country || "PK").toLowerCase();
    // Base URL resolution
    const storefrontUrl = process.env.STOREFRONT_URL || "https://www.mobilestore.pk";
    const cleanBaseUrl = storefrontUrl.endsWith("/") ? storefrontUrl.slice(0, -1) : storefrontUrl;
    const brandName = process.env.SMTP_FROM_NAME || "Mobile Store";
    try {
        const limit = 100;
        let offset = 0;
        let count = 0;
        const feedItems = [];
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
                if (!product.variants?.length)
                    continue;
                const salesChannel = product.sales_channels?.find((channel) => {
                    return channel?.stock_locations?.some((location) => {
                        return location?.address?.country_code?.toLowerCase() === countryCode;
                    });
                });
                const availability = salesChannel?.id ? await (0, utils_1.getVariantAvailability)(query, {
                    variant_ids: product.variants.map((variant) => variant.id),
                    sales_channel_id: salesChannel?.id,
                }) : undefined;
                const categories = product.categories?.map((cat) => cat?.name)
                    .filter((name) => !!name).join(" > ");
                for (const variant of product.variants) {
                    const calculatedPrice = variant.calculated_price;
                    const hasOriginalPrice = calculatedPrice?.original_amount !== calculatedPrice?.calculated_amount;
                    const originalPrice = hasOriginalPrice ? calculatedPrice?.original_amount : calculatedPrice?.calculated_amount;
                    const salePrice = hasOriginalPrice ? calculatedPrice?.calculated_amount : undefined;
                    const stockStatus = !variant.manage_inventory ? "in stock" :
                        !availability?.[variant.id]?.availability ? "out of stock" : "in stock";
                    const formatPriceString = (amount) => {
                        return `${(amount).toFixed(2)} ${currencyCode.toUpperCase()}`;
                    };
                    const escapeHtml = (str) => (str || "")
                        .replace(/&/g, "&amp;")
                        .replace(/</g, "&lt;")
                        .replace(/>/g, "&gt;")
                        .replace(/\"/g, "&quot;")
                        .replace(/'/g, "&apos;");
                    const color = variant.options?.find((o) => o.option?.title?.toLowerCase() === "color")?.value;
                    const size = variant.options?.find((o) => o.option?.title?.toLowerCase() === "size")?.value;
                    feedItems.push({
                        id: variant.id,
                        title: escapeHtml(product.title),
                        description: escapeHtml(product.description || product.title),
                        link: escapeHtml(`${cleanBaseUrl}/${countryCode}/products/${product.handle}`),
                        image_link: escapeHtml(product.thumbnail || ""),
                        additional_image_link: escapeHtml(product.images?.map((img) => img.url)?.join(",") || ""),
                        availability: stockStatus,
                        price: originalPrice !== undefined ? formatPriceString(originalPrice) : "",
                        sale_price: salePrice !== undefined ? formatPriceString(salePrice) : undefined,
                        item_group_id: product.id,
                        brand: escapeHtml(brandName),
                        category: escapeHtml(categories || ""),
                        color: escapeHtml(color || ""),
                        size: escapeHtml(size || ""),
                    });
                }
            }
        } while (count > offset);
        const itemsXml = feedItems.map((item) => {
            let itemStr = `<item>` +
                `<g:id>${item.id}</g:id>` +
                `<g:title>${item.title}</g:title>` +
                `<g:description>${item.description}</g:description>` +
                `<g:link>${item.link}</g:link>` +
                (item.image_link ? `<g:image_link>${item.image_link}</g:image_link>` : "") +
                (item.additional_image_link ? `<g:additional_image_link>${item.additional_image_link}</g:additional_image_link>` : "") +
                `<g:availability>${item.availability}</g:availability>` +
                `<g:price>${item.price}</g:price>` +
                (item.sale_price ? `<g:sale_price>${item.sale_price}</g:sale_price>` : "") +
                `<g:brand>${item.brand}</g:brand>` +
                `<g:item_group_id>${item.item_group_id}</g:item_group_id>` +
                (item.category ? `<g:product_type>${item.category}</g:product_type>` : "") +
                (item.color ? `<g:color>${item.color}</g:color>` : "") +
                (item.size ? `<g:size>${item.size}</g:size>` : "") +
                `<g:condition>new</g:condition>` +
                `</item>`;
            return itemStr;
        }).join("");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>${escapeXml(brandName)} Product Catalog Feed</title>
    <link>${escapeXml(cleanBaseUrl)}</link>
    <description>Dynamic product feed for Google Merchant Center and Meta Ads Catalog</description>
    ${itemsXml}
  </channel>
</rss>`;
        res.setHeader("Content-Type", "application/xml");
        res.status(200).send(xml);
    }
    catch (error) {
        res.status(500).json({ message: error.message || "Failed to generate product feed" });
    }
}
function escapeXml(str) {
    return (str || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&apos;");
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL2ZlZWRzL2dvb2dsZS1tZXRhL3JvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0Esa0JBMEpDO0FBNUpELHFEQUEyRztBQUVwRyxLQUFLLFVBQVUsR0FBRyxDQUFDLEdBQWtCLEVBQUUsR0FBbUI7SUFDL0QsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsaUNBQXlCLENBQUMsS0FBSyxDQUFDLENBQUE7SUFFaEUscUJBQXFCO0lBQ3JCLE1BQU0sWUFBWSxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFrQixJQUFJLEtBQUssQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFBO0lBQzFFLE1BQU0sV0FBVyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFpQixJQUFJLElBQUksQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFBO0lBRXZFLHNCQUFzQjtJQUN0QixNQUFNLGFBQWEsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsSUFBSSw0QkFBNEIsQ0FBQTtJQUNoRixNQUFNLFlBQVksR0FBRyxhQUFhLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUE7SUFDN0YsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLElBQUksY0FBYyxDQUFBO0lBRTlELElBQUksQ0FBQztRQUNILE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQTtRQUNqQixJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUE7UUFDZCxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUE7UUFDYixNQUFNLFNBQVMsR0FBVSxFQUFFLENBQUE7UUFFM0IsR0FBRyxDQUFDO1lBQ0YsTUFBTSxFQUNKLElBQUksRUFBRSxRQUFRLEVBQ2QsUUFBUSxFQUNULEdBQUcsTUFBTSxLQUFLLENBQUMsS0FBSyxDQUFDO2dCQUNwQixNQUFNLEVBQUUsU0FBUztnQkFDakIsTUFBTSxFQUFFO29CQUNOLElBQUk7b0JBQ0osT0FBTztvQkFDUCxhQUFhO29CQUNiLFFBQVE7b0JBQ1IsV0FBVztvQkFDWCxVQUFVO29CQUNWLFFBQVE7b0JBQ1IsWUFBWTtvQkFDWiw2QkFBNkI7b0JBQzdCLGtCQUFrQjtvQkFDbEIsa0NBQWtDO29CQUNsQywwQ0FBMEM7b0JBQzFDLGNBQWM7aUJBQ2Y7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLE1BQU0sRUFBRSxXQUFXO2lCQUNwQjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsUUFBUSxFQUFFO3dCQUNSLGdCQUFnQixFQUFFLElBQUEsb0JBQVksRUFBQzs0QkFDN0IsYUFBYSxFQUFFLFlBQVk7eUJBQzVCLENBQUM7cUJBQ0g7aUJBQ0Y7Z0JBQ0QsVUFBVSxFQUFFO29CQUNWLElBQUksRUFBRSxLQUFLO29CQUNYLElBQUksRUFBRSxNQUFNO2lCQUNiO2FBQ0YsQ0FBbUMsQ0FBQTtZQUVwQyxLQUFLLEdBQUcsUUFBUSxFQUFFLEtBQUssSUFBSSxDQUFDLENBQUE7WUFDNUIsTUFBTSxJQUFJLEtBQUssQ0FBQTtZQUVmLEtBQUssTUFBTSxPQUFPLElBQUksUUFBUSxFQUFFLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLE1BQU07b0JBQUUsU0FBUTtnQkFDdkMsTUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQyxPQUFZLEVBQUUsRUFBRTtvQkFDakUsT0FBTyxPQUFPLEVBQUUsZUFBZSxFQUFFLElBQUksQ0FBQyxDQUFDLFFBQWEsRUFBRSxFQUFFO3dCQUN0RCxPQUFPLFFBQVEsRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxLQUFLLFdBQVcsQ0FBQTtvQkFDdkUsQ0FBQyxDQUFDLENBQUE7Z0JBQ0osQ0FBQyxDQUFDLENBQUE7Z0JBRUYsTUFBTSxZQUFZLEdBQUcsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFBLDhCQUFzQixFQUFDLEtBQUssRUFBRTtvQkFDMUUsV0FBVyxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBWSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO29CQUMvRCxnQkFBZ0IsRUFBRSxZQUFZLEVBQUUsRUFBRTtpQkFDbkMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUE7Z0JBRWQsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFRLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUM7cUJBQ2hFLE1BQU0sQ0FBQyxDQUFDLElBQVMsRUFBa0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7Z0JBRTVELEtBQUssTUFBTSxPQUFPLElBQUksT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUN2QyxNQUFNLGVBQWUsR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUE7b0JBQ2hELE1BQU0sZ0JBQWdCLEdBQUcsZUFBZSxFQUFFLGVBQWUsS0FBSyxlQUFlLEVBQUUsaUJBQWlCLENBQUE7b0JBQ2hHLE1BQU0sYUFBYSxHQUFHLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxlQUFlLEVBQUUsZUFBZSxDQUFDLENBQUMsQ0FBQyxlQUFlLEVBQUUsaUJBQWlCLENBQUE7b0JBQzlHLE1BQU0sU0FBUyxHQUFHLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxlQUFlLEVBQUUsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQTtvQkFDbkYsTUFBTSxXQUFXLEdBQUcsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO3dCQUMxRCxDQUFDLFlBQVksRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFBO29CQUV6RSxNQUFNLGlCQUFpQixHQUFHLENBQUMsTUFBYyxFQUFFLEVBQUU7d0JBQzNDLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxZQUFZLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQTtvQkFDL0QsQ0FBQyxDQUFBO29CQUVELE1BQU0sVUFBVSxHQUFHLENBQUMsR0FBVyxFQUFFLEVBQUUsQ0FDakMsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDO3lCQUNSLE9BQU8sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDO3lCQUN0QixPQUFPLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQzt5QkFDckIsT0FBTyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUM7eUJBQ3JCLE9BQU8sQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDO3lCQUN4QixPQUFPLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFBO29CQUU1QixNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLEtBQUssT0FBTyxDQUFDLEVBQUUsS0FBSyxDQUFBO29CQUNsRyxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLEtBQUssTUFBTSxDQUFDLEVBQUUsS0FBSyxDQUFBO29CQUVoRyxTQUFTLENBQUMsSUFBSSxDQUFDO3dCQUNiLEVBQUUsRUFBRSxPQUFPLENBQUMsRUFBRTt3QkFDZCxLQUFLLEVBQUUsVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7d0JBQ2hDLFdBQVcsRUFBRSxVQUFVLENBQUMsT0FBTyxDQUFDLFdBQVcsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDO3dCQUM3RCxJQUFJLEVBQUUsVUFBVSxDQUFDLEdBQUcsWUFBWSxJQUFJLFdBQVcsYUFBYSxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7d0JBQzdFLFVBQVUsRUFBRSxVQUFVLENBQUMsT0FBTyxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUM7d0JBQy9DLHFCQUFxQixFQUFFLFVBQVUsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQVEsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7d0JBQzlGLFlBQVksRUFBRSxXQUFXO3dCQUN6QixLQUFLLEVBQUUsYUFBYSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7d0JBQzFFLFVBQVUsRUFBRSxTQUFTLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUzt3QkFDOUUsYUFBYSxFQUFFLE9BQU8sQ0FBQyxFQUFFO3dCQUN6QixLQUFLLEVBQUUsVUFBVSxDQUFDLFNBQVMsQ0FBQzt3QkFDNUIsUUFBUSxFQUFFLFVBQVUsQ0FBQyxVQUFVLElBQUksRUFBRSxDQUFDO3dCQUN0QyxLQUFLLEVBQUUsVUFBVSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7d0JBQzlCLElBQUksRUFBRSxVQUFVLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztxQkFDN0IsQ0FBQyxDQUFBO2dCQUNKLENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQyxRQUFRLEtBQUssR0FBRyxNQUFNLEVBQUM7UUFFeEIsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3RDLElBQUksT0FBTyxHQUFHLFFBQVE7Z0JBQ3BCLFNBQVMsSUFBSSxDQUFDLEVBQUUsU0FBUztnQkFDekIsWUFBWSxJQUFJLENBQUMsS0FBSyxZQUFZO2dCQUNsQyxrQkFBa0IsSUFBSSxDQUFDLFdBQVcsa0JBQWtCO2dCQUNwRCxXQUFXLElBQUksQ0FBQyxJQUFJLFdBQVc7Z0JBQy9CLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLElBQUksQ0FBQyxVQUFVLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7Z0JBQzFFLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyw0QkFBNEIsSUFBSSxDQUFDLHFCQUFxQiw0QkFBNEIsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO2dCQUN0SCxtQkFBbUIsSUFBSSxDQUFDLFlBQVksbUJBQW1CO2dCQUN2RCxZQUFZLElBQUksQ0FBQyxLQUFLLFlBQVk7Z0JBQ2xDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLElBQUksQ0FBQyxVQUFVLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7Z0JBQzFFLFlBQVksSUFBSSxDQUFDLEtBQUssWUFBWTtnQkFDbEMsb0JBQW9CLElBQUksQ0FBQyxhQUFhLG9CQUFvQjtnQkFDMUQsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsSUFBSSxDQUFDLFFBQVEsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztnQkFDMUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxZQUFZLElBQUksQ0FBQyxLQUFLLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO2dCQUN0RCxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFdBQVcsSUFBSSxDQUFDLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7Z0JBQ2xELGdDQUFnQztnQkFDbEMsU0FBUyxDQUFBO1lBQ1QsT0FBTyxPQUFPLENBQUE7UUFDaEIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBRVgsTUFBTSxHQUFHLEdBQUc7OzthQUdILFNBQVMsQ0FBQyxTQUFTLENBQUM7WUFDckIsU0FBUyxDQUFDLFlBQVksQ0FBQzs7TUFFN0IsUUFBUTs7T0FFUCxDQUFBO1FBRUgsR0FBRyxDQUFDLFNBQVMsQ0FBQyxjQUFjLEVBQUUsaUJBQWlCLENBQUMsQ0FBQTtRQUNoRCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUUzQixDQUFDO0lBQUMsT0FBTyxLQUFVLEVBQUUsQ0FBQztRQUNwQixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTyxJQUFJLGlDQUFpQyxFQUFFLENBQUMsQ0FBQTtJQUN2RixDQUFDO0FBQ0gsQ0FBQztBQUVELFNBQVMsU0FBUyxDQUFDLEdBQVc7SUFDNUIsT0FBTyxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUM7U0FDZixPQUFPLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQztTQUN0QixPQUFPLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQztTQUNyQixPQUFPLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQztTQUNyQixPQUFPLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQztTQUN4QixPQUFPLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFBO0FBQzVCLENBQUMifQ==