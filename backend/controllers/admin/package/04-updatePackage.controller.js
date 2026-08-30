import hotelModel from "../../../models/hotel.model.js";
import locationModel from "../../../models/location.model.js";
import packageModel from "../../../models/package.model.js";
import { deleteImage } from "../../../services/cloudinary/index.js";
import { cleanupUploadedFiles } from "../../../validation/admin/cleanupUploadedfiles.js";

export const updatePackage = async (req, res) => {
    try {
        const { packageId } = req.params;
        const singlePackage = await packageModel.findById(packageId);

        if (!singlePackage) {
            await cleanupUploadedFiles(req);
            return res
                .status(404)
                .json({
                    success: false,
                    message: "Package not found!"
                });
        }

        const { title, description, location, hotel, price, duration, tripType, itinerary } = req.body;
        const parsedItinerary = typeof itinerary === "string" ? JSON.parse(itinerary) : itinerary;
        const finalTitle = title !== undefined ? title : singlePackage.title;
        const finalLocation = location !== undefined ? location : singlePackage.location.toString();
        const finalHotelId = hotel !== undefined ? hotel : singlePackage.hotel.toString();

        if (location) {
            const existingLocation = await locationModel.findById(location);

            if (!existingLocation) {
                await cleanupUploadedFiles(req);
                return res
                    .status(404)
                    .json({ success: false, message: "Location not found!" });
            }
        }

        const finalHotel = await hotelModel.findById(finalHotelId);

        if (!finalHotel) {
            await cleanupUploadedFiles(req);
            return res
                .status(404)
                .json({
                    success: false,
                    message: "Hotel not found!"
                });
        }

        if (finalHotel.location.toString() !== finalLocation) {
            await cleanupUploadedFiles(req);
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Selected hotel does not belong to this location"
                });
        }

        const existingPackage = await packageModel
            .findOne({
                title: finalTitle,
                location: finalLocation,
                hotel: finalHotelId,
                _id: { $ne: packageId },
            });

        if (existingPackage) {
            await cleanupUploadedFiles(req);
            return res
                .status(409)
                .json({
                    success: false,
                    message: "Package already exists in this location and hotel"
                });
        }

        const updatedData = {};

        if (title !== undefined) updatedData.title = title;
        if (description !== undefined) updatedData.description = description;
        if (location !== undefined) updatedData.location = location;
        if (hotel !== undefined) updatedData.hotel = hotel;
        if (price !== undefined) updatedData.price = price;
        if (duration !== undefined) updatedData.duration = duration;
        if (tripType !== undefined) updatedData.tripType = tripType;
        if (itinerary !== undefined) updatedData.itinerary = parsedItinerary;

        if (req.files && req.files.length > 0) {
            if (singlePackage.images) {
                for (let image of singlePackage.images) {
                    if (image.public_id) {
                        await deleteImage(image.public_id);
                    }
                }
            }

            updatedData.images = [];

            for (let file of req.files) {
                updatedData.images.push({
                    public_id: file.filename,
                    url: file.path,
                });
            }

            if (updatedData.images.length > 0) {
                updatedData.thumbnail = updatedData.images[0];
            }
        }

        const updated = await packageModel
            .findByIdAndUpdate(
                packageId,
                { $set: updatedData },
                { returnDocument: "after", runValidators: true }
            )
            .populate(
                "location",
                "name country description image"
            )
            .populate(
                "hotel",
                "name description rating pricePerNight roomsAvailable amenities hotelType thumbnail images"
            );

        return res
            .status(200)
            .json({
                success: true,
                message: "Package updated successfully",
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
