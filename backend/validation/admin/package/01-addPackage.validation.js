import { body } from "express-validator";
import { validateDayNumber, validateDayTitle, validateDayDescription } from "../../../utils/itinerary/index.js";

export const addPackageValidation = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Package title is required")
        .isLength({ min: 3, max: 100 })
        .withMessage("Package title must be between 3 and 100 characters"),

    body("description")
        .trim()
        .notEmpty()
        .withMessage("Description is required")
        .isLength({ min: 30, max: 2000 })
        .withMessage("Description must be between 30 and 2000 characters"),

    body("location")
        .trim()
        .notEmpty()
        .withMessage("Location is required")
        .isMongoId()
        .withMessage("Invalid location id"),

    body("hotel")
        .trim()
        .notEmpty()
        .withMessage("Hotel is required")
        .isMongoId()
        .withMessage("Invalid hotel id"),

    body("price")
        .trim()
        .notEmpty()
        .withMessage("Package price is required")
        .toFloat()
        .isFloat({ min: 1 })
        .withMessage("Package price must be greater than 0"),

    body("duration")
        .trim()
        .notEmpty()
        .withMessage("Duration is required")
        .toInt()
        .isInt({ min: 1 })
        .withMessage("Duration must be at least 1 day"),

    body("tripType")
        .trim()
        .notEmpty()
        .withMessage("Trip type is required")
        .isIn(["adventure", "cultural", "relaxation", "family", "honeymoon"])
        .withMessage("Invalid trip type"),

    body("itinerary")
        .notEmpty()
        .withMessage("Itinerary is required")
        .custom((value) => {
            let itinerary = value;
            if (typeof value === "string") {
                try {
                    itinerary = JSON.parse(value);
                } catch {
                    throw new Error("Itinerary must be a valid JSON array");
                }
            }

            if (!Array.isArray(itinerary) || itinerary.length === 0) {
                throw new Error("Itinerary must be a non-empty array");
            }

            itinerary.forEach((day, position) => {
                validateDayNumber(day, position);
                validateDayTitle(day, position);
                validateDayDescription(day, position);
            });

            return true;
        }),
];