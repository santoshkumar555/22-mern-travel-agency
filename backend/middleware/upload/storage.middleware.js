import { Readable } from "stream";
import multer from "multer";
import cloudinary from "../../config/cloudinary.config.js";

// memoryStorage buffers the file in RAM — no temp disk files
export const storage = multer.memoryStorage();

// Drop-in uploader: streams buffer to Cloudinary and returns
// { filename: public_id, path: secure_url } — same shape your controllers already expect from multer-storage-cloudinary
export const uploadToCloudinary = (buffer, mimetype) =>
    new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: "travel_app",
                allowed_formats: ["jpg", "png", "jpeg", "webp"],
                resource_type: "image",
            },
            (error, result) => {
                if (error) return reject(error);
                // Mimic the shape multer-storage-cloudinary used to set
                resolve({ filename: result.public_id, path: result.secure_url });
            }
        );
        Readable.from(buffer).pipe(stream);
    });