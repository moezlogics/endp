"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchLog = void 0;
const utils_1 = require("@medusajs/framework/utils");
/**
 * Aggregated search-query log used to power trending suggestions in
 * the storefront search bar. We do NOT store per-event rows (which
 * would balloon over time and need pruning) — instead we keep one
 * row per normalized lowercase query and bump `count` + `last_used_at`
 * every time it's hit.
 *
 * Privacy note: we never associate the query with a customer or
 * session here. It's purely a "what's popular" leaderboard.
 */
exports.SearchLog = utils_1.model.define("search_log", {
    id: utils_1.model.id({ prefix: "slog" }).primaryKey(),
    /** Normalized lowercase query (trimmed). */
    query: utils_1.model.text(),
    /** Total times this query has been logged. */
    count: utils_1.model.number().default(1),
    /**
     * Last time this query was searched — used to expire stale entries
     * out of the trending window so old seasonal terms eventually drop
     * off the list.
     */
    last_used_at: utils_1.model.dateTime().nullable(),
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWxvZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL3NlYXJjaC1sb2cvbW9kZWxzL3NlYXJjaC1sb2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscURBQWlEO0FBRWpEOzs7Ozs7Ozs7R0FTRztBQUNVLFFBQUEsU0FBUyxHQUFHLGFBQUssQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFO0lBQ2xELEVBQUUsRUFBRSxhQUFLLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsVUFBVSxFQUFFO0lBQzdDLDRDQUE0QztJQUM1QyxLQUFLLEVBQUUsYUFBSyxDQUFDLElBQUksRUFBRTtJQUNuQiw4Q0FBOEM7SUFDOUMsS0FBSyxFQUFFLGFBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ2hDOzs7O09BSUc7SUFDSCxZQUFZLEVBQUUsYUFBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRTtDQUMxQyxDQUFDLENBQUEifQ==