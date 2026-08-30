import { body, param } from "express-validator";

export const updateBookingValidation = [
    param("bookingId")
        .trim()
        .notEmpty()
        .withMessage("BookingId is required")
        .matches(/^BOOK-\d+-[0-9a-fA-F]+$/)
        .withMessage("Invalid booking id format"),

    body("bookingStatus")
        .optional()
        .isIn(["pending", "confirmed", "cancelled", "completed"])
        .withMessage("Invalid booking status"),

    body("paymentStatus")
        .optional()
        .isIn(["pending", "paid", "failed", "refunded"])
        .withMessage("Invalid payment status"),

    body("paymentMethod")
        .optional()
        .isIn(["card", "upi", "netbanking", "wallet", "cash"])
        .withMessage("Invalid payment method"),
];
