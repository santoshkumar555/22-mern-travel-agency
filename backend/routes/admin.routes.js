import { Router } from "express";
import adminUserRoute from "./admin/user.route.js";
import adminLocationRoute from "./admin/location.route.js";
import adminHotelRoute from "./admin/hotel.route.js";
import adminPackageRoute from "./admin/package.route.js";
import adminBookingRoute from "./admin/booking.route.js";
import adminProfileRoute from "./admin/profile.route.js";

const router = Router();

router.use("/users", adminUserRoute);
router.use("/locations", adminLocationRoute);
router.use("/hotels", adminHotelRoute);
router.use("/packages", adminPackageRoute);
router.use("/bookings", adminBookingRoute);
router.use("/profile", adminProfileRoute);

export default router;