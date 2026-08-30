import userModel from "../../models/user.model.js";

export const logout = async (req, res) => {
    try {
        await userModel
            .findByIdAndUpdate(
                req.user._id,
                { $set: { refreshToken: null } }
            );

        return res
            .status(200)
            .json({
                success: true,
                message: "Logged out successfully"
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
