import { param } from "express-validator";

export const getPackageValidation = [
    param("packageId")
        .notEmpty()
        .withMessage("PackageId is required")
        .isMongoId()
        .withMessage("Invalid package id"),
];