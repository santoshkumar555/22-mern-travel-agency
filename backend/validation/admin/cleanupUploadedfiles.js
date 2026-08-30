import { deleteImage } from "../../services/cloudinary/index.js";

export const cleanupUploadedFiles = async (req) => {
    try {
        if (req.files) {
            for (const file of req.files) {
                await deleteImage(file.filename);
            }
        }

        if (req.file) {
            await deleteImage(req.file.filename);
        }
    } catch (error) {
        console.error("File cleanup failed:", error.message);
    }
};