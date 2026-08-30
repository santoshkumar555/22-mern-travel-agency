import userModel from "../../../models/user.model.js";

export const getMyProfile = async (req, res) => {
    try {
        const user = await userModel
            .findById(req.user._id)
            .select("-password");

        if (!user) {
            return res
                .status(404)
                .json({
                    success: false,
                    message: "User not found"
                });
        }

        return res
            .status(200)
            .json({
                success: true,
                message: "Profile fetched successfully",
                data: user
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
