import "../config/env.config.js";
import { randomBytes } from "crypto";
import bookingModel from "../models/booking.model.js";
import userModel from "../models/user.model.js";
import packageModel from "../models/package.model.js";
import { connectDB } from "../config/db.config.js";
import { Scenarios } from "./data/booking.data.js";
import {
    randomPastDate,
    randomFutureDate,
    randomInt,
    randomItem,
} from "./utils/random.js";

const Min_Bookings_Per_Package = parseInt(
    process.env.SEED_MIN_BOOKINGS_PER_PACKAGE ?? "0",
    10
);

const Max_Bookings_Per_Package = parseInt(
    process.env.SEED_MAX_BOOKINGS_PER_PACKAGE ?? "8",
    10
);

const Max_Packages = parseInt(
    process.env.SEED_MAX_PACKAGES ?? "300",
    10
);

const Seed_Months_Back = parseInt(
    process.env.SEED_BOOKING_MONTHS_BACK ?? "18",
    10
);

const buildWeightedScenarios = () => {
    const pool = [];

    Scenarios.forEach((scenario) => {
        for (let i = 0; i < scenario.weight; i++) {
            pool.push(scenario);
        }
    });

    return pool;
};

const generateBookingId = () =>
    `BOOK-${Date.now()}-${randomBytes(8).toString("hex")}`;

const seedBookings = async () => {
    try {
        await connectDB();

        await bookingModel.deleteMany({});
        console.log("Old bookings deleted");

        const users = await userModel
            .find({ role: "user", isActive: true })
            .select("_id");

        if (!users.length) {
            throw new Error(
                "No active users found. Create users before seeding bookings."
            );
        }

        const packages = await packageModel
            .find({ isActive: true })
            .select("_id price duration")
            .limit(Max_Packages);

        if (!packages.length) {
            throw new Error("No active packages found. Seed packages first.");
        }

        console.log(
            `Found ${users.length} users and ${packages.length} packages — building bookings...`
        );

        const weightedScenarios = buildWeightedScenarios();
        const allBookings = [];

        for (const pkg of packages) {
            // Variable number of bookings per package
            const bookingCount = randomInt(
                Min_Bookings_Per_Package,
                Max_Bookings_Per_Package
            );

            for (let i = 0; i < bookingCount; i++) {
                const scenario = randomItem(weightedScenarios);

                const numberOfPeople = randomInt(1, 6);

                const totalPrice = pkg.price * numberOfPeople;

                const travelDate =
                    scenario.bookingStatus === "completed" ||
                    scenario.bookingStatus === "cancelled"
                        ? randomPastDate(Seed_Months_Back)
                        : randomFutureDate();

                const createdAt = randomPastDate(Seed_Months_Back);

                allBookings.push({
                    user: randomItem(users)._id,
                    travelPackage: pkg._id,
                    travelDate,
                    numberOfPeople,
                    totalPrice,
                    bookingStatus: scenario.bookingStatus,
                    paymentStatus: scenario.paymentStatus,
                    paymentMethod: scenario.paymentMethod,
                    bookingId: generateBookingId(),
                    isActive: true,
                    createdAt,
                    updatedAt: createdAt,
                });
            }
        }

        await bookingModel.insertMany(allBookings, {
            timestamps: false,
        });

        const paid = allBookings.filter(
            (booking) => booking.paymentStatus === "paid"
        ).length;

        const pending = allBookings.filter(
            (booking) => booking.bookingStatus === "pending"
        ).length;

        const cancelled = allBookings.filter(
            (booking) => booking.bookingStatus === "cancelled"
        ).length;

        const completed = allBookings.filter(
            (booking) => booking.bookingStatus === "completed"
        ).length;

        const revenue = allBookings
            .filter((booking) => booking.paymentStatus === "paid")
            .reduce(
                (sum, booking) => sum + booking.totalPrice,
                0
            );

        console.log(
            `✅ Bookings seeded successfully: ${allBookings.length} total`
        );

        console.log(`   Paid       : ${paid}`);
        console.log(`   Pending    : ${pending}`);
        console.log(`   Completed  : ${completed}`);
        console.log(`   Cancelled  : ${cancelled}`);

        console.log(
            `   Total revenue from paid bookings: ₹${revenue.toLocaleString(
                "en-IN"
            )}`
        );

        console.log("Dashboard widgets now populated.");

        process.exit(0);
    } catch (error) {
        console.error("Booking seeder failed:", error.message);
        process.exit(1);
    }
};

seedBookings();