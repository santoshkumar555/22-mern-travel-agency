import express from "express";
import * as userHotelControllers from "../../controllers/user/hotel/index.js";

const { getHotels, getHotel } = userHotelControllers;
const router = express.Router();

router.get(
    "/",
    getHotels
);

router.get(
    "/:hotelId",
    getHotel
);

export default router;
