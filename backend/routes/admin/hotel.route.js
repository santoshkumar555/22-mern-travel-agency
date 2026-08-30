import express from "express";
import * as authMiddleware from "../../middleware/auth/index.js";
import * as uploadMiddleware from "../../middleware/upload/index.js";
import * as validationMiddleware from "../../middleware/validation/index.js";
import * as adminHotelValidation from "../../validation/admin/hotel/index.js";
import * as adminHotelControllers from "../../controllers/admin/hotel/index.js";

const { auth, isAdmin } = authMiddleware;
const { upload } = uploadMiddleware;
const { handleValidation } = validationMiddleware;
const { getHotelValidation, addHotelValidation, updateHotelValidation } = adminHotelValidation;
const {
    getHotel,
    getHotels,
    addHotel,
    updateHotel,
    deleteHotel,
} = adminHotelControllers;

const router = express.Router();

router.get(
    "/",
    auth,
    isAdmin,
    getHotels
);

router.get(
    "/:hotelId",
    auth,
    isAdmin,
    getHotelValidation,
    handleValidation,
    getHotel,
);

router.post(
    "/",
    auth,
    isAdmin,
    upload.array("images", 5),
    addHotelValidation,
    handleValidation,
    addHotel,
);

router.put(
    "/:hotelId",
    auth,
    isAdmin,
    upload.array("images", 5),
    updateHotelValidation,
    handleValidation,
    updateHotel,
);

router.delete(
    "/:hotelId",
    auth,
    isAdmin,
    deleteHotel
);

export default router;