"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildOrderShippedEmail = buildOrderShippedEmail;
const base_1 = require("./base");
/**
 * Order Shipped — Customer notification.
 * Sent when a fulfillment is created for an order.
 */
function buildOrderShippedEmail(data) {
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
      <div style="display:inline-block;background:#dbeafe;border-radius:50%;padding:12px;margin-bottom:12px;">
        <span style="font-size:28px;">📦</span>
      </div>
      <h1 style="margin:0;font-size:24px;font-weight:700;color:#1a1a1a;">Your Order Has Shipped!</h1>
      <p style="margin:8px 0 0;font-size:14px;color:#6b7280;">Great news — your order is on its way.</p>
    </div>

    <div style="background:#f0f9ff;border-radius:10px;padding:20px;margin-bottom:24px;border:1px solid #bae6fd;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding:6px 0;font-size:13px;color:#6b7280;">Order Number</td>
          <td style="text-align:right;font-size:14px;font-weight:700;color:#1a1a1a;">#${orderId}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;font-size:13px;color:#6b7280;">Status</td>
          <td style="text-align:right;font-size:14px;font-weight:600;color:#2563eb;">Shipped</td>
        </tr>
      </table>
    </div>

    <p style="font-size:14px;color:#374151;line-height:1.6;margin:0 0 16px;">
      Hi ${customerName},<br/><br/>
      Your order <strong>#${orderId}</strong> has been packed and shipped. You should receive it soon.
    </p>

    <p style="font-size:14px;color:#374151;line-height:1.6;margin:0;">
      If you have any questions about your delivery, feel free to contact us by replying to this email or visiting our contact page.
    </p>
  `;
    return {
        subject: `📦 Order #${orderId} Shipped — ${storeName}`,
        html: (0, base_1.baseLayout)({ storeName, logoUrl, copyright, theme, body }),
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItc2hpcHBlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2VtYWlsLW5vdGlmaWNhdGlvbnMvdGVtcGxhdGVzL29yZGVyLXNoaXBwZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFNQSx3REF5REM7QUEvREQsaUNBQW9EO0FBRXBEOzs7R0FHRztBQUNILFNBQWdCLHNCQUFzQixDQUFDLElBQTZCO0lBSWxFLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFZLENBQUE7SUFDL0IsTUFBTSxTQUFTLEdBQ1osSUFBSSxDQUFDLFVBQXFCO1FBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVTtRQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQjtRQUM3QixTQUFTLENBQUE7SUFDWCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBOEIsQ0FBQTtJQUNuRCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBK0IsQ0FBQTtJQUN0RCxNQUFNLEtBQUssR0FBSSxJQUFJLENBQUMsS0FBZ0MsSUFBSSxTQUFTLENBQUE7SUFFakUsTUFBTSxPQUFPLEdBQUcsS0FBSyxFQUFFLFVBQVUsSUFBSSxLQUFLLEVBQUUsRUFBRSxJQUFJLEtBQUssQ0FBQTtJQUV2RCxNQUFNLFFBQVEsR0FBRyxLQUFLLEVBQUUsZ0JBQWdCLElBQUksRUFBRSxDQUFBO0lBQzlDLE1BQU0sWUFBWSxHQUFHLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsU0FBUyxDQUFDO1NBQzNELE1BQU0sQ0FBQyxPQUFPLENBQUM7U0FDZixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksVUFBVSxDQUFBO0lBRTFCLE1BQU0sSUFBSSxHQUFHOzs7Ozs7Ozs7Ozs7O3dGQWF5RSxPQUFPOzs7Ozs7Ozs7O1dBVXBGLFlBQVk7NEJBQ0ssT0FBTzs7Ozs7O0dBTWhDLENBQUE7SUFFRCxPQUFPO1FBQ0wsT0FBTyxFQUFFLGFBQWEsT0FBTyxjQUFjLFNBQVMsRUFBRTtRQUN0RCxJQUFJLEVBQUUsSUFBQSxpQkFBVSxFQUFDLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDO0tBQ2pFLENBQUE7QUFDSCxDQUFDIn0=