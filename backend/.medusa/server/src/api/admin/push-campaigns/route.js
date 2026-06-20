"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
exports.POST = POST;
const push_notifications_1 = require("../../../modules/push-notifications");
const web_push_client_1 = require("../../../modules/push-notifications/lib/web-push-client");
/**
 * GET /admin/push-campaigns
 *   List campaign history (newest first) — drives the dashboard table.
 */
async function GET(req, res) {
    const svc = req.scope.resolve(push_notifications_1.PUSH_NOTIFICATIONS_MODULE);
    const [campaigns, count] = await svc.listAndCountPushCampaigns({}, { order: { created_at: "DESC" }, take: 100 });
    res.json({ campaigns, count });
}
/**
 * POST /admin/push-campaigns
 *   Create + send a campaign in one shot. Filters are applied to pick
 *   the active subscriber set, then `web-push` fans out the payload.
 *
 * Body:
 *   {
 *     title:        string,
 *     body:         string,
 *     icon_url?:    string,    // small icon (96x96 or 192x192)
 *     image_url?:   string,    // rich media banner
 *     action_url?:  string,    // where the click goes
 *     filter_cities?:  string[],
 *     filter_states?:  string[],
 *     dry_run?: boolean
 *   }
 */
async function POST(req, res) {
    const svc = req.scope.resolve(push_notifications_1.PUSH_NOTIFICATIONS_MODULE);
    const logger = req.scope.resolve("logger");
    const body = (req.body || {});
    const title = (body.title || "").toString().trim();
    const bodyText = (body.body || "").toString().trim();
    if (!title)
        return res.status(400).json({ error: "title is required" });
    if (!bodyText)
        return res.status(400).json({ error: "body is required" });
    const cfg = (0, web_push_client_1.configureWebPush)();
    if (!cfg.configured) {
        return res.status(503).json({
            error: "VAPID keys not configured. Set VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY in the backend .env (run `npx web-push generate-vapid-keys`).",
        });
    }
    const toList = (v) => Array.isArray(v) ? v.filter(Boolean).map(String) : null;
    const filterCities = toList(body.filter_cities);
    const filterStates = toList(body.filter_states);
    const filterCountries = toList(body.filter_countries);
    const filterDeviceTypes = toList(body.filter_device_types);
    const filterOs = toList(body.filter_os);
    const filterBrowsers = toList(body.filter_browsers);
    const filterGenders = toList(body.filter_genders);
    const customersOnly = body.filter_customers_only === true;
    // Find target subscribers
    const filter = { is_active: true };
    // We can't combine OR filters easily through the service, so we fetch
    // all active subscribers and filter in-memory (typical campaign sets
    // are < 100k; suitable for a single Node process). For production
    // scale this should be a worker queue + DB-side filtering.
    const all = await svc.listPushSubscriptions(filter, {
        take: 100_000,
    });
    const matchOneOf = (val, list) => {
        if (!list || list.length === 0)
            return true;
        if (!val)
            return false;
        const set = new Set(list.map((c) => c.toLowerCase()));
        return set.has(String(val).toLowerCase());
    };
    let targets = all.filter((s) => {
        if (!matchOneOf(s.city, filterCities))
            return false;
        if (!matchOneOf(s.state, filterStates))
            return false;
        if (!matchOneOf(s.country, filterCountries))
            return false;
        if (!matchOneOf(s.device_type, filterDeviceTypes))
            return false;
        if (!matchOneOf(s.os, filterOs))
            return false;
        if (!matchOneOf(s.device_browser, filterBrowsers))
            return false;
        if (!matchOneOf(s.gender, filterGenders))
            return false;
        if (customersOnly && !s.customer_id)
            return false;
        return true;
    });
    if (body.dry_run) {
        return res.json({
            success: true,
            dry_run: true,
            total_targeted: targets.length,
        });
    }
    // Persist the campaign first so we have an ID for the audit log
    const [campaign] = await svc.createPushCampaigns([
        {
            title,
            body: bodyText,
            icon_url: body.icon_url ? String(body.icon_url) : null,
            image_url: body.image_url ? String(body.image_url) : null,
            action_url: body.action_url ? String(body.action_url) : null,
            filter_cities: filterCities ? JSON.stringify(filterCities) : null,
            filter_states: filterStates ? JSON.stringify(filterStates) : null,
            filter_countries: filterCountries ? JSON.stringify(filterCountries) : null,
            filter_device_types: filterDeviceTypes
                ? JSON.stringify(filterDeviceTypes)
                : null,
            filter_os: filterOs ? JSON.stringify(filterOs) : null,
            filter_browsers: filterBrowsers ? JSON.stringify(filterBrowsers) : null,
            filter_genders: filterGenders ? JSON.stringify(filterGenders) : null,
            filter_customers_only: customersOnly,
            total_targeted: targets.length,
            total_sent: 0,
            total_failed: 0,
            status: "sending",
        },
    ]);
    // Build the payload the SW will receive. We thread the backend URL
    // and publishable key through so the SW can post click events back
    // for CTR tracking. (See `public/sw.js` `trackClick`.)
    const payload = {
        title,
        body: bodyText,
        icon: body.icon_url || undefined,
        image: body.image_url || undefined,
        url: body.action_url || "/",
        tag: `campaign-${campaign.id}`,
        backend_url: process.env.STORE_PUBLIC_BACKEND_URL ||
            process.env.MEDUSA_BACKEND_URL ||
            undefined,
        publishable_key: process.env.MEDUSA_PUBLISHABLE_KEY ||
            process.env.STORE_PUBLISHABLE_KEY ||
            undefined,
        data: { campaign_id: campaign.id },
    };
    // Fan out
    const result = await (0, web_push_client_1.sendPushBatch)(targets.map((t) => ({
        id: t.id,
        endpoint: t.endpoint,
        p256dh: t.p256dh,
        auth: t.auth,
    })), payload);
    // Mark expired subscriptions for pruning
    if (result.expiredIds.length > 0) {
        try {
            await svc.deletePushSubscriptions(result.expiredIds);
        }
        catch (e) {
            logger?.warn?.(`[PushCampaign] Failed to prune ${result.expiredIds.length} expired subs: ${e.message}`);
        }
    }
    // Update campaign with final stats
    await svc.updatePushCampaigns({
        id: campaign.id,
        total_sent: result.sent,
        total_failed: result.failed,
        status: result.failed === result.total ? "failed" : "sent",
        sent_at: new Date(),
    });
    res.json({
        success: true,
        campaign_id: campaign.id,
        total_targeted: result.total,
        total_sent: result.sent,
        total_failed: result.failed,
        expired_pruned: result.expiredIds.length,
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL3B1c2gtY2FtcGFpZ25zL3JvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBWUEsa0JBU0M7QUFtQkQsb0JBMEpDO0FBak1ELDRFQUErRTtBQUUvRSw2RkFHZ0U7QUFFaEU7OztHQUdHO0FBQ0ksS0FBSyxVQUFVLEdBQUcsQ0FBQyxHQUFrQixFQUFFLEdBQW1CO0lBQy9ELE1BQU0sR0FBRyxHQUE2QixHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FDckQsOENBQXlCLENBQzFCLENBQUE7SUFDRCxNQUFNLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxHQUFHLE1BQU8sR0FBVyxDQUFDLHlCQUF5QixDQUNyRSxFQUFFLEVBQ0YsRUFBRSxLQUFLLEVBQUUsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFTLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUNwRCxDQUFBO0lBQ0QsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFBO0FBQ2hDLENBQUM7QUFFRDs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUNJLEtBQUssVUFBVSxJQUFJLENBQUMsR0FBa0IsRUFBRSxHQUFtQjtJQUNoRSxNQUFNLEdBQUcsR0FBNkIsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQ3JELDhDQUF5QixDQUMxQixDQUFBO0lBQ0QsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFRLENBQUE7SUFFakQsTUFBTSxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBd0IsQ0FBQTtJQUNwRCxNQUFNLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUE7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