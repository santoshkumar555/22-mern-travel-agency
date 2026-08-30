import { param } from "express-validator";

export const bookingIdParam = param("bookingId")
    .notEmpty()
    .withMessage("BookingId is required")
    .matches(/^BOOK-\d+-[0-9a-f]{16}$/)
    .withMessage("Invalid booking id format");