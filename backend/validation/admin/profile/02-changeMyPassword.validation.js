import { body } from "express-validator";

export const changeMyPasswordValidation = [
    body("currentPassword")
        .notEmpty()
        .withMessage("Current password is required"),

    body("newPassword")
        .notEmpty()
        .withMessage("New password is required")
        .isLength({ min: 6 })
        .withMessage("New password must be at least 6 characters long"),

    body("confirmPassword")
        .notEmpty()
        .withMessage("Confirm password is required"),
];