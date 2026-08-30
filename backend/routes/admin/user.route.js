import express from "express";
import * as authMiddleware from "../../middleware/auth/index.js";
import * as uploadMiddleware from "../../middleware/upload/index.js";
import * as validationMiddleware from "../../middleware/validation/index.js";
import * as adminUserValidation from "../../validation/admin/user/index.js";
import * as adminUserControllers from "../../controllers/admin/user/index.js";

const { auth, isAdmin } = authMiddleware;
const { upload } = uploadMiddleware;
const { handleValidation } = validationMiddleware;
const { addUserValidation, updateUserValidation } = adminUserValidation;
const { getUsers, getUser, addUser, updateUser, deleteUser } = adminUserControllers;
const router = express.Router();

router.get(
    "/",
    auth,
    isAdmin,
    getUsers
);

router.get(
    "/:userId", 
    auth, 
    isAdmin, 
    getUser
);

router.post(
    "/",
    auth,
    isAdmin,
    upload.single("image"),
    addUserValidation,
    handleValidation,
    addUser,
);

router.put(
    "/:userId",
    auth,
    isAdmin,
    upload.single("image"),
    updateUserValidation,
    handleValidation,
    updateUser,
);

router.delete(
    "/:userId",
    auth,
    isAdmin,
    deleteUser
);

export default router;
