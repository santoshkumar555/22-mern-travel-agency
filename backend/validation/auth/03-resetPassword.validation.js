import { body } from "express-validator";

export const resetPasswordValidation = [
    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Enter a valid email"),

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
    body("resetToken").notEmpty().withMessage("Reset token is required"),
];