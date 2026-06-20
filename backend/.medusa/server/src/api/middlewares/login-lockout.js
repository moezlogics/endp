"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginLockout = loginLockout;
const utils_1 = require("@medusajs/framework/utils");
/* ------------------------------------------------------------------ *
 * Login lockout — brute-force protection for admin login.
 *
 * After MAX_FAILS failed attempts from one IP, that IP is BANNED from
 * logging in for BAN_SECONDS (1 hour). Enforced on the backend (the only
 * place that can't be bypassed) and backed by Redis (the cache module),
 * so the ban is shared across PM2 cluster instances and survives restarts.
 *
 * A successful login clears the counter.
 * ------------------------------------------------------------------ */
const MAX_FAILS = 3;
const BAN_SECONDS = 60 * 60; // 1 hour
const FAIL_WINDOW = 60 * 60; // count failures within a rolling hour
function clientIp(req) {
    const fwd = req.headers["x-forwarded-for"];
    if (typeof fwd === "string" && fwd.length > 0)
        return fwd.split(",")[0].trim();
    if (Array.isArray(fwd) && fwd.length > 0)
        return fwd[0].split(",")[0].trim();
    // @ts-ignore
    return req.ip || req.socket?.remoteAddress || "unknown";
}
async function loginLockout(req, res, next) {
    let cache = null;
    try {
        cache = req.scope.resolve(utils_1.Modules.CACHE);
    }
    catch {
        return next(); // no cache available — fail open (don't block logins)
    }
    const ip = clientIp(req);
    const banKey = `login:ban:${ip}`;
    const failKey = `login:fails:${ip}`;
    // 1) Already banned? Reject before the auth handler runs.
    try {
        const banned = await cache.get(banKey);
        if (banned) {
            res.setHeader("Retry-After", String(BAN_SECONDS));
            return res.status(429).json({
                type: "locked",
                message: "Too many failed login attempts. This device is locked for 1 hour. Please try again later.",
            });
        }
    }
    catch {
        /* cache read failed — continue */
    }
    // 2) Observe the auth result after the handler finishes.
    res.on("finish", () => {
        void (async () => {
            try {
                if (res.statusCode === 401) {
                    const current = (await cache.get(failKey)) || 0;
                    const updated = current + 1;
                    if (updated >= MAX_FAILS) {
                        await cache.set(banKey, true, BAN_SECONDS);
                        try {
                            await cache.invalidate(failKey);
                        }
                        catch { }
                    }
                    else {
                        await cache.set(failKey, updated, FAIL_WINDOW);
                    }
                }
                else if (res.statusCode >= 200 && res.statusCode < 300) {
                    // Successful login — clear counters.
                    try {
                        await cache.invalidate(failKey);
                        await cache.invalidate(banKey);
                    }
                    catch { }
                }
            }
            catch {
                /* never let bookkeeping crash anything */
            }
        })();
    });
    return next();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4tbG9ja291dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcGkvbWlkZGxld2FyZXMvbG9naW4tbG9ja291dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQTBCQSxvQ0E0REM7QUFyRkQscURBQW1EO0FBRW5EOzs7Ozs7Ozs7d0VBU3dFO0FBRXhFLE1BQU0sU0FBUyxHQUFHLENBQUMsQ0FBQTtBQUNuQixNQUFNLFdBQVcsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFBLENBQUMsU0FBUztBQUNyQyxNQUFNLFdBQVcsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFBLENBQUMsdUNBQXVDO0FBRW5FLFNBQVMsUUFBUSxDQUFDLEdBQWtCO0lBQ2xDLE1BQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtJQUMxQyxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsSUFBSSxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUM7UUFBRSxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUE7SUFDOUUsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQztRQUFFLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtJQUM1RSxhQUFhO0lBQ2IsT0FBTyxHQUFHLENBQUMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxNQUFNLEVBQUUsYUFBYSxJQUFJLFNBQVMsQ0FBQTtBQUN6RCxDQUFDO0FBRU0sS0FBSyxVQUFVLFlBQVksQ0FDaEMsR0FBa0IsRUFDbEIsR0FBbUIsRUFDbkIsSUFBd0I7SUFFeEIsSUFBSSxLQUFLLEdBQVEsSUFBSSxDQUFBO0lBQ3JCLElBQUks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