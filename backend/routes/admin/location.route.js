import express from "express";
import * as authMiddleware from "../../middleware/auth/index.js";
import * as uploadMiddleware from "../../middleware/upload/index.js";
import * as validationMiddleware from "../../middleware/validation/index.js";
import * as adminLocationValidation from "../../validation/admin/location/index.js";
import * as adminLocationControllers  from "../../controllers/admin/location/index.js";

const { auth, isAdmin } = authMiddleware;
const { upload } = uploadMiddleware;
const { handleValidation } = validationMiddleware;
const { addLocationValidation, updateLocationValidation } = adminLocationValidation;
const { getLocation, getLocations, addLocation, updateLocation, deleteLocation } = adminLocationControllers;
const router = express.Router();

router.get(
    "/",
    auth,
    isAdmin,
    getLocations
);

router.get(
    "/:locationId",
    auth,
    isAdmin,
    getLocation
);

router.post(
    "/",
    auth,
    isAdmin,
    upload.single("image"),
    addLocationValidation,
    handleValidation,
    addLocation,
);

router.put(
    "/:locationId",
    auth,
    isAdmin,
    upload.single("image"),
    updateLocationValidation,
    handleValidation,
    updateLocation,
);

router.delete(
    "/:locationId",
    auth,
    isAdmin,
    deleteLocation
);

export default router;
