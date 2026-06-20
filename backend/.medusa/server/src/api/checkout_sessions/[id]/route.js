"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = exports.POST = exports.PostUpdateSessionSchema = void 0;
const update_checkout_session_1 = require("../../../workflows/update-checkout-session");
const zod_1 = require("@medusajs/framework/zod");
const utils_1 = require("@medusajs/framework/utils");
const prepare_checkout_session_data_1 = require("../../../workflows/prepare-checkout-session-data");
const core_flows_1 = require("@medusajs/medusa/core-flows");
exports.PostUpdateSessionSchema = zod_1.z.object({
    buyer: zod_1.z.object({
        first_name: zod_1.z.string(),
        email: zod_1.z.string(),
        phone_number: zod_1.z.string().optional(),
    }).optional(),
    items: zod_1.z.array(zod_1.z.object({
        id: zod_1.z.string(),
        quantity: zod_1.z.number(),
    })).optional(),
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
    fulfillment_option_id: zod_1.z.string().optional(),
});
const POST = async (req, res) => {
    const responseHeaders = {
        "Idempotency-Key": req.headers["idempotency-key"],
        "Request-Id": req.headers["request-id"],
    };
    try {
        const { result } = await (0, update_checkout_session_1.updateCheckoutSessionWorkflow)(req.scope)
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
const GET = async (req, res) => {
    const responseHeaders = {
        "Idempotency-Key": req.headers["idempotency-key"],
        "Request-Id": req.headers["request-id"],
    };
    try {
        const { result } = await (0, prepare_checkout_session_data_1.prepareCheckoutSessionDataWorkflow)(req.scope)
            .run({
            input: {
                cart_id: req.params.id,
            },
            context: {
                idempotencyKey: req.headers["idempotency-key"],
            }
        });
        res.set(responseHeaders).status(200).json(result);
    }
    catch (error) {
        const medusaError = error;
        const statusCode = medusaError.type === utils_1.MedusaError.Types.NOT_FOUND ? 404 : 500;
        res.set(responseHeaders).status(statusCode).json({
            type: "invalid_request",
            code: "request_not_idempotent",
            message: statusCode === 404 ? "Checkout session not found" : "Internal server error",
        });
    }
};
exports.GET = GET;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2NoZWNrb3V0X3Nlc3Npb25zL1tpZF0vcm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0Esd0ZBQTBGO0FBQzFGLGlEQUEyQztBQUMzQyxxREFBdUQ7QUFDdkQsb0dBQXFHO0FBQ3JHLDREQUFxRjtBQUV4RSxRQUFBLHVCQUF1QixHQUFHLE9BQUMsQ0FBQyxNQUFNLENBQUM7SUFDOUMsS0FBSyxFQUFFLE9BQUMsQ0FBQyxNQUFNLENBQUM7UUFDZCxVQUFVLEVBQUUsT0FBQyxDQUFDLE1BQU0sRUFBRTtRQUN0QixLQUFLLEVBQUUsT0FBQyxDQUFDLE1BQU0sRUFBRTtRQUNqQixZQUFZLEVBQUUsT0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtLQUNwQyxDQUFDLENBQUMsUUFBUSxFQUFFO0lBQ2IsS0FBSyxFQUFFLE9BQUMsQ0FBQyxLQUFLLENBQUMsT0FBQyxDQUFDLE1BQU0sQ0FBQztRQUN0QixFQUFFLEVBQUUsT0FBQyxDQUFDLE1BQU0sRUFBRTtRQUNkLFFBQVEsRUFBRSxPQUFDLENBQUMsTUFBTSxFQUFFO0tBQ3JCLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRTtJQUNkLG1CQUFtQixFQUFFLE9BQUMsQ0FBQyxNQUFNLENBQUM7UUFDNUIsSUFBSSxFQUFFLE9BQUMsQ0FBQyxNQUFNLEVBQUU7UUFDaEIsUUFBUSxFQUFFLE9BQUMsQ0FBQyxNQUFNLEVBQUU7UUFDcEIsUUFBUSxFQUFFLE9BQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7UUFDL0IsSUFBSSxFQUFFLE9BQUMsQ0FBQyxNQUFNLEVBQUU7UUFDaEIsS0FBSyxFQUFFLE9BQUMsQ0FBQyxNQUFNLEVBQUU7UUFDakIsT0FBTyxFQUFFLE9BQUMsQ0FBQyxNQUFNLEVBQUU7UUFDbkIsV0FBVyxFQUFFLE9BQUMsQ0FBQyxNQUFNLEVBQUU7UUFD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