"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
exports.GET = GET;
const utils_1 = require("@medusajs/framework/utils");
const push_notifications_1 = require("../../../modules/push-notifications");
const web_push_client_1 = require("../../../modules/push-notifications/lib/web-push-client");
/**
 * Notification diagnostics endpoint.
 *
 * Single POST route with an `action` discriminator so the admin
 * page can run any test from one fetch URL. Each branch returns
 * verbose, structured output (status, error message, error code,
 * env config snapshot) so the marketer can read exactly what
 * happened without SSH-ing into the server.
 *
 * Actions:
 *   - test-smtp           Send a one-off test email through the
 *                         configured SMTP provider. Surfaces auth
 *                         errors, connection errors, etc.
 *   - test-push           Send a test push to one specific
 *                         subscription (or the most-recently
 *                         updated active subscription if none
 *                         specified).
 *   - test-order-event    Emit one of the order.* events for an
 *                         existing order so the order-notification
 *                         and order-push-notification subscribers
 *                         fire end-to-end.
 *   - run-abandoned-cart  Run the abandoned-cart cron job inline
 *                         so we can confirm it works without
 *                         waiting until midnight UTC.
 *   - config-snapshot     Dump the env / VAPID / SMTP config so
 *                         the marketer can see at a glance what
 *                         the running process *thinks* the config
 *                         is, separate from the .env on disk.
 */
async function POST(req, res) {
    const body = (req.body || {});
    const action = (body.action || "").toString();
    const logger = req.scope.resolve(utils_1.ContainerRegistrationKeys.LOGGER);
    try {
        switch (action) {
            case "config-snapshot":
                return res.json(buildConfigSnapshot());
            case "test-smtp":
                return res.json(await runTestSmtp(req, body));
            case "test-push":
                return res.json(await runTestPush(req, body));
            case "test-order-event":
                return res.json(await runTestOrderEvent(req, body));
            case "run-abandoned-cart":
                return res.json(await runAbandonedCartNow(req));
            default:
                return res.status(400).json({
                    ok: false,
                    error: `Unknown action "${action}". Valid: test-smtp, test-push, test-order-event, run-abandoned-cart, config-snapshot`,
                });
        }
    }
    catch (err) {
        logger?.error?.(`[notification-diagnostics] action=${action} threw: ${err?.message || err}`);
        return res.status(500).json({
            ok: false,
            action,
            error: err?.message || String(err),
            stack: err?.stack?.split("\n").slice(0, 8).join("\n"),
        });
    }
}
/** GET returns a quick config snapshot so the dashboard can render it on load. */
async function GET(_req, res) {
    res.json(buildConfigSnapshot());
}
function buildConfigSnapshot() {
    const cfg = (0, web_push_client_1.configureWebPush)();
    return {
        ok: true,
        smtp: {
            host: process.env.SMTP_HOST || "smtp.gmail.com (default)",
            port: Number(process.env.SMTP_PORT) || 587,
            user: maskEmail(process.env.SMTP_USER || ""),
            from: process.env.SMTP_FROM || process.env.SMTP_USER || "(empty)",
            from_name: process.env.SMTP_FROM_NAME ||
                process.env.STORE_NAME ||
                process.env.MEDUSA_STORE_NAME ||
                "(none — will fallback to email local-part)",
            from_header_preview: buildFromHeaderPreview(),
            password_set: Boolean(process.env.SMTP_PASS),
        },
        vapid: {
            configured: cfg.configured,
            public_key_set: Boolean(process.env.VAPID_PUBLIC_KEY),
            private_key_set: Boolean(process.env.VAPID_PRIVATE_KEY),
            subject: process.env.VAPID_SUBJECT || "(unset — using fallback)",
            public_key_fingerprint: cfg.publicKey
                ? `${cfg.publicKey.slice(0, 8)}…${cfg.publicKey.slice(-6)}`
                : null,
        },
        env: {
            worker_mode: process.env.MEDUSA_WORKER_MODE || "shared (default)",
            node_env: process.env.NODE_ENV || "(unset)",
            backend_url: process.env.MEDUSA_BACKEND_URL || "(unset)",
            storefront_url: process.env.STOREFRONT_URL || "(unset)",
        },
    };
}
/**
 * Mirror the SMTP service's From-header resolution so the admin can
 * see exactly what their recipients will see — without sending a
 * real email. Keep this in sync with `email-notifications/service.ts`.
 */
function buildFromHeaderPreview() {
    const fromRaw = (process.env.SMTP_FROM || process.env.SMTP_USER || "").trim();
    if (!fromRaw)
        return "(SMTP_FROM not set)";
    const fromAddressMatch = fromRaw.match(/<([^>]+)>/);
    const bareEmail = fromAddressMatch
        ? fromAddressMatch[1].trim()
        : fromRaw;
    const embeddedDisplayName = (() => {
        const m = fromRaw.match(/^\s*"?([^"<]+?)"?\s*</);
        return m ? m[1].trim() : "";
    })();
    const localPartFallback = (() => {
        const local = bareEmail.split("@")[0] || "";
        if (!local)
            return "";
        return local
            .replace(/[._-]+/g, " ")
            .replace(/\s+/g, " ")
            .trim()
            .replace(/\b\w/g, (c) => c.toUpperCase());
    })();
    const displayName = process.env.SMTP_FROM_NAME?.trim() ||
        process.env.STORE_NAME?.trim() ||
        process.env.MEDUSA_STORE_NAME?.trim() ||
        embeddedDisplayName ||
        localPartFallback ||
        "";
    return displayName ? `"${displayName}" <${bareEmail}>` : bareEmail;
}
function maskEmail(s) {
    if (!s)
        return "(empty)";
    const [local, domain] = s.split("@");
    if (!domain)
        return s.slice(0, 2) + "***";
    return `${local.slice(0, 2)}***@${domain}`;
}
/**
 * Send a test email through the SMTP provider. Routes through
 * `notificationModuleService.createNotifications` so we exercise
 * the same path the order subscriber uses — that way "if this
 * works, transactional emails should work too" is a real signal.
 */
async function runTestSmtp(req, body) {
    const to = (body.to || "").toString().trim();
    if (!to || !to.includes("@")) {
        return { ok: false, error: "`to` must be a valid email address" };
    }
    const notificationService = req.scope.resolve(utils_1.Modules.NOTIFICATION);
    const startedAt = Date.now();
    const result = await notificationService.createNotifications({
        to,
        channel: "email",
        template: "contact-received",
        data: {
            store_name: process.env.STORE_NAME || "Diagnostics Test",
            logo_url: undefined,
            copyright: undefined,
            theme: undefined,
            name: "Notification Diagnostics",
            email: process.env.SMTP_FROM || "no-reply@example.com",
            phone: "n/a",
            subject: "SMTP Diagnostic Test",
            message: "This is a test email sent from the admin notification-diagnostics endpoint. " +
                "If you can read it, the SMTP provider, credentials, and Medusa Notification " +
                "Module routing are all working correctly.",
        },
    });
    return {
        ok: true,
        duration_ms: Date.now() - startedAt,
        notification_ids: Array.isArray(result)
            ? result.map((r) => r?.id)
            : [result?.id],
        sent_to: to,
        note: "Check the recipient inbox AND the spam folder. Gmail can take 30–60s.",
    };
}
/**
 * Send a one-off push to a single subscription. If no `endpoint`
 * is given, we pick the most-recently-updated active subscription
 * — useful for "send a push to my own browser without copy-pasting
 * an endpoint URL."
 */
async function runTestPush(req, body) {
    const cfg = (0, web_push_client_1.configureWebPush)();
    if (!cfg.configured) {
        return {
            ok: false,
            error: "VAPID keys are not configured. Set VAPID_PUBLIC_KEY + VAPID_PRIVATE_KEY in backend .env and restart.",
        };
    }
    const svc = req.scope.resolve(push_notifications_1.PUSH_NOTIFICATIONS_MODULE);
    const requestedEndpoint = body.endpoint
        ? String(body.endpoint).trim()
        : null;
    const customerId = body.customer_id ? String(body.customer_id) : null;
    let subs = [];
    if (requestedEndpoint) {
        subs = await svc.listPushSubscriptions({ endpoint: requestedEndpoint });
    }
    else if (customerId) {
        subs = await svc.listPushSubscriptions({ customer_id: customerId, is_active: true }, { take: 5 });
    }
    else {
        subs = await svc.listPushSubscriptions({ is_active: true }, { order: { updated_at: "DESC" }, take: 1 });
    }
    if (!subs?.length) {
        return {
            ok: false,
            error: "No matching push subscription found. Subscribe a browser first, " +
                "or pass `endpoint` / `customer_id` in the request body.",
        };
    }
    const payload = {
        title: (body.title || "Diagnostic Push").toString(),
        body: (body.body ||
            "If you can read this, web-push + VAPID are working.").toString(),
        icon: body.icon_url ? String(body.icon_url) : undefined,
        url: body.action_url ? String(body.action_url) : "/",
        tag: `diagnostic-${Date.now()}`,
    };
    const results = [];
    for (const sub of subs) {
        const r = await (0, web_push_client_1.sendPushTo)({ id: sub.id, endpoint: sub.endpoint, p256dh: sub.p256dh, auth: sub.auth }, payload);
        results.push({
            subscription_id: sub.id,
            customer_id: sub.customer_id,
            city: sub.city,
            device_browser: sub.device_browser,
            success: r.success,
            status_code: r.statusCode,
            expired: r.expired,
            error: r.error,
        });
    }
    const sent = results.filter((r) => r.success).length;
    const failed = results.filter((r) => !r.success).length;
    return {
        ok: sent > 0,
        targeted: results.length,
        sent,
        failed,
        payload,
        results,
    };
}
/**
 * Manually emit an order.* event so the order-notification and
 * order-push-notification subscribers fire. Useful when
 * "I placed an order but no email" — we re-fire the event for
 * the same order id and watch the logs / inbox.
 */
async function runTestOrderEvent(req, body) {
    const eventName = (body.event_name || "order.placed").toString();
    let orderId = body.order_id ? String(body.order_id) : null;
    // If no order id, pick the most recent order so the test is one-click.
    if (!orderId) {
        const orderService = req.scope.resolve(utils_1.Modules.ORDER);
        const [latest] = await orderService.listOrders({}, { order: { created_at: "DESC" }, take: 1 });
        if (!latest) {
            return {
                ok: false,
                error: "No orders exist yet. Pass `order_id` or place an order first.",
            };
        }
        orderId = latest.id;
    }
    const eventBus = req.scope.resolve(utils_1.Modules.EVENT_BUS);
    await eventBus.emit({
        name: eventName,
        data: { id: orderId },
    });
    return {
        ok: true,
        emitted: eventName,
        order_id: orderId,
        note: "Subscribers run async. Check pm2 logs for [OrderNotification] / [PushNotification] lines within ~5s.",
    };
}
/**
 * Manually invoke the abandoned-cart cron job so the admin can
 * verify it works without waiting until midnight UTC. The job's
 * default file already encapsulates the full sweep — we just
 * dynamically import + call it with the live container.
 */
async function runAbandonedCartNow(req) {
    // Dynamic import keeps the diagnostic file decoupled — if the
    // job file is renamed we get a clear error here instead of
    // pulling everything into the bundle.
    const mod = await import("../../../jobs/send-abandoned-cart-notification.js");
    const handler = mod.default;
    if (typeof handler !== "function") {
        return {
            ok: false,
            error: "abandoned-cart-notification job did not export a default function",
        };
    }
    const startedAt = Date.now();
    await handler(req.scope);
    return {
        ok: true,
        duration_ms: Date.now() - startedAt,
        note: "See pm2 logs for `Sent N abandoned cart notifications` line.",
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL25vdGlmaWNhdGlvbi1kaWFnbm9zdGljcy9yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQXFDQSxvQkF3Q0M7QUFHRCxrQkFFQztBQWpGRCxxREFBOEU7QUFDOUUsNEVBQStFO0FBQy9FLDZGQUdnRTtBQUVoRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRCRztBQUNJLEtBQUssVUFBVSxJQUFJLENBQUMsR0FBa0IsRUFBRSxHQUFtQjtJQUNoRSxNQUFNLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUF3QixDQUFBO0lBQ3BELE1BQU0sTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtJQUU3QyxNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxpQ0FBeUIsQ0FBQyxNQUFNLENBQVEsQ0FBQTtJQUV6RSxJQUFJLENBQUM7UUFDSCxRQUFRLE1BQU0sRUFBRSxDQUFDO1lBQ2YsS0FBSyxpQkFBaUI7Z0JBQ3BCLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLENBQUE7WUFFeEMsS0FBSyxXQUFXO2dCQUNkLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLFdBQVcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQTtZQUUvQyxLQUFLLFdBQVc7Z0JBQ2QsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sV0FBVyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFBO1lBRS9DLEtBQUssa0JBQWtCO2dCQUNyQixPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMs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