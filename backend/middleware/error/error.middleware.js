import { cleanupUploadedFiles } from "../../validation/admin/cleanupUploadedfiles.js";

export const errorMiddleware = async (err, req, res, next) => {
    await cleanupUploadedFiles(req);

    const statusCode = err.statusCode || 500;

    const message = err.message || "Internal Server Error";

    const response = {
        success: false,
        message,
    };

    if (process.env.NODE_ENV !== "production") {
        response.stack = err.stack;
    }

    res.status(statusCode).json(response);
};
