"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@medusajs/framework/utils");
const post_1 = require("./models/post");
const category_1 = require("./models/category");
class BlogModuleService extends (0, utils_1.MedusaService)({
    BlogPost: post_1.BlogPost,
    BlogCategory: category_1.BlogCategory,
}) {
}
exports.default = BlogModuleService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2Jsb2cvc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFEQUF5RDtBQUN6RCx3Q0FBd0M7QUFDeEMsZ0RBQWdEO0FBRWhELE1BQU0saUJBQWtCLFNBQVEsSUFBQSxxQkFBYSxFQUFDO0lBQzVDLFFBQVEsRUFBUixlQUFRO0lBQ1IsWUFBWSxFQUFaLHVCQUFZO0NBQ2IsQ0FBQztDQUFHO0FBRUwsa0JBQWUsaUJBQWlCLENBQUEifQ==