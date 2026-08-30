import { param } from "express-validator";

export const getBookingValidation = [
    param("bookingId")
        .trim()
        .notEmpty()
        .withMessage("BookingId is required")
        .matches(/^BOOK-\d+-[0-9a-fA-F]+$/)
        .withMessage("Invalid booking id format"),
];
