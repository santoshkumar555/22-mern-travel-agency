import "../config/env.config.js";
import bcrypt from "bcrypt";
import userModel from "../models/user.model.js";
import { connectDB } from "../config/db.config.js";
import { validatePassword } from "./utils/validatePassword.js";

const {
    ADMIN_EMAIL,
    ADMIN_PASSWORD,
    ADMIN_CONTACT,
} = process.env;

const seedAdmin = async () => {
    try {
        await connectDB();

        validatePassword(ADMIN_PASSWORD, "ADMIN_PASSWORD");

        const existing = await userModel.findOne({
            email: ADMIN_EMAIL,
        });

        if (existing) {
            console.log(`Admin already exists with email: ${ADMIN_EMAIL}`);
            console.log(
                "No changes made. Delete the existing account first if you want to re-seed."
            );
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

        await userModel.create({
            name: "Super Admin",
            email: ADMIN_EMAIL,
            password: hashedPassword,
            contact: ADMIN_CONTACT,
            role: "admin",
            isVerified: true,
            isActive: true,
        });

        console.log("✅ Admin user created successfully!");
        console.log(`Name   : Super Admin`);
        console.log(`Email  : ${ADMIN_EMAIL}`);
        console.log(`Contact: ${ADMIN_CONTACT}`);
        console.log(`Role   : admin`);

        process.exit(0);
    } catch (error) {
        console.error("Admin seeder failed:", error.message);
        process.exit(1);
    }
};

seedAdmin();