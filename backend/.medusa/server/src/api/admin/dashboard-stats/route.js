"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
const utils_1 = require("@medusajs/framework/utils");
const PERIOD_DAYS = {
    "7d": 7,
    "30d": 30,
    "90d": 90,
    "12m": 365,
};
const LOW_STOCK_THRESHOLD = 5;
const MAX_ORDERS = 5000; // safety cap so a huge window can't blow up memory
const pctChange = (current, previous) => {
    if (previous <= 0)
        return current > 0 ? 100 : 0;
    return Math.round(((current - previous) / previous) * 1000) / 10; // 1 decimal
};
async function GET(req, res) {
    const query = req.scope.resolve("query");
    const periodParam = req.query.period || "30d";
    const period = ["7d", "30d", "90d", "12m"].includes(periodParam)
        ? periodParam
        : "30d";
    const days = PERIOD_DAYS[period];
    // ---- Redis cache (best-effort) ----------------------------------
    const cacheKey = `dashboard-stats:${period}`;
    let cache = null;
    try {
        cache = req.scope.resolve(utils_1.Modules.CACHE);
        const cached = await cache.get(cacheKey);
        if (cached) {
            return res.json({ ...cached, cached: true });
        }
    }
    catch {
        // cache not available — continue without it
    }
    try {
        const now = new Date();
        const currentStart = new Date(now);
        currentStart.setDate(currentStart.getDate() - days);
        const previousStart = new Date(now);
        previousStart.setDate(previousStart.getDate() - days * 2);
        // 1. Recent orders (single query) ---------------------------------
        // NOTE: we deliberately do NOT push a `created_at` filter into
        // query.graph here. The proven, always-working pattern is "fetch the
        // most recent N orders ordered DESC" — exactly what the original
        // dashboard did. A `created_at: { $gte }` filter was the cause of the
        // dashboard going blank: if that operator misbehaves on the order
        // entity the whole query throws and the endpoint 500s, leaving the UI
        // empty. Instead we fetch recent orders and split them into the
        // current vs previous period in JS below (cheap + robust). MAX_ORDERS
        // (5000 most-recent) comfortably covers the dashboard windows.
        let orders = [];
        let ordersError = null;
        let ordersMode = "full";
        const fetchOrders = async (fields, withSort = true) => {
            const r = await query.graph({
                entity: "order",
                fields,
                pagination: {
                    take: MAX_ORDERS,
                    skip: 0,
                    ...(withSort ? { order: { created_at: "DESC" } } : {}),
                },
            });
            return r?.data || [];
        };
        const BASE = ["id", "created_at", "status", "total", "currency_code"];
        const WITH_ITEMS = [
            ...BASE,
            "items.title",
            "items.quantity",
            "items.unit_price",
            "items.thumbnail",
        ];
        // Progressive fallback so a problematic field/relation can't blank the
        // whole dashboard — and so _debug tells us exactly which tier worked.
        try {
            orders = await fetchOrders(WITH_ITEMS);
        }
        catch (e1) {
            ordersError = `full:${e1?.message || e1}`;
            try {
                orders = await fetchOrders(BASE); // drop line items
                ordersMode = "no-items";
            }
            catch (e2) {
                ordersError += ` | base:${e2?.message || e2}`;
                try {
                    orders = await fetchOrders(["id", "created_at", "status", "currency_code"]); // drop total
                    ordersMode = "no-total";
                }
                catch (e3) {
                    ordersError += ` | bare:${e3?.message || e3}`;
                    try {
                        orders = await fetchOrders(["id", "created_at", "status"], false); // drop sort too
                        ordersMode = "no-sort";
                    }
                    catch (e4) {
                        ordersError += ` | nosort:${e4?.message || e4}`;
                        console.error("[dashboard] all order queries failed:", e4);
                    }
                }
            }
        }
        // 2. Aggregate -----------------------------------------------------
        let currency = "PKR";
        let curSales = 0;
        let curOrders = 0;
        let prevSales = 0;
        let prevOrders = 0;
        let completedOrders = 0;
        let pendingOrders = 0;
        let canceledOrders = 0;
        const statusBreakdown = {};
        const productSales = {};
        // Time-series buckets. Monthly for 12m, daily otherwise.
        const isMonthly = period === "12m";
        const buckets = {};
        if (isMonthly) {
            for (let i = 11; i >= 0; i--) {
                const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
                const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
                buckets[key] = {
                    date: d.toLocaleDateString(undefined, { month: "short", year: "2-digit" }),
                    sales: 0,
                    orders: 0,
                    rawDate: key,
                };
            }
        }
        else {
            for (let i = days - 1; i >= 0; i--) {
                const d = new Date(now);
                d.setDate(d.getDate() - i);
                const key = d.toISOString().split("T")[0];
                buckets[key] = {
                    date: d.toLocaleDateString(undefined, { month: "short", day: "numeric" }),
                    sales: 0,
                    orders: 0,
                    rawDate: key,
                };
            }
        }
        const currentStartMs = currentStart.getTime();
        const previousStartMs = previousStart.getTime();
        for (const order of orders) {
            const createdMs = order.created_at ? new Date(order.created_at).getTime() : 0;
            const isCurrent = createdMs >= currentStartMs;
            const amount = order.total || 0;
            const isCanceled = order.status === "canceled";
            if (order.currency_code)
                currency = order.currency_code;
            if (isCurrent) {
                if (isCanceled) {
                    canceledOrders++;
                }
                else {
                    curSales += amount;
                    curOrders++;
                    if (order.status === "completed" || order.status === "fulfilled") {
                        completedOrders++;
                    }
                    else {
                        pendingOrders++;
                    }
                    // chart bucket. NOTE: order.created_at is a Date object in
                    // Medusa v2 (NOT a string), so we must build the ISO key from
                    // createdMs — calling .split()/.slice() on a Date throws (this
                    // was the 500 that kept the dashboard blank).
                    const iso = createdMs ? new Date(createdMs).toISOString() : "";
                    const key = isMonthly ? iso.slice(0, 7) : iso.split("T")[0];
                    if (buckets[key]) {
                        buckets[key].sales += amount;
                        buckets[key].orders++;
                    }
                    // top products
                    if (Array.isArray(order.items)) {
                        for (const item of order.items) {
                            const name = item.title || "Unknown Product";
                            if (!productSales[name]) {
                                productSales[name] = {
                                    title: name,
                                    quantity: 0,
                                    sales: 0,
                                    thumbnail: item.thumbnail || "",
                                };
                            }
                            const qty = item.quantity || 1;
                            productSales[name].quantity += qty;
                            productSales[name].sales += (item.unit_price || 0) * qty;
                        }
                    }
                }
                statusBreakdown[order.status] = (statusBreakdown[order.status] || 0) + 1;
            }
            else if (createdMs >= previousStartMs && !isCanceled) {
                // previous period (for growth comparison only). Bounded to the
                // previous window so the unfiltered fetch above can't pull in
                // ancient orders and inflate the comparison baseline.
                prevSales += amount;
                prevOrders++;
            }
        }
        const curAOV = curOrders > 0 ? Math.round(curSales / curOrders) : 0;
        const prevAOV = prevOrders > 0 ? Math.round(prevSales / prevOrders) : 0;
        // 3. Customers (total + new-in-period + growth) -------------------
        let customerCount = 0;
        let newCustomers = 0;
        let prevNewCustomers = 0;
        try {
            const { metadata } = await query.graph({
                entity: "customer",
                fields: ["id"],
                pagination: { take: 1, skip: 0 },
            });
            customerCount = metadata?.count || 0;
            const { metadata: cur } = await query.graph({
                entity: "customer",
                fields: ["id"],
                filters: { created_at: { $gte: currentStart.toISOString() } },
                pagination: { take: 1, skip: 0 },
            });
            newCustomers = cur?.count || 0;
            const { metadata: prev } = await query.graph({
                entity: "customer",
                fields: ["id"],
                filters: {
                    created_at: {
                        $gte: previousStart.toISOString(),
                        $lt: currentStart.toISOString(),
                    },
                },
                pagination: { take: 1, skip: 0 },
            });
            prevNewCustomers = prev?.count || 0;
        }
        catch (e) {
            console.warn("[dashboard] customer counts failed", e);
        }
        // 4. Product count -------------------------------------------------
        let productCount = 0;
        try {
            const { metadata } = await query.graph({
                entity: "product",
                fields: ["id"],
                pagination: { take: 1, skip: 0 },
            });
            productCount = metadata?.count || 0;
        }
        catch (e) {
            console.warn("[dashboard] product count failed", e);
        }
        // 5. Low-stock alerts (best-effort) -------------------------------
        let lowStock = [];
        try {
            const { data: variants } = await query.graph({
                entity: "product_variant",
                fields: [
                    "id",
                    "title",
                    "sku",
                    "manage_inventory",
                    "product.title",
                    "product.thumbnail",
                    "inventory_items.inventory.location_levels.stocked_quantity",
                    "inventory_items.inventory.location_levels.reserved_quantity",
                ],
                filters: { manage_inventory: true },
                pagination: { take: 1000, skip: 0 },
            });
            lowStock = variants
                .map((v) => {
                let available = 0;
                for (const ii of v.inventory_items || []) {
                    for (const lvl of ii?.inventory?.location_levels || []) {
                        available +=
                            (lvl.stocked_quantity || 0) - (lvl.reserved_quantity || 0);
                    }
                }
                return {
                    title: v.product?.title
                        ? `${v.product.title}${v.title && v.title !== "Default" ? ` — ${v.title}` : ""}`
                        : v.title || "Unknown",
                    sku: v.sku || "",
                    quantity: available,
                    thumbnail: v.product?.thumbnail || "",
                };
            })
                .filter((v) => v.quantity <= LOW_STOCK_THRESHOLD)
                .sort((a, b) => a.quantity - b.quantity)
                .slice(0, 8);
        }
        catch (e) {
            console.warn("[dashboard] low-stock lookup failed", e);
        }
        // 6. Recent orders (independent of period) ------------------------
        const recentOrders = [];
        let recentError = null;
        const RECENT_FULL = [
            "id", "display_id", "created_at", "status", "total", "currency_code", "email",
            "shipping_address.first_name", "shipping_address.last_name", "shipping_address.city",
        ];
        const RECENT_MIN = ["id", "display_id", "created_at", "status", "total", "currency_code"];
        const fetchRecent = async (fields, withSort = true) => {
            const r = await query.graph({
                entity: "order",
                fields,
                pagination: { take: 10, skip: 0, ...(withSort ? { order: { created_at: "DESC" } } : {}) },
            });
            return r?.data || [];
        };
        let recent = [];
        try {
            recent = await fetchRecent(RECENT_FULL);
        }
        catch (e1) {
            recentError = `full:${e1?.message || e1}`;
            try {
                recent = await fetchRecent(RECENT_MIN);
            }
            catch (e2) {
                recentError += ` | min:${e2?.message || e2}`;
                try {
                    recent = await fetchRecent(["id", "display_id", "created_at", "status"], false);
                }
                catch (e3) {
                    recentError += ` | bare:${e3?.message || e3}`;
                }
            }
        }
        for (const order of recent) {
            const name = order.shipping_address
                ? `${order.shipping_address.first_name || ""} ${order.shipping_address.last_name || ""}`.trim()
                : "";
            recentOrders.push({
                id: order.id,
                display_id: order.display_id,
                created_at: order.created_at,
                status: order.status,
                total: order.total || 0,
                currency_code: order.currency_code || currency,
                customer_name: name || order.email || "Guest Customer",
                city: order.shipping_address?.city || "",
                items_count: 0,
            });
        }
        // 7. Assemble -----------------------------------------------------
        const chartData = Object.values(buckets).sort((a, b) => a.rawDate.localeCompare(b.rawDate));
        const topProducts = Object.values(productSales)
            .sort((a, b) => b.quantity - a.quantity)
            .slice(0, 5);
        const payload = {
            period,
            currency,
            stats: {
                totalSales: curSales,
                salesGrowth: pctChange(curSales, prevSales),
                totalOrders: curOrders,
                ordersGrowth: pctChange(curOrders, prevOrders),
                averageOrderValue: curAOV,
                aovGrowth: pctChange(curAOV, prevAOV),
                customerCount,
                newCustomers,
                newCustomersGrowth: pctChange(newCustomers, prevNewCustomers),
                productCount,
                completedOrders,
                pendingOrders,
                canceledOrders,
            },
            statusBreakdown,
            chartData,
            recentOrders,
            topProducts,
            lowStock,
            generatedAt: now.toISOString(),
            // Diagnostics — safe to expose to an authenticated admin. Lets us see
            // WHY a dashboard looks empty (no orders fetched? query error? all
            // orders older than the window?).
            _debug: {
                ordersFetched: orders.length,
                ordersMode,
                recentFetched: recentOrders.length,
                recentError,
                ordersError,
                windowDays: days,
                currentStart: currentStart.toISOString(),
                now: now.toISOString(),
            },
        };
        // 8. Cache (best-effort). Longer TTL for the heavier 12m window. --
        try {
            if (cache) {
                await cache.set(cacheKey, payload, period === "12m" ? 300 : 60);
            }
        }
        catch {
            /* ignore cache write failures */
        }
        return res.json({ ...payload, cached: false });
    }
    catch (error) {
        console.error("Dashboard stats generation error:", error);
        return res
            .status(500)
            .json({ error: "Failed to load dashboard statistics" });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL2Rhc2hib2FyZC1zdGF0cy9yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQXVDQSxrQkFpYUM7QUF2Y0QscURBQW1EO0FBdUJuRCxNQUFNLFdBQVcsR0FBMkI7SUFDMUMsSUFBSSxFQUFFLENBQUM7SUFDUCxLQUFLLEVBQUUsRUFBRTtJQUNULEtBQUssRUFBRSxFQUFFO0lBQ1QsS0FBSyxFQUFFLEdBQUc7Q0FDWCxDQUFBO0FBRUQsTUFBTSxtQkFBbUIsR0FBRyxDQUFDLENBQUE7QUFDN0IsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFBLENBQUMsbURBQW1EO0FBRTNFLE1BQU0sU0FBUyxHQUFHLENBQUMsT0FBZSxFQUFFLFFBQWdCLEVBQVUsRUFBRTtJQUM5RCxJQUFJLFFBQVEsSUFBSSxDQUFDO1FBQUUsT0FBTyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUMvQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsR0FBRyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUEsQ0FBQyxZQUFZO0FBQy9FLENBQUMsQ0FBQTtBQUVNLEtBQUssVUFBVSxHQUFHLENBQUMsR0FBa0IsRUFBRSxHQUFtQjtJQUMvRCxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQVEsQ0FBQTtJQUUvQyxNQUFNLFdBQVcsR0FBSSxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQWlCLElBQUksS0FBSyxDQUFBO0lBQ3pELE1BQU0sTUFBTSxHQUFZLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFXLENBQUMsUUFBUSxDQUNwRSxXQUFxQixDQUN0QjtRQUNDLENBQUMsQ0FBRSxXQUFzQjtRQUN6QixDQUFDLENBQUMsS0FBSyxDQUFBO0lBQ1QsTUFBTSxJQUFJLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBRWhDLG9FQUFvRTtJQUNwRSxNQUFNLFFBQVEsR0FBRyxtQkFBbUIsTUFBTSxFQUFFLENBQUE7SUFDNUMsSUFBSSxLQUFLLEdBQVEsSUFBSSxDQUFBO0lBQ3JCLElBQUksQ0FBQztRQUNILEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxlQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDeEMsTUFBTSxNQUFNLEdBQUcsTUFBTSxLQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQ3hDLElBQUksTUFBTSxFQUFFLENBQUM7WUFDWCxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQTtRQUM5QyxDQUFDO0lBQ0gsQ0FBQztJQUFDLE1BQU0sQ0FBQztRQUNQLDRDQUE0QztJQUM5QyxDQUFDO0lBRUQsSUFBSSxDQUFDO1FBQ0gsTUFBTSxHQUFHLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQTtRQUN0QixNQUFNLFlBQVksR0FBRyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNsQyxZQUFZLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQTtRQUNuRCxNQUFNLGFBQWEsR0FBRyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNuQyxhQUFhLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUE7UUFFekQsb0VBQW9FO1FBQ3BFLCtEQUErRDtRQUMvRCxxRUFBcUU7UUFDckUsaUVBQWlFO1FBQ2pFLHNFQUFzRTtRQUN0RSxrRUFBa0U7UUFDbEUsc0VBQXNFO1FBQ3RFLGdFQUFnRTtRQUNoRSxzRUFBc0U7UUFDdEUsK0RBQStEO1FBQy9ELElBQUksTUFBTSxHQUFVLEVBQUUsQ0FBQTtRQUN0QixJQUFJLFdBQVcsR0FBa0IsSUFBSSxDQUFBO1FBQ3JDLElBQUksVUFBVSxHQUFHLE1BQU0sQ0FBQTtRQUV2QixNQUFNLFdBQVcsR0FBRyxLQUFLLEVBQUUsTUFBZ0IsRUFBRSxRQUFRLEdBQUcsSUFBSSxFQUFFLEVBQUU7WUFDOUQsTUFBTSxDQUFDLEdBQUcsTUFBTSxLQUFLLENBQUMsS0FBSyxDQUFDO2dCQUMxQixNQUFNLEVBQUUsT0FBTztnQkFDZixNQUFNO2dCQUNOLFVBQVUsRUFBRTtvQkFDVixJQUFJLEVBQUUsVUFBVTtvQkFDaEIsSUFBSSxFQUFFLENBQUM7b0JBQ1AsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO2lCQUN2RDthQUNGLENBQUMsQ0FBQTtZQUNGLE9BQU8sQ0FBQyxFQUFFLElBQUksSUFBSSxFQUFFLENBQUE7UUFDdEIsQ0FBQyxDQUFBO1FBRUQsTUFBTSxJQUFJLEdBQUcsQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsZUFBZSxDQUFDLENBQUE7UUFDckUsTUFBTSxVQUFVLEdBQUc7WUFDakIsR0FBRyxJQUFJO1lBQ1AsYUFBYTtZQUNiLGdCQUFnQjtZQUNoQixrQkFBa0I7WUFDbEIsaUJBQWlCO1NBQ2xCLENBQUE7UUFFRCx1RUFBdUU7UUFDdkUsc0VBQXNFO1FBQ3RFLElBQUksQ0FBQztZQUNILE1BQU0sR0FBRyxNQUFNLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUN4QyxDQUFDO1FBQUMsT0FBTyxFQUFPLEVBQUUsQ0FBQztZQUNqQixXQUFXLEdBQUcsUUFBUSxFQUFFLEVBQUUsT0FBTyxJQUFJLEVBQUUsRUFBRSxDQUFBO1lBQ3pDLElBQUksQ0FBQztnQkFDSCxNQUFNLEdBQUcsTUFBTSxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUEsQ0FBQyxrQkFBa0I7Z0JBQ25ELFVBQVUsR0FBRyxVQUFVLENBQUE7WUFDekIsQ0FBQztZQUFDLE9BQU8sRUFBTyxFQUFFLENBQUM7Z0JBQ2pCLFdBQVcsSUFBSSxXQUFXLEVBQUUsRUFBRSxPQUFPLElBQUksRUFBRSxFQUFFLENBQUE7Z0JBQzdDLElBQUksQ0FBQztvQkFDSCxNQUFNLEdBQUcsTUFBTSxXQUFXLENBQUMsQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxlQUFlLENBQUMsQ0FBQyxDQUFBLENBQUMsYUFBYTtvQkFDekYsVUFBVSxHQUFHLFVBQVUsQ0FBQTtnQkFDekIsQ0FBQztnQkFBQyxPQUFPLEVBQU8sRUFBRSxDQUFDO29CQUNqQixXQUFXLElBQUksV0FBVyxFQUFFLEVBQUUsT0FBTyxJQUFJLEVBQUUsRUFBRSxDQUFBO29CQUM3QyxJQUFJLENBQUM7d0JBQ0gsTUFBTSxHQUFHLE1BQU0sV0FBVyxDQUFDLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRSxRQUFRLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQSxDQUFDLGdCQUFnQjt3QkFDbEYsVUFBVSxHQUFHLFNBQVMsQ0FBQTtvQkFDeEIsQ0FBQztvQkFBQyxPQUFPLEVBQU8sRUFBRSxDQUFDO3dCQUNqQixXQUFXLElBQUksYUFBYSxFQUFFLEVBQUUsT0FBTyxJQUFJLEVBQUUsRUFBRSxDQUFBO3dCQUMvQyxPQUFPLENBQUMsS0FBSyxDQUFDLHVDQUF1QyxFQUFFLEVBQUUsQ0FBQyxDQUFBO29CQUM1RCxDQUFDO2dCQUNILENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztRQUVELHFFQUFxRTtRQUNyRSxJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUE7UUFDcEIsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFBO1FBQ2hCLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQTtRQUNqQixJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUE7UUFDakIsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFBO1FBQ2xCLElBQUksZUFBZSxHQUFHLENBQUMsQ0FBQTtRQUN2QixJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUE7UUFDckIsSUFBSSxjQUFjLEdBQUcsQ0FBQyxDQUFBO1FBRXRCLE1BQU0sZUFBZSxHQUEyQixFQUFFLENBQUE7UUFDbEQsTUFBTSxZQUFZLEdBR2QsRUFBRSxDQUFBO1FBRU4seURBQXlEO1FBQ3pELE1BQU0sU0FBUyxHQUFHLE1BQU0sS0FBSyxLQUFLLENBQUE7UUFDbEMsTUFBTSxPQUFPLEdBR1QsRUFBRSxDQUFBO1FBRU4sSUFBSSxTQUFTLEVBQUUsQ0FBQztZQUNkLEtBQUssSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDN0IsTUFBTSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxFQUFFLEdBQUcsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7Z0JBQzVELE1BQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLFdBQVcsRUFBRSxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFBO2dCQUM3RSxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUc7b0JBQ2IsSUFBSSxFQUFFLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLEVBQUUsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQztvQkFDMUUsS0FBSyxFQUFFLENBQUM7b0JBQ1IsTUFBTSxFQUFFLENBQUM7b0JBQ1QsT0FBTyxFQUFFLEdBQUc7aUJBQ2IsQ0FBQTtZQUNILENBQUM7UUFDSCxDQUFDO2FBQU0sQ0FBQztZQUNOLEtBQUssSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQ25DLE1BQU0sQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO2dCQUN2QixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQTtnQkFDMUIsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQkFDekMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHO29CQUNiLElBQUksRUFBRSxDQUFDLENBQUMsa0JBQWtCLENBQUMsU0FBUyxFQUFFLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLENBQUM7b0JBQ3pFLEtBQUssRUFBRSxDQUFDO29CQUNSLE1BQU0sRUFBRSxDQUFDO29CQUNULE9BQU8sRUFBRSxHQUFHO2lCQUNiLENBQUE7WUFDSCxDQUFDO1FBQ0gsQ0FBQztRQUVELE1BQU0sY0FBYyxHQUFHLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUM3QyxNQUFNLGVBQWUsR0FBRyxhQUFhLENBQUMsT0FBTyxFQUFFLENBQUE7UUFFL0MsS0FBSyxNQUFNLEtBQUssSUFBSSxNQUFlLEVBQUUsQ0FBQztZQUNwQyxNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUM3RSxNQUFNLFNBQVMsR0FBRyxTQUFTLElBQUksY0FBYyxDQUFBO1lBQzdDLE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFBO1lBQy9CLE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxNQUFNLEtBQUssVUFBVSxDQUFBO1lBQzlDLElBQUksS0FBSyxDQUFDLGFBQWE7Z0JBQUUsUUFBUSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUE7WUFFdkQsSUFBSSxTQUFTLEVBQUUsQ0FBQztnQkFDZCxJQUFJLFVBQVUsRUFBRSxDQUFDO29CQUNmLGNBQWMsRUFBRSxDQUFBO2dCQUNsQixDQUFDO3FCQUFNLENBQUM7b0JBQ04sUUFBUSxJQUFJLE1BQU0sQ0FBQTtvQkFDbEIsU0FBUyxFQUFFLENBQUE7b0JBQ1gsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLFdBQVcsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLFdBQVcsRUFBRSxDQUFDO3dCQUNqRSxlQUFlLEVBQUUsQ0FBQTtvQkFDbkIsQ0FBQzt5QkFBTSxDQUFDO3dCQUNOLGFBQWEsRUFBRSxDQUFBO29CQUNqQixDQUFDO29CQUVELDJEQUEyRDtvQkFDM0QsOERBQThEO29CQUM5RCwrREFBK0Q7b0JBQy9ELDhDQUE4QztvQkFDOUMsTUFBTSxHQUFHLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFBO29CQUM5RCxNQUFNLEdBQUcsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO29CQUMzRCxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO3dCQUNqQixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxJQUFJLE1BQU0sQ0FBQTt3QkFDNUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFBO29CQUN2QixDQUFDO29CQUVELGVBQWU7b0JBQ2YsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO3dCQUMvQixLQUFLLE1BQU0sSUFBSSxJQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQzs0QkFDL0IsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxpQkFBaUIsQ0FBQTs0QkFDNUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO2dDQUN4QixZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUc7b0NBQ25CLEtBQUssRUFBRSxJQUFJO29DQUNYLFFBQVEsRUFBRSxDQUFDO29DQUNYLEtBQUssRUFBRSxDQUFDO29DQUNSLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxJQUFJLEVBQUU7aUNBQ2hDLENBQUE7NEJBQ0gsQ0FBQzs0QkFDRCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsQ0FBQTs0QkFDOUIsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsSUFBSSxHQUFHLENBQUE7NEJBQ2xDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQTt3QkFDMUQsQ0FBQztvQkFDSCxDQUFDO2dCQUNILENBQUM7Z0JBQ0QsZUFBZSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQzFFLENBQUM7aUJBQU0sSUFBSSxTQUFTLElBQUksZUFBZSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQ3ZELCtEQUErRDtnQkFDL0QsOERBQThEO2dCQUM5RCxzREFBc0Q7Z0JBQ3RELFNBQVMsSUFBSSxNQUFNLENBQUE7Z0JBQ25CLFVBQVUsRUFBRSxDQUFBO1lBQ2QsQ0FBQztRQUNILENBQUM7UUFFRCxNQUFNLE1BQU0sR0FBRyxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ25FLE1BQU0sT0FBTyxHQUFHLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFFdkUsb0VBQW9FO1FBQ3BFLElBQUksYUFBYSxHQUFHLENBQUMsQ0FBQTtRQUNyQixJQUFJLFlBQVksR0FBRyxDQUFDLENBQUE7UUFDcEIsSUFBSSxnQkFBZ0IsR0FBRyxDQUFDLENBQUE7UUFDeEIsSUFBSSxDQUFDO1lBQ0gsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLE1BQU0sS0FBSyxDQUFDLEtBQUssQ0FBQztnQkFDckMsTUFBTSxFQUFFLFVBQVU7Z0JBQ2xCLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQztnQkFDZCxVQUFVLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUU7YUFDakMsQ0FBQyxDQUFBO1lBQ0YsYUFBYSxHQUFHLFFBQVEsRUFBRSxLQUFLLElBQUksQ0FBQyxDQUFBO1lBRXBDLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLEdBQUcsTUFBTSxLQUFLLENBQUMsS0FBSyxDQUFDO2dCQUMxQyxNQUFNLEVBQUUsVUFBVTtnQkFDbEIsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDO2dCQUNkLE9BQU8sRUFBRSxFQUFFLFVBQVUsRUFBRSxFQUFFLElBQUksRUFBRSxZQUFZLENBQUMsV0FBVyxFQUFFLEVBQUUsRUFBRTtnQkFDN0QsVUFBVSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFO2FBQ2pDLENBQUMsQ0FBQTtZQUNGLFlBQVksR0FBRyxHQUFHLEVBQUUsS0FBSyxJQUFJLENBQUMsQ0FBQTtZQUU5QixNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxHQUFHLE1BQU0sS0FBSyxDQUFDLEtBQUssQ0FBQztnQkFDM0MsTUFBTSxFQUFFLFVBQVU7Z0JBQ2xCLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQztnQkFDZCxPQUFPLEVBQUU7b0JBQ1AsVUFBVSxFQUFFO3dCQUNWLElBQUksRUFBRSxhQUFhLENBQUMsV0FBVyxFQUFFO3dCQUNqQyxHQUFHLEVBQUUsWUFBWSxDQUFDLFdBQVcsRUFBRTtxQkFDaEM7aUJBQ0Y7Z0JBQ0QsVUFBVSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFO2FBQ2pDLENBQUMsQ0FBQTtZQUNGLGdCQUFnQixHQUFHLElBQUksRUFBRSxLQUFLLElBQUksQ0FBQyxDQUFBO1FBQ3JDLENBQUM7UUFBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1lBQ1gsT0FBTyxDQUFDLElBQUksQ0FBQyxvQ0FBb0MsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUN2RCxDQUFDO1FBRUQscUVBQXFFO1FBQ3JFLElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQTtRQUNwQixJQUFJLENBQUM7WUFDSCxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsTUFBTSxLQUFLLENBQUMsS0FBSyxDQUFDO2dCQUNyQyxNQUFNLEVBQUUsU0FBUztnQkFDakIsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDO2dCQUNkLFVBQVUsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRTthQUNqQyxDQUFDLENBQUE7WUFDRixZQUFZLEdBQUcsUUFBUSxFQUFFLEtBQUssSUFBSSxDQUFDLENBQUE7UUFDckMsQ0FBQztRQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7WUFDWCxPQUFPLENBQUMsSUFBSSxDQUFDLGtDQUFrQyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQ3JELENBQUM7UUFFRCxvRUFBb0U7UUFDcEUsSUFBSSxRQUFRLEdBS04sRUFBRSxDQUFBO1FBQ1IsSUFBSSxDQUFDO1lBQ0gsTUFBTSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsR0FBRyxNQUFNLEtBQUssQ0FBQyxLQUFLLENBQUM7Z0JBQzNDLE1BQU0sRUFBRSxpQkFBaUI7Z0JBQ3pCLE1BQU0sRUFBRTtvQkFDTixJQUFJO29CQUNKLE9BQU87b0JBQ1AsS0FBSztvQkFDTCxrQkFBa0I7b0JBQ2xCLGVBQWU7b0JBQ2YsbUJBQW1CO29CQUNuQiw0REFBNEQ7b0JBQzVELDZEQUE2RDtpQkFDOUQ7Z0JBQ0QsT0FBTyxFQUFFLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxFQUFTO2dCQUMxQyxVQUFVLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUU7YUFDcEMsQ0FBQyxDQUFBO1lBRUYsUUFBUSxHQUFJLFFBQWtCO2lCQUMzQixHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDVCxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUE7Z0JBQ2pCLEtBQUssTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDLGVBQWUsSUFBSSxFQUFFLEVBQUUsQ0FBQztvQkFDekMsS0FBSyxNQUFNLEdBQUcsSUFBSSxFQUFFLEVBQUUsU0FBUyxFQUFFLGVBQWUsSUFBSSxFQUFFLEVBQUUsQ0FBQzt3QkFDdkQsU0FBUzs0QkFDUCxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsSUFBSSxDQUFDLENBQUMsQ0FBQTtvQkFDOUQsQ0FBQztnQkFDSCxDQUFDO2dCQUNELE9BQU87b0JBQ0wsS0FBSyxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsS0FBSzt3QkFDckIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsS0FBSyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTt3QkFDaEYsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksU0FBUztvQkFDeEIsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksRUFBRTtvQkFDaEIsUUFBUSxFQUFFLFNBQVM7b0JBQ25CLFNBQVMsRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLFNBQVMsSUFBSSxFQUFFO2lCQUN0QyxDQUFBO1lBQ0gsQ0FBQyxDQUFDO2lCQUNELE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsSUFBSSxtQkFBbUIsQ0FBQztpQkFDaEQsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDO2lCQUN2QyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQ2hCLENBQUM7UUFBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1lBQ1gsT0FBTyxDQUFDLElBQUksQ0FBQyxxQ0FBcUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUN4RCxDQUFDO1FBRUQsb0VBQW9FO1FBQ3BFLE1BQU0sWUFBWSxHQUFVLEVBQUUsQ0FBQTtRQUM5QixJQUFJLFdBQVcsR0FBa0IsSUFBSSxDQUFBO1FBQ3JDLE1BQU0sV0FBVyxHQUFHO1lBQ2xCLElBQUksRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE9BQU87WUFDN0UsNkJBQTZCLEVBQUUsNEJBQTRCLEVBQUUsdUJBQXVCO1NBQ3JGLENBQUE7UUFDRCxNQUFNLFVBQVUsR0FBRyxDQUFDLElBQUksRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsZUFBZSxDQUFDLENBQUE7UUFDekYsTUFBTSxXQUFXLEdBQUcsS0FBSyxFQUFFLE1BQWdCLEVBQUUsUUFBUSxHQUFHLElBQUksRUFBRSxFQUFFO1lBQzlELE1BQU0sQ0FBQyxHQUFHLE1BQU0sS0FBSyxDQUFDLEtBQUssQ0FBQztnQkFDMUIsTUFBTSxFQUFFLE9BQU87Z0JBQ2YsTUFBTTtnQkFDTixVQUFVLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7YUFDMUYsQ0FBQyxDQUFBO1lBQ0YsT0FBTyxDQUFDLEVBQUUsSUFBSSxJQUFJLEVBQUUsQ0FBQTtRQUN0QixDQUFDLENBQUE7UUFDRCxJQUFJLE1BQU0sR0FBVSxFQUFFLENBQUE7UUFDdEIsSUFBSSxDQUFDO1lBQ0gsTUFBTSxHQUFHLE1BQU0sV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQ3pDLENBQUM7UUFBQyxPQUFPLEVBQU8sRUFBRSxDQUFDO1lBQ2pCLFdBQVcsR0FBRyxRQUFRLEVBQUUsRUFBRSxPQUFPLElBQUksRUFBRSxFQUFFLENBQUE7WUFDekMsSUFBSSxDQUFDO2dCQUNILE1BQU0sR0FBRyxNQUFNLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQTtZQUN4QyxDQUFDO1lBQUMsT0FBTyxFQUFPLEVBQUUsQ0FBQztnQkFDakIsV0FBVyxJQUFJLFVBQVUsRUFBRSxFQUFFLE9BQU8sSUFBSSxFQUFFLEVBQUUsQ0FBQTtnQkFDNUMsSUFBSSxDQUFDO29CQUNILE1BQU0sR0FBRyxNQUFNLFdBQVcsQ0FBQyxDQUFDLElBQUksRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLFFBQVEsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFBO2dCQUNqRixDQUFDO2dCQUFDLE9BQU8sRUFBTyxFQUFFLENBQUM7b0JBQ2pCLFdBQVcsSUFBSSxXQUFXLEVBQUUsRUFBRSxPQUFPLElBQUksRUFBRSxFQUFFLENBQUE7Z0JBQy9DLENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztRQUNELEtBQUssTUFBTSxLQUFLLElBQUksTUFBTSxFQUFFLENBQUM7WUFDM0IsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLGdCQUFnQjtnQkFDakMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLGdCQUFnQixDQUFDLFVBQVUsSUFBSSxFQUFFLElBQUksS0FBSyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUU7Z0JBQy9GLENBQUMsQ0FBQyxFQUFFLENBQUE7WUFDTixZQUFZLENBQUMsSUFBSSxDQUFDO2dCQUNoQixFQUFFLEVBQUUsS0FBSyxDQUFDLEVBQUU7Z0JBQ1osVUFBVSxFQUFFLEtBQUssQ0FBQyxVQUFVO2dCQUM1QixVQUFVLEVBQUUsS0FBSyxDQUFDLFVBQVU7Z0JBQzVCLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTTtnQkFDcEIsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLLElBQUksQ0FBQztnQkFDdkIsYUFBYSxFQUFFLEtBQUssQ0FBQyxhQUFhLElBQUksUUFBUTtnQkFDOUMsYUFBYSxFQUFFLElBQUksSUFBSSxLQUFLLENBQUMsS0FBSyxJQUFJLGdCQUFnQjtnQkFDdEQsSUFBSSxFQUFFLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLElBQUksRUFBRTtnQkFDeEMsV0FBVyxFQUFFLENBQUM7YUFDZixDQUFDLENBQUE7UUFDSixDQUFDO1FBRUQsb0VBQW9FO1FBQ3BFLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQ3JELENBQUMsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FDbkMsQ0FBQTtRQUVELE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDO2FBQzVDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQzthQUN2QyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBRWQsTUFBTSxPQUFPLEdBQUc7WUFDZCxNQUFNO1lBQ04sUUFBUTtZQUNSLEtBQUssRUFBRTtnQkFDTCxVQUFVLEVBQUUsUUFBUTtnQkFDcEIsV0FBVyxFQUFFLFNBQVMsQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDO2dCQUMzQyxXQUFXLEVBQUUsU0FBUztnQkFDdEIsWUFBWSxFQUFFLFNBQVMsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDO2dCQUM5QyxpQkFBaUIsRUFBRSxNQUFNO2dCQUN6QixTQUFTLEVBQUUsU0FBUyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUM7Z0JBQ3JDLGFBQWE7Z0JBQ2IsWUFBWTtnQkFDWixrQkFBa0IsRUFBRSxTQUFTLENBQUMsWUFBWSxFQUFFLGdCQUFnQixDQUFDO2dCQUM3RCxZQUFZO2dCQUNaLGVBQWU7Z0JBQ2YsYUFBYTtnQkFDYixjQUFjO2FBQ2Y7WUFDRCxlQUFlO1lBQ2YsU0FBUztZQUNULFlBQVk7WUFDWixXQUFXO1lBQ1gsUUFBUTtZQUNSLFdBQVcsRUFBRSxHQUFHLENBQUMsV0FBVyxFQUFFO1lBQzlCLHNFQUFzRTtZQUN0RSxtRUFBbUU7WUFDbkUsa0NBQWtDO1lBQ2xDLE1BQU0sRUFBRTtnQkFDTixhQUFhLEVBQUUsTUFBTSxDQUFDLE1BQU07Z0JBQzVCLFVBQVU7Z0JBQ1YsYUFBYSxFQUFFLFlBQVksQ0FBQyxNQUFNO2dCQUNsQyxXQUFXO2dCQUNYLFdBQVc7Z0JBQ1gsVUFBVSxFQUFFLElBQUk7Z0JBQ2hCLFlBQVksRUFBRSxZQUFZLENBQUMsV0FBVyxFQUFFO2dCQUN4QyxHQUFHLEVBQUUsR0FBRyxDQUFDLFdBQVcsRUFBRTthQUN2QjtTQUNGLENBQUE7UUFFRCxvRUFBb0U7UUFDcEUsSUFBSSxDQUFDO1lBQ0gsSUFBSSxLQUFLLEVBQUUsQ0FBQztnQkFDVixNQUFNLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxNQUFNLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1lBQ2pFLENBQUM7UUFDSCxDQUFDO1FBQUMsTUFBTSxDQUFDO1lBQ1AsaUNBQWlDO1FBQ25DLENBQUM7UUFFRCxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQTtJQUNoRCxDQUFDO0lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztRQUNmLE9BQU8sQ0FBQyxLQUFLLENBQUMsbUNBQW1DLEVBQUUsS0FBSyxDQUFDLENBQUE7UUFDekQsT0FBTyxHQUFHO2FBQ1AsTUFBTSxDQUFDLEdBQUcsQ0FBQzthQUNYLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxxQ0FBcUMsRUFBRSxDQUFDLENBQUE7SUFDM0QsQ0FBQztBQUNILENBQUMifQ==