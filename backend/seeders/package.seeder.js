import "../config/env.config.js";
import locationModel from "../models/location.model.js";
import hotelModel from "../models/hotel.model.js";
import packageModel from "../models/package.model.js";
import { Package_Blueprints, Itinerary_Templates } from "./data/packages.data.js";
import { connectDB } from "../config/db.config.js";
import { shuffleArray, randomItem } from "./utils/random.js";
import { Location_Names } from "./data/locations.data.js";

const getRandomUniqueImagesFromHotel = (hotelImages, count = 5) => {
    if (!hotelImages || hotelImages.length < count) {
        throw new Error(`Hotel does not have at least ${count} images`);
    }
    return shuffleArray(hotelImages).slice(0, count);
};

const buildPackagePrice = (hotelPricePerNight, duration, multiplier, packageIndex) =>
    Math.round(hotelPricePerNight * duration * multiplier + packageIndex * 500);

const makePackageDescription = (locationName, hotelName, tripType, duration, title) =>
    `${title} in ${locationName} offers a well-planned ${duration}-day ${tripType} travel experience with a comfortable stay at ${hotelName}, quality accommodation, local sightseeing, relaxation, and memorable moments for travelers seeking a smooth and enjoyable holiday.`;

const generateItinerary = (locationName, hotelName, duration, tripType) => {
    const template = Itinerary_Templates[tripType] || Itinerary_Templates.relaxation;

    return Array.from({ length: duration }, (_, index) => ({
        day:         index + 1,
        title:       template[index % template.length].title,
        description: template[index % template.length].description(locationName, hotelName),
    }));
};

const buildPackageDocument = ({ location, hotel, blueprint, packageIndex }) => {
    const title     = `${location.name} ${randomItem(blueprint.titlePool)}`;
    const images    = getRandomUniqueImagesFromHotel(hotel.images, 5);
    const thumbnail = images[0];
    const itinerary = generateItinerary(location.name, hotel.name, blueprint.duration, blueprint.tripType);
    const price     = buildPackagePrice(hotel.pricePerNight, blueprint.duration, blueprint.priceMultiplier, packageIndex);

    return {
        title,
        description: makePackageDescription(location.name, hotel.name, blueprint.tripType, blueprint.duration, title),
        location:    location._id,
        hotel:       hotel._id,
        price,
        duration:    blueprint.duration,
        tripType:    blueprint.tripType,
        thumbnail,
        images,
        itinerary,
        isActive:    true,
    };
};

const seedPackages = async () => {
    try {
        await connectDB();

        await packageModel.deleteMany({});
        console.log("Old packages deleted");

        const locations = await locationModel.find({ name: { $in: Location_Names }, isActive: true });

        if (!locations.length) {
            throw new Error("No active locations found. Seed locations first.");
        }

        const sortedLocations = Location_Names
            .map((name) => locations.find((l) => l.name === name))
            .filter(Boolean);

        const allPackages = [];

        for (const location of sortedLocations) {
            const hotels = await hotelModel.find({ location: location._id, isActive: true });

            if (!hotels.length) {
                console.log(`No hotels found for ${location.name}, skipping`);
                continue;
            }

            for (let i = 0; i < Package_Blueprints.length; i++) {
                const blueprint    = Package_Blueprints[i];
                const matchedHotel = hotels.find((h) => h.name.endsWith(blueprint.hotelSuffix));

                if (!matchedHotel) {
                    console.log(`Hotel with suffix "${blueprint.hotelSuffix}" not found in ${location.name}, skipping`);
                    continue;
                }

                if (!matchedHotel.images || matchedHotel.images.length < 5) {
                    console.log(`${matchedHotel.name} does not have enough images, skipping`);
                    continue;
                }

                allPackages.push(buildPackageDocument({ location, hotel: matchedHotel, blueprint, packageIndex: i + 1 }));
            }
        }

        if (!allPackages.length) {
            throw new Error("No packages prepared for insertion");
        }

        await packageModel.insertMany(allPackages);
        console.log(`Packages seeded successfully: ${allPackages.length} packages inserted`);
        process.exit(0);
    } catch (error) {
        console.error("Package seeder failed:", error.message);
        process.exit(1);
    }
};

seedPackages();
