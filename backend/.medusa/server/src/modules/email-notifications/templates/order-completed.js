"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildOrderCompletedEmail = buildOrderCompletedEmail;
const base_1 = require("./base");
/**
 * Order Completed — Customer thank-you email.
 * Sent when an order is marked as completed.
 */
function buildOrderCompletedEmail(data) {
    const order = data.order;
    const storeName = data.store_name ||
        process.env.STORE_NAME ||
        process.env.MEDUSA_STORE_NAME ||
        "Welcome";
    const logoUrl = data.logo_url;
    const copyright = data.copyright;
    const theme = data.theme || undefined;
    const orderId = order?.display_id || order?.id || "N/A";
    const shipping = order?.shipping_address || {};
    const customerName = [shipping.first_name, shipping.last_name]
        .filter(Boolean)
        .join(" ") || "Customer";
    const body = `
    <div style="text-align:center;margin-bottom:28px;">
      <div style="display:inline-block;background:#ecfdf5;border-radius:50%;padding:12px;margin-bottom:12px;">
        <span style="font-size:28px;">🎉</span>
      </div>
      <h1 style="margin:0;font-size:24px;font-weight:700;color:#1a1a1a;">Order Complete!</h1>
      <p style="margin:8px 0 0;font-size:14px;color:#6b7280;">Your order has been successfully delivered.</p>
    </div>

    <div style="background:#ecfdf5;border-radius:10px;padding:20px;margin-bottom:24px;border:1px solid #a7f3d0;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding:6px 0;font-size:13px;color:#6b7280;">Order Number</td>
          <td style="text-align:right;font-size:14px;font-weight:700;color:#1a1a1a;">#${orderId}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;font-size:13px;color:#6b7280;">Status</td>
          <td style="text-align:right;font-size:14px;font-weight:600;color:#059669;">Completed</td>
        </tr>
      </table>
    </div>

    <p style="font-size:14px;color:#374151;line-height:1.6;margin:0 0 16px;">
      Hi ${customerName},<br/><br/>
      Your order <strong>#${orderId}</strong> is now complete. We hope you love your purchase!
    </p>

    <p style="font-size:14px;color:#374151;line-height:1.6;margin:0;">
      We'd love to hear how your experience was. Visit the product page to leave a review and help other shoppers.
    </p>

    <div style="text-align:center;margin-top:24px;">
      <p style="font-size:14px;color:#6b7280;margin:0;">
        Thank you for choosing <strong>${storeName}</strong>. Happy shopping! 🛍️
      </p>
    </div>
  `;
    return {
        subject: `🎉 Order #${orderId} Complete — Thank You! — ${storeName}`,
        html: (0, base_1.baseLayout)({ storeName, logoUrl, copyright, theme, body }),
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItY29tcGxldGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvZW1haWwtbm90aWZpY2F0aW9ucy90ZW1wbGF0ZXMvb3JkZXItY29tcGxldGVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBTUEsNERBK0RDO0FBckVELGlDQUFvRDtBQUVwRDs7O0dBR0c7QUFDSCxTQUFnQix3QkFBd0IsQ0FBQyxJQUE2QjtJQUlwRSxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBWSxDQUFBO0lBQy9CLE1BQU0sU0FBUyxHQUNaLElBQUksQ0FBQyxVQUFxQjtRQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVU7UUFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUI7UUFDN0IsU0FBUyxDQUFBO0lBQ1gsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQThCLENBQUE7SUFDbkQsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQStCLENBQUE7SUFDdEQsTUFBTSxLQUFLLEdBQUksSUFBSSxDQUFDLEtBQWdDLElBQUksU0FBUyxDQUFBO0lBRWpFLE1BQU0sT0FBTyxHQUFHLEtBQUssRUFBRSxVQUFVLElBQUksS0FBSyxFQUFFLEVBQUUsSUFBSSxLQUFLLENBQUE7SUFFdkQsTUFBTSxRQUFRLEdBQUcsS0FBSyxFQUFFLGdCQUFnQixJQUFJLEVBQUUsQ0FBQTtJQUM5QyxNQUFNLFlBQVksR0FBRyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLFNBQVMsQ0FBQztTQUMzRCxNQUFNLENBQUMsT0FBTyxDQUFDO1NBQ2YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLFVBQVUsQ0FBQTtJQUUxQixNQUFNLElBQUksR0FBRzs7Ozs7Ozs7Ozs7Ozt3RkFheUUsT0FBTzs7Ozs7Ozs7OztXQVVwRixZQUFZOzRCQUNLLE9BQU87Ozs7Ozs7Ozt5Q0FTTSxTQUFTOzs7R0FHL0MsQ0FBQTtJQUVELE9BQU87UUFDTCxPQUFPLEVBQUUsYUFBYSxPQUFPLDRCQUE0QixTQUFTLEVBQUU7UUFDcEUsSUFBSSxFQUFFLElBQUEsaUJBQVUsRUFBQyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQztLQUNqRSxDQUFBO0FBQ0gsQ0FBQyJ9