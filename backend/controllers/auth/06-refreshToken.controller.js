import jwt from "jsonwebtoken";
import userModel from "../../models/user.model.js";

export const refreshToken = async (req, res) => {
    try {
        const { refreshToken: token } = req.body;

        if (!token) {
            return res
                .status(401)
                .json({
                    success: false,
                    message: "Refresh token required"
                });
        }

        let decoded;

        try {
            decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        } catch {
            return res
                .status(401)
                .json({
                    success: false,
                    message: "Invalid or expired refresh token"
                });
        }

        const user = await userModel.findById(decoded.id);

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

        if (user.refreshToken !== token) {
            return res
                .status(403)
                .json({
                    success: false,
                    message: "Invalid refresh token"
                });
        }

        const newAccessToken = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1h" }
        );

        return res
            .status(200)
            .json({
                success: true,
                message: "Token refreshed",
                data: { accessToken: newAccessToken },
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
