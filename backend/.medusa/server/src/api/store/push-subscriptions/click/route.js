"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
const push_notifications_1 = require("../../../../modules/push-notifications");
/**
 * POST /store/push-subscriptions/click
 *
 * Fired by the service worker's `notificationclick` handler. Increments
 * the per-subscription click counter and the campaign's `total_clicked`
 * stat so the admin dashboard can report CTR.
 *
 * Body:
 *   {
 *     endpoint: string,    // unique identifier of the subscription
 *     campaign_id?: string // optional — only set for marketing pushes
 *   }
 *
 * Designed to be best-effort: never throws, always returns 200 even if
 * the subscription / campaign isn't found, because the SW retries are
 * not worth the noise.
 */
async function POST(req, res) {
    try {
        const svc = req.scope.resolve(push_notifications_1.PUSH_NOTIFICATIONS_MODULE);
        const body = (req.body || {});
        const endpoint = (body.endpoint || "").toString().trim();
        const campaignId = body.campaign_id ? String(body.campaign_id) : null;
        if (!endpoint) {
            return res.json({ success: true, ignored: true });
        }
        const now = new Date();
        // Bump per-subscription engagement
        const subs = await svc.listPushSubscriptions({ endpoint });
        const sub = subs?.[0];
        if (sub) {
            await svc.updatePushSubscriptions({
                id: sub.id,
                total_clicked: (sub.total_clicked || 0) + 1,
                last_clicked_at: now,
            });
        }
        // Bump campaign click stat
        if (campaignId) {
            try {
                const camps = await svc.listPushCampaigns({ id: campaignId });
                const camp = camps?.[0];
                if (camp) {
                    await svc.updatePushCampaigns({
                        id: camp.id,
                        total_clicked: (camp.total_clicked || 0) + 1,
                    });
                }
            }
            catch {
                // ignore — campaign may have been deleted
            }
        }
        res.json({ success: true });
    }
    catch {
        // Never fail the click handler — it would just spam the SW logs.
        res.json({ success: true });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL3B1c2gtc3Vic2NyaXB0aW9ucy9jbGljay9yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQXFCQSxvQkErQ0M7QUFuRUQsK0VBQWtGO0FBR2xGOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBQ0ksS0FBSyxVQUFVLElBQUksQ0FBQyxHQUFrQixFQUFFLEdBQW1CO0lBQ2hFLElBQUksQ0FBQztRQUNILE1BQU0sR0FBRyxHQUE2QixHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FDckQsOENBQXlCLENBQzFCLENBQUE7UUFDRCxNQUFNLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUF3QixDQUFBO1FBQ3BELE1BQU0sUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtRQUN4RCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUE7UUFFckUsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2QsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQTtRQUNuRCxDQUFDO1FBRUQsTUFBTSxHQUFHLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQTtRQUV0QixtQ0FBbUM7UUFDbkMsTUFBTSxJQUFJLEdBQUcsTUFBTyxHQUFXLENBQUMscUJBQXFCLENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFBO1FBQ25FLE1BQU0sR0FBRyxHQUFHLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ3JCLElBQUksR0FBRyxFQUFFLENBQUM7WUFDUixNQUFPLEdBQVcsQ0FBQyx1QkFBdUIsQ0FBQztnQkFDekMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFO2dCQUNWLGFBQWEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxhQUFhLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQztnQkFDM0MsZUFBZSxFQUFFLEdBQUc7YUFDckIsQ0FBQyxDQUFBO1FBQ0osQ0FBQztRQUVELDJCQUEyQjtRQUMzQixJQUFJLFVBQVUsRUFBRSxDQUFDO1lBQ2YsSUFBSSxDQUFDO2dCQUNILE1BQU0sS0FBSyxHQUFHLE1BQU8sR0FBVyxDQUFDLGlCQUFpQixDQUFDLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUE7Z0JBQ3RFLE1BQU0sSUFBSSxHQUFHLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO2dCQUN2QixJQUFJLElBQUksRUFBRSxDQUFDO29CQUNULE1BQU8sR0FBVyxDQUFDLG1CQUFtQixDQUFDO3dCQUNyQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUU7d0JBQ1gsYUFBYSxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDO3FCQUM3QyxDQUFDLENBQUE7Z0JBQ0osQ0FBQztZQUNILENBQUM7WUFBQyxNQUFNLENBQUM7Z0JBQ1AsMENBQTBDO1lBQzVDLENBQUM7UUFDSCxDQUFDO1FBRUQsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO0lBQzdCLENBQUM7SUFBQyxNQUFNLENBQUM7UUFDUCxpRUFBaUU7UUFDakUsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO0lBQzdCLENBQUM7QUFDSCxDQUFDIn0=