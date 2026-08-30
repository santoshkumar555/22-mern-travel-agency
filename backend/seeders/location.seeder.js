import "../config/env.config.js";
import locationModel from "../models/location.model.js";
import { Locations } from "./data/locations.data.js";
import { connectDB } from "../config/db.config.js";

const seedLocations = async () => {
    try {
        await connectDB();

        await locationModel.deleteMany({});
        console.log("Deleted old locations from database");

        const preparedLocations = Locations.map((item) => ({
            name:        item.name,
            country:     item.country,
            description: item.description,
            image: {
                public_id: null,
                url:       item.imageUrl,
            },
            isActive: true,
        }));

        await locationModel.insertMany(preparedLocations);
        console.log(`Locations seeded successfully: ${preparedLocations.length} locations inserted`);

        process.exit(0);
    } catch (error) {
        console.error("Seeder failed:", error.message);
        process.exit(1);
    }
};

seedLocations();
