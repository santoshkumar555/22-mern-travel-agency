import { body } from "express-validator";
import { validateTravelDate } from "../../../utils/date/index.js";

export const createBookingValidation = [
    body("travelPackage")
        .notEmpty()
        .withMessage("Package is required")
        .isMongoId()
        .withMessage("Invalid package id"),

    body("travelDate")
        .notEmpty()
        .withMessage("Travel date is required")
        .isISO8601()
        .withMessage("Travel date must be a valid date")
        .custom(validateTravelDate),

    body("numberOfPeople")
        .notEmpty()
        .withMessage("Number of people is required")
        .isInt({ min: 1, max: 20 })
        .withMessage("Number of people must be between 1 and 20"),

    body("paymentMethod")
        .notEmpty()
        .withMessage("Payment method is required")
        .isIn(["card", "upi", "netbanking", "wallet", "cash"])
        .withMessage("Invalid payment method"),
];