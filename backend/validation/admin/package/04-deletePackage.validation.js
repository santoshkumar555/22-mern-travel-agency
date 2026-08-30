import { param } from "express-validator";

export const deletePackageValidation = [
    param("packageId")
        .notEmpty()
        .withMessage("PackageId is required")
        .isMongoId()
        .withMessage("Invalid package id"),
];