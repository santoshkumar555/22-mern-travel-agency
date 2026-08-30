const ALLOWED_MIME_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/jpg",
];

export const fileFilter = (req, file, cb) => {
    const isAllowed = ALLOWED_MIME_TYPES.includes(file.mimetype);

    if (isAllowed) {
        cb(null, true);
    } else {
        cb(
            new Error(
                `Unsupported file type: ${file.mimetype}. Allowed types are JPEG, PNG, WebP, JPG.`
            ),
            false
        );
    }
};