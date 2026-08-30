import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../../models/user.model.js";

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await userModel.findOne({ email }).select("-refreshToken -otp -otpExpiresAt");

        if (!existingUser) {
            return res
                .status(404)
                .json({ 
                    success: false, 
                    message: "User not found!" 
                });
        }

        if (!existingUser.isActive) {
            return res
                .status(403)
                .json({ 
                    success: false, 
                    message: "Your account has been deactivated" 
                });
        }

        const checkPassword = bcrypt.compareSync(password, existingUser.password);

        if (!checkPassword) {
            return res
                .status(401)
                .json({ 
                    success: false, 
                    message: "Invalid credentials!" 
                });
        }

        const { password: pass, ...user } = existingUser.toJSON();

        const accessToken = jwt.sign(
            { id: existingUser._id, email: existingUser.email, role: existingUser.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1h" }
        );

        const refreshToken = jwt.sign(
            { id: existingUser._id },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: "7d" }
        );

        existingUser.refreshToken = refreshToken;
        await existingUser.save();

        return res
            .status(200)
            .json({
                success: true,
                message: "User logged in successfully",
                data: { user, accessToken, refreshToken },
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
