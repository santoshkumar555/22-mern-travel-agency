import bcrypt from "bcrypt";
import userModel from "../../../models/user.model.js";
import { cleanupUploadedFiles } from "../../../validation/admin/cleanupUploadedfiles.js";

export const addUser = async (req, res) => {
    try {
        const { name, email, password, contact, role, isActive, isVerified } = req.body;
        const image = req.file ? { public_id: req.file.filename, url: req.file.path } : undefined;
        const existingUser = await userModel.findOne({ $or: [{ email }, { contact }] });

        if (existingUser) {
            await cleanupUploadedFiles(req);
            return res
                .status(409)
                .json({
                    success: false,
                    message: "User already exists"
                });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        const created = await userModel
            .create({
                name, email, password: hashedPassword, contact,
                role: role || "user",
                isActive: isActive === "true" || isActive === true,
                isVerified: isVerified === "true" || isVerified === true,
                image,
            });

        return res
            .status(201)
            .json({
                success: true,
                message: "User created successfully",
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
