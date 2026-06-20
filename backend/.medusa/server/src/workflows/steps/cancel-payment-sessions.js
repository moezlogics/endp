"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelPaymentSessionsStep = void 0;
const utils_1 = require("@medusajs/framework/utils");
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
exports.cancelPaymentSessionsStep = (0, workflows_sdk_1.createStep)("cancel-payment-session", async ({ payment_session_ids }, { container }) => {
    const paymentModuleService = container.resolve("payment");
    const paymentSessions = await paymentModuleService.listPaymentSessions({
        id: payment_session_ids,
    });
    const updatedPaymentSessions = await (0, utils_1.promiseAll)(paymentSessions.map((session) => {
        return paymentModuleService.updatePaymentSession({
            id: session.id,
            status: "canceled",
            currency_code: session.currency_code,
            amount: session.amount,
            data: session.data,
        });
    }));
    return new workflows_sdk_1.StepResponse(updatedPaymentSessions, paymentSessions);
}, async (paymentSessions, { container }) => {
    if (!paymentSessions) {
        return;
    }
    const paymentModuleService = container.resolve("payment");
    await (0, utils_1.promiseAll)(paymentSessions.map((session) => {
        return paymentModuleService.updatePaymentSession({
            id: session.id,
            status: session.status,
            currency_code: session.currency_code,
            amount: session.amount,
            data: session.data,
        });
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FuY2VsLXBheW1lbnQtc2Vzc2lvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvd29ya2Zsb3dzL3N0ZXBzL2NhbmNlbC1wYXltZW50LXNlc3Npb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFEQUFzRDtBQUN0RCxxRUFBNEU7QUFNL0QsUUFBQSx5QkFBeUIsR0FBRyxJQUFBLDBCQUFVLEVBQ2pELHdCQUF3QixFQUN4QixLQUFLLEVBQUUsRUFBRSxtQkFBbUIsRUFBYSxFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRTtJQUMxRCxNQUFNLG9CQUFvQixHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUE7SUFFekQsTUFBTSxlQUFlLEdBQUcsTUFBTSxvQkFBb0IsQ0FBQyxtQkFBbUIsQ0FBQztRQUNyRSxFQUFFLEVBQUUsbUJBQW1CO0tBQ3hCLENBQUMsQ0FBQTtJQUVGLE1BQU0sc0JBQXNCLEdBQUcsTUFBTSxJQUFBLGtCQUFVLEVBQzdDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtRQUM5QixPQUFPLG9CQUFvQixDQUFDLG9CQUFvQixDQUFDO1lBQy9DLEVBQUUsRUFBRSxPQUFPLENBQUMsRUFBRTtZQUNkLE1BQU0sRUFBRSxVQUFVO1lBQ2xCLGFBQWEsRUFBRSxPQUFPLENBQUMsYUFBYTtZQUNwQyxNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU07WUFDdEIsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJO1NBQ25CLENBQUMsQ0FBQTtJQUNKLENBQUMsQ0FBQyxDQUNILENBQUE7SUFFRCxPQUFPLElBQUksNEJBQVksQ0FBQyxzQkFBc0IsRUFBRSxlQUFlLENBQUMsQ0FBQTtBQUNsRSxDQUFDLEVBQ0QsS0FBSyxFQUFFLGVBQWUsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUU7SUFDdkMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3JCLE9BQU07SUFDUixDQUFDO0lBQ0QsTUFBTSxvQkFBb0IsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBRXpELE1BQU0sSUFBQSxrQkFBVSxFQUNkLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtRQUM5QixPQUFPLG9CQUFvQixDQUFDLG9CQUFvQixDQUFDO1lBQy9DLEVBQUUsRUFBRSxPQUFPLENBQUMsRUFBRTtZQUNkLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTTtZQUN0QixhQUFhLEVBQUUsT0FBTyxDQUFDLGFBQWE7WUFDcEMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNO1lBQ3RCLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSTtTQUNuQixDQUFDLENBQUE7SUFDSixDQUFDLENBQUMsQ0FDSCxDQUFBO0FBQ0gsQ0FBQyxDQUNGLENBQUEifQ==