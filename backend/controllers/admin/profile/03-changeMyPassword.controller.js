import bcrypt from "bcrypt";
import userModel from "../../../models/user.model.js";

export const changeMyPassword = async (req, res) => {
    try {
        const userId = req.user._id;
        const { currentPassword, newPassword, confirmPassword } = req.body;
        const user = await userModel.findById(userId);

        if (!user) {
            return res
                .status(404)
                .json({
                    success: false,
                    message: "User not found"
                });
        }

        const isPasswordMatched = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordMatched) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Current password is incorrect"
                });
        }

        if (newPassword !== confirmPassword) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "New password and confirm password do not match"
                });
        }

        const isSamePassword = await bcrypt.compare(newPassword, user.password);
        if (isSamePassword) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "New password must be different from current password"
                });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        return res
            .status(200)
            .json({
                success: true,
                message: "Password changed successfully"
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
