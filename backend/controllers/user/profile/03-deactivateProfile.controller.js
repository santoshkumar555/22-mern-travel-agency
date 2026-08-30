import userModel from "../../../models/user.model.js";

export const deactivateProfile = async (req, res) => {
    try {
        const user = await userModel
            .findById(req.user.id);

        if (!user) {
            return res
                .status(404)
                .json({
                    success: false,
                    message: "User not found"
                });
        }

        user.isActive = false;
        user.refreshToken = null;

        await user.save();

        return res
            .status(200)
            .json({
                success: true,
                message: "Account deactivated successfully"
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
