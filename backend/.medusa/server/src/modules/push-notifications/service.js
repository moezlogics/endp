"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@medusajs/framework/utils");
const push_subscription_1 = require("./models/push-subscription");
const admin_push_subscription_1 = require("./models/admin-push-subscription");
class PushNotificationsService extends (0, utils_1.MedusaService)({
    PushSubscription: push_subscription_1.PushSubscription,
    PushCampaign: push_subscription_1.PushCampaign,
    AdminPushSubscription: admin_push_subscription_1.AdminPushSubscription,
}) {
}
exports.default = PushNotificationsService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL3B1c2gtbm90aWZpY2F0aW9ucy9zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscURBQXlEO0FBQ3pELGtFQUEyRTtBQUMzRSw4RUFBd0U7QUFFeEUsTUFBTSx3QkFBeUIsU0FBUSxJQUFBLHFCQUFhLEVBQUM7SUFDbkQsZ0JBQWdCLEVBQWhCLG9DQUFnQjtJQUNoQixZQUFZLEVBQVosZ0NBQVk7SUFDWixxQkFBcUIsRUFBckIsK0NBQXFCO0NBQ3RCLENBQUM7Q0FBRztBQUVMLGtCQUFlLHdCQUF3QixDQUFBIn0=