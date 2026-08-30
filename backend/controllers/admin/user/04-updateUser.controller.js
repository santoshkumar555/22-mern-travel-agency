import bcrypt from "bcrypt";
import userModel from "../../../models/user.model.js";
import { deleteImage } from "../../../services/cloudinary/index.js";
import { cleanupUploadedFiles } from "../../../validation/admin/cleanupUploadedfiles.js";

export const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { name, email, password, contact, role, isActive, isVerified } = req.body;

        const user = await userModel.findById(userId);
        if (!user) {
            await cleanupUploadedFiles(req);
            return res
                .status(404)
                .json({
                    success: false,
                    message: "User not found"
                });
        }

        // Check for duplicate email (excluding current user)
        if (email !== undefined && email.trim() !== user.email) {
            const emailTaken = await userModel.findOne({
                email: email.trim().toLowerCase(),
                _id: { $ne: userId },
            });
            if (emailTaken) {
                await cleanupUploadedFiles(req);
                return res
                    .status(409)
                    .json({
                        success: false,
                        message: "Email is already in use by another account",
                    });
            }
        }

        // Check for duplicate contact (excluding current user)
        if (contact !== undefined && contact.trim() !== user.contact) {
            const contactTaken = await userModel.findOne({
                contact: contact.trim(),
                _id: { $ne: userId },
            });
            if (contactTaken) {
                await cleanupUploadedFiles(req);
                return res
                    .status(409)
                    .json({
                        success: false,
                        message: "Contact number is already in use by another account",
                    });
            }
        }

        const updateData = {};

        if (name !== undefined) updateData.name = name;
        if (email !== undefined) updateData.email = email;
        if (contact !== undefined) updateData.contact = contact;
        if (role !== undefined) updateData.role = role;
        if (isActive !== undefined) updateData.isActive = isActive === "true" || isActive === true;
        if (isVerified !== undefined) updateData.isVerified = isVerified === "true" || isVerified === true;
        if (password) updateData.password = bcrypt.hashSync(password, 10);

        if (req.file) {
            if (user.image?.public_id)
                await deleteImage(user.image.public_id);
            updateData.image = { public_id: req.file.filename, url: req.file.path };
        }

        const updated = await userModel
            .findByIdAndUpdate(
                userId,
                { $set: updateData },
                { returnDocument: "after", runValidators: false }
            )
            .select("-password");

        return res
            .status(200)
            .json({
                success: true,
                message: "User updated successfully",
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
