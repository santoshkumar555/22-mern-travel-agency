import { validationResult } from "express-validator";

import { cleanupUploadedFiles } from "../../validation/admin/cleanupUploadedfiles.js";

export const handleValidation = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        await cleanupUploadedFiles(req);

        const errorMsg = errors.array().map((e) => ({ message: e.msg, field: e.path }));

        return res
            .status(400)
            .json({ errors: errorMsg });
    }

    next();
};
