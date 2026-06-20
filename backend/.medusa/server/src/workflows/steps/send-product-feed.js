"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendProductFeedStep = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const agentic_commerce_1 = require("../../modules/agentic-commerce");
exports.sendProductFeedStep = (0, workflows_sdk_1.createStep)("send-product-feed", async (input, { container }) => {
    const agenticCommerceModuleService = container.resolve(agentic_commerce_1.AGENTIC_COMMERCE_MODULE);
    await agenticCommerceModuleService.sendProductFeed(input.productFeed);
    return new workflows_sdk_1.StepResponse(void 0);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZC1wcm9kdWN0LWZlZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvd29ya2Zsb3dzL3N0ZXBzL3NlbmQtcHJvZHVjdC1mZWVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFFQUE0RTtBQUM1RSxxRUFBd0U7QUFNM0QsUUFBQSxtQkFBbUIsR0FBRyxJQUFBLDBCQUFVLEVBQzNDLG1CQUFtQixFQUNuQixLQUFLLEVBQUUsS0FBZ0IsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUU7SUFDeEMsTUFBTSw0QkFBNEIsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLDBDQUF1QixDQUFDLENBQUE7SUFFL0UsTUFBTSw0QkFBNEIsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFBO0lBRXJFLE9BQU8sSUFBSSw0QkFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7QUFDakMsQ0FBQyxDQUNGLENBQUEifQ==