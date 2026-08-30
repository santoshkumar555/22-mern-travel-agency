import userModel from "../../../models/user.model.js";

export const getUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await userModel.findOne({ _id: userId }).select("-password");

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
                message: "User fetched successfully",
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
