"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.securityHeaders = securityHeaders;
/* ------------------------------------------------------------------ *
 * Baseline security response headers for the API + (dev) admin.
 *
 * These are conservative, framework-safe headers that don't risk
 * breaking JSON API clients or the admin SPA:
 *   - HSTS: force HTTPS for a year (only honoured over TLS, harmless on http)
 *   - nosniff: stop MIME-type sniffing
 *   - SAMEORIGIN: block the API/admin being framed by other sites
 *   - Referrer-Policy: don't leak full URLs cross-origin
 *   - Permissions-Policy: deny powerful features the API never needs
 *
 * A full Content-Security-Policy is intentionally NOT set here — it's
 * highly app-specific and best applied (and tested) at the nginx layer
 * and in the Next.js storefront, to avoid silently breaking the admin.
 * ------------------------------------------------------------------ */
function securityHeaders(_req, res, next) {
    res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "SAMEORIGIN");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=(), interest-cohort=()");
    // Remove the framework's default tech fingerprint where present.
    res.removeHeader("X-Powered-By");
    return next();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VjdXJpdHktaGVhZGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcGkvbWlkZGxld2FyZXMvc2VjdXJpdHktaGVhZGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQWlCQSwwQ0FvQkM7QUFuQ0Q7Ozs7Ozs7Ozs7Ozs7O3dFQWN3RTtBQUN4RSxTQUFnQixlQUFlLENBQzdCLElBQW1CLEVBQ25CLEdBQW1CLEVBQ25CLElBQXdCO0lBRXhCLEdBQUcsQ0FBQyxTQUFTLENBQ1gsMkJBQTJCLEVBQzNCLHFDQUFxQyxDQUN0QyxDQUFBO0lBQ0QsR0FBRyxDQUFDLFNBQVMsQ0FBQyx3QkFBd0IsRUFBRSxTQUFTLENBQUMsQ0FBQTtJQUNsRCxHQUFHLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLFlBQVksQ0FBQyxDQUFBO0lBQzlDLEdBQUcsQ0FBQyxTQUFTLENBQUMsaUJBQWlCLEVBQUUsaUNBQWlDLENBQUMsQ0FBQTtJQUNuRSxHQUFHLENBQUMsU0FBUyxDQUNYLG9CQUFvQixFQUNwQiw4REFBOEQsQ0FDL0QsQ0FBQTtJQUNELGlFQUFpRTtJQUNqRSxHQUFHLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFBO0lBRWhDLE9BQU8sSUFBSSxFQUFFLENBQUE7QUFDZixDQUFDIn0=