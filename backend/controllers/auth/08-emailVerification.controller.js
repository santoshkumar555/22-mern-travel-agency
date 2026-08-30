import bcrypt from "bcrypt";
import userModel from "../../models/user.model.js";
import { sendEmailVerificationOtpEmail } from "../../services/email/index.js";
import { generateOtp, getOtpExpiry } from "../../services/otp/index.js";

export const sendEmailVerificationOtp = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id);
        if (!user) {
            return res
                .status(404)
                .json({ 
                    success: false, 
                    message: "User not found" 
                });
        }

        if (!user.isActive) {
            return res
                .status(403)
                .json({ 
                    success: false, 
                    message: "Your account has been deactivated" 
                });
        }

        if (user.isVerified) {
            return res
                .status(400)
                .json({ 
                    success: false, 
                    message: "Email is already verified" 
                });
        }

        const now = Date.now();
        if (user.otpExpiresAt && now < user.otpExpiresAt - 4 * 60 * 1000) {
            return res
                .status(400)
                .json({ 
                    success: false, 
                    message: "Please wait before requesting a new OTP." 
            });
        }

        const otp = generateOtp();
        const otpExpiry = getOtpExpiry();
        const hashedOtp = bcrypt.hashSync(otp, 10);

        user.emailVerificationOtp = hashedOtp;
        user.emailVerificationOtpExpiresAt = otpExpiry;
        
        await user.save();
        await sendEmailVerificationOtpEmail({ to: user.email, otp: otp });

        return res
            .status(200)
            .json({ 
                success: true, 
                message: "Email verification OTP sent successfully" 
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

export const verifyEmailVerificationOtp = async (req, res) => {
    try {
        const { otp } = req.body;

        const user = await userModel.findById(req.user.id);
        if (!user) {
            return res
                .status(404)
                .json({ 
                    success: false, 
                    message: "User not found" 
                });
        }

        if (!user.isActive) {
            return res
                .status(403)
                .json({ 
                    success: false, 
                    message: "Your account has been deactivated" 
                });
        }

        if (user.isVerified) {
            return res
                .status(400)
                .json({ 
                    success: false, 
                    message: "Email is already verified" 
                });
        }

        if (!user.emailVerificationOtp || !user.emailVerificationOtpExpiresAt) {
            return res
                .status(400)
                .json({ 
                    success: false, 
                    message: "No verification OTP found. Please request a new OTP." 
                });
        }

        if (Date.now() > new Date(user.emailVerificationOtpExpiresAt).getTime()) {
            user.emailVerificationOtp = null;
            user.emailVerificationOtpExpiresAt = null;
            await user.save();
            return res
                .status(400)
                .json({ 
                    success: false, 
                    message: "OTP has expired. Please request a new one." 
                });
        }

        const isOtpValid = bcrypt.compareSync(otp, user.emailVerificationOtp);
        if (!isOtpValid) {
            return res
                .status(400)
                .json({ 
                    success: false, 
                    message: "Invalid OTP" 
                });
        }

        user.isVerified = true;
        user.emailVerificationOtp = null;
        user.emailVerificationOtpExpiresAt = null;
        await user.save();

        return res
            .status(200)
            .json({ 
                success: true, 
                message: "Email verified successfully" 
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
