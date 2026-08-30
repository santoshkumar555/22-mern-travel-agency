import "../config/env.config.js";
import bcrypt from "bcrypt";
import userModel from "../models/user.model.js";
import { Users_Data } from "./data/user.data.js";
import { connectDB } from "../config/db.config.js";
import { validatePassword } from "./utils/validatePassword.js";
import { randomPastDate } from "./utils/random.js";

const { USER_SEED_PASSWORD } = process.env;

const seedUsers = async () => {
    try {
        await connectDB();

        validatePassword(USER_SEED_PASSWORD, "USER_SEED_PASSWORD");

        const hashedPassword = await bcrypt.hash(USER_SEED_PASSWORD, 10);

        const existingEmails = new Set(
            (await userModel.find({ role: "user" }).select("email contact")).flatMap((u) => [
                u.email,
                u.contact,
            ])
        );

        const newUsers = Users_Data.filter(
            (u) => !existingEmails.has(u.email) && !existingEmails.has(u.contact)
        );

        const skipped = Users_Data.length - newUsers.length;

        if (!newUsers.length) {
            console.log("All users already exist in the database. No changes made.");
            process.exit(0);
        }

        const createdAt = randomPastDate(6);

        const documents = newUsers.map((u) => ({
            name: u.name,
            email: u.email,
            password: hashedPassword,
            contact: u.contact,
            image: u.image,
            role: "user",
            isVerified: true,
            isActive: true,
            createdAt: randomPastDate(6),
            updatedAt: createdAt,
        }));

        await userModel.insertMany(documents, { timestamps: false });

        console.log(`✅ Users seeded successfully`);
        console.log(`Inserted : ${documents.length}`);
        if (skipped)
            console.log(`Skipped : ${skipped} (already existed)`);
        console.log(`Login credentials for all seeded users:`);
        console.log(`Email : <any email listed in Users_Data>`);
        console.log(`Password : ${USER_SEED_PASSWORD}`);
        console.log("Dashboard widgets now populated:");


        process.exit(0);
    } catch (error) {
        console.error("User seeder failed:", error.message);
        process.exit(1);
    }
};

seedUsers();
