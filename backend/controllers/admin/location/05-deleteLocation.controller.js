import locationModel from "../../../models/location.model.js";

export const deleteLocation = async (req, res) => {
    try {
        const { locationId } = req.params;

        const deactivated = await locationModel
            .findByIdAndUpdate(
                locationId,
                { isActive: false },
                { returnDocument: "after", runValidators: true }
            );

        if (!deactivated) {
            return res
                .status(404)
                .json({
                    success: false,
                    message: "Location not found!"
                });
        }

        return res
            .status(200)
            .json({
                success: true,
                message: "Location deactivated successfully"
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
