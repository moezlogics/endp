"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
const loyalty_1 = require("../../../../../modules/loyalty");
/**
 * GET /store/customers/me/loyalty-transactions
 *
 * Returns the authenticated customer's loyalty point history (newest
 * first). Used by the storefront account → Loyalty section to render
 * the transaction list.
 *
 * ?take=50 — page size (default 50, max 200)
 */
async function GET(req, res) {
    const svc = req.scope.resolve(loyalty_1.LOYALTY_MODULE);
    const customerId = req.auth_context.actor_id;
    const take = Math.min(Number(req.query.take) || 50, 200);
    const [balance, transactions] = await Promise.all([
        svc.getPoints(customerId),
        svc.listTransactionsForCustomer(customerId, take),
    ]);
    res.json({
        balance,
        transactions,
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL2N1c3RvbWVycy9tZS9sb3lhbHR5LXRyYW5zYWN0aW9ucy9yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQWdCQSxrQkFrQkM7QUE5QkQsNERBQStEO0FBRy9EOzs7Ozs7OztHQVFHO0FBQ0ksS0FBSyxVQUFVLEdBQUcsQ0FDdkIsR0FBK0IsRUFDL0IsR0FBbUI7SUFFbkIsTUFBTSxHQUFHLEdBQXlCLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLHdCQUFjLENBQUMsQ0FBQTtJQUNuRSxNQUFNLFVBQVUsR0FBRyxHQUFHLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQTtJQUU1QyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUV4RCxNQUFNLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQyxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUNoRCxHQUFHLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQztRQUN6QixHQUFHLENBQUMsMkJBQTJCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQztLQUNsRCxDQUFDLENBQUE7SUFFRixHQUFHLENBQUMsSUFBSSxDQUFDO1FBQ1AsT0FBTztRQUNQLFlBQVk7S0FDYixDQUFDLENBQUE7QUFDSixDQUFDIn0=