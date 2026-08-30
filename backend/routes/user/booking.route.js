import express from "express";
import * as authMiddleware from "../../middleware/auth/index.js";
import * as validationMiddleware from "../../middleware/validation/index.js";
import * as userBookingValidation from "../../validation/user/booking/index.js";
import * as userBookingControllers from "../../controllers/user/booking/index.js";

const { auth, isAdmin } = authMiddleware;
const { handleValidation } = validationMiddleware;
const { getBookingValidation, createBookingValidation, cancelBookingValidation } = userBookingValidation;
const { getMyBookings, getBooking, createBooking, cancelBooking } = userBookingControllers;
const router = express.Router();

router.get(
    "/", 
    auth, 
    getMyBookings
);

router.get(
    "/:bookingId",
    auth,
    getBookingValidation,
    handleValidation,
    getBooking,
);

router.post(
    "/",
    auth,
    createBookingValidation,
    handleValidation,
    createBooking,
);

router.patch(
    "/:bookingId/cancel",
    auth,
    cancelBookingValidation,
    handleValidation,
    cancelBooking,
);

export default router;
