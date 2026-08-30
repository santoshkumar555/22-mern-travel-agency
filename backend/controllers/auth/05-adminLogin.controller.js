import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../../models/user.model.js";

export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await userModel.findOne({ email });

        if (!admin) {
            return res
                .status(404)
                .json({
                    success: false,
                    message: "Admin not found"
                });
        }

        if (admin.role !== "admin") {
            return res
                .status(403)
                .json({
                    success: false,
                    message: "Unauthorized access"
                });
        }

        const checkPassword = bcrypt.compareSync(password, admin.password);

        if (!checkPassword) {
            return res
                .status(401)
                .json({
                    success: false,
                    message: "Invalid credentials"
                });
        }

        const accessToken = jwt.sign(
            { id: admin._id, email: admin.email, role: admin.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1h" }
        );

        const refreshToken = jwt.sign(
            { id: admin._id },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: "7d" }
        );

        admin.refreshToken = refreshToken;
        await admin.save();
        const { password: pass, refreshToken: rt, ...adminData } = admin.toJSON();

        return res
            .status(200)
            .json({
                success: true,
                message: "Admin logged in successfully",
                data: { admin: adminData, accessToken, refreshToken },
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
