"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
const contact_leads_1 = require("../../../modules/contact-leads");
/**
 * POST /store/contact — submit a contact form lead.
 * Public endpoint — no auth required.
 *
 * After saving the lead, emits `contact.created` so the notification
 * subscriber can send an admin alert email.
 */
async function POST(req, res) {
    const svc = req.scope.resolve(contact_leads_1.CONTACT_LEADS_MODULE);
    const body = (req.body || {});
    const name = (body.name || "").toString().trim();
    const email = (body.email || "").toString().trim();
    const message = (body.message || "").toString().trim();
    if (!name)
        return res.status(400).json({ error: "Name is required" });
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: "Valid email is required" });
    }
    if (!message)
        return res.status(400).json({ error: "Message is required" });
    const phone = body.phone ? body.phone.toString().trim() : null;
    const subject = body.subject ? body.subject.toString().trim() : null;
    const [lead] = await svc.createContactLeads([
        {
            name,
            email,
            phone,
            subject,
            message,
            status: "new",
        },
    ]);
    // Emit event for notification subscriber
    try {
        const eventBus = req.scope.resolve("event_bus");
        if (eventBus?.emit) {
            await eventBus.emit("contact.created", {
                name,
                email,
                phone: phone || "",
                subject: subject || "",
                message,
            });
        }
    }
    catch {
        // Non-critical — don't fail the request if event emit fails
    }
    res.status(201).json({ success: true, id: lead.id });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL2NvbnRhY3Qvcm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFXQSxvQkE2Q0M7QUF2REQsa0VBQXFFO0FBR3JFOzs7Ozs7R0FNRztBQUNJLEtBQUssVUFBVSxJQUFJLENBQUMsR0FBa0IsRUFBRSxHQUFtQjtJQUNoRSxNQUFNLEdBQUcsR0FBOEIsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsb0NBQW9CLENBQUMsQ0FBQTtJQUM5RSxNQUFNLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUF3QixDQUFBO0lBRXBELE1BQU0sSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtJQUNoRCxNQUFNLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUE7SUFDbEQsTUFBTSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFBO0lBRXRELElBQUksQ0FBQyxJQUFJO1FBQUUsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxrQkFBa0IsRUFBRSxDQUFDLENBQUE7SUFDckUsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLDRCQUE0QixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO1FBQ3hELE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUseUJBQXlCLEVBQUUsQ0FBQyxDQUFBO0lBQ25FLENBQUM7SUFDRCxJQUFJLENBQUMsT0FBTztRQUFFLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUscUJBQXFCLEVBQUUsQ0FBQyxDQUFBO0lBRTNFLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQTtJQUM5RCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUE7SUFFcEUsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU8sR0FBVyxDQUFDLGtCQUFrQixDQUFDO1FBQ25EO1lBQ0UsSUFBSTtZQUNKLEtBQUs7WUFDTCxLQUFLO1lBQ0wsT0FBTztZQUNQLE9BQU87WUFDUCxNQUFNLEVBQUUsS0FBSztTQUNkO0tBQ0YsQ0FBQyxDQUFBO0lBRUYseUNBQXlDO0lBQ3pDLElBQUksQ0FBQztRQUNILE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBUSxDQUFBO1FBQ3RELElBQUksUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDO1lBQ25CLE1BQU0sUUFBUSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtnQkFDckMsSUFBSTtnQkFDSixLQUFLO2dCQUNMLEtBQUssRUFBRSxLQUFLLElBQUksRUFBRTtnQkFDbEIsT0FBTyxFQUFFLE9BQU8sSUFBSSxFQUFFO2dCQUN0QixPQUFPO2FBQ1IsQ0FBQyxDQUFBO1FBQ0osQ0FBQztJQUNILENBQUM7SUFBQyxNQUFNLENBQUM7UUFDUCw0REFBNEQ7SUFDOUQsQ0FBQztJQUVELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUE7QUFDdEQsQ0FBQyJ9