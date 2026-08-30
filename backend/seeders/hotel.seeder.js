import "../config/env.config.js";
import hotelModel from "../models/hotel.model.js";
import locationModel from "../models/location.model.js";
import { Hotel_Blueprints, Location_Image_Pools, Fallback_Hotel_Images } from "./data/hotels.data.js";
import { connectDB } from "../config/db.config.js";
import { shuffleArray } from "./utils/random.js";
import { Location_Names } from "./data/locations.data.js";

const makeDescription = (locationName, hotelType, hotelName) =>
    `${hotelName} is a beautifully designed ${hotelType} hotel in ${locationName} offering elegant rooms, modern comfort, quality amenities, warm hospitality, and a relaxing stay experience for couples, families, and travelers.`;

const getFiveImagesForHotel = (locationName) => {
    const locationPool = Location_Image_Pools[locationName] || [];
    const mergedPool = [...new Set([...locationPool, ...Fallback_Hotel_Images])];

    if (mergedPool.length < 5) {
        throw new Error(`Not enough images available for ${locationName}`);
    }

    return shuffleArray(mergedPool).slice(0, 5).map((url) => ({ public_id: null, url }));
};

const prepareHotelsForLocation = (locationDoc) =>
    Hotel_Blueprints.map((blueprint, i) => {
        const hotelName = `${locationDoc.name} ${blueprint.suffix}`;
        const images = getFiveImagesForHotel(locationDoc.name);

        return {
            name: hotelName,
            location: locationDoc._id,
            description: makeDescription(locationDoc.name, blueprint.hotelType, hotelName),
            rating: blueprint.rating,
            pricePerNight: blueprint.pricePerNight + i * 500,
            roomsAvailable: blueprint.roomsAvailable,
            amenities: blueprint.amenities,
            hotelType: blueprint.hotelType,
            thumbnail: images[0],
            images,
            isActive: true,
        };
    });

const seedHotels = async () => {
    try {
        await connectDB();

        await hotelModel.deleteMany({});
        console.log("Old hotels deleted");

        const locations = await locationModel.find({ name: { $in: Location_Names }, isActive: true });

        if (!locations.length) {
            throw new Error("No active locations found. Seed locations first.");
        }

        const sortedLocations = Location_Names
            .map((name) => locations.find((l) => l.name === name))
            .filter(Boolean);

        const allHotels = [];

        for (const location of sortedLocations) {
            try {
                const hotels = prepareHotelsForLocation(location);
                allHotels.push(...hotels);
                console.log(`Prepared ${Hotel_Blueprints.length} hotels for ${location.name}`);
            } catch (error) {
                console.log(`Failed for ${location.name}: ${error.message}`);
            }
        }

        if (!allHotels.length) {
            throw new Error("No hotels prepared for insertion");
        }

        await hotelModel.insertMany(allHotels);
        console.log(`Hotels inserted successfully: ${allHotels.length}`);
        process.exit(0);
    } catch (error) {
        console.error("Hotel seeder failed:", error.message);
        process.exit(1);
    }
};

seedHotels();
