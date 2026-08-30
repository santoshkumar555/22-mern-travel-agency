import hotelModel from "../../../models/hotel.model.js";
import locationModel from "../../../models/location.model.js";
import { deleteImage } from "../../../services/cloudinary/index.js";
import { cleanupUploadedFiles } from "../../../validation/admin/cleanupUploadedfiles.js";

const parseAmenities = (raw) => {
    if (raw === undefined || raw === null) return undefined;

    const items = Array.isArray(raw) ? raw : [raw];
    const result = [];

    for (const item of items) {
        if (typeof item !== "string") continue;
        const trimmed = item.trim();

        if (trimmed.startsWith("[")) {
            try {
                const parsed = JSON.parse(trimmed);
                if (Array.isArray(parsed)) {
                    for (const value of parsed) {
                        if (typeof value === "string") result.push(value);
                    }
                    continue;
                }
            } catch (_) {
                // fall through — treat as plain string
            }
        }
        result.push(trimmed);
    }

    return [...new Set(result)].filter(Boolean);
};

export const updateHotel = async (req, res) => {
    try {
        const { hotelId } = req.params;

        // Fetch the live document — we will mutate it directly and call .save()
        // This is the most reliable pattern with Mongoose: it respects all schema
        // setters, casts types correctly, and guarantees the returned document
        // reflects what was actually written to the database.
        const hotel = await hotelModel.findById(hotelId);

        if (!hotel) {
            await cleanupUploadedFiles(req);
            return res.status(404).json({ success: false, message: "Hotel not found!" });
        }

        const {
            name,
            location,
            description,
            rating,
            pricePerNight,
            roomsAvailable,
            amenities: rawAmenities,
            hotelType,
            isActive,
        } = req.body;

        // Validate that the location exists (only if a new one was provided)
        if (location) {
            const existingLocation = await locationModel.findById(location);
            if (!existingLocation) {
                await cleanupUploadedFiles(req);
                return res.status(404).json({ success: false, message: "Location not found!" });
            }
        }

        // Duplicate-name check: ensure no OTHER hotel has the same name+location
        if (name || location) {
            const existingHotel = await hotelModel.findOne({
                name: name || hotel.name,
                location: location || hotel.location,
                _id: { $ne: hotelId },
            });
            if (existingHotel) {
                await cleanupUploadedFiles(req);
                return res.status(409).json({
                    success: false,
                    message: "Hotel already exists in this location",
                });
            }
        }

        // ── Apply field updates directly to the Mongoose document ──────────
        if (name        !== undefined) hotel.name           = name;
        if (location    !== undefined) hotel.location       = location;
        if (description !== undefined) hotel.description    = description;
        if (rating      !== undefined) hotel.rating         = Number(rating);
        if (pricePerNight  !== undefined) hotel.pricePerNight  = Number(pricePerNight);
        if (roomsAvailable !== undefined) hotel.roomsAvailable = Number(roomsAvailable);
        if (hotelType   !== undefined) hotel.hotelType      = hotelType;

        // isActive arrives as the raw string "true" or "false" from FormData
        // (express-validator no longer sanitizes it, so we handle it here directly)
        if (isActive !== undefined && isActive !== null && isActive !== "") {
            hotel.isActive = String(isActive) === "true";
            console.log(`[updateHotel] isActive raw="${isActive}" → saved=${hotel.isActive}`);
        }

        const cleanAmenities = parseAmenities(rawAmenities);
        if (cleanAmenities !== undefined) {
            hotel.amenities = cleanAmenities;
        }

        // Handle image replacement
        if (req.files && req.files.length > 0) {
            for (const file of hotel.images || []) {
                if (file.public_id) await deleteImage(file.public_id);
            }
            hotel.images = req.files.map((file) => ({
                public_id: file.filename,
                url: file.path,
            }));
            hotel.thumbnail = hotel.images[0];
        }

        // Save — Mongoose writes every changed field and returns the updated doc
        await hotel.save();

        // Populate location for the response (same fields as getHotels)
        await hotel.populate("location", "name country description image");

        return res.status(200).json({
            success: true,
            message: "Hotel updated successfully",
            data: hotel,
        });
    } catch (err) {
        await cleanupUploadedFiles(req);
        return res.status(500).json({
            success: false,
            message: err.message || "Internal Server Error",
        });
    }
};