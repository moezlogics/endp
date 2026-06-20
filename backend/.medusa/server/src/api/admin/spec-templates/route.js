"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
exports.POST = POST;
const spec_template_1 = require("../../../modules/spec-template");
async function GET(req, res) {
    const svc = req.scope.resolve(spec_template_1.SPEC_TEMPLATE_MODULE);
    const [specTemplates, count] = await svc.listAndCountSpecTemplates({}, { order: { sort_order: "ASC", name: "ASC" }, take: 500 });
    res.json({ spec_templates: specTemplates, count });
}
async function POST(req, res) {
    const svc = req.scope.resolve(spec_template_1.SPEC_TEMPLATE_MODULE);
    const body = (req.body || {});
    if (!body.name || typeof body.name !== "string") {
        return res.status(400).json({ error: "name is required" });
    }
    const handle = body.handle ||
        body.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");
    // If handle already exists, update it to make seed operations idempotent
    const existing = await svc.listSpecTemplates({ handle });
    if (existing.length > 0) {
        const [updated] = await svc.updateSpecTemplates([
            {
                id: existing[0].id,
                name: body.name,
                description: body.description ?? null,
                icon: body.icon ?? "ph-list-checks",
                is_preset: body.is_preset === true,
                sort_order: typeof body.sort_order === "number"
                    ? body.sort_order
                    : parseInt(body.sort_order, 10) || 0,
                template_data: body.template_data ?? { groups: [] },
            },
        ]);
        return res.json({ spec_template: updated });
    }
    const [specTemplate] = await svc.createSpecTemplates([
        {
            name: body.name,
            handle,
            description: body.description ?? null,
            icon: body.icon ?? "ph-list-checks",
            is_preset: body.is_preset === true,
            sort_order: typeof body.sort_order === "number"
                ? body.sort_order
                : parseInt(body.sort_order, 10) || 0,
            template_data: body.template_data ?? { groups: [] },
        },
    ]);
    res.status(201).json({ spec_template: specTemplate });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL3NwZWMtdGVtcGxhdGVzL3JvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUEsa0JBU0M7QUFFRCxvQkFtREM7QUFqRUQsa0VBQXFFO0FBRzlELEtBQUssVUFBVSxHQUFHLENBQUMsR0FBa0IsRUFBRSxHQUFtQjtJQUMvRCxNQUFNLEdBQUcsR0FBOEIsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsb0NBQW9CLENBQUMsQ0FBQTtJQUU5RSxNQUFNLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxHQUFHLE1BQU0sR0FBRyxDQUFDLHlCQUF5QixDQUNoRSxFQUFFLEVBQ0YsRUFBRSxLQUFLLEVBQUUsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQVMsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQ2hFLENBQUE7SUFFRCxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsY0FBYyxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFBO0FBQ3BELENBQUM7QUFFTSxLQUFLLFVBQVUsSUFBSSxDQUFDLEdBQWtCLEVBQUUsR0FBbUI7SUFDaEUsTUFBTSxHQUFHLEdBQThCLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLG9DQUFvQixDQUFDLENBQUE7SUFDOUUsTUFBTSxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBd0IsQ0FBQTtJQUVwRCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFLENBQUM7UUFDaEQsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxrQkFBa0IsRUFBRSxDQUFDLENBQUE7SUFDNUQsQ0FBQztJQUVELE1BQU0sTUFBTSxHQUNWLElBQUksQ0FBQyxNQUFNO1FBQ1gsSUFBSSxDQUFDLElBQUk7YUFDTixXQUFXLEVBQUU7YUFDYixPQUFPLENBQUMsYUFBYSxFQUFFLEdBQUcsQ0FBQzthQUMzQixPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBRTFCLHlFQUF5RTtJQUN6RSxNQUFNLFFBQVEsR0FBRyxNQUFNLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUE7SUFDeEQsSUFBSSxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDO1FBQ3hCLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxNQUFNLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQztZQUM5QztnQkFDRSxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ2xCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtnQkFDZixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJO2dCQUNyQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksSUFBSSxnQkFBZ0I7Z0JBQ25DLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxLQUFLLElBQUk7Z0JBQ2xDLFVBQVUsRUFDUixPQUFPLElBQUksQ0FBQyxVQUFVLEtBQUssUUFBUTtvQkFDakMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVO29CQUNqQixDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQztnQkFDeEMsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO2FBQzdDO1NBQ1QsQ0FBQyxDQUFBO1FBQ0YsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsYUFBYSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUE7SUFDN0MsQ0FBQztJQUVELE1BQU0sQ0FBQyxZQUFZLENBQUMsR0FBRyxNQUFNLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQztRQUNuRDtZQUNFLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLE1BQU07WUFDTixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJO1lBQ3JDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxJQUFJLGdCQUFnQjtZQUNuQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsS0FBSyxJQUFJO1lBQ2xDLFVBQVUsRUFDUixPQUFPLElBQUksQ0FBQyxVQUFVLEtBQUssUUFBUTtnQkFDakMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVO2dCQUNqQixDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQztZQUN4QyxhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWEsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7U0FDN0M7S0FDVCxDQUFDLENBQUE7SUFFRixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFBO0FBQ3ZELENBQUMifQ==