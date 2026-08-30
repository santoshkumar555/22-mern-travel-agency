import express from "express";
import * as authMiddleware from "../../middleware/auth/index.js";
import * as validationMiddleware from "../../middleware/validation/index.js";
import * as adminBookingValidation from "../../validation/admin/booking/index.js";
import * as adminBookingController from "../../controllers/admin/booking/index.js";
import * as adminStatsController from "../../controllers/admin/stats/index.js";

const { auth, isAdmin } = authMiddleware;
const { handleValidation } = validationMiddleware;
const { getBookingValidation, updateBookingValidation } = adminBookingValidation;
const { getBooking, getBookings, updateBooking } = adminBookingController;
const { getDashboardStats } = adminStatsController;
const router = express.Router();

router.get(
    "/",
    auth,
    isAdmin,
    getBookings
);

router.get(
    "/dashboard/stats",
    auth,
    isAdmin,
    getDashboardStats,
);

router.get(
    "/:bookingId",
    auth,
    isAdmin,
    getBookingValidation,
    handleValidation,
    getBooking,
);

router.patch(
    "/:bookingId",
    auth,
    isAdmin,
    updateBookingValidation,
    handleValidation,
    updateBooking,
);

export default router;