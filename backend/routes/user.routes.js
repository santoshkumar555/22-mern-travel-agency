import { Router } from "express";
import userProfileRoute from "./user/profile.route.js";
import userLocationRoute from "./user/location.route.js";
import userHotelRoute from "./user/hotel.route.js";
import userPackageRoute from "./user/package.route.js";
import userBookingRoute from "./user/booking.route.js";

const router = Router();

router.use("/profile", userProfileRoute);
router.use("/locations", userLocationRoute);
router.use("/hotels", userHotelRoute);
router.use("/packages", userPackageRoute);
router.use("/bookings", userBookingRoute);

export default router;