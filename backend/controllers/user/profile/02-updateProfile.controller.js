import userModel from "../../../models/user.model.js";
import { deleteImage } from "../../../services/cloudinary/index.js";
import { cleanupUploadedFiles } from "../../../validation/admin/cleanupUploadedfiles.js";

export const updateProfile = async (req, res) => {
    try {
        const { name, email, contact } = req.body;
        const existingUser = await userModel
            .findById(req.user.id);

        if (!existingUser) {
            await cleanupUploadedFiles(req);
            return res
                .status(404)
                .json({
                    success: false,
                    message: "User not found"
                });
        }

        if (email && email !== existingUser.email) {
            const emailExists = await userModel
                .findOne({
                    email,
                    _id: { $ne: req.user.id }
                });
            if (emailExists) {
                await cleanupUploadedFiles(req);
                return res
                    .status(400)
                    .json({
                        success: false,
                        message: "Email already in use"
                    });
            }
        }

        if (contact && contact !== existingUser.contact) {
            const contactExists = await userModel
                .findOne({
                    contact,
                    _id: { $ne: req.user.id }
                });
            if (contactExists) {
                await cleanupUploadedFiles(req);
                return res
                    .status(400)
                    .json({
                        success: false,
                        message: "Contact already in use"
                    });
            }
        }

        const updateData = {};

        if (name !== undefined) updateData.name = name;
        if (email !== undefined) updateData.email = email;
        if (contact !== undefined) updateData.contact = contact;

        if (req.file) {
            if (existingUser.image?.public_id) await deleteImage(existingUser.image.public_id);
            updateData.image = { public_id: req.file.filename, url: req.file.path };
        }

        const updatedUser = await userModel
            .findByIdAndUpdate(req.user.id, { $set: updateData }, { returnDocument: "after", runValidators: true })
            .select("-password -refreshToken -otp -otpExpiresAt");

        return res
            .status(200)
            .json({
                success: true,
                message: "Profile updated successfully",
                data: updatedUser
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
