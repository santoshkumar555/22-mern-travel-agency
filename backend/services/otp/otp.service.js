import crypto from "crypto";

export const generateOtp = (length = 6) => {
    return crypto
        .randomInt(0, 10 ** length)
        .toString()
        .padStart(length, "0");
};

export const getOtpExpiry = () => {
    return Date.now() + 5 * 60 * 1000;
};