"use strict";
/**
 * Admin user seed script.
 *
 * Idempotent: safe to run on a fresh database OR an existing one. If the
 * user already exists the password is reset to the value below.
 *
 * Run via:
 *   npx medusa exec ./src/scripts/seed-admin.ts
 *
 * Override defaults with env vars:
 *   SEED_ADMIN_EMAIL=foo@bar.pk SEED_ADMIN_PASSWORD='Secret!' npx medusa exec ./src/scripts/seed-admin.ts
 *
 * Why this script and not `npx medusa user`?
 * - The CLI parses `!` and other shell metacharacters, which breaks
 *   passwords like `Multanpakistan1!` unless quoted carefully.
 * - This script bypasses the shell entirely and goes through the same
 *   auth-module + user-module path the admin login uses, so the result
 *   is identical to creating the user from the admin UI.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = seedAdmin;
const utils_1 = require("@medusajs/framework/utils");
const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL || "logicalmoez@gmail.com";
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD || "Multanpakistan1!";
const ADMIN_FIRST_NAME = process.env.SEED_ADMIN_FIRST_NAME || "Admin";
const ADMIN_LAST_NAME = process.env.SEED_ADMIN_LAST_NAME || "User";
async function seedAdmin({ container }) {
    const logger = container.resolve(utils_1.ContainerRegistrationKeys.LOGGER);
    const userModule = container.resolve(utils_1.Modules.USER);
    const authModule = container.resolve(utils_1.Modules.AUTH);
    logger.info(`[seed-admin] Ensuring admin user: ${ADMIN_EMAIL}`);
    // 1. Ensure user row exists ----------------------------------------------
    const existingUsers = await userModule.listUsers({ email: ADMIN_EMAIL });
    let user = existingUsers?.[0];
    if (!user) {
        const created = await userModule.createUsers({
            email: ADMIN_EMAIL,
            first_name: ADMIN_FIRST_NAME,
            last_name: ADMIN_LAST_NAME,
        });
        user = Array.isArray(created) ? created[0] : created;
        logger.info(`[seed-admin] Created user record: ${user.id}`);
    }
    else {
        logger.info(`[seed-admin] User already exists: ${user.id}`);
    }
    // 2. Ensure auth_identity exists with the desired password ---------------
    // We use the emailpass provider's `register` (= create new) or
    // `updateProvider` (= reset password). Both go through the same
    // scrypt hashing path the live login uses, so the resulting hash is
    // 100% compatible with admin sign-in.
    const registerInput = {
        body: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD },
    };
    let authIdentityId = null;
    try {
        const reg = await authModule.register("emailpass", registerInput);
        if (reg?.success && reg?.authIdentity?.id) {
            authIdentityId = reg.authIdentity.id;
            logger.info(`[seed-admin] Created auth identity: ${authIdentityId}`);
        }
        else if (!reg?.success) {
            logger.info(`[seed-admin] register() returned: ${reg?.error || "unknown"} — falling back to password update`);
        }
    }
    catch (e) {
        logger.info(`[seed-admin] register() threw: ${e?.message} — will try updateProvider`);
    }
    if (!authIdentityId) {
        // Identity already exists → update its password instead.
        try {
            const upd = await authModule.updateProvider("emailpass", registerInput);
            if (upd?.success !== false) {
                logger.info(`[seed-admin] Password reset for existing identity`);
            }
        }
        catch (e) {
            // Some Medusa versions don't expose updateProvider. Fall back to a
            // delete + re-register cycle.
            logger.warn(`[seed-admin] updateProvider unavailable (${e?.message}); deleting old identity and re-registering`);
            const ids = await authModule.listAuthIdentities({
                provider_identities: { entity_id: ADMIN_EMAIL, provider: "emailpass" },
            });
            for (const a of ids || []) {
                try {
                    await authModule.deleteAuthIdentities([a.id]);
                }
                catch { }
            }
            const reg2 = await authModule.register("emailpass", registerInput);
            if (reg2?.authIdentity?.id) {
                authIdentityId = reg2.authIdentity.id;
                logger.info(`[seed-admin] Re-created auth identity: ${authIdentityId}`);
            }
        }
    }
    // 3. Look up the auth_identity (covers both "just created" and "already
    //    existed" cases) and link it to the user via app_metadata.user_id ---
    const ids = await authModule.listAuthIdentities({
        provider_identities: { entity_id: ADMIN_EMAIL, provider: "emailpass" },
    });
    const authIdentity = ids?.[0];
    if (authIdentity) {
        const currentMeta = authIdentity.app_metadata || {};
        if (currentMeta.user_id !== user.id) {
            await authModule.updateAuthIdentities({
                id: authIdentity.id,
                app_metadata: { ...currentMeta, user_id: user.id },
            });
            logger.info(`[seed-admin] Linked auth identity ${authIdentity.id} → user ${user.id}`);
        }
        else {
            logger.info(`[seed-admin] Auth identity already linked to user`);
        }
    }
    else {
        logger.error(`[seed-admin] Could not locate auth identity for ${ADMIN_EMAIL} after register/update — admin login will fail.`);
    }
    logger.info("");
    logger.info("╔════════════════════════════════════════════════════╗");
    logger.info("║          ✅  ADMIN USER READY                       ║");
    logger.info("╚════════════════════════════════════════════════════╝");
    logger.info(`  Email:    ${ADMIN_EMAIL}`);
    logger.info(`  Password: ${ADMIN_PASSWORD}`);
    logger.info(`  Login at: <MEDUSA_BACKEND_URL>/app`);
    logger.info("");
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VlZC1hZG1pbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zY3JpcHRzL3NlZWQtYWRtaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7O0FBVUgsNEJBNkdDO0FBcEhELHFEQUE4RTtBQUU5RSxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixJQUFJLHVCQUF1QixDQUFBO0FBQzNFLE1BQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLElBQUksa0JBQWtCLENBQUE7QUFDNUUsTUFBTSxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixJQUFJLE9BQU8sQ0FBQTtBQUNyRSxNQUFNLGVBQWUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixJQUFJLE1BQU0sQ0FBQTtBQUVuRCxLQUFLLFVBQVUsU0FBUyxDQUFDLEVBQUUsU0FBUyxFQUFZO0lBQzdELE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsaUNBQXlCLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDbEUsTUFBTSxVQUFVLEdBQVEsU0FBUyxDQUFDLE9BQU8sQ0FBQyxlQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDdkQsTUFBTSxVQUFVLEdBQVEsU0FBUyxDQUFDLE9BQU8sQ0FBQyxlQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7SUFFdkQsTUFBTSxDQUFDLElBQUksQ0FBQyxxQ0FBcUMsV0FBVyxFQUFFLENBQUMsQ0FBQTtJQUUvRCwyRUFBMkU7SUFDM0UsTUFBTSxhQUFhLEdBQUcsTUFBTSxVQUFVLENBQUMsU0FBUyxDQUFDLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUE7SUFDeEUsSUFBSSxJQUFJLEdBQUcsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFFN0IsSUFBSSxDQUFDLElBQUks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