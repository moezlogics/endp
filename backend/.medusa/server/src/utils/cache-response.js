"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cached = cached;
exports.invalidateCache = invalidateCache;
const utils_1 = require("@medusajs/framework/utils");
function getCache(scope) {
    try {
        return scope.resolve(utils_1.Modules.CACHE);
    }
    catch {
        return null;
    }
}
async function cached(scope, key, ttlSeconds, producer) {
    const cache = getCache(scope);
    if (cache) {
        try {
            const hit = await cache.get(key);
            if (hit !== null && hit !== undefined) {
                return hit;
            }
        }
        catch {
            /* ignore read errors, fall through to producer */
        }
    }
    const data = await producer();
    if (cache) {
        try {
            await cache.set(key, data, ttlSeconds);
        }
        catch {
            /* ignore write errors */
        }
    }
    return data;
}
/** Invalidate one or more cache keys (best-effort). */
async function invalidateCache(scope, keys) {
    const cache = getCache(scope);
    if (!cache)
        return;
    const list = Array.isArray(keys) ? keys : [keys];
    for (const k of list) {
        try {
            await cache.invalidate(k);
        }
        catch {
            /* ignore */
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FjaGUtcmVzcG9uc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdXRpbHMvY2FjaGUtcmVzcG9uc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFpQ0Esd0JBOEJDO0FBR0QsMENBY0M7QUFoRkQscURBQW1EO0FBeUJuRCxTQUFTLFFBQVEsQ0FBQyxLQUFZO0lBQzVCLElBQUksQ0FBQztRQUNILE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxlQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDckMsQ0FBQztJQUFDLE1BQU0sQ0FBQztRQUNQLE9BQU8sSUFBSSxDQUFBO0lBQ2IsQ0FBQztBQUNILENBQUM7QUFFTSxLQUFLLFVBQVUsTUFBTSxDQUMxQixLQUFZLEVBQ1osR0FBVyxFQUNYLFVBQWtCLEVBQ2xCLFFBQTBCO0lBRTFCLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUU3QixJQUFJLEtBQUssRUFBRSxDQUFDO1FBQ1YsSUFBSSxDQUFDO1lBQ0gsTUFBTSxHQUFHLEdBQUcsTUFBTSxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ2hDLElBQUksR0FBRyxLQUFLLElBQUksSUFBSSxHQUFHLEtBQUssU0FBUyxFQUFFLENBQUM7Z0JBQ3RDLE9BQU8sR0FBUSxDQUFBO1lBQ2pCLENBQUM7UUFDSCxDQUFDO1FBQUMsTUFBTSxDQUFDO1lBQ1Asa0RBQWtEO1FBQ3BELENBQUM7SUFDSCxDQUFDO0lBRUQsTUFBTSxJQUFJLEdBQUcsTUFBTSxRQUFRLEVBQUUsQ0FBQTtJQUU3QixJQUFJLEtBQUssRUFBRSxDQUFDO1FBQ1YsSUFBSSxDQUFDO1lBQ0gsTUFBTSxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUE7UUFDeEMsQ0FBQztRQUFDLE1BQU0sQ0FBQztZQUNQLHlCQUF5QjtRQUMzQixDQUFDO0lBQ0gsQ0FBQztJQUVELE9BQU8sSUFBSSxDQUFBO0FBQ2IsQ0FBQztBQUVELHVEQUF1RDtBQUNoRCxLQUFLLFVBQVUsZUFBZSxDQUNuQyxLQUFZLEVBQ1osSUFBdUI7SUFFdkIsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQzdCLElBQUksQ0FBQyxLQUFLO1FBQUUsT0FBTTtJQUNsQixNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDaEQsS0FBSyxNQUFNLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUM7WUFDSCxNQUFNLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDM0IsQ0FBQztRQUFDLE1BQU0sQ0FBQztZQUNQLFlBQVk7UUFDZCxDQUFDO0lBQ0gsQ0FBQztBQUNILENBQUMifQ==