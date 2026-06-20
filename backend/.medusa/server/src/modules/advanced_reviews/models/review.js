"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const utils_1 = require("@medusajs/framework/utils");
exports.Review = utils_1.model.define("advanced_review", {
    id: utils_1.model.id().primaryKey(),
    product_id: utils_1.model.text(),
    customer_id: utils_1.model.text().nullable(),
    guest_name: utils_1.model.text().nullable(),
    guest_email: utils_1.model.text().nullable(),
    rating: utils_1.model.number(),
    content: utils_1.model.text(),
    photos: utils_1.model.json().nullable(), // array of strings (URLs)
    is_verified: utils_1.model.boolean().default(false),
    status: utils_1.model.enum(["pending", "approved", "flagged"]).default("pending"),
    owner_reply: utils_1.model.text().nullable(),
    metadata: utils_1.model.json().nullable(),
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV2aWV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvYWR2YW5jZWRfcmV2aWV3cy9tb2RlbHMvcmV2aWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFEQUFpRDtBQUVwQyxRQUFBLE1BQU0sR0FBRyxhQUFLLENBQUMsTUFBTSxDQUFDLGlCQUFpQixFQUFFO0lBQ3BELEVBQUUsRUFBRSxhQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsVUFBVSxFQUFFO0lBQzNCLFVBQVUsRUFBRSxhQUFLLENBQUMsSUFBSSxFQUFFO0lBQ3hCLFdBQVcsRUFBRSxhQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFO0lBQ3BDLFVBQVUsRUFBRSxhQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFO0lBQ25DLFdBQVcsRUFBRSxhQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFO0lBQ3BDLE1BQU0sRUFBRSxhQUFLLENBQUMsTUFBTSxFQUFFO0lBQ3RCLE9BQU8sRUFBRSxhQUFLLENBQUMsSUFBSSxFQUFFO0lBQ3JCLE1BQU0sRUFBRSxhQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFLEVBQUUsMEJBQTBCO0lBQzNELFdBQVcsRUFBRSxhQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztJQUMzQyxNQUFNLEVBQUUsYUFBSyxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO0lBQ3pFLFdBQVcsRUFBRSxhQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFO0lBQ3BDLFFBQVEsRUFBRSxhQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFO0NBQ2xDLENBQUMsQ0FBQSJ9