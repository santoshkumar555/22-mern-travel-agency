import express from "express";
import * as authMiddleware from "../../middleware/auth/index.js";
import * as uploadMiddleware from "../../middleware/upload/index.js";
import * as validationMiddleware from "../../middleware/validation/index.js";
import * as adminPackageValidation from "../../validation/admin/package/index.js";
import * as adminPackageControllers  from "../../controllers/admin/package/index.js";

const { auth, isAdmin } = authMiddleware;
const { upload } = uploadMiddleware;
const { handleValidation } = validationMiddleware;
const { getPackageValidation, addPackageValidation, updatePackageValidation, deletePackageValidation } = adminPackageValidation;
const { getPackages, getPackage, addPackage, updatePackage, deletePackage } = adminPackageControllers;
const router = express.Router();

router.get(
    "/",
    auth,
    isAdmin,
    getPackages
);

router.get(
    "/:packageId",
    auth,
    isAdmin,
    getPackageValidation,
    handleValidation,
    getPackage,
);

router.post(
    "/",
    auth,
    isAdmin,
    upload.array("images", 5),
    addPackageValidation,
    handleValidation,
    addPackage,
);

router.put(
    "/:packageId",
    auth,
    isAdmin,
    upload.array("images", 5),
    updatePackageValidation,
    handleValidation,
    updatePackage,
);

router.delete(
    "/:packageId",
    auth,
    isAdmin,
    deletePackageValidation,
    handleValidation,
    deletePackage,
);

export default router;
