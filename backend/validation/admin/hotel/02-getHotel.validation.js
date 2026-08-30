import { param } from "express-validator";

export const getHotelValidation = [
    param("hotelId")
        .notEmpty()
        .withMessage("HotelId is required")
        .isMongoId()
        .withMessage("Invalid HotelId"),
];