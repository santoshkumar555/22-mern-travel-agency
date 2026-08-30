import userModel from "../../../models/user.model.js";
import { deleteImage } from "../../../services/cloudinary/index.js";
import { cleanupUploadedFiles } from "../../../validation/admin/cleanupUploadedfiles.js";

export const updateMyProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const { name, email, contact } = req.body;
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

        if (email || contact) {
            const existingUser = await userModel.findOne({
                _id: { $ne: userId },
                $or: [email && { email }, contact && { contact }].filter(Boolean),
            });
            if (existingUser) {
                await cleanupUploadedFiles(req);
                return res
                    .status(409)
                    .json({
                        success: false,
                        message: "Email or contact already in use"
                    });
            }
        }

        const updateData = {};

        if (name !== undefined) updateData.name = name;
        if (email !== undefined) updateData.email = email;
        if (contact !== undefined) updateData.contact = contact;

        if (req.file) {
            if (user.image?.public_id) await deleteImage(user.image.public_id);
            updateData.image = { public_id: req.file.filename, url: req.file.path };
        }

        const updatedUser = await userModel
            .findByIdAndUpdate(
                userId,
                { $set: updateData },
                { returnDocument: "after", runValidators: true }
            )
            .select("-password");

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
