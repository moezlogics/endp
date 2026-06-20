"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildOrderCanceledEmail = buildOrderCanceledEmail;
const base_1 = require("./base");
/**
 * Order Canceled — Customer notification.
 * Sent when an order is canceled.
 */
function buildOrderCanceledEmail(data) {
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
      <div style="display:inline-block;background:#fef2f2;border-radius:50%;padding:12px;margin-bottom:12px;">
        <span style="font-size:28px;">✕</span>
      </div>
      <h1 style="margin:0;font-size:24px;font-weight:700;color:#1a1a1a;">Order Canceled</h1>
      <p style="margin:8px 0 0;font-size:14px;color:#6b7280;">Your order has been canceled.</p>
    </div>

    <div style="background:#fef2f2;border-radius:10px;padding:20px;margin-bottom:24px;border:1px solid #fecaca;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding:6px 0;font-size:13px;color:#6b7280;">Order Number</td>
          <td style="text-align:right;font-size:14px;font-weight:700;color:#1a1a1a;">#${orderId}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;font-size:13px;color:#6b7280;">Status</td>
          <td style="text-align:right;font-size:14px;font-weight:600;color:#dc2626;">Canceled</td>
        </tr>
      </table>
    </div>

    <p style="font-size:14px;color:#374151;line-height:1.6;margin:0 0 16px;">
      Hi ${customerName},<br/><br/>
      Your order <strong>#${orderId}</strong> has been canceled. If a payment was made, a refund will be processed to your original payment method.
    </p>

    <p style="font-size:14px;color:#374151;line-height:1.6;margin:0;">
      If you did not request this cancellation or have questions, please contact us.
    </p>
  `;
    return {
        subject: `Order #${orderId} Canceled — ${storeName}`,
        html: (0, base_1.baseLayout)({ storeName, logoUrl, copyright, theme, body }),
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItY2FuY2VsZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9lbWFpbC1ub3RpZmljYXRpb25zL3RlbXBsYXRlcy9vcmRlci1jYW5jZWxlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQU1BLDBEQXlEQztBQS9ERCxpQ0FBb0Q7QUFFcEQ7OztHQUdHO0FBQ0gsU0FBZ0IsdUJBQXVCLENBQUMsSUFBNkI7SUFJbkUsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQVksQ0FBQTtJQUMvQixNQUFNLFNBQVMsR0FDWixJQUFJLENBQUMsVUFBcUI7UUFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVO1FBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCO1FBQzdCLFNBQVMsQ0FBQTtJQUNYLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxRQUE4QixDQUFBO0lBQ25ELE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxTQUErQixDQUFBO0lBQ3RELE1BQU0sS0FBSyxHQUFJLElBQUksQ0FBQyxLQUFnQyxJQUFJLFNBQVMsQ0FBQTtJQUVqRSxNQUFNLE9BQU8sR0FBRyxLQUFLLEVBQUUsVUFBVSxJQUFJLEtBQUssRUFBRSxFQUFFLElBQUksS0FBSyxDQUFBO0lBRXZELE1BQU0sUUFBUSxHQUFHLEtBQUssRUFBRSxnQkFBZ0IsSUFBSSxFQUFFLENBQUE7SUFDOUMsTUFBTSxZQUFZLEdBQUcsQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxTQUFTLENBQUM7U0FDM0QsTUFBTSxDQUFDLE9BQU8sQ0FBQztTQUNmLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxVQUFVLENBQUE7SUFFMUIsTUFBTSxJQUFJLEdBQUc7Ozs7Ozs7Ozs7Ozs7d0ZBYXlFLE9BQU87Ozs7Ozs7Ozs7V0FVcEYsWUFBWTs0QkFDSyxPQUFPOzs7Ozs7R0FNaEMsQ0FBQTtJQUVELE9BQU87UUFDTCxPQUFPLEVBQUUsVUFBVSxPQUFPLGVBQWUsU0FBUyxFQUFFO1FBQ3BELElBQUksRUFBRSxJQUFBLGlCQUFVLEVBQUMsRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUM7S0FDakUsQ0FBQTtBQUNILENBQUMifQ==