import { body } from "express-validator";

export const addUserValidation = [
    body("name").notEmpty().withMessage("Name is required").trim(),
    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email should contain @ and .")
        .trim(),

    body("password")
        .notEmpty()
        .withMessage("Password is Required")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long")
        .matches(/[a-z]/)
        .withMessage("Password must contain at least one lowercase letter")
        .matches(/[A-Z]/)
        .withMessage("Password must contain at least one uppercase letter")
        .matches(/\d/)
        .withMessage("Password must contain at least one number")
        .matches(/[\W_]/)
        .withMessage("Password must contain at least one special character")
        .trim(),

    body("contact")
        .notEmpty()
        .withMessage("Contact is Required")
        .isNumeric()
        .withMessage("Contact should contain only Numbers")
        .matches(/^\d{10}$/)
        .withMessage("Contact number must be exactly 10 digits")
        .trim(),
];