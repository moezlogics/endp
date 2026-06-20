"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAgenticRequest = validateAgenticRequest;
async function validateAgenticRequest(req, res, next) {
    // const agenticCommerceModuleService = req.scope.resolve(AGENTIC_COMMERCE_MODULE)
    // const apiKeyModuleService = req.scope.resolve("api_key")
    // const signature = req.headers["signature"] as string
    // const apiKey = req.headers["authorization"]?.replaceAll("Bearer ", "")
    // const isTokenValid = await apiKeyModuleService.authenticate(apiKey || "")
    // const isSignatureValid = !!req.body || await agenticCommerceModuleService.verifySignature({
    //   signature,
    //   payload: req.body
    // })
    // if (!isTokenValid || !isSignatureValid) {
    //   return res.status(401).json({
    //     message: "Unauthorized"
    //   })
    // }
    next();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGUtYWdlbnRpYy1yZXF1ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwaS9taWRkbGV3YXJlcy92YWxpZGF0ZS1hZ2VudGljLXJlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSx3REF1QkM7QUF2Qk0sS0FBSyxVQUFVLHNCQUFzQixDQUMxQyxHQUFrQixFQUNsQixHQUFtQixFQUNuQixJQUF3QjtJQUV4QixrRkFBa0Y7SUFDbEYsMkRBQTJEO0lBQzNELHVEQUF1RDtJQUN2RCx5RUFBeUU7SUFFekUsNEVBQTRFO0lBQzVFLDhGQUE4RjtJQUM5RixlQUFlO0lBQ2Ysc0JBQXNCO0lBQ3RCLEtBQUs7SUFFTCw0Q0FBNEM7SUFDNUMsa0NBQWtDO0lBQ2xDLDhCQUE4QjtJQUM5QixPQUFPO0lBQ1AsSUFBSTtJQUVKLElBQUksRUFBRSxDQUFBO0FBQ1IsQ0FBQyJ9