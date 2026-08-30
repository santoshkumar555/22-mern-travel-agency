import { body } from "express-validator";

export const addLocationValidation = [
    body("name")
        .notEmpty()
        .withMessage("Location name is required")
        .trim(),

    body("country")
        .notEmpty()
        .withMessage("Country is required")
        .trim(),

    body("description")
        .notEmpty()
        .withMessage("Description is required")
        .isLength({ min: 30 })
        .withMessage("Description must be at least 30 characters long")
        .trim(),
];
