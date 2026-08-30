import express from "express";
import * as authMiddleware from "../../middleware/auth/index.js";
import * as uploadMiddleware from "../../middleware/upload/index.js";
import * as validationMiddleware from "../../middleware/validation/index.js";
import * as adminProfileValidation from "../../validation/admin/profile/index.js";
import * as adminProfileControllers from "../../controllers/admin/profile/index.js";

const { auth, isAdmin } = authMiddleware;
const { upload } = uploadMiddleware;
const { handleValidation } = validationMiddleware;
const { updateMyProfileValidation, changeMyPasswordValidation } = adminProfileValidation;
const { getMyProfile, updateMyProfile, changeMyPassword } = adminProfileControllers;
const router = express.Router();

router.get(
    "/me", 
    auth, 
    isAdmin, 
    getMyProfile
);

router.put(
    "/me",
    auth,
    isAdmin,
    upload.single("image"),
    updateMyProfileValidation,
    handleValidation,
    updateMyProfile,
);

router.put(
    "/change-password",
    auth,
    isAdmin,
    changeMyPasswordValidation,
    handleValidation,
    changeMyPassword,
);

export default router;
