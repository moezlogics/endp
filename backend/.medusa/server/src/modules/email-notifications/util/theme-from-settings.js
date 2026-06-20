"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildEmailThemeFromSettings = buildEmailThemeFromSettings;
/**
 * Pull the email-relevant theme tokens out of a site_settings dict.
 *
 * Storefront stores the same palette under `theme_*` keys (see
 * `src/admin/lib/theme-presets.ts` + the storefront's
 * `lib/util/theme.ts`). We map the admin's choices onto the email
 * template's lightweight `EmailTheme` so every transactional message
 * — OTPs, order receipts, abandoned-cart nudges, contact alerts —
 * automatically uses the storefront's live colour scheme.
 *
 * Hex strings are validated lightly (`#` + 3 or 6 hex chars). Anything
 * malformed is dropped, letting baseLayout fall back to its defaults.
 */
const HEX_RE = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
function pick(s, key) {
    const v = (s?.[key] || "").toString().trim();
    return v && HEX_RE.test(v) ? v : undefined;
}
function buildEmailThemeFromSettings(settings) {
    const s = settings || {};
    return {
        headerBg: pick(s, "theme_header_bg"),
        headerFg: pick(s, "theme_header_fg"),
        primary: pick(s, "theme_primary"),
        primaryFg: pick(s, "theme_primary_fg"),
        accent: pick(s, "theme_accent"),
        bodyBg: pick(s, "theme_bg"),
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtZnJvbS1zZXR0aW5ncy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2VtYWlsLW5vdGlmaWNhdGlvbnMvdXRpbC90aGVtZS1mcm9tLXNldHRpbmdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBc0JBLGtFQVlDO0FBaENEOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILE1BQU0sTUFBTSxHQUFHLG9DQUFvQyxDQUFBO0FBRW5ELFNBQVMsSUFBSSxDQUFDLENBQXNCLEVBQUUsR0FBVztJQUMvQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFBO0lBQzVDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFBO0FBQzVDLENBQUM7QUFFRCxTQUFnQiwyQkFBMkIsQ0FDekMsUUFBZ0Q7SUFFaEQsTUFBTSxDQUFDLEdBQUcsUUFBUSxJQUFJLEVBQUUsQ0FBQTtJQUN4QixPQUFPO1FBQ0wsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsaUJBQWlCLENBQUM7UUFDcEMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsaUJBQWlCLENBQUM7UUFDcEMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsZUFBZSxDQUFDO1FBQ2pDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLGtCQUFrQixDQUFDO1FBQ3RDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLGNBQWMsQ0FBQztRQUMvQixNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUM7S0FDNUIsQ0FBQTtBQUNILENBQUMifQ==