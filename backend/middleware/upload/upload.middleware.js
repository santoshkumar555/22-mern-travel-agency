import multer from "multer";
import { storage, uploadToCloudinary } from "./storage.middleware.js";
import { fileFilter } from "./fileFilter.middleware.js";

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

// multer now uses memoryStorage — files land in req.file.buffer / req.files[n].buffer
const _multer = multer({ storage, fileFilter, limits: { fileSize: MAX_FILE_SIZE_BYTES } });

// Wrapper middleware: runs multer, then pushes each buffer to Cloudinary, and patches file.filename + file.path so controllers need zero changes.
const attachCloudinaryResults = (multerMiddleware) => (req, res, next) => {
    multerMiddleware(req, res, async (err) => {
        if (err) return next(err);
        try {
            if (req.files?.length) {
                const uploaded = await Promise.all(
                    req.files.map((f) => uploadToCloudinary(f.buffer, f.mimetype))
                );
                req.files = req.files.map((f, i) => ({ ...f, ...uploaded[i] }));
            } else if (req.file) {
                const result = await uploadToCloudinary(req.file.buffer, req.file.mimetype);
                req.file = { ...req.file, ...result };
            }
            next();
        } catch (uploadErr) {
            next(uploadErr);
        }
    });
};

export const upload = {
    single: (field) => attachCloudinaryResults(_multer.single(field)),
    array: (field, max) => attachCloudinaryResults(_multer.array(field, max)),
    fields: (fields) => attachCloudinaryResults(_multer.fields(fields)),
    none: () => _multer.none(),
};