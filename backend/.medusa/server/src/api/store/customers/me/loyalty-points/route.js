"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
const loyalty_1 = require("../../../../../modules/loyalty");
async function GET(req, res) {
    const loyaltyModuleService = req.scope.resolve(loyalty_1.LOYALTY_MODULE);
    const points = await loyaltyModuleService.getPoints(req.auth_context.actor_id);
    res.json({
        points,
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL2N1c3RvbWVycy9tZS9sb3lhbHR5LXBvaW50cy9yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQVFBLGtCQWVDO0FBbEJELDREQUFnRTtBQUd6RCxLQUFLLFVBQVUsR0FBRyxDQUN2QixHQUErQixFQUMvQixHQUFtQjtJQUVuQixNQUFNLG9CQUFvQixHQUF5QixHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FDbEUsd0JBQWMsQ0FDZixDQUFBO0lBRUQsTUFBTSxNQUFNLEdBQUcsTUFBTSxvQkFBb0IsQ0FBQyxTQUFTLENBQ2pELEdBQUcsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUMxQixDQUFBO0lBRUQsR0FBRyxDQUFDLElBQUksQ0FBQztRQUNQLE1BQU07S0FDUCxDQUFDLENBQUE7QUFDSixDQUFDIn0=