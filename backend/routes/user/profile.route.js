import express from "express";
import * as authMiddleware from "../../middleware/auth/index.js";
import * as uploadMiddleware from "../../middleware/upload/index.js";
import * as validationMiddleware from "../../middleware/validation/index.js";
import * as userProfileValidation from "../../validation/user/user/index.js";
import * as userProfileControllers from "../../controllers/user/profile/index.js";

const { auth, isAdmin } = authMiddleware;
const { upload } = uploadMiddleware;
const { handleValidation } = validationMiddleware;
const { updateProfileValidation, changePasswordValidation } = userProfileValidation;
const { getProfile, updateProfile, changePassword, getLoginSessions, getConnectedAccounts, deactivateProfile } = userProfileControllers;
const router = express.Router();

router.get(
    "/",
    auth,
    getProfile
);

router.put(
    "/",
    auth,
    upload.single("image"),
    updateProfileValidation,
    handleValidation,
    updateProfile,
);

router.put(
    "/change_password",
    auth,
    changePasswordValidation,
    handleValidation,
    changePassword,
);

router.get(
    "/login_sessions",
    auth,
    getLoginSessions
);

router.get(
    "/connected_accounts",
    auth,
    getConnectedAccounts
);

router.delete(
    "/",
    auth,
    deactivateProfile
);

export default router;
