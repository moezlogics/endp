"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildOrderPlacedEmail = buildOrderPlacedEmail;
const base_1 = require("./base");
/**
 * Order Placed — Customer confirmation email.
 * Sent when a new order is placed.
 */
function buildOrderPlacedEmail(data) {
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
    const items = order?.items || [];
    const total = order?.total ?? 0;
    const subtotal = order?.subtotal ?? 0;
    const shippingTotal = order?.shipping_total ?? 0;
    const taxTotal = order?.tax_total ?? 0;
    const shipping = order?.shipping_address || {};
    const addressLines = [
        shipping.first_name && shipping.last_name
            ? `${shipping.first_name} ${shipping.last_name}`
            : "",
        shipping.address_1 || "",
        shipping.address_2 || "",
        [shipping.city, shipping.province, shipping.postal_code]
            .filter(Boolean)
            .join(", "),
        shipping.country_code?.toUpperCase() || "",
    ]
        .filter(Boolean)
        .join("<br/>");
    const itemRows = items
        .map((item) => `
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #f3f4f6;">
          <div style="display:flex;align-items:center;gap:12px;">
            ${item.thumbnail
        ? `<img src="${item.thumbnail}" alt="${item.title}" style="width:56px;height:56px;object-fit:cover;border-radius:8px;border:1px solid #e5e7eb;" />`
        : ""}
            <div>
              <p style="margin:0;font-size:14px;font-weight:600;color:#1a1a1a;">${item.title || "Product"}</p>
              ${item.variant?.title ? `<p style="margin:2px 0 0;font-size:12px;color:#6b7280;">${item.variant.title}</p>` : ""}
              <p style="margin:2px 0 0;font-size:12px;color:#9ca3af;">Qty: ${item.quantity || 1}</p>
            </div>
          </div>
        </td>
        <td style="padding:12px 0;border-bottom:1px solid #f3f4f6;text-align:right;font-size:14px;font-weight:600;color:#1a1a1a;">
          ${(0, base_1.formatMoney)((item.unit_price || 0) * (item.quantity || 1), currency)}
        </td>
      </tr>`)
        .join("");
    const body = `
    <div style="text-align:center;margin-bottom:28px;">
      <div style="display:inline-block;background:#ecfdf5;border-radius:50%;padding:12px;margin-bottom:12px;">
        <span style="font-size:28px;">✓</span>
      </div>
      <h1 style="margin:0;font-size:24px;font-weight:700;color:#1a1a1a;">Order Confirmed!</h1>
      <p style="margin:8px 0 0;font-size:14px;color:#6b7280;">Thank you for your order. We'll send you a shipping confirmation once it ships.</p>
    </div>

    <div style="background:#f9fafb;border-radius:10px;padding:16px 20px;margin-bottom:24px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="font-size:13px;color:#6b7280;">Order Number</td>
          <td style="text-align:right;font-size:14px;font-weight:700;color:#1a1a1a;">#${orderId}</td>
        </tr>
      </table>
    </div>

    <h2 style="margin:0 0 12px;font-size:16px;font-weight:600;color:#1a1a1a;">Items Ordered</h2>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${itemRows}
    </table>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px;">
      <tr>
        <td style="padding:4px 0;font-size:13px;color:#6b7280;">Subtotal</td>
        <td style="text-align:right;font-size:13px;color:#1a1a1a;">${(0, base_1.formatMoney)(subtotal, currency)}</td>
      </tr>
      <tr>
        <td style="padding:4px 0;font-size:13px;color:#6b7280;">Shipping</td>
        <td style="text-align:right;font-size:13px;color:#1a1a1a;">${(0, base_1.formatMoney)(shippingTotal, currency)}</td>
      </tr>
      ${taxTotal > 0
        ? `<tr>
              <td style="padding:4px 0;font-size:13px;color:#6b7280;">Tax</td>
              <td style="text-align:right;font-size:13px;color:#1a1a1a;">${(0, base_1.formatMoney)(taxTotal, currency)}</td>
            </tr>`
        : ""}
      <tr>
        <td style="padding:12px 0 0;font-size:16px;font-weight:700;color:#1a1a1a;border-top:2px solid #1a1a1a;">Total</td>
        <td style="padding:12px 0 0;text-align:right;font-size:16px;font-weight:700;color:#1a1a1a;border-top:2px solid #1a1a1a;">${(0, base_1.formatMoney)(total, currency)}</td>
      </tr>
    </table>

    ${addressLines
        ? `
    <div style="margin-top:28px;">
      <h2 style="margin:0 0 8px;font-size:16px;font-weight:600;color:#1a1a1a;">Shipping Address</h2>
      <p style="margin:0;font-size:13px;color:#6b7280;line-height:1.6;">${addressLines}</p>
    </div>`
        : ""}
  `;
    return {
        subject: `Order #${orderId} Confirmed — ${storeName}`,
        html: (0, base_1.baseLayout)({ storeName, logoUrl, copyright, theme, body }),
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItcGxhY2VkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvZW1haWwtbm90aWZpY2F0aW9ucy90ZW1wbGF0ZXMvb3JkZXItcGxhY2VkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBTUEsc0RBMkhDO0FBaklELGlDQUFpRTtBQUVqRTs7O0dBR0c7QUFDSCxTQUFnQixxQkFBcUIsQ0FBQyxJQUE2QjtJQUlqRSxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBWSxDQUFBO0lBQy9CLE1BQU0sU0FBUyxHQUNaLElBQUksQ0FBQyxVQUFxQjtRQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVU7UUFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUI7UUFDN0IsU0FBUyxDQUFBO0lBQ1gsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQThCLENBQUE7SUFDbkQsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQStCLENBQUE7SUFDdEQsTUFBTSxLQUFLLEdBQUksSUFBSSxDQUFDLEtBQWdDLElBQUksU0FBUyxDQUFBO0lBRWpFLE1BQU0sT0FBTyxHQUFHLEtBQUssRUFBRSxVQUFVLElBQUksS0FBSyxFQUFFLEVBQUUsSUFBSSxLQUFLLENBQUE7SUFDdkQsTUFBTSxRQUFRLEdBQUcsS0FBSyxFQUFFLGFBQWEsSUFBSSxLQUFLLENBQUE7SUFDOUMsTUFBTSxLQUFLLEdBQUcsS0FBSyxFQUFFLEtBQUssSUFBSSxFQUFFLENBQUE7SUFDaEMsTUFBTSxLQUFLLEdBQUcsS0FBSyxFQUFFLEtBQUssSUFBSSxDQUFDLENBQUE7SUFDL0IsTUFBTSxRQUFRLEdBQUcsS0FBSyxFQUFFLFFBQVEsSUFBSSxDQUFDLENBQUE7SUFDckMsTUFBTSxhQUFhLEdBQUcsS0FBSyxFQUFFLGNBQWMsSUFBSSxDQUFDLENBQUE7SUFDaEQsTUFBTSxRQUFRLEdBQUcsS0FBSyxFQUFFLFNBQVMsSUFBSSxDQUFD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