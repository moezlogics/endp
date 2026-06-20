"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildContactReceivedEmail = buildContactReceivedEmail;
const base_1 = require("./base");
/**
 * Contact Form Received — Admin alert email.
 * Sent when someone submits the contact form on the storefront.
 */
function buildContactReceivedEmail(data) {
    const storeName = data.store_name ||
        process.env.STORE_NAME ||
        process.env.MEDUSA_STORE_NAME ||
        "Welcome";
    const logoUrl = data.logo_url;
    const copyright = data.copyright;
    const theme = data.theme || undefined;
    const name = data.name || "Unknown";
    const email = data.email || "N/A";
    const phone = data.phone || "—";
    const subject = data.subject || "No Subject";
    const message = data.message || "";
    const body = `
    <div style="text-align:center;margin-bottom:28px;">
      <div style="display:inline-block;background:#ede9fe;border-radius:50%;padding:12px;margin-bottom:12px;">
        <span style="font-size:28px;">✉️</span>
      </div>
      <h1 style="margin:0;font-size:24px;font-weight:700;color:#1a1a1a;">New Contact Message</h1>
      <p style="margin:8px 0 0;font-size:14px;color:#6b7280;">A visitor has sent a message via the contact form.</p>
    </div>

    <div style="background:#f9fafb;border-radius:10px;padding:20px;margin-bottom:24px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding:6px 0;font-size:13px;color:#6b7280;width:100px;">Name</td>
          <td style="padding:6px 0;font-size:14px;font-weight:600;color:#1a1a1a;">${name}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;font-size:13px;color:#6b7280;">Email</td>
          <td style="padding:6px 0;font-size:14px;color:#1a1a1a;">
            <a href="mailto:${email}" style="color:#2563eb;text-decoration:none;">${email}</a>
          </td>
        </tr>
        <tr>
          <td style="padding:6px 0;font-size:13px;color:#6b7280;">Phone</td>
          <td style="padding:6px 0;font-size:14px;color:#1a1a1a;">${phone}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;font-size:13px;color:#6b7280;">Subject</td>
          <td style="padding:6px 0;font-size:14px;color:#1a1a1a;">${subject}</td>
        </tr>
      </table>
    </div>

    <h2 style="margin:0 0 8px;font-size:15px;font-weight:600;color:#1a1a1a;">Message</h2>
    <div style="background:#ffffff;border:1px solid #e5e7eb;border-radius:10px;padding:16px;">
      <p style="margin:0;font-size:14px;color:#374151;line-height:1.7;white-space:pre-line;">${message}</p>
    </div>

    <div style="text-align:center;margin-top:24px;">
      <p style="font-size:13px;color:#9ca3af;margin:0;">
        Reply directly to <a href="mailto:${email}" style="color:#2563eb;">${email}</a> to respond.
      </p>
    </div>
  `;
    return {
        subject: `✉️ New Contact: "${subject}" from ${name}`,
        html: (0, base_1.baseLayout)({ storeName, logoUrl, copyright, theme, body }),
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGFjdC1yZWNlaXZlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2VtYWlsLW5vdGlmaWNhdGlvbnMvdGVtcGxhdGVzL2NvbnRhY3QtcmVjZWl2ZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFNQSw4REFtRUM7QUF6RUQsaUNBQW9EO0FBRXBEOzs7R0FHRztBQUNILFNBQWdCLHlCQUF5QixDQUFDLElBQTZCO0lBSXJFLE1BQU0sU0FBUyxHQUNaLElBQUksQ0FBQyxVQUFxQjtRQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVU7UUFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUI7UUFDN0IsU0FBUyxDQUFBO0lBQ1gsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQThCLENBQUE7SUFDbkQsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQStCLENBQUE7SUFDdEQsTUFBTSxLQUFLLEdBQUksSUFBSSxDQUFDLEtBQWdDLElBQUksU0FBUyxDQUFBO0lBRWpFLE1BQU0sSUFBSSxHQUFJLElBQUksQ0FBQyxJQUFlLElBQUksU0FBUyxDQUFBO0lBQy9DLE1BQU0sS0FBSyxHQUFJLElBQUksQ0FBQyxLQUFnQixJQUFJLEtBQUssQ0FBQTtJQUM3QyxNQUFNLEtBQUssR0FBSSxJQUFJLENBQUMsS0FBZ0IsSUFBSSxHQUFHLENBQUE7SUFDM0MsTUFBTSxPQUFPLEdBQUksSUFBSSxDQUFDLE9BQWtCLElBQUksWUFBWSxDQUFBO0lBQ3hELE1BQU0sT0FBTyxHQUFJLElBQUksQ0FBQyxPQUFrQixJQUFJLEVBQUUsQ0FBQTtJQUU5QyxNQUFNLElBQUksR0FBRzs7Ozs7Ozs7Ozs7OztvRkFhcUUsSUFBSTs7Ozs7OEJBSzFELEtBQUssaURBQWlELEtBQUs7Ozs7O29FQUtyQixLQUFLOzs7O29FQUlMLE9BQU87Ozs7Ozs7K0ZBT29CLE9BQU87Ozs7OzRDQUsxRCxLQUFLLDRCQUE0QixLQUFLOzs7R0FHL0UsQ0FBQTtJQUVELE9BQU87UUFDTCxPQUFPLEVBQUUsb0JBQW9CLE9BQU8sVUFBVSxJQUFJLEVBQUU7UUFDcEQsSUFBSSxFQUFFLElBQUEsaUJBQVUsRUFBQyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQztLQUNqRSxDQUFBO0FBQ0gsQ0FBQyJ9