import packageModel from "../../../models/package.model.js";

export const deletePackage = async (req, res) => {
    try {
        const { packageId } = req.params;

        const deleted = await packageModel
            .findByIdAndUpdate(
                packageId,
                { isActive: false },
                { returnDocument: "after", runValidators: true }
            );

        if (!deleted) {
            return res
                .status(404)
                .json({
                    success: false,
                    message: "Package not found!"
                });
        }

        return res
            .status(200)
            .json({
                success: true,
                message: "Package deactivated successfully",
                data: deleted
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
