"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@medusajs/framework/utils");
const product_1 = __importDefault(require("@medusajs/medusa/product"));
const bundled_product_1 = __importDefault(require("../modules/bundled-product"));
exports.default = (0, utils_1.defineLink)({
    linkable: bundled_product_1.default.linkable.bundleItem,
    isList: true,
}, product_1.default.linkable.product);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLWl0ZW0tcHJvZHVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saW5rcy9idW5kbGUtaXRlbS1wcm9kdWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEscURBQXVEO0FBQ3ZELHVFQUFxRDtBQUNyRCxpRkFBK0Q7QUFFL0Qsa0JBQWUsSUFBQSxrQkFBVSxFQUN2QjtJQUNFLFFBQVEsRUFBRSx5QkFBcUIsQ0FBQyxRQUFRLENBQUMsVUFBVTtJQUNuRCxNQUFNLEVBQUUsSUFBSTtDQUNiLEVBQ0QsaUJBQWEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUMvQixDQUFBIn0=