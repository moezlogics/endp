"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildOrderPlacedAdminEmail = buildOrderPlacedAdminEmail;
const base_1 = require("./base");
/**
 * Order Placed — Admin notification email.
 * Alerts the admin when a new order comes in.
 */
function buildOrderPlacedAdminEmail(data) {
    const order = data.order;
    const storeName = data.store_name ||
        process.env.STORE_NAME ||
        process.env.MEDUSA_STORE_NAME ||
        "Welcome";
    const logoUrl = data.logo_url;
    const copyright = data.copyright;
    const theme = data.theme || undefined;
    const orderId = order?.display_id || order?.id || "N/A";
    const currency = order?.currency_code || "usd";
    const total = order?.total ?? 0;
    const itemCount = (order?.items || []).length;
    const customerEmail = order?.email || "N/A";
    const customerName = order?.shipping_address
        ? `${order.shipping_address.first_name || ""} ${order.shipping_address.last_name || ""}`.trim()
        : "Guest";
    const items = order?.items || [];
    const itemSummary = items
        .map((item) => `<li style="margin:4px 0;font-size:13px;color:#374151;">${item.title || "Product"} × ${item.quantity || 1} — ${(0, base_1.formatMoney)((item.unit_price || 0) * (item.quantity || 1), currency)}</li>`)
        .join("");
    const body = `
    <div style="text-align:center;margin-bottom:24px;">
      <div style="display:inline-block;background:#fef3c7;border-radius:50%;padding:12px;margin-bottom:12px;">
        <span style="font-size:28px;">🛒</span>
      </div>
      <h1 style="margin:0;font-size:24px;font-weight:700;color:#1a1a1a;">New Order Received!</h1>
      <p style="margin:8px 0 0;font-size:14px;color:#6b7280;">A new order has been placed on your store.</p>
    </div>

    <div style="background:#f9fafb;border-radius:10px;padding:20px;margin-bottom:24px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding:6px 0;font-size:13px;color:#6b7280;">Order Number</td>
          <td style="text-align:right;font-size:14px;font-weight:700;color:#1a1a1a;">#${orderId}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;font-size:13px;color:#6b7280;">Customer</td>
          <td style="text-align:right;font-size:14px;color:#1a1a1a;">${customerName}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;font-size:13px;color:#6b7280;">Email</td>
          <td style="text-align:right;font-size:14px;color:#1a1a1a;">${customerEmail}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;font-size:13px;color:#6b7280;">Items</td>
          <td style="text-align:right;font-size:14px;color:#1a1a1a;">${itemCount} item${itemCount !== 1 ? "s" : ""}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;font-size:13px;color:#6b7280;border-top:1px solid #e5e7eb;padding-top:10px;">Total</td>
          <td style="text-align:right;font-size:18px;font-weight:700;color:#1a1a1a;border-top:1px solid #e5e7eb;padding-top:10px;">${(0, base_1.formatMoney)(total, currency)}</td>
        </tr>
      </table>
    </div>

    <h2 style="margin:0 0 8px;font-size:15px;font-weight:600;color:#1a1a1a;">Order Items</h2>
    <ul style="padding-left:20px;margin:0 0 20px;">${itemSummary}</ul>

    <div style="text-align:center;">
      <p style="margin:0;font-size:13px;color:#6b7280;">
        Log in to the Medusa Admin to manage this order.
      </p>
    </div>
  `;
    return {
        subject: `🛒 New Order #${orderId} — ${(0, base_1.formatMoney)(total, currency)} from ${customerName}`,
        html: (0, base_1.baseLayout)({ storeName, logoUrl, copyright, theme, body }),
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItcGxhY2VkLWFkbWluLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvZW1haWwtbm90aWZpY2F0aW9ucy90ZW1wbGF0ZXMvb3JkZXItcGxhY2VkLWFkbWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBTUEsZ0VBK0VDO0FBckZELGlDQUFpRTtBQUVqRTs7O0dBR0c7QUFDSCxTQUFnQiwwQkFBMEIsQ0FBQyxJQUE2QjtJQUl0RSxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBWSxDQUFBO0lBQy9CLE1BQU0sU0FBUyxHQUNaLElBQUksQ0FBQyxVQUFxQjtRQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVU7UUFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUI7UUFDN0IsU0FBUyxDQUFBO0lBQ1gsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQThCLENBQUE7SUFDbkQsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQStCLENBQUE7SUFDdEQsTUFBTSxLQUFLLEdBQUksSUFBSSxDQUFDLEtBQWdDLElBQUksU0FBUyxDQUFBO0lBRWpFLE1BQU0sT0FBTyxHQUFHLEtBQUssRUFBRSxVQUFVLElBQUksS0FBSyxFQUFFLEVBQUUsSUFBSSxLQUFLLENBQUE7SUFDdkQsTUFBTSxRQUFRLEdBQUcsS0FBSyxFQUFFLGFBQWEsSUFBSSxLQUFLLENBQUE7SUFDOUMsTUFBTSxLQUFLLEdBQUcsS0FBSyxFQUFFLEtBQUssSUFBSSxDQUFDLENBQUE7SUFDL0IsTUFBTSxTQUFTLEdBQUcsQ0FBQyxLQUFLLEVBQUUsS0FBSyxJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQTtJQUM3QyxNQUFNLGFBQWEsR0FBRyxLQUFLLEVBQUUsS0FBSyxJQUFJLEtBQUssQ0FBQTtJQUMzQyxNQUFNLFlBQVksR0FBRyxLQUFLLEVBQUUsZ0JBQWdCO1FBQzFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLElBQUksRUFBRSxJQUFJLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxFQUFFO1FBQy9GLENBQUMsQ0FBQyxPQUFPLENBQUE7SUFFWCxNQUFNLEtBQUssR0FBRyxLQUFLLEVBQUUsS0FBSyxJQUFJLEVBQUUsQ0FBQTtJQUNoQyxNQUFNLFdBQVcsR0FBRyxLQUFLO1NBQ3RCLEdBQUcsQ0FDRixDQUFDLElBQVMsRUFBRSxFQUFFLENBQ1osMERBQTBELElBQUksQ0FBQyxLQUFLLElBQUksU0FBUyxNQUFNLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxNQUFNLElBQUEsa0JBQVcsRUFBQyxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxPQUFPLENBQzdMO1NBQ0EsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBRVgsTUFBTSxJQUFJLEdBQUc7Ozs7Ozs7Ozs7Ozs7d0ZBYXlFLE9BQU87Ozs7dUVBSXhCLFlBQVk7Ozs7dUVBSVosYUFBYTs7Ozt1RUFJYixTQUFTLFFBQVEsU0FBUyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFOzs7O3FJQUltQixJQUFBLGtCQUFXLEVBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQzs7Ozs7O3FEQU01RyxXQUFXOzs7Ozs7O0dBTzdELENBQUE7SUFFRCxPQUFPO1FBQ0wsT0FBTyxFQUFFLGlCQUFpQixPQUFPLE1BQU0sSUFBQSxrQkFBVyxFQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsU0FBUyxZQUFZLEVBQUU7UUFDMUYsSUFBSSxFQUFFLElBQUEsaUJBQVUsRUFBQyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQztLQUNqRSxDQUFBO0FBQ0gsQ0FBQyJ9