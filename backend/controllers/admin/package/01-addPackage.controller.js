import hotelModel from "../../../models/hotel.model.js";
import locationModel from "../../../models/location.model.js";
import packageModel from "../../../models/package.model.js";
import { cleanupUploadedFiles } from "../../../validation/admin/cleanupUploadedfiles.js";

export const addPackage = async (req, res) => {
    try {
        const { title, description, location, hotel, price, duration, tripType, itinerary } = req.body;
        const parsedItinerary = typeof itinerary === "string" ? JSON.parse(itinerary) : itinerary;
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

        const existingHotel = await hotelModel.findById(hotel);

        if (!existingHotel) {
            await cleanupUploadedFiles(req);
            return res
                .status(404)
                .json({
                    success: false,
                    message: "Hotel not found!"
                });
        }

        if (existingHotel.location.toString() !== location) {
            await cleanupUploadedFiles(req);
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Selected hotel not found in this location"
                });
        }

        const existingPackage = await packageModel.findOne({ title, location, hotel });

        if (existingPackage) {
            await cleanupUploadedFiles(req);
            return res
                .status(409)
                .json({
                    success: false,
                    message: "Package already exists"
                });
        }

        const images = req.files?.map((file) => ({ public_id: file.filename, url: file.path })) || [];
        const thumbnail = images.length > 0 ? images[0] : undefined;

        const created = await packageModel
            .create({
                title, description, location, hotel, price, duration, tripType, itinerary: parsedItinerary, images, thumbnail,
            });

        return res
            .status(201)
            .json({
                success: true,
                message: "Package created successfully",
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
