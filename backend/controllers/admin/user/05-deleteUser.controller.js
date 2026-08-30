import userModel from "../../../models/user.model.js";

export const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const deleted = await userModel
            .findByIdAndUpdate(
                userId,
                { isActive: false },
                { returnDocument: "after", runValidators: true }
            );

        if (!deleted) {
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
                message: "User deactivated successfully"
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
