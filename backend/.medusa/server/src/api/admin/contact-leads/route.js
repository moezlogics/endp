"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
const contact_leads_1 = require("../../../modules/contact-leads");
/**
 * GET /admin/contact-leads — list all leads, newest first.
 * Supports ?status=new|read|replied|archived filter.
 */
async function GET(req, res) {
    const svc = req.scope.resolve(contact_leads_1.CONTACT_LEADS_MODULE);
    const filter = {};
    if (req.query.status)
        filter.status = req.query.status;
    const [leads, count] = await svc.listAndCountContactLeads(filter, {
        order: { created_at: "DESC" },
        take: 100,
    });
    res.json({ leads, count });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL2NvbnRhY3QtbGVhZHMvcm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFRQSxrQkFZQztBQW5CRCxrRUFBcUU7QUFHckU7OztHQUdHO0FBQ0ksS0FBSyxVQUFVLEdBQUcsQ0FBQyxHQUFrQixFQUFFLEdBQW1CO0lBQy9ELE1BQU0sR0FBRyxHQUE4QixHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxvQ0FBb0IsQ0FBQyxDQUFBO0lBRTlFLE1BQU0sTUFBTSxHQUF3QixFQUFFLENBQUE7SUFDdEMsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU07UUFBRSxNQUFNLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFBO0lBRXRELE1BQU0sQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEdBQUcsTUFBTyxHQUFXLENBQUMsd0JBQXdCLENBQUMsTUFBTSxFQUFFO1FBQ3pFLEtBQUssRUFBRSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQVM7UUFDcEMsSUFBSSxFQUFFLEdBQUc7S0FDVixDQUFDLENBQUE7SUFFRixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUE7QUFDNUIsQ0FBQyJ9