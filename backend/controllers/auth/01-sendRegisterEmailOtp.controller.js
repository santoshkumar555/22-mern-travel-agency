import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../../models/user.model.js";
import { sendRegisterOtpEmail } from "../../services/email/index.js";
import { generateOtp, getOtpExpiry } from "../../services/otp/index.js";

export const sendRegisterEmailOtp = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Email is required"
                });
        }

        const normalizedEmail = String(email).trim().toLowerCase();
        const existingUser = await userModel.findOne({ email: normalizedEmail });

        if (existingUser) {
            return res
                .status(409)
                .json({
                    success: false,
                    message: "User already exists with this email"
                });
        }

        const otp = generateOtp();
        const hashedOtp = await bcrypt.hash(String(otp), 10);
        const otpExpiresAt = getOtpExpiry();

        await userModel
            .findOneAndUpdate(
                { email: normalizedEmail, isVerified: false },
                {
                    email: normalizedEmail,
                    otp: hashedOtp,
                    otpExpiresAt,
                    otpRequestedAt: new Date(),
                    name: "__pending__",
                    password: "__pending__",
                    contact: "__pending__",
                },
                { upsert: true, setDefaultsOnInsert: true }
            );

        const otpToken = jwt.sign(
            { purpose: "register_email_otp", email: normalizedEmail },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "5m" }
        );

        await sendRegisterOtpEmail({
            to: normalizedEmail,
            otp,
        });

        return res
            .status(200)
            .json({
                success: true,
                message: "Registration OTP sent successfully",
                data: { otpToken, email: normalizedEmail },
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
