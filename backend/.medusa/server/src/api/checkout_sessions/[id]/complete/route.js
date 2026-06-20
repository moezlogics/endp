"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = exports.PostCompleteSessionSchema = void 0;
const zod_1 = require("@medusajs/framework/zod");
const complete_checkout_session_1 = require("../../../../workflows/complete-checkout-session");
const utils_1 = require("@medusajs/framework/utils");
const core_flows_1 = require("@medusajs/medusa/core-flows");
const prepare_checkout_session_data_1 = require("../../../../workflows/prepare-checkout-session-data");
exports.PostCompleteSessionSchema = zod_1.z.object({
    buyer: zod_1.z.object({
        first_name: zod_1.z.string(),
        email: zod_1.z.string(),
        phone_number: zod_1.z.string().optional(),
    }).optional(),
    payment_data: zod_1.z.object({
        token: zod_1.z.string(),
        provider: zod_1.z.string(),
        billing_address: zod_1.z.object({
            name: zod_1.z.string(),
            line_one: zod_1.z.string(),
            line_two: zod_1.z.string().optional(),
            city: zod_1.z.string(),
            state: zod_1.z.string(),
            postal_code: zod_1.z.string(),
            country: zod_1.z.string(),
            phone_number: zod_1.z.string().optional(),
        }).optional(),
    }),
});
const POST = async (req, res) => {
    const responseHeaders = {
        "Idempotency-Key": req.headers["idempotency-key"],
        "Request-Id": req.headers["request-id"],
    };
    try {
        const { result } = await (0, complete_checkout_session_1.completeCheckoutSessionWorkflow)(req.scope)
            .run({
            input: {
                cart_id: req.params.id,
                ...req.validatedBody,
            },
            context: {
                idempotencyKey: req.headers["idempotency-key"],
            }
        });
        res.set(responseHeaders).json(result);
    }
    catch (error) {
        const medusaError = error;
        await (0, core_flows_1.refreshPaymentCollectionForCartWorkflow)(req.scope).run({
            input: {
                cart_id: req.params.id,
            }
        });
        const { result } = await (0, prepare_checkout_session_data_1.prepareCheckoutSessionDataWorkflow)(req.scope)
            .run({
            input: {
                cart_id: req.params.id,
                ...req.validatedBody,
                messages: [
                    {
                        type: "error",
                        code: medusaError.type === utils_1.MedusaError.Types.PAYMENT_AUTHORIZATION_ERROR ?
                            "payment_declined" : "invalid",
                        content_type: "plain",
                        content: medusaError.message,
                    }
                ]
            },
        });
        res.set(responseHeaders).json(result);
    }
};
exports.POST = POST;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2NoZWNrb3V0X3Nlc3Npb25zL1tpZF0vY29tcGxldGUvcm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsaURBQTJDO0FBQzNDLCtGQUFpRztBQUNqRyxxREFBdUQ7QUFDdkQsNERBQXFGO0FBQ3JGLHVHQUF3RztBQUUzRixRQUFBLHlCQUF5QixHQUFHLE9BQUMsQ0FBQyxNQUFNLENBQUM7SUFDaEQsS0FBSyxFQUFFLE9BQUMsQ0FBQyxNQUFNLENBQUM7UUFDZCxVQUFVLEVBQUUsT0FBQyxDQUFDLE1BQU0sRUFBRTtRQUN0QixLQUFLLEVBQUUsT0FBQyxDQUFDLE1BQU0sRUFBRTtRQUNqQixZQUFZLEVBQUUsT0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtLQUNwQyxDQUFDLENBQUMsUUFBUSxFQUFFO0lBQ2IsWUFBWSxFQUFFLE9BQUMsQ0FBQyxNQUFNLENBQUM7UUFDckIsS0FBSyxFQUFFLE9BQUMsQ0FBQyxNQUFNLEVBQUU7UUFDakIsUUFBUSxFQUFFLE9BQUMsQ0FBQyxNQUFNLEVBQUU7UUFDcEIsZUFBZSxFQUFFLE9BQUMsQ0FBQyxNQUFNLENBQUM7WUFDeEIsSUFBSSxFQUFFLE9BQUMsQ0FBQyxNQUFNLEVBQUU7WUFDaEIsUUFBUSxFQUFFLE9BQUMsQ0FBQyxNQUFNLEVBQUU7WUFDcEIsUUFBUSxFQUFFLE9BQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7WUFDL0IsSUFBSSxFQUFFLE9BQUMsQ0FBQyxNQUFNLEVBQUU7WUFDaEIsS0FBSyxFQUFFLE9BQUMsQ0FBQyxNQUFNLEVBQUU7WUFDakIsV0FBVyxFQUFFLE9BQUMsQ0FBQyxNQUFNLEVBQUU7WUFDdkIsT0FBTyxFQUFFLE9BQUMsQ0FBQyxNQUFNLEVBQUU7WUFDbkIsWUFBWSxFQUFFLE9BQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7U0FDcEMsQ0FBQyxDQUFDLFFBQVEsRUFBRTtLQUNkLENBQUM7Q0FDSCxDQUFDLENBQUE7QUFFSyxNQUFNLElBQUksR0FBRyxLQUFLLEVBQ3ZCLEdBRUMsRUFDRCxHQUFtQixFQUNuQixFQUFFO0lBQ0YsTUFBTSxlQUFlLEdBQUc7UUFDdEIsaUJBQWlCLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBVztRQUMzRCxZQUFZLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQVc7S0FDbEQsQ0FBQTtJQUNELElBQUksQ0FBQztRQUNILE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxNQUFNLElBQUEsMkRBQStCLEVBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQzthQUNoRSxHQUFHLENBQUM7WUFDSCxLQUFLLEVBQUU7Z0JBQ0wsT0FBTyxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDdEIsR0FBRyxHQUFHLENBQUMsYUFBYTthQUNyQjtZQUNELE9BQU8sRUFBRTtnQkFDUCxjQUFjLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBVzthQUN6RDtTQUNGLENBQUMsQ0FBQTtRQUVKLEdBQUcsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ3ZDLENBQUM7SUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1FBQ2YsTUFBTSxXQUFXLEdBQUcsS0FBb0IsQ0FBQTtRQUV4QyxNQUFNLElBQUEsb0RBQXVDLEVBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUMzRCxLQUFLLEVBQUU7Z0JBQ0wsT0FBTyxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRTthQUN2QjtTQUNGLENBQUMsQ0FBQTtRQUNGLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxNQUFNLElBQUEsa0VBQWtDLEVBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQzthQUNuRSxHQUFHLENBQUM7WUFDSCxLQUFLLEVBQUU7Z0JBQ0wsT0FBTyxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDdEIsR0FBRyxHQUFHLENBQUMsYUFBYTtnQkFDcEIsUUFBUSxFQUFFO29CQUNSO3dCQUNFLElBQUksRUFBRSxPQUFPO3dCQUNiLElBQUksRUFBRSxXQUFXLENBQUMsSUFBSSxLQUFLLG1CQUFXLENBQUMsS0FBSyxDQUFDLDJCQUEyQixDQUFDLENBQUM7NEJBQ3hFLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxTQUFTO3dCQUNoQyxZQUFZLEVBQUUsT0FBTzt3QkFDckIsT0FBTyxFQUFFLFdBQVcsQ0FBQyxPQUFPO3FCQUM3QjtpQkFDRjthQUNGO1NBQ0YsQ0FBQyxDQUFBO1FBRUosR0FBRyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDdkMsQ0FBQztBQUNILENBQUMsQ0FBQTtBQWxEWSxRQUFBLElBQUksUUFrRGhCIn0=