"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
exports.POST = POST;
const banners_1 = require("../../../modules/banners");
/**
 * GET /admin/banners
 *
 * Returns every banner (active + inactive) ordered by `sort_order ASC`
 * so the admin always sees the same order as the storefront carousel.
 */
async function GET(req, res) {
    const svc = req.scope.resolve(banners_1.BANNERS_MODULE);
    const [banners, count] = await svc.listAndCountBanners({}, { order: { sort_order: "ASC" }, take: 100 });
    res.json({ banners, count });
}
/**
 * POST /admin/banners — create a banner.
 *
 * `image_url` is the only hard requirement; everything else (headline,
 * link, CTA label, mobile variant, sort order) is optional. New banners
 * default to active so they show up on the storefront immediately.
 */
async function POST(req, res) {
    const svc = req.scope.resolve(banners_1.BANNERS_MODULE);
    const body = (req.body || {});
    if (!body.image_url || typeof body.image_url !== "string") {
        return res.status(400).json({ error: "image_url is required" });
    }
    const [banner] = await svc.createBanners([
        {
            title: body.title ?? null,
            subtitle: body.subtitle ?? null,
            image_url: body.image_url,
            image_url_mobile: body.image_url_mobile ?? null,
            link_url: body.link_url ?? null,
            cta_label: body.cta_label ?? null,
            text_position: body.text_position ?? "bottom-left",
            theme: body.theme ?? "dark",
            sort_order: typeof body.sort_order === "number"
                ? body.sort_order
                : parseInt(body.sort_order, 10) || 0,
            is_active: body.is_active !== false,
        },
    ]);
    res.status(201).json({ banner });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL2Jhbm5lcnMvcm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFVQSxrQkFTQztBQVNELG9CQTJCQztBQXRERCxzREFBeUQ7QUFHekQ7Ozs7O0dBS0c7QUFDSSxLQUFLLFVBQVUsR0FBRyxDQUFDLEdBQWtCLEVBQUUsR0FBbUI7SUFDL0QsTUFBTSxHQUFHLEdBQXlCLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLHdCQUFjLENBQUMsQ0FBQTtJQUVuRSxNQUFNLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxHQUFHLE1BQU0sR0FBRyxDQUFDLG1CQUFtQixDQUNwRCxFQUFFLEVBQ0YsRUFBRSxLQUFLLEVBQUUsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFTLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUNuRCxDQUFBO0lBRUQsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFBO0FBQzlCLENBQUM7QUFFRDs7Ozs7O0dBTUc7QUFDSSxLQUFLLFVBQVUsSUFBSSxDQUFDLEdBQWtCLEVBQUUsR0FBbUI7SUFDaEUsTUFBTSxHQUFHLEdBQXlCLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLHdCQUFjLENBQUMsQ0FBQTtJQUNuRSxNQUFNLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUF3QixDQUFBO0lBRXBELElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLE9BQU8sSUFBSSxDQUFDLFNBQVMsS0FBSyxRQUFRLEVBQUUsQ0FBQztRQUMxRCxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLHVCQUF1QixFQUFFLENBQUMsQ0FBQTtJQUNqRSxDQUFDO0lBRUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLE1BQU0sR0FBRyxDQUFDLGFBQWEsQ0FBQztRQUN2QztZQUNFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUk7WUFDekIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSTtZQUMvQixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDekIsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixJQUFJLElBQUk7WUFDL0MsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSTtZQUMvQixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJO1lBQ2pDLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYSxJQUFJLGFBQWE7WUFDbEQsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLElBQUksTUFBTTtZQUMzQixVQUFVLEVBQ1IsT0FBTyxJQUFJLENBQUMsVUFBVSxLQUFLLFFBQVE7Z0JBQ2pDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVTtnQkFDakIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUM7WUFDeEMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLEtBQUssS0FBSztTQUM3QjtLQUNULENBQUMsQ0FBQTtJQUVGLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQTtBQUNsQyxDQUFDIn0=