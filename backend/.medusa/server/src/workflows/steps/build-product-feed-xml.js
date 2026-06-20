"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildProductFeedXmlStep = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
exports.buildProductFeedXmlStep = (0, workflows_sdk_1.createStep)("build-product-feed-xml", async (input) => {
    const escape = (str) => str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&apos;");
    const itemsXml = input.items.map((item) => {
        return (`<item>` +
            // Flags 
            `<enable_search>true</enable_search>` +
            `<enable_checkout>true</enable_checkout>` +
            // Product Variant Fields
            `<id>${escape(item.id)}</id>` +
            `<title>${escape(item.title)}</title>` +
            `<description>${escape(item.description)}</description>` +
            `<link>${escape(item.link)}</link>` +
            `<gtin>${escape(item.gtin || "")}</gtin>` +
            (item.image_link ? `<image_link>${escape(item.image_link)}</image_link>` : "") +
            (item.additional_image_link ? `<additional_image_link>${escape(item.additional_image_link)}</additional_image_link>` : "") +
            `<availability>${escape(item.availability)}</availability>` +
            `<inventory_quantity>${item.inventory_quantity}</inventory_quantity>` +
            `<price>${escape(item.price)}</price>` +
            (item.sale_price ? `<sale_price>${escape(item.sale_price)}</sale_price>` : "") +
            `<condition>${escape(item.condition || "new")}</condition>` +
            `<product_category>${escape(item.product_category || "")}</product_category>` +
            `<brand>${escape(item.brand || "Medusa")}</brand>` +
            `<material>${escape(item.material || "")}</material>` +
            `<weight>${escape(item.weight || "")}</weight>` +
            `<item_group_id>${escape(item.item_group_id)}</item_group_id>` +
            `<item_group_title>${escape(item.item_group_title)}</item_group_title>` +
            `<size>${escape(item.size || "")}</size>` +
            `<color>${escape(item.color || "")}</color>` +
            `<seller_name>${escape(item.seller_name)}</seller_name>` +
            `<seller_url>${escape(item.seller_url)}</seller_url>` +
            `<seller_privacy_policy>${escape(item.seller_privacy_policy)}</seller_privacy_policy>` +
            `<seller_tos>${escape(item.seller_tos)}</seller_tos>` +
            `<return_policy>${escape(item.return_policy)}</return_policy>` +
            `<return_window>${item.return_window}</return_window>` +
            `</item>`);
    }).join("");
    const xml = `<?xml version="1.0" encoding="UTF-8"?>` +
        `<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">` +
        `<channel>` +
        `<title>Product Feed</title>` +
        `<description>Product Feed for Agentic Commerce</description>` +
        itemsXml +
        `</channel>` +
        `</rss>`;
    return new workflows_sdk_1.StepResponse(xml);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGQtcHJvZHVjdC1mZWVkLXhtbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy93b3JrZmxvd3Mvc3RlcHMvYnVpbGQtcHJvZHVjdC1mZWVkLXhtbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxRUFBNEU7QUFPL0QsUUFBQSx1QkFBdUIsR0FBRyxJQUFBLDBCQUFVLEVBQy9DLHdCQUF3QixFQUN4QixLQUFLLEVBQUUsS0FBZ0IsRUFBRSxFQUFFO0lBQ3pCLE1BQU0sTUFBTSxHQUFHLENBQUMsR0FBVyxFQUFFLEVBQUUsQ0FDN0IsR0FBRztTQUNBLE9BQU8sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDO1NBQ3RCLE9BQU8sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDO1NBQ3JCLE9BQU8sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDO1NBQ3JCLE9BQU8sQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDO1NBQ3hCLE9BQU8sQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFFNUIsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUN4QyxPQUFPLENBQ0wsUUFBUTtZQUNOLFNBQVM7WUFDVCxxQ0FBcUM7WUFDckMseUNBQXlDO1lBQ3pDLHlCQUF5QjtZQUN6QixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU87WUFDN0IsVUFBVSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVO1lBQ3RDLGdCQUFnQixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0I7WUFDeEQsU0FBUyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTO1lBQ25DLFNBQVMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLFNBQVM7WUFDekMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxlQUFlLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQzlFLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQywwQkFBMEIsTUFBTSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQzFILGlCQUFpQixNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxpQkFBaUI7WUFDM0QsdUJBQXVCLElBQUksQ0FBQyxrQkFBa0IsdUJBQXVCO1lBQ3JFLFVBQVUsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVTtZQUN0QyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLGVBQWUsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDOUUsY0FBYyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxLQUFLLENBQUMsY0FBYztZQUMzRCxxQkFBcUIsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxFQUFFLENBQUMscUJBQXFCO1lBQzdFLFVBQVUsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksUUFBUSxDQUFDLFVBQVU7WUFDbEQsYUFBYSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUMsYUFBYTtZQUNyRCxXQUFXLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQyxXQUFXO1lBQy9DLGtCQUFrQixNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0I7WUFDOUQscUJBQXFCLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMscUJBQXFCO1lBQ3ZFLFNBQVMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLFNBQVM7WUFDekMsVUFBVSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUMsVUFBVTtZQUM1QyxnQkFBZ0IsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsZ0JBQWdCO1lBQ3hELGVBQWUsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZTtZQUNyRCwwQkFBMEIsTUFBTSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQywwQkFBMEI7WUFDdEYsZUFBZSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlO1lBQ3JELGtCQUFrQixNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0I7WUFDOUQsa0JBQWtCLElBQUksQ0FBQyxhQUFhLGtCQUFrQjtZQUN4RCxTQUFTLENBQ1YsQ0FBQTtJQUNILENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUVYLE1BQU0sR0FBRyxHQUNQLHdDQUF3QztRQUN4Qyw2REFBNkQ7UUFDM0QsV0FBVztRQUNULDZCQUE2QjtRQUM3Qiw4REFBOEQ7UUFDOUQsUUFBUTtRQUNWLFlBQVk7UUFDZCxRQUFRLENBQUE7SUFFVixPQUFPLElBQUksNEJBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUM5QixDQUFDLENBQ0YsQ0FBQSJ9