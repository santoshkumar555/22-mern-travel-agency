import { body, param } from "express-validator";
import {
    validateDayNumber,
    validateDayTitle,
    validateDayDescription,
} from "../../../utils/itinerary/index.js";

export const updatePackageValidation = [
    param("packageId")
        .notEmpty()
        .withMessage("PackageId is required")
        .isMongoId()
        .withMessage("Invalid package id"),

    body("title")
        .optional({ checkFalsy: true })
        .trim()
        .isLength({ min: 3, max: 100 })
        .withMessage("Package title must be between 3 and 100 characters"),

    body("description")
        .optional({ checkFalsy: true })
        .trim()
        .isLength({ min: 30, max: 2000 })
        .withMessage("Description must be between 30 and 2000 characters"),

    body("location")
        .optional({ checkFalsy: true })
        .isMongoId()
        .withMessage("Invalid location id"),

    body("hotel")
        .optional({ checkFalsy: true })
        .isMongoId()
        .withMessage("Invalid hotel id"),

    body("price")
        .optional({ checkFalsy: true })
        .toFloat()
        .isFloat({ min: 1 })
        .withMessage("Package price must be greater than 0"),

    body("duration")
        .optional({ checkFalsy: true })
        .toInt()
        .isInt({ min: 1 })
        .withMessage("Duration must be at least 1 day"),

    body("tripType")
        .optional({ checkFalsy: true })
        .trim()
        .isIn([
            "adventure",
            "cultural",
            "relaxation",
            "family",
            "honeymoon",
        ])
        .withMessage("Invalid trip type"),

    body("itinerary")
        .optional({ checkFalsy: true })
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