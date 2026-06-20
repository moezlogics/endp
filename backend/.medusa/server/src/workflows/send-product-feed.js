"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendProductFeedWorkflow = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const get_product_feed_items_1 = require("./steps/get-product-feed-items");
const build_product_feed_xml_1 = require("./steps/build-product-feed-xml");
const send_product_feed_1 = require("./steps/send-product-feed");
exports.sendProductFeedWorkflow = (0, workflows_sdk_1.createWorkflow)("send-product-feed", (input) => {
    const { items: feedItems } = (0, get_product_feed_items_1.getProductFeedItemsStep)(input);
    const xml = (0, build_product_feed_xml_1.buildProductFeedXmlStep)({
        items: feedItems
    });
    (0, send_product_feed_1.sendProductFeedStep)({
        productFeed: xml
    });
    return new workflows_sdk_1.WorkflowResponse({ xml });
});
exports.default = exports.sendProductFeedWorkflow;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZC1wcm9kdWN0LWZlZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvd29ya2Zsb3dzL3NlbmQtcHJvZHVjdC1mZWVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFFQUFvRjtBQUNwRiwyRUFBd0U7QUFDeEUsMkVBQXdFO0FBQ3hFLGlFQUErRDtBQU9sRCxRQUFBLHVCQUF1QixHQUFHLElBQUEsOEJBQWMsRUFDbkQsbUJBQW1CLEVBQ25CLENBQUMsS0FBdUMsRUFBRSxFQUFFO0lBQzFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEdBQUcsSUFBQSxnREFBdUIsRUFBQyxLQUFLLENBQUMsQ0FBQTtJQUUzRCxNQUFNLEdBQUcsR0FBRyxJQUFBLGdEQUF1QixFQUFDO1FBQ2xDLEtBQUssRUFBRSxTQUFTO0tBQ2pCLENBQUMsQ0FBQTtJQUVGLElBQUEsdUNBQW1CLEVBQUM7UUFDbEIsV0FBVyxFQUFFLEdBQUc7S0FDakIsQ0FBQyxDQUFBO0lBRUYsT0FBTyxJQUFJLGdDQUFnQixDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQTtBQUN0QyxDQUFDLENBQ0YsQ0FBQTtBQUVELGtCQUFlLCtCQUF1QixDQUFBIn0=