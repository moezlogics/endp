"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCustomerExistsStep = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const utils_1 = require("@medusajs/framework/utils");
exports.validateCustomerExistsStep = (0, workflows_sdk_1.createStep)("validate-customer-exists", async ({ customer }) => {
    if (!customer) {
        throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, "Customer not found");
    }
    if (!customer.has_account) {
        throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, "Customer must have an account to earn or manage points");
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGUtY3VzdG9tZXItZXhpc3RzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3dvcmtmbG93cy9zdGVwcy92YWxpZGF0ZS1jdXN0b21lci1leGlzdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EscUVBQThEO0FBQzlELHFEQUF1RDtBQU0xQyxRQUFBLDBCQUEwQixHQUFHLElBQUEsMEJBQVUsRUFDbEQsMEJBQTBCLEVBQzFCLEtBQUssRUFBRSxFQUFFLFFBQVEsRUFBbUMsRUFBRSxFQUFFO0lBQ3RELElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNkLE1BQU0sSUFBSSxtQkFBVyxDQUNuQixtQkFBVyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQzlCLG9CQUFvQixDQUNyQixDQUFBO0lBQ0gsQ0FBQztJQUVELElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDMUIsTUFBTSxJQUFJLG1CQUFXLENBQ25CLG1CQUFXLENBQUMsS0FBSyxDQUFDLFlBQVksRUFDOUIsd0RBQXdELENBQ3pELENBQUE7SUFDSCxDQUFDO0FBQ0gsQ0FBQyxDQUNGLENBQUEifQ==