import userModel from "../../../models/user.model.js";

export const getUsers = async (req, res) => {
    try {
        const users = await userModel.find().select("-password");

        return res
            .status(200)
            .json({
                success: true,
                message: "Users fetched successfully",
                data: users
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
