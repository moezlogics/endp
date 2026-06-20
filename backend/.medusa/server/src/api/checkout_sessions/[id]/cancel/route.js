"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = void 0;
const cancel_checkout_session_1 = require("../../../../workflows/cancel-checkout-session");
const POST = async (req, res) => {
    const responseHeaders = {
        "Idempotency-Key": req.headers["idempotency-key"],
        "Request-Id": req.headers["request-id"],
    };
    try {
        const { result } = await (0, cancel_checkout_session_1.cancelCheckoutSessionWorkflow)(req.scope)
            .run({
            input: {
                cart_id: req.params.id,
            },
            context: {
                idempotencyKey: req.headers["idempotency-key"],
            }
        });
        res.set(responseHeaders).json(result);
    }
    catch (error) {
        const medusaError = error;
        res.set(responseHeaders).status(405).json({
            messages: [
                {
                    type: "error",
                    code: "invalid",
                    content_type: "plain",
                    content: medusaError.message,
                }
            ]
        });
    }
};
exports.POST = POST;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2NoZWNrb3V0X3Nlc3Npb25zL1tpZF0vY2FuY2VsL3JvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLDJGQUE2RjtBQUd0RixNQUFNLElBQUksR0FBRyxLQUFLLEVBQ3ZCLEdBQWtCLEVBQ2xCLEdBQW1CLEVBQ25CLEVBQUU7SUFDRixNQUFNLGVBQWUsR0FBRztRQUN0QixpQkFBaUIsRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFXO1FBQzNELFlBQVksRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBVztLQUNsRCxDQUFBO0lBQ0QsSUFBSSxDQUFDO1FBQ0gsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLE1BQU0sSUFBQSx1REFBNkIsRUFBQyxHQUFHLENBQUMsS0FBSyxDQUFDO2FBQzlELEdBQUcsQ0FBQztZQUNILEtBQUssRUFBRTtnQkFDTCxPQUFPLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFO2FBQ3ZCO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLGNBQWMsRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFXO2FBQ3pEO1NBQ0YsQ0FBQyxDQUFBO1FBRUosR0FBRyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDdkMsQ0FBQztJQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7UUFDZixNQUFNLFdBQVcsR0FBRyxLQUFvQixDQUFBO1FBQ3hDLEdBQUcsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUN4QyxRQUFRLEVBQUU7Z0JBQ1I7b0JBQ0UsSUFBSSxFQUFFLE9BQU87b0JBQ2IsSUFBSSxFQUFFLFNBQVM7b0JBQ2YsWUFBWSxFQUFFLE9BQU87b0JBQ3JCLE9BQU8sRUFBRSxXQUFXLENBQUMsT0FBTztpQkFDN0I7YUFDRjtTQUNGLENBQUMsQ0FBQTtJQUNKLENBQUM7QUFDSCxDQUFDLENBQUE7QUFqQ1ksUUFBQSxJQUFJLFFBaUNoQiJ9