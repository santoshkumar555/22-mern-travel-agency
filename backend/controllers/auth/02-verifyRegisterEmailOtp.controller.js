import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../../models/user.model.js";

export const verifyRegisterEmailOtp = async (req, res) => {
    try {
        const { email, otp, otpToken } = req.body;

        if (!email || !otp || !otpToken) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Email, OTP and otpToken are required"
                });
        }

        const normalizedEmail = String(email).trim().toLowerCase();
        let decoded;

        try {
            decoded = jwt.verify(otpToken, process.env.JWT_SECRET_KEY);
        } catch {
            return res
                .status(400)
                .json({ 
                    success: false, 
                    message: "OTP session expired. Please request a new OTP." 
                });
        }

        if (decoded.purpose !== "register_email_otp" || decoded.email !== normalizedEmail) {
            return res
                .status(400)
                .json({ 
                    success: false, 
                    message: "Invalid OTP session" 
                });
        }

        const pendingUser = await userModel.findOne({ email: normalizedEmail, isVerified: false });

        if (!pendingUser || !pendingUser.otp || !pendingUser.otpExpiresAt) {
            return res
                .status(400)
                .json({ 
                    success: false, 
                    message: "OTP not found. Please request a new one." 
                });
        }

        if (Date.now() > new Date(pendingUser.otpExpiresAt).getTime()) {
            return res
                .status(400)
                .json({ 
                    success: false, 
                    message: "OTP has expired. Please request a new one." 
                });
        }

        const isOtpValid = await bcrypt.compare(String(otp), pendingUser.otp);

        if (!isOtpValid) {
            return res
                .status(400)
                .json({ 
                    success: false, 
                    message: "Invalid OTP" 
                });
        }

        pendingUser.otp = null;
        pendingUser.otpExpiresAt = null;
        pendingUser.otpRequestedAt = null;
        await pendingUser.save();

        const verifiedEmailToken = jwt.sign(
            { purpose: "register_email_verified", email: normalizedEmail },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "15m" }
        );

        return res
            .status(200)
            .json({
                success: true,
                message: "Email verified successfully",
                data: { verifiedEmailToken, email: normalizedEmail },
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
