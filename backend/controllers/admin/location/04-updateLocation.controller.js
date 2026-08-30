import locationModel from "../../../models/location.model.js";
import { deleteImage } from "../../../services/cloudinary/index.js";
import { cleanupUploadedFiles } from "../../../validation/admin/cleanupUploadedfiles.js";

export const updateLocation = async (req, res) => {
    try {
        const { locationId } = req.params;
        const { name, country, description } = req.body;
        const location = await locationModel.findOne({ _id: locationId });

        if (!location) {
            await cleanupUploadedFiles(req);
            return res
                .status(404)
                .json({
                    success: false,
                    message: "Location not found!"
                });
        }

        const updateData = {};

        if (name) updateData.name = name;
        if (country) updateData.country = country;
        if (description) updateData.description = description;

        if (req.file) {
            if (location.image?.public_id) await deleteImage(location.image.public_id);
            updateData.image = { public_id: req.file.filename, url: req.file.path };
        }

        const updated = await locationModel
            .findByIdAndUpdate(
                locationId,
                { $set: updateData },
                { returnDocument: "after", runValidators: true }
            );

        return res
            .status(200)
            .json({
                success: true,
                message: "Location updated successfully",
                data: updated
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
