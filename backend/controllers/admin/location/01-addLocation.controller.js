import locationModel from "../../../models/location.model.js";
import { cleanupUploadedFiles } from "../../../validation/admin/cleanupUploadedfiles.js";

export const addLocation = async (req, res) => {
    try {
        const { name, country, description } = req.body;
        const image = req.file ? { public_id: req.file.filename, url: req.file.path } : undefined;
        const existing = await locationModel.findOne({ name });

        if (existing) {
            await cleanupUploadedFiles(req);
            return res
                .status(409)
                .json({
                    success: false,
                    message: "Location already exists!"
                });
        }

        const created = await locationModel.create({ name, country, description, image });

        return res
            .status(201)
            .json({
                success: true,
                message: "Location created successfully",
                data: created
            });
    } catch (err) {
        await cleanupUploadedFiles(req);
        return res
            .status(500)
            .json({
                success: false,
                message: err.message || "Internal Server Error"
            });
    }
};
