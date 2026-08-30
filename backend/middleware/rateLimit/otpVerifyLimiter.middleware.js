import rateLimit from "express-rate-limit";

export const otpVerifyLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 10,
    message: {
        success: false,
        message: "Too many OTP verification attempts. Please try again later.",
    },
    standardHeaders: true,
    legacyHeaders: false,
});
