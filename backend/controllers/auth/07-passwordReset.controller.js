import bcrypt from "bcrypt";
import { randomBytes } from "crypto";
import userModel from "../../models/user.model.js";
import { sendPasswordResetOtpEmail } from "../../services/email/index.js";
import { generateOtp, getOtpExpiry } from "../../services/otp/index.js";

export const sendPasswordResetOtp = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res
                .status(404)
                .json({ 
                    success: false, 
                    message: "User not found!" 
                });
        }

        if (user.otpRequestedAt && Date.now() - new Date(user.otpRequestedAt).getTime() < 30 * 1000) {
            return res
                .status(400)
                .json({ 
                    success: false, 
                    message: "Please wait 30 seconds before requesting a new OTP" 
                });
        }

        const otp = generateOtp();
        const otpExpiry = getOtpExpiry();
        const hashedOtp = bcrypt.hashSync(otp.toString(), 10);

        user.otp = hashedOtp;
        user.otpExpiresAt = otpExpiry;
        user.otpRequestedAt = new Date();
        user.isResetPasswordOtpVerified = false;
        user.resetPasswordToken = null;
        user.resetPasswordTokenExpiresAt = null;

        await user.save();
        await sendPasswordResetOtpEmail({ to: user.email, otp });

        return res
            .status(200)
            .json({ 
                success: true, 
                message: `OTP sent successfully to ${user.email}` 
            });
    } catch (err) {
        return res
            .status(500)
            .json({ 
                success: false, 
                message: err.message || "Internal Server Error" 
            });
    }
};

export const verifyForgotPasswordOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
            return res
                .status(404)
                .json({ 
                    success: false, 
                    message: "User not found!" 
                });
        }

        if (!user.otp || !user.otpExpiresAt) {
            return res
                .status(400)
                .json({ 
                    success: false, 
                    message: "OTP not requested" 
                });
        }

        if (Date.now() > new Date(user.otpExpiresAt).getTime()) {
            return res
                .status(400)
                .json({ 
                    success: false, 
                    message: "OTP expired" 
                });
        }

        const isValidOtp = bcrypt.compareSync(otp.toString(), user.otp);
        if (!isValidOtp) {
            return res
                .status(400)
                .json({ 
                    success: false, 
                    message: "Invalid OTP" 
                });
        }

        const resetToken = randomBytes(32).toString("hex");
        const resetTokenExpiry = new Date(Date.now() + 10 * 60 * 1000);

        user.isResetPasswordOtpVerified = true;
        user.resetPasswordToken = resetToken;
        user.resetPasswordTokenExpiresAt = resetTokenExpiry;
        user.otp = null;
        user.otpExpiresAt = null;
        user.otpRequestedAt = null;
        
        await user.save();

        return res
            .status(200)
            .json({
            success: true,
            message: "OTP verified successfully",
            data: { email: user.email, resetToken },
        });
    } catch (err) {
        return res
            .status(500)
            .json({ 
                success: false, 
                message: err.message || "Internal Server Error" 
            });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { email, password, resetToken } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
            return res
                .status(404)
                .json({ 
                    success: false, 
                    message: "User not found!" 
                });
        }

        if (!user.isResetPasswordOtpVerified) {
            return res
                .status(403)
                .json({ 
                    success: false, 
                    message: "OTP verification required before resetting password" 
                });
        }

        if (!user.resetPasswordToken || !user.resetPasswordTokenExpiresAt) {
            return res
                .status(403)
                .json({ 
                    success: false, 
                    message: "Reset session expired. Please verify OTP again." 
                });
        }

        if (user.resetPasswordToken !== resetToken) {
            return res
                .status(403)
                .json({ 
                    success: false, 
                    message: "Invalid reset token" 
                });
        }

        if (Date.now() > new Date(user.resetPasswordTokenExpiresAt).getTime()) {
            return res
                .status(403)
                .json({ 
                    success: false, 
                    message: "Reset token expired. Please verify OTP again." 
                });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        
        user.password = hashedPassword;
        user.otp = null;
        user.otpExpiresAt = null;
        user.otpRequestedAt = null;
        user.isResetPasswordOtpVerified = false;
        user.resetPasswordToken = null;
        user.resetPasswordTokenExpiresAt = null;
        
        await user.save();

        return res
            .status(200)
            .json({ 
                success: true, 
                message: "Password updated successfully" 
            });
    } catch (err) {
        return res
            .status(500)
            .json({ 
                success: false, 
                message: err.message || "Internal Server Error" 
            });
    }
};
