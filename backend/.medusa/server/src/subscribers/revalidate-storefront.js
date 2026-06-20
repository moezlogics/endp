"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = revalidateStorefrontHandler;
/**
 * Storefront cache-invalidation bridge.
 *
 * Whenever a public-facing entity changes in Medusa (a product is
 * created, a category is renamed, a collection is deleted, etc.)
 * this subscriber POSTs to the Next.js storefront's
 * `/api/revalidate` route so it can drop the stale fetch cache. The
 * route on the storefront side then calls `revalidateTag(...)` for
 * each tag we send, and visitors immediately start seeing fresh
 * data on their next request.
 *
 * Configuration (set in the backend `.env`):
 *   STOREFRONT_URL       https://your-storefront.com   (no trailing slash)
 *   REVALIDATE_SECRET    same shared secret as the storefront `.env`
 *
 * The event → tag mapping mirrors the global tag whitelist on the
 * storefront in `src/lib/data/cookies.ts::GLOBAL_REVALIDATE_TAGS`.
 *
 * Failure handling: this subscriber NEVER throws. A revalidation
 * miss should never block an admin save. We log and move on.
 */
function eventToTags(eventName) {
    if (eventName.startsWith("product.")) {
        return ["products", "collections", "categories"];
    }
    if (eventName.startsWith("product-variant.")) {
        return ["products"];
    }
    if (eventName.startsWith("product-category.")) {
        return ["categories", "products"];
    }
    if (eventName.startsWith("product-collection.")) {
        return ["collections", "products"];
    }
    if (eventName.startsWith("region.")) {
        return ["regions"];
    }
    if (eventName.startsWith("sales-channel.")) {
        return ["sales-channels", "products"];
    }
    if (eventName.startsWith("shipping-option.")) {
        return ["shipping-options"];
    }
    if (eventName.startsWith("price-list.") || eventName.startsWith("price.")) {
        return ["products"];
    }
    if (eventName.startsWith("site-settings.")) {
        return ["site-settings"];
    }
    if (eventName.startsWith("banner.")) {
        return ["banners"];
    }
    if (eventName.startsWith("brand.")) {
        return ["brands", "products"];
    }
    if (eventName.startsWith("blog.") || eventName.startsWith("blog-post.")) {
        return ["blog"];
    }
    return [];
}
async function revalidateStorefrontHandler({ event, }) {
    const storefrontUrl = process.env.STOREFRONT_URL;
    const secret = process.env.REVALIDATE_SECRET;
    if (!storefrontUrl || !secret) {
        console.warn("[revalidate-storefront] STOREFRONT_URL or REVALIDATE_SECRET not set; skipping revalidation for event '" +
            event.name +
            "'");
        return;
    }
    const tags = eventToTags(event.name);
    if (tags.length === 0) {
        return;
    }
    try {
        const res = await fetch(`${storefrontUrl.replace(/\/+$/, "")}/api/revalidate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-revalidate-secret": secret,
            },
            body: JSON.stringify({ tags }),
            signal: AbortSignal.timeout(5_000),
        });
        if (!res.ok) {
            const body = await res.text().catch(() => "");
            console.warn(`[revalidate-storefront] storefront returned ${res.status} for '${event.name}' (tags=${tags.join(",")}): ${body.slice(0, 200)}`);
        }
    }
    catch (err) {
        console.warn(`[revalidate-storefront] failed for event '${event.name}' (tags=${tags.join(",")}):`, err.message);
    }
}
exports.config = {
    event: [
        "product.created",
        "product.updated",
        "product.deleted",
        "product-variant.created",
        "product-variant.updated",
        "product-variant.deleted",
        "product-category.created",
        "product-category.updated",
        "product-category.deleted",
        "product-collection.created",
        "product-collection.updated",
        "product-collection.deleted",
        "region.created",
        "region.updated",
        "region.deleted",
        "sales-channel.created",
        "sales-channel.updated",
        "sales-channel.deleted",
        "shipping-option.created",
        "shipping-option.updated",
        "shipping-option.deleted",
        "price-list.created",
        "price-list.updated",
        "price-list.deleted",
        "site-settings.created",
        "site-settings.updated",
        "site-settings.deleted",
        "banner.created",
        "banner.updated",
        "banner.deleted",
        "brand.created",
        "brand.updated",
        "brand.deleted",
        "blog-post.created",
        "blog-post.updated",
        "blog-post.deleted",
    ],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV2YWxpZGF0ZS1zdG9yZWZyb250LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3N1YnNjcmliZXJzL3JldmFsaWRhdGUtc3RvcmVmcm9udC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFnRUEsOENBOENDO0FBNUdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILFNBQVMsV0FBVyxDQUFDLFNBQWlCO0lBQ3BDLElBQUksU0FBUyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDO1FBQ3JDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsYUFBYSxFQUFFLFlBQVksQ0FBQyxDQUFBO0lBQ2xELENBQUM7SUFDRCxJQUFJLFNBQVMsQ0FBQyxVQUFVLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDO1FBQzdDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUNyQixDQUFDO0lBQ0QsSUFBSSxTQUFTLENBQUMsVUFBVSxDQUFDLG1CQUFtQixDQUFDLEVBQUUsQ0FBQztRQUM5QyxPQUFPLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQyxDQUFBO0lBQ25DLENBQUM7SUFDRCxJQUFJLFNBQVMsQ0FBQyxVQUFVLENBQUMscUJBQXFCLENBQUMsRUFBRSxDQUFDO1FBQ2hELE9BQU8sQ0FBQyxhQUFhLEVBQUUsVUFBVSxDQUFDLENBQUE7SUFDcEMsQ0FBQztJQUNELElBQUksU0FBUyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDO1FBQ3BDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUNwQixDQUFDO0lBQ0QsSUFBSSxTQUFTLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQztRQUMzQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsVUFBVSxDQUFDLENBQUE7SUFDdkMsQ0FBQztJQUNELElBQUksU0FBUyxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUM7UUFDN0MsT0FB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