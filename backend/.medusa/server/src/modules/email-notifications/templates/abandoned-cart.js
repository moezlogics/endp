"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildAbandonedCartEmail = buildAbandonedCartEmail;
const base_1 = require("./base");
/**
 * Abandoned Cart Email Template
 *
 * Sent to customers who have items in their cart but haven't completed checkout.
 */
function buildAbandonedCartEmail(data) {
    const firstName = data.first_name || "there";
    const items = data.items || [];
    const cartUrl = data.cart_url || "#";
    const storeName = data.store_name ||
        process.env.STORE_NAME ||
        process.env.MEDUSA_STORE_NAME ||
        "Welcome";
    const logoUrl = data.logo_url;
    const copyright = data.copyright;
    const theme = data.theme || undefined;
    const itemsHtml = items
        .slice(0, 5)
        .map((item) => `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #f3f4f6;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td width="60" style="vertical-align:top;">
              ${item.thumbnail
        ? `<img src="${item.thumbnail}" alt="${item.title}" style="width:56px;height:56px;object-fit:cover;border-radius:8px;" />`
        : `<div style="width:56px;height:56px;background:#f3f4f6;border-radius:8px;"></div>`}
            </td>
            <td style="padding-left:12px;vertical-align:top;">
              <p style="margin:0;font-size:14px;font-weight:600;color:#111827;">${item.title || "Product"}</p>
              <p style="margin:4px 0 0;font-size:13px;color:#6b7280;">Qty: ${item.quantity || 1}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `)
        .join("");
    const body = `
    <h2 style="margin:0 0 16px;font-size:22px;font-weight:700;color:#111827;">
      You left something behind! 🛒
    </h2>
    <p style="margin:0 0 20px;font-size:15px;color:#4b5563;line-height:1.6;">
      Hi ${firstName}, it looks like you left some items in your cart. Don't worry — they're still waiting for you!
    </p>

    ${items.length > 0
        ? `
    <div style="background:#f9fafb;border-radius:12px;padding:16px;margin:20px 0;">
      <table width="100%" cellpadding="0" cellspacing="0">
        ${itemsHtml}
      </table>
      ${items.length > 5 ? `<p style="margin:12px 0 0;font-size:13px;color:#9ca3af;text-align:center;">and ${items.length - 5} more items...</p>` : ""}
    </div>
    `
        : ""}

    <div style="text-align:center;margin:24px 0;">
      <a href="${cartUrl}" style="display:inline-block;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:8px;font-weight:600;font-size:15px;">
        Complete Your Purchase →
      </a>
    </div>

    <p style="margin:24px 0 0;font-size:13px;color:#9ca3af;text-align:center;">
      Need help? Reply to this email and we'll be happy to assist.
    </p>
  `;
    return {
        subject: `${firstName}, you forgot something! 🛒`,
        html: (0, base_1.baseLayout)({
            storeName,
            logoUrl,
            copyright,
            theme,
            body,
        }),
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJhbmRvbmVkLWNhcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9lbWFpbC1ub3RpZmljYXRpb25zL3RlbXBsYXRlcy9hYmFuZG9uZWQtY2FydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQU9BLDBEQXFGQztBQTVGRCxpQ0FBb0Q7QUFFcEQ7Ozs7R0FJRztBQUNILFNBQWdCLHVCQUF1QixDQUFDLElBQTZCO0lBSW5FLE1BQU0sU0FBUyxHQUFJLElBQUksQ0FBQyxVQUFxQixJQUFJLE9BQU8sQ0FBQTtJQUN4RCxNQUFNLEtBQUssR0FBSSxJQUFJLENBQUMsS0FBZSxJQUFJLEVBQUUsQ0FBQTtJQUN6QyxNQUFNLE9BQU8sR0FBSSxJQUFJLENBQUMsUUFBbUIsSUFBSSxHQUFHLENBQUE7SUFDaEQsTUFBTSxTQUFTLEdBQ1osSUFBSSxDQUFDLFVBQXFCO1FBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVTtRQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQjtRQUM3QixTQUFTLENBQUE7SUFDWCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBOEIsQ0FBQTtJQUNuRCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBK0IsQ0FBQTtJQUN0RCxNQUFNLEtBQUssR0FBSSxJQUFJLENBQUMsS0FBZ0MsSUFBSSxTQUFTLENBQUE7SUFFakUsTUFBTSxTQUFTLEdBQUcsS0FBSztTQUNwQixLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNYLEdBQUcsQ0FDRixDQUFDLElBQVMsRUFBRSxFQUFFLENBQUM7Ozs7OztnQkFPTCxJQUFJLENBQUMsU0FBUztRQUNaLENBQUMsQ0FBQyxhQUFhLElBQUksQ0FBQyxTQUFTLFVBQVUsSUFBSSxDQUFDLEtBQUsseUVBQXlFO1FBQzFILENBQUMsQ0FBQyxrRkFDTjs7O2tGQUdvRSxJQUFJLENBQUMsS0FBSyxJQUFJLFNBQVM7NkVBQzVCLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQzs7Ozs7O0dBTTVGLENBQ0U7U0FDQSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7SUFFWCxNQUFNLElBQUksR0FBRzs7Ozs7V0FLSixTQUFTOzs7TUFJZCxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUM7UUFDZCxDQUFDLENBQUM7OztVQUdBLFNBQVM7O1FBRVgsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLGtGQUFrRixLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLEVBQUU7O0tBRWpKO1FBQ0csQ0FBQyxDQUFDLEVBQ047OztpQkFHYSxPQUFPOzs7Ozs7OztHQVFyQixDQUFBO0lBRUQsT0FBTztRQUNMLE9BQU8sRUFBRSxHQUFHLFNBQVMsNEJBQTRCO1FBQ2pELElBQUksRUFBRSxJQUFBLGlCQUFVLEVBQUM7WUFDZixTQUFTO1lBQ1QsT0FBTztZQUNQLFNBQVM7WUFDVCxLQUFLO1lBQ0wsSUFBSTtTQUNMLENBQUM7S0FDSCxDQUFBO0FBQ0gsQ0FBQyJ9