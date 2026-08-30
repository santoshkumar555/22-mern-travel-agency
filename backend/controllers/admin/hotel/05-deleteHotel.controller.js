import hotelModel from "../../../models/hotel.model.js";

export const deleteHotel = async (req, res) => {
    try {
        const { hotelId } = req.params;

        const deleted = await hotelModel
            .findByIdAndUpdate(
                hotelId,
                { isActive: false },
                { returnDocument: "after", runValidators: true }
            );

        if (!deleted) {
            return res
                .status(404)
                .json({
                    success: false,
                    message: "Hotel not found!"
                });
        }

        return res
            .status(200)
            .json({
                success: true,
                message: "Hotel deactivated successfully",
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
