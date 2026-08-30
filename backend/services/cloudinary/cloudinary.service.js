import cloudinary from "../../config/cloudinary.config.js";

export const deleteImage = async (publicId) => {
    if (!publicId) return;

    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        console.error("Cloudinary delete failed:", error);
    }
};