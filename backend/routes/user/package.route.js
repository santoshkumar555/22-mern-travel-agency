import express from "express";
import * as userPackageControllers from "../../controllers/user/package/index.js";

const { getPackages, getFeaturedPackages, getPackage, getPackageSearchData } = userPackageControllers;
const router = express.Router();

router.get(
    "/",
    getPackages
);

router.get(
    "/featured",
    getFeaturedPackages
);

router.get(
    "/search_data",
    getPackageSearchData
);

router.get(
    "/:packageId", getPackage
);

export default router;
