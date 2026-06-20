"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveTheme = resolveTheme;
exports.baseLayout = baseLayout;
exports.formatMoney = formatMoney;
exports.formatDate = formatDate;
const FALLBACK_THEME = {
    headerBg: "#1a1a1a",
    headerFg: "#ffffff",
    primary: "#1f1f1f",
    primaryFg: "#ffffff",
    accent: "#d2ef9a",
    bodyBg: "#ffffff",
};
function resolveTheme(t) {
    return {
        headerBg: t?.headerBg || FALLBACK_THEME.headerBg,
        headerFg: t?.headerFg || FALLBACK_THEME.headerFg,
        primary: t?.primary || FALLBACK_THEME.primary,
        primaryFg: t?.primaryFg || FALLBACK_THEME.primaryFg,
        accent: t?.accent || FALLBACK_THEME.accent,
        bodyBg: t?.bodyBg || FALLBACK_THEME.bodyBg,
    };
}
/**
 * Base HTML email layout — themed to match the storefront.
 *
 * Design:
 *   - Header band painted in `theme.headerBg` with logo/store name in
 *     `theme.headerFg` so a dark header keeps light text legible (and
 *     vice-versa).
 *   - Clean body with content slot.
 *   - 4-pixel accent strip between header and body painted with the
 *     site's `primary` so every email carries the brand stripe.
 *   - Light gray footer with copyright + auto-message disclaimer.
 *
 * All CSS is inlined for maximum email client compatibility.
 */
function baseLayout(opts) {
    const { storeName, logoUrl, copyright, body } = opts;
    const t = resolveTheme(opts.theme);
    const year = new Date().getFullYear();
    const footerCopy = copyright || `© ${year} ${storeName}. All rights reserved.`;
    const logoBlock = logoUrl
        ? `<img src="${logoUrl}" alt="${storeName}" style="height:32px;width:auto;object-fit:contain;" />`
        : `<span style="font-size:22px;font-weight:700;letter-spacing:-0.5px;color:${t.headerFg};">${storeName}</span>`;
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${storeName}</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;">
    <tr>
      <td align="center" style="padding:24px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:${t.headerBg};padding:20px 32px;border-radius:12px 12px 0 0;text-align:center;">
              ${logoBlock}
            </td>
          </tr>

          <!-- Brand accent strip -->
          <tr>
            <td style="height:4px;line-height:4px;font-size:0;background:linear-gradient(90deg, ${t.primary} 0%, ${t.accent} 50%, ${t.primary} 100%);">&nbsp;</td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:${t.bodyBg};padding:32px;border-left:1px solid #e5e7eb;border-right:1px solid #e5e7eb;">
              ${body}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#fafafa;padding:24px 32px;border-radius:0 0 12px 12px;border:1px solid #e5e7eb;border-top:none;text-align:center;">
              <p style="margin:0;font-size:12px;color:#9ca3af;line-height:1.6;">
                ${footerCopy}
              </p>
              <p style="margin:8px 0 0;font-size:11px;color:#d1d5db;">
                This is an automated message. Please do not reply directly.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
/** Format currency amount for email display */
function formatMoney(amount, currencyCode) {
    try {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currencyCode.toUpperCase(),
        }).format(amount);
    }
    catch {
        return `${currencyCode.toUpperCase()} ${amount.toFixed(2)}`;
    }
}
/** Format date for email display */
function formatDate(dateStr) {
    try {
        return new Date(dateStr).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    }
    catch {
        return dateStr;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2VtYWlsLW5vdGlmaWNhdGlvbnMvdGVtcGxhdGVzL2Jhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFrQ0Esb0NBU0M7QUFnQkQsZ0NBbUVDO0FBR0Qsa0NBU0M7QUFHRCxnQ0FVQztBQTlIRCxNQUFNLGNBQWMsR0FBeUI7SUFDM0MsUUFBUSxFQUFFLFNBQVM7SUFDbkIsUUFBUSxFQUFFLFNBQVM7SUFDbkIsT0FBTyxFQUFFLFNBQVM7SUFDbEIsU0FBUyxFQUFFLFNBQVM7SUFDcEIsTUFBTSxFQUFFLFNBQVM7SUFDakIsTUFBTSxFQUFFLFNBQVM7Q0FDbEIsQ0FBQTtBQUVELFNBQWdCLFlBQVksQ0FBQyxDQUFjO0lBQ3pDLE9BQU87UUFDTCxRQUFRLEVBQUUsQ0FBQyxFQUFFLFFBQVEsSUFBSSxjQUFjLENBQUMsUUFBUTtRQUNoRCxRQUFRLEVBQUUsQ0FBQyxFQUFFLFFBQVEsSUFBSSxjQUFjLENBQUMsUUFBUTtRQUNoRCxPQUFPLEVBQUUsQ0FBQyxFQUFFLE9BQU8sSUFBSSxjQUFjLENBQUMsT0FBTztRQUM3QyxTQUFTLEVBQUUsQ0FBQyxFQUFFLFNBQVMsSUFBSSxjQUFjLENBQUMsU0FBUztRQUNuRCxNQUFNLEVBQUUsQ0FBQyxFQUFFLE1BQU0sSUFBSSxjQUFjLENBQUMsTUFBTTtRQUMxQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLE1BQU0sSUFBSSxjQUFjLENBQUMsTUFBTTtLQUMzQyxDQUFBO0FBQ0gsQ0FBQztBQUVEOzs7Ozs7Ozs7Ozs7O0dBYUc7QUFDSCxTQUFnQixVQUFVLENBQUMsSUFNMUI7SUFDQyxNQUFNLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFBO0lBQ3BELE1BQU0sQ0FBQyxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7SUFFbEMsTUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtJQUNyQyxNQUFNLFVBQVUsR0FBRyxTQUFTLElBQUksS0FBSyxJQUFJLElBQUksU0FBUyx3QkFBd0IsQ0FBQTtJQUU5RSxNQUFNLFNBQVMsR0FBRyxPQUFPO1FBQ3ZCLENBQUMsQ0FBQyxhQUFhLE9BQU8sVUFBVSxTQUFTLHlEQUF5RDtRQUNsRyxDQUFDLENBQUMsMkVBQTJFLENBQUMsQ0FBQyxRQUFRLE1BQU0sU0FBUyxTQUFTLENBQUE7SUFFakgsT0FBTzs7Ozs7V0FLRSxTQUFTOzs7Ozs7Ozs7O29DQVVnQixDQUFDLENBQUMsUUFBUTtnQkFDOUIsU0FBUzs7Ozs7O2tHQU15RSxDQUFDLENBQUMsT0FBTyxRQUFRLENBQUMsQ0FBQyxNQUFNLFNBQVMsQ0FBQyxDQUFDLE9BQU87Ozs7O29DQUt6RyxDQUFDLENBQUMsTUFBTTtnQkFDNUIsSUFBSTs7Ozs7Ozs7a0JBUUYsVUFBVTs7Ozs7Ozs7Ozs7OztRQWFwQixDQUFBO0FBQ1IsQ0FBQztBQUVELCtDQUErQztBQUMvQyxTQUFnQixXQUFXLENBQUMsTUFBYyxFQUFFLFlBQW9CO0lBQzlELElBQUksQ0FBQztRQUNILE9BQU8sSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRTtZQUNwQyxLQUFLLEVBQUUsVUFBVTtZQUNqQixRQUFRLEVBQUUsWUFBWSxDQUFDLFdBQVcsRUFBRTtTQUNyQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ25CLENBQUM7SUFBQyxNQUFNLENBQUM7UUFDUCxPQUFPLEdBQUcsWUFBWSxDQUFDLFdBQVcsRUFBRSxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQTtJQUM3RCxDQUFDO0FBQ0gsQ0FBQztBQUVELG9DQUFvQztBQUNwQyxTQUFnQixVQUFVLENBQUMsT0FBZTtJQUN4QyxJQUFJLENBQUM7UUFDSCxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLGtCQUFrQixDQUFDLE9BQU8sRUFBRTtZQUNuRCxJQUFJLEVBQUUsU0FBUztZQUNmLEtBQUssRUFBRSxNQUFNO1lBQ2IsR0FBRyxFQUFFLFNBQVM7U0FDZixDQUFDLENBQUE7SUFDSixDQUFDO0lBQUMsTUFBTSxDQUFDO1FBQ1AsT0FBTyxPQUFPLENBQUE7SUFDaEIsQ0FBQztBQUNILENBQUMifQ==