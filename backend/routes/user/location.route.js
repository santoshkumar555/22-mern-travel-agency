import express from "express";
import * as userLocationControllers from "../../controllers/user/location/index.js";

const { getLocations, getLocation } = userLocationControllers;
const router = express.Router();

router.get(
    "/",
    getLocations
);

router.get(
    "/:locationId",
    getLocation
);

export default router;
