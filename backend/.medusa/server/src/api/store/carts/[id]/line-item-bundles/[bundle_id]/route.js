"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DELETE = DELETE;
const remove_bundle_from_cart_1 = require("../../../../../../workflows/remove-bundle-from-cart");
async function DELETE(req, res) {
    const { result: cart } = await (0, remove_bundle_from_cart_1.removeBundleFromCartWorkflow)(req.scope)
        .run({
        input: {
            cart_id: req.params.id,
            bundle_id: req.params.bundle_id,
        }
    });
    res.json({
        cart
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL2NhcnRzL1tpZF0vbGluZS1pdGVtLWJ1bmRsZXMvW2J1bmRsZV9pZF0vcm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSx3QkFlQztBQWpCRCxpR0FBbUc7QUFFNUYsS0FBSyxVQUFVLE1BQU0sQ0FDMUIsR0FBa0IsRUFDbEIsR0FBbUI7SUFFbkIsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxNQUFNLElBQUEsc0RBQTRCLEVBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztTQUNuRSxHQUFHLENBQUM7UUFDSCxLQUFLLEVBQUU7WUFDTCxPQUFPLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3RCLFNBQVMsRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVM7U0FDaEM7S0FDRixDQUFDLENBQUE7SUFFSixHQUFHLENBQUMsSUFBSSxDQUFDO1FBQ1AsSUFBSTtLQUNMLENBQUMsQ0FBQTtBQUNKLENBQUMifQ==