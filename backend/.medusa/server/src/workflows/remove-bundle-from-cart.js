"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeBundleFromCartWorkflow = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const core_flows_1 = require("@medusajs/medusa/core-flows");
exports.removeBundleFromCartWorkflow = (0, workflows_sdk_1.createWorkflow)("remove-bundle-from-cart", ({ bundle_id, cart_id }) => {
    const { data: carts } = (0, core_flows_1.useQueryGraphStep)({
        entity: "cart",
        fields: [
            "*",
            "items.*",
        ],
        filters: {
            id: cart_id,
        },
        options: {
            throwIfKeyNotFound: true,
        }
    });
    const itemsToRemove = (0, workflows_sdk_1.transform)({
        cart: carts[0],
        bundle_id,
    }, (data) => {
        return data.cart.items.filter((item) => {
            return item?.metadata?.bundle_id === data.bundle_id;
        }).map((item) => item.id);
    });
    (0, core_flows_1.acquireLockStep)({
        key: cart_id,
        timeout: 2,
        ttl: 10,
    });
    core_flows_1.deleteLineItemsWorkflow.runAsStep({
        input: {
            cart_id,
            ids: itemsToRemove,
        }
    });
    // retrieve cart again
    const { data: updatedCarts } = (0, core_flows_1.useQueryGraphStep)({
        entity: "cart",
        fields: [
            "*",
            "items.*",
        ],
        filters: {
            id: cart_id,
        },
    }).config({ name: "retrieve-cart" });
    (0, core_flows_1.releaseLockStep)({
        key: cart_id,
    });
    return new workflows_sdk_1.WorkflowResponse(updatedCarts[0]);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3ZlLWJ1bmRsZS1mcm9tLWNhcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvd29ya2Zsb3dzL3JlbW92ZS1idW5kbGUtZnJvbS1jYXJ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFFQUErRjtBQUMvRiw0REFBMEg7QUFPN0csUUFBQSw0QkFBNEIsR0FBRyxJQUFBLDhCQUFjLEVBQ3hELHlCQUF5QixFQUN6QixDQUFDLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBcUMsRUFBRSxFQUFFO0lBQzVELE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsSUFBQSw4QkFBaUIsRUFBQztRQUN4QyxNQUFNLEVBQUUsTUFBTTtRQUNkLE1BQU0sRUFBRTtZQUNOLEdBQUc7WUFDSCxTQUFTO1NBQ1Y7UUFDRCxPQUFPLEVBQUU7WUFDUCxFQUFFLEVBQUUsT0FBTztTQUNaO1FBQ0QsT0FBTyxFQUFFO1lBQ1Asa0JBQWtCLEVBQUUsSUFBSTtTQUN6QjtLQUNGLENBQUMsQ0FBQTtJQUVGLE1BQU0sYUFBYSxHQUFHLElBQUEseUJBQVMsRUFBQztRQUM5QixJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNkLFNBQVM7S0FDVixFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDVixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3JDLE9BQU8sSUFBSSxFQUFFLFFBQVEsRUFBRSxTQUFTLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQTtRQUNyRCxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUM1QixDQUFDLENBQUMsQ0FBQTtJQUVGLElBQUEsNEJBQWUsRUFBQztRQUNkLEdBQUcsRUFBRSxPQUFPO1FBQ1osT0FBTyxFQUFFLENBQUM7UUFDVixHQUFHLEVBQUUsRUFBRTtLQUNSLENBQUMsQ0FBQTtJQUVGLG9DQUF1QixDQUFDLFNBQVMsQ0FBQztRQUNoQyxLQUFLLEVBQUU7WUFDTCxPQUFPO1lBQ1AsR0FBRyxFQUFFLGFBQWE7U0FDbkI7S0FDRixDQUFDLENBQUE7SUFFRixzQkFBc0I7SUFDdEIsTUFBTSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsR0FBRyxJQUFBLDhCQUFpQixFQUFDO1FBQy9DLE1BQU0sRUFBRSxNQUFNO1FBQ2QsTUFBTSxFQUFFO1lBQ04sR0FBRztZQUNILFNBQVM7U0FDVjtRQUNELE9BQU8sRUFBRTtZQUNQLEVBQUUsRUFBRSxPQUFPO1NBQ1o7S0FDRixDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUE7SUFFcEMsSUFBQSw0QkFBZSxFQUFDO1FBQ2QsR0FBRyxFQUFFLE9BQU87S0FDYixDQUFDLENBQUE7SUFFRixPQUFPLElBQUksZ0NBQWdCLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDOUMsQ0FBQyxDQUNGLENBQUEifQ==