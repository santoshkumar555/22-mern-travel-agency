import hotelModel from "../../../models/hotel.model.js";
import locationModel from "../../../models/location.model.js";
import { cleanupUploadedFiles } from "../../../validation/admin/cleanupUploadedfiles.js";

export const addHotel = async (req, res) => {
    try {
        const { name, location, description, rating, pricePerNight, roomsAvailable, amenities, hotelType } = req.body;
        const existingLocation = await locationModel.findById(location);

        if (!existingLocation) {
            await cleanupUploadedFiles(req);
            return res
                .status(404)
                .json({
                    success: false,
                    message: "Location not found!"
                });
        }

        const existingHotel = await hotelModel.findOne({ name, location });

        if (existingHotel) {
            await cleanupUploadedFiles(req);
            return res
                .status(409)
                .json({
                    success: false,
                    message: "Hotel already exists on this location"
                });
        }

        const images = req.files?.map((file) => ({ public_id: file.filename, url: file.path })) || [];
        const thumbnail = images.length > 0 ? images[0] : undefined;
        const created = await hotelModel.create({
            name, location, description, rating, pricePerNight, roomsAvailable, amenities, hotelType, images, thumbnail,
        });

        return res
            .status(201)
            .json({
                success: true,
                message: "Hotel created successfully", data: created
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