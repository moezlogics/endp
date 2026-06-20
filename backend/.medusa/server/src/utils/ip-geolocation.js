"use strict";
/**
 * Server-side IP geolocation with multi-provider fallback.
 *
 * Why server-side?
 *   Browser-side IP geo (ipapi.co etc.) is unreliable — ad-blockers,
 *   Brave shields, and corporate proxies all kill the call, and free
 *   tiers rate-limit aggressively per-client-IP. Doing the lookup on
 *   the backend means:
 *     • One outbound request per real visitor IP, with a 5-minute
 *       memory cache so repeat subscribers don't burn quota.
 *     • Predictable behaviour regardless of the client's browser.
 *     • Cloudflare headers (when CF is in front) take precedence and
 *       skip the lookup entirely.
 *
 * Providers (tried in order — first OK response wins):
 *   1. http://ip-api.com/json/<ip>     — 45 req/min/IP, no key, returns
 *                                         { city, regionName, country }
 *   2. https://ipwhois.app/json/<ip>   — 10k req/month, no key, returns
 *                                         { city, region, country }
 *   3. https://ipapi.co/<ip>/json/      — 1k req/day, no key, returns
 *                                         { city, region, country_name }
 *
 * We DON'T require any of the providers to be reachable — geo is
 * advisory metadata, not a blocker for subscription create/update.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractClientIp = extractClientIp;
exports.resolveGeoFromIp = resolveGeoFromIp;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
const FETCH_TIMEOUT_MS = 2500;
const NEGATIVE_TTL_MS = 60 * 1000; // 1 minute for failures so we retry sooner
// In-memory cache keyed by IP. Stays per-process; that's fine — a single
// Medusa node won't see enough cardinality to grow this unbounded, and
// it gets evicted on TTL.
const CACHE = globalThis.__ipGeoCache__ ||
    new Map();
globalThis.__ipGeoCache__ = CACHE;
/**
 * Pull the real client IP out of an Express request, accounting for
 * the most common reverse-proxy headers. Order matters — we trust
 * Cloudflare → upstream LB → x-forwarded-for chain → req.ip.
 */
function extractClientIp(req) {
    const get = (name) => {
        const v = req.headers[name] || req.headers[name.toLowerCase()];
        return Array.isArray(v) ? v[0] : v;
    };
    const cf = get("cf-connecting-ip");
    if (cf)
        return String(cf).trim();
    const real = get("x-real-ip");
    if (real)
        return String(real).trim();
    const xff = get("x-forwarded-for");
    if (xff) {
        // First entry in the comma-separated list is the original client
        const first = String(xff).split(",")[0].trim();
        if (first)
            return first;
    }
    if (req.ip)
        return req.ip;
    if (req.socket?.remoteAddress)
        return req.socket.remoteAddress;
    return null;
}
/**
 * Returns true when the IP is private/loopback/link-local — there's no
 * point in geo-looking-up "127.0.0.1" or "10.x.x.x".
 */
function isPrivateIp(ip) {
    const v = ip.replace(/^::ffff:/, "");
    if (v === "::1" || v === "127.0.0.1")
        return true;
    if (/^10\./.test(v))
        return true;
    if (/^192\.168\./.test(v))
        return true;
    if (/^172\.(1[6-9]|2\d|3[01])\./.test(v))
        return true;
    if (/^169\.254\./.test(v))
        return true; // link-local
    if (/^fc|^fd/.test(v))
        return true; // IPv6 ULA
    return false;
}
async function fetchJson(url) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    try {
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok)
            return null;
        return await res.json();
    }
    catch {
        return null;
    }
    finally {
        clearTimeout(timer);
    }
}
/**
 * Try ip-api.com (highest free quota of the bunch).
 * Returns null if the provider is unreachable or rate-limits.
 */
async function lookupIpApi(ip) {
    const j = await fetchJson(`http://ip-api.com/json/${encodeURIComponent(ip)}?fields=status,city,regionName,country`);
    if (!j || j.status !== "success")
        return null;
    return {
        city: j.city || null,
        state: j.regionName || null,
        country: j.country || null,
    };
}
async function lookupIpWhois(ip) {
    const j = await fetchJson(`https://ipwhois.app/json/${encodeURIComponent(ip)}`);
    if (!j || j.success === false)
        return null;
    return {
        city: j.city || null,
        state: j.region || null,
        country: j.country || null,
    };
}
async function lookupIpapiCo(ip) {
    const j = await fetchJson(`https://ipapi.co/${encodeURIComponent(ip)}/json/`);
    if (!j || j.error)
        return null;
    return {
        city: j.city || null,
        state: j.region || j.region_code || null,
        country: j.country_name || j.country || null,
    };
}
/**
 * Look up city/state/country for an IP. Falls through providers until
 * one returns a useful payload. Returns null if every provider fails or
 * the IP is private/missing.
 */
async function resolveGeoFromIp(ip) {
    if (!ip || isPrivateIp(ip))
        return null;
    // Cache check
    const cached = CACHE.get(ip);
    if (cached && cached.expires > Date.now()) {
        return cached.result;
    }
    const providers = [lookupIpApi, lookupIpWhois, lookupIpapiCo];
    for (const provider of providers) {
        try {
            const result = await provider(ip);
            if (result && (result.city || result.state || result.country)) {
                CACHE.set(ip, { result, expires: Date.now() + CACHE_TTL_MS });
                return result;
            }
        }
        catch {
            // try next provider
        }
    }
    // All providers failed — cache a short negative result so we don't
    // hammer them on every page view from the same IP
    CACHE.set(ip, { result: null, expires: Date.now() + NEGATIVE_TTL_MS });
    return null;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXAtZ2VvbG9jYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdXRpbHMvaXAtZ2VvbG9jYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7O0FBNkJILDBDQTBCQztBQTRFRCw0Q0E0QkM7QUF2SkQsTUFBTSxZQUFZLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUEsQ0FBQyxZQUFZO0FBQy9DLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFBO0FBQzdCLE1BQU0sZUFBZSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUEsQ0FBQywyQ0FBMkM7QUFPN0UseUVBQXlFO0FBQ3pFLHVFQUF1RTtBQUN2RSwwQkFBMEI7QUFDMUIsTUFBTSxLQUFLLEdBQThCLFVBQWtCLENBQUMsY0FBYztJQUN4RSxJQUFJLEdBQUcsRUFBdUIsQ0FDL0I7QUFBQyxVQUFrQixDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUE7QUFFM0M7Ozs7R0FJRztBQUNILFNBQWdCLGVBQWUsQ0FBQyxHQUkvQjtJQUNDLE1BQU0sR0FBRyxHQUFHLENBQUMsSUFBWSxFQUFFLEVBQUU7UUFDM0IsTUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFBO1FBQzlELE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDcEMsQ0FBQyxDQUFBO0lBRUQsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUE7SUFDbEMsSUFBSSxFQUFFO1FBQUUsT0FBTyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUE7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