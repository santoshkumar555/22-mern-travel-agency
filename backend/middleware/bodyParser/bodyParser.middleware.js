import express from "express";

const jsonParser = express.json();

export const bodyParserMiddleware = (req, res, next) => {
    if (req.path === "/api/v1/payment/webhook") {
        return next();
    }
    jsonParser(req, res, next); 
};