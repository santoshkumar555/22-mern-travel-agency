import bcrypt from "bcrypt";
import userModel from "../../../models/user.model.js";

export const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

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

        const isMatch = bcrypt.compareSync(currentPassword, user.password);

        if (!isMatch) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Current password is incorrect"
                });
        }

        const isSamePassword = bcrypt.compareSync(newPassword, user.password);

        if (isSamePassword) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "New password must be different from current password"
                });
        }

        user.password = bcrypt.hashSync(newPassword, 10);
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
