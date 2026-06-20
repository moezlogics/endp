"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = exports.PostCreateSessionSchema = void 0;
const zod_1 = require("@medusajs/framework/zod");
const create_checkout_session_1 = require("../../workflows/create-checkout-session");
exports.PostCreateSessionSchema = zod_1.z.object({
    items: zod_1.z.array(zod_1.z.object({
        id: zod_1.z.string(), // variant ID
        quantity: zod_1.z.number(),
    })),
    buyer: zod_1.z.object({
        first_name: zod_1.z.string(),
        email: zod_1.z.string(),
        phone_number: zod_1.z.string().optional(),
    }).optional(),
    fulfillment_address: zod_1.z.object({
        name: zod_1.z.string(),
        line_one: zod_1.z.string(),
        line_two: zod_1.z.string().optional(),
        city: zod_1.z.string(),
        state: zod_1.z.string(),
        country: zod_1.z.string(),
        postal_code: zod_1.z.string(),
        phone_number: zod_1.z.string().optional(),
    }).optional(),
});
const POST = async (req, res) => {
    const logger = req.scope.resolve("logger");
    const responseHeaders = {
        "Idempotency-Key": req.headers["idempotency-key"],
        "Request-Id": req.headers["request-id"],
    };
    try {
        const { result } = await (0, create_checkout_session_1.createCheckoutSessionWorkflow)(req.scope)
            .run({
            input: req.validatedBody,
            context: {
                idempotencyKey: req.headers["idempotency-key"],
            }
        });
        res.set(responseHeaders).json(result);
    }
    catch (error) {
        const medusaError = error;
        logger.error(medusaError);
        res.set(responseHeaders).json({
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2NoZWNrb3V0X3Nlc3Npb25zL3JvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLGlEQUEyQztBQUMzQyxxRkFBdUY7QUFHMUUsUUFBQSx1QkFBdUIsR0FBRyxPQUFDLENBQUMsTUFBTSxDQUFDO0lBQzlDLEtBQUssRUFBRSxPQUFDLENBQUMsS0FBSyxDQUFDLE9BQUMsQ0FBQyxNQUFNLENBQUM7UUFDdEIsRUFBRSxFQUFFLE9BQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxhQUFhO1FBQzdCLFFBQVEsRUFBRSxPQUFDLENBQUMsTUFBTSxFQUFFO0tBQ3JCLENBQUMsQ0FBQztJQUNILEtBQUssRUFBRSxPQUFDLENBQUMsTUFBTSxDQUFDO1FBQ2QsVUFBVSxFQUFFLE9BQUMsQ0FBQyxNQUFNLEVBQUU7UUFDdEIsS0FBSyxFQUFFLE9BQUMsQ0FBQyxNQUFNLEVBQUU7UUFDakIsWUFBWSxFQUFFLE9BQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7S0FDcEMsQ0FBQyxDQUFDLFFBQVEsRUFBRTtJQUNiLG1CQUFtQixFQUFFLE9BQUMsQ0FBQyxNQUFNLENBQUM7UUFDNUIsSUFBSSxFQUFFLE9BQUMsQ0FBQyxNQUFNLEVBQUU7UUFDaEIsUUFBUSxFQUFFLE9BQUMsQ0FBQyxNQUFNLEVBQUU7UUFDcEIsUUFBUSxFQUFFLE9BQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7UUFDL0IsSUFBSSxFQUFFLE9BQUMsQ0FBQyxNQUFNLEVBQUU7UUFDaEIsS0FBSyxFQUFFLE9BQUMsQ0FBQyxNQUFNLEVBQUU7UUFDakIsT0FBTyxFQUFFLE9BQUMsQ0FBQyxNQUFNLEVBQUU7UUFDbkIsV0FBVyxFQUFFLE9BQUMsQ0FBQyxNQUFNLEVBQUU7UUFDdkIsWUFBWSxFQUFFLE9BQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7S0FDcEMsQ0FBQyxDQUFDLFFBQVEsRUFBRTtDQUNkLENBQUMsQ0FBQTtBQUVLLE1BQU0sSUFBSSxHQUFHLEtBQUssRUFDdkIsR0FFQyxFQUNELEdBQW1CLEVBQ25CLEVBQUU7SUFDRixNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUMxQyxNQUFNLGVBQWUsR0FBRztRQUN0QixpQkFBaUIsRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFXO1FBQzNELFlBQVksRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBVztLQUNsRCxDQUFBO0lBQ0QsSUFBSSxDQUFDO1FBQ0gsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLE1BQU0sSUFBQSx1REFBNkIsRUFBQyxHQUFHLENBQUMsS0FBSyxDQUFDO2FBQzlELEdBQUcsQ0FBQztZQUNILEtBQUssRUFBRSxHQUFHLENBQUMsYUFBYTtZQUN4QixPQUFPLEVBQUU7Z0JBQ1AsY0FBYyxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQVc7YUFDekQ7U0FDRixDQUFDLENBQUE7UUFFSixHQUFHLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUN2QyxDQUFDO0lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztRQUNmLE1BQU0sV0FBVyxHQUFHLEtBQW9CLENBQUE7UUFDeEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQTtRQUN6QixHQUFHLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUM1QixRQUFRLEVBQUU7Z0JBQ1I7b0JBQ0UsSUFBSSxFQUFFLE9BQU87b0JBQ2IsSUFBSSxFQUFFLFNBQVM7b0JBQ2YsWUFBWSxFQUFFLE9BQU87b0JBQ3JCLE9BQU8sRUFBRSxXQUFXLENBQUMsT0FBTztpQkFDN0I7YUFDRjtTQUNGLENBQUMsQ0FBQTtJQUNKLENBQUM7QUFDSCxDQUFDLENBQUE7QUFuQ1ksUUFBQSxJQUFJLFFBbUNoQiJ9