"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendAbandonedCartsWorkflow = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const send_abandoned_notifications_1 = require("./steps/send-abandoned-notifications");
const core_flows_1 = require("@medusajs/medusa/core-flows");
exports.sendAbandonedCartsWorkflow = (0, workflows_sdk_1.createWorkflow)("send-abandoned-carts", function (input) {
    (0, send_abandoned_notifications_1.sendAbandonedNotificationsStep)(input);
    const updateCartsData = (0, workflows_sdk_1.transform)(input, (data) => {
        return data.carts.map((cart) => ({
            id: cart.id,
            metadata: {
                ...cart.metadata,
                abandoned_notification: new Date().toISOString()
            }
        }));
    });
    const updatedCarts = (0, core_flows_1.updateCartsStep)(updateCartsData);
    return new workflows_sdk_1.WorkflowResponse(updatedCarts);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZC1hYmFuZG9uZWQtY2FydHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvd29ya2Zsb3dzL3NlbmQtYWJhbmRvbmVkLWNhcnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFFQUkwQztBQUMxQyx1RkFBcUY7QUFDckYsNERBQTZEO0FBVWhELFFBQUEsMEJBQTBCLEdBQUcsSUFBQSw4QkFBYyxFQUN0RCxzQkFBc0IsRUFDdEIsVUFBUyxLQUFzQztJQUM3QyxJQUFBLDZEQUE4QixFQUFDLEtBQUssQ0FBQyxDQUFBO0lBRXJDLE1BQU0sZUFBZSxHQUFHLElBQUEseUJBQVMsRUFDL0IsS0FBSyxFQUNMLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDUCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQy9CLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNYLFFBQVEsRUFBRTtnQkFDUixHQUFHLElBQUksQ0FBQyxRQUFRO2dCQUNoQixzQkFBc0IsRUFBRSxJQUFJLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRTthQUNqRDtTQUNGLENBQUMsQ0FBQyxDQUFBO0lBQ0wsQ0FBQyxDQUNGLENBQUE7SUFFRCxNQUFNLFlBQVksR0FBRyxJQUFBLDRCQUFlLEVBQUMsZUFBZSxDQUFDLENBQUE7SUFFckQsT0FBTyxJQUFJLGdDQUFnQixDQUFDLFlBQVksQ0FBQyxDQUFBO0FBQzNDLENBQUMsQ0FDRixDQUFBIn0=