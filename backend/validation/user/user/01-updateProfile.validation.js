import { body } from "express-validator";

export const updateProfileValidation = [
    body("name")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Name cannot be empty"),

    body("email")
        .optional()
        .trim()
        .isEmail()
        .withMessage("Invalid email format"),

    body("contact")
        .optional()
        .trim()
        .matches(/^\d{10}$/)
        .withMessage("Contact number must be exactly 10 digits"),
];