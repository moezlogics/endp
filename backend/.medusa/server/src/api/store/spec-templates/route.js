"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
const spec_template_1 = require("../../../modules/spec-template");
async function GET(req, res) {
    const svc = req.scope.resolve(spec_template_1.SPEC_TEMPLATE_MODULE);
    const [specTemplates, count] = await svc.listAndCountSpecTemplates({}, { order: { sort_order: "ASC", name: "ASC" }, take: 500 });
    res.json({ spec_templates: specTemplates, count });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL3NwZWMtdGVtcGxhdGVzL3JvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUEsa0JBU0M7QUFaRCxrRUFBcUU7QUFHOUQsS0FBSyxVQUFVLEdBQUcsQ0FBQyxHQUFrQixFQUFFLEdBQW1CO0lBQy9ELE1BQU0sR0FBRyxHQUE4QixHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxvQ0FBb0IsQ0FBQyxDQUFBO0lBRTlFLE1BQU0sQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLEdBQUcsTUFBTSxHQUFHLENBQUMseUJBQXlCLENBQ2hFLEVBQUUsRUFDRixFQUFFLEtBQUssRUFBRSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBUyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FDaEUsQ0FBQTtJQUVELEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxjQUFjLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUE7QUFDcEQsQ0FBQyJ9