import express from "express";
import * as authMiddleware from "../../middleware/auth/index.js";
import * as uploadMiddleware from "../../middleware/upload/index.js";
import * as validationMiddleware from "../../middleware/validation/index.js";
import * as rateLimitMiddleware from "../../middleware/rateLimit/index.js";
import * as authValidation from "../../validation/auth/index.js";
import * as authController from "../../controllers/auth/index.js";

const { auth, isAdmin } = authMiddleware;
const { upload } = uploadMiddleware;
const { handleValidation } = validationMiddleware;
const { otpLimiter, otpVerifyLimiter, loginLimiter, adminLoginLimiter } = rateLimitMiddleware;
const { forgotPasswordValidation, verifyForgotPasswordOtpValidation, resetPasswordValidation } = authValidation;
const { sendRegisterEmailOtp, verifyRegisterEmailOtp, register, login, adminLogin, refreshToken, sendPasswordResetOtp, verifyForgotPasswordOtp, resetPassword, sendEmailVerificationOtp, verifyEmailVerificationOtp, logout } = authController;
const router = express.Router();

router.post(
    "/send-register-email-otp",
    otpLimiter,
    sendRegisterEmailOtp
);

router.post(
    "/verify-register-email-otp",
    otpVerifyLimiter,
    verifyRegisterEmailOtp
);

router.post(
    "/register",
    upload.single("image"),
    register
);

router.post(
    "/login",
    loginLimiter,
    login
);

router.post(
    "/admin/login",
    adminLoginLimiter,
    adminLogin
);

router.post(
    "/refresh_token",
    refreshToken
);

router.post(
    "/logout",
    auth,
    logout
);

router.post(
    "/forgot_password",
    otpLimiter,
    forgotPasswordValidation,
    handleValidation,
    sendPasswordResetOtp,
);

router.post(
    "/verify_forgot_password_otp",
    otpVerifyLimiter,
    verifyForgotPasswordOtpValidation,
    handleValidation,
    verifyForgotPasswordOtp,
);

router.post(
    "/reset_password",
    resetPasswordValidation,
    handleValidation,
    resetPassword,
);

router.post(
    "/send_email_verification_otp",
    auth,
    otpLimiter,
    sendEmailVerificationOtp
);

router.post(
    "/verify_email_otp",
    auth,
    otpVerifyLimiter,
    verifyEmailVerificationOtp
);

export default router;
