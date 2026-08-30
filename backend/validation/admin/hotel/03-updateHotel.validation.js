import { body, param } from "express-validator";

export const updateHotelValidation = [
    body("name")
        .optional({ checkFalsy: true })
        .trim()
        .isLength({ min: 3 })
        .withMessage("Hotel name must be at least 3 characters long"),

    body("location")
        .optional({ checkFalsy: true })
        .trim()
        .isMongoId()
        .withMessage("Invalid location id"),

    body("description")
        .optional({ checkFalsy: true })
        .trim()
        .isLength({ min: 30, max: 1000 })
        .withMessage("Description must be between 30 and 1000 characters"),

    body("rating")
        .optional({ checkFalsy: true })
        .trim()
        .toFloat()
        .isFloat({ min: 1, max: 5 })
        .withMessage("Rating must be between 1 and 5"),

    body("pricePerNight")
        .optional({ checkFalsy: true })
        .trim()
        .toFloat()
        .isFloat({ min: 1 })
        .withMessage("Price per night must be greater than 0"),

    body("roomsAvailable")
        .optional({ checkFalsy: true })
        .trim()
        .toInt()
        .isInt({ min: 0 })
        .withMessage("Rooms available must be 0 or greater"),

    body("hotelType")
        .optional({ checkFalsy: true })
        .trim()
        .isIn(["budget", "standard", "luxury", "resort", "villa", "boutique", "business"])
        .withMessage("Invalid hotel type"),

    // isActive is intentionally NOT validated here.
    // FormData sends it as the string "true" or "false".
    // The controller reads req.body.isActive as a raw string and converts
    // it to boolean with an explicit string comparison — no sanitizer needed.

    // amenities arrives as individual repeated fields from FormData.
    // Multer collects them into a real string[] so .isArray() passes.
    // The fallback handles the edge-case where only one amenity is sent
    // (multer keeps it as a plain string, not wrapped in an array).
    body("amenities")
        .optional()
        .custom((value) => {
            if (Array.isArray(value)) {
                const allStrings = value.every((item) => typeof item === "string");
                if (!allStrings) throw new Error("Each amenity must be a string");
                return true;
            }
            if (typeof value === "string") return true; // single amenity
            throw new Error("Amenities must be an array of strings");
        }),

    param("hotelId")
        .notEmpty()
        .withMessage("HotelId is required")
        .isMongoId()
        .withMessage("Invalid HotelId"),
];