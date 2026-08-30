import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../../models/user.model.js";
import { sendWelcomeEmail } from "../../services/email/index.js";

export const register = async (req, res) => {
    try {
        const { name, email, password, contact, verifiedEmailToken } = req.body;

        if (!verifiedEmailToken) {
            return res
                .status(400)
                .json({ 
                    success: false, 
                    message: "Please verify your email before registration" 
                });
        }

        const normalizedEmail = String(email).trim().toLowerCase();

        let decodedVerifiedToken;
        try {
            decodedVerifiedToken = jwt.verify(verifiedEmailToken, process.env.JWT_SECRET_KEY);
        } catch {
            return res
                .status(400)
                .json({ 
                    success: false, 
                    message: "Email verification expired. Please verify your email again." 
                });
        }

        if (decodedVerifiedToken.purpose !== "register_email_verified" || decodedVerifiedToken.email !== normalizedEmail) {
            return res
                .status(400)
                .json({ 
                    success: false, 
                    message: "Email is not verified for registration" 
                });
        }

        const existingUser = await userModel.findOne({
            $or: [{ email: normalizedEmail, isVerified: true }, { contact }],
        });
        if (existingUser) {
            return res
                .status(409)
                .json({ 
                    success: false, 
                    message: "User already exists" 
                });
        }

        const image = req.file ? { public_id: req.file.filename, url: req.file.path } : undefined;
        const hashedPassword = bcrypt.hashSync(password, 10);

        const created = await userModel.findOneAndUpdate(
            { email: normalizedEmail },
            {
                name,
                email: normalizedEmail,
                password: hashedPassword,
                contact,
                image,
                isVerified: true,
                otp: null,
                otpExpiresAt: null,
                otpRequestedAt: null,
            },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        try {
            await sendWelcomeEmail({ to: created.email, name: created.name });
        } catch (error) {
            console.error("Welcome email failed:", error.message);
        }

        const safeUser = {
            _id: created._id,
            name: created.name,
            email: created.email,
            contact: created.contact,
            image: created.image,
            role: created.role,
            isVerified: created.isVerified,
            createdAt: created.createdAt,
        };

        return res
            .status(201)
            .json({ 
                success: true, 
                message: "User Created Successfully", 
                data: safeUser 
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
