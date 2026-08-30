import hotelModel from "../../../models/hotel.model.js";

export const getHotel = async (req, res) => {
    try {
        const { hotelId } = req.params;

        const hotel = await hotelModel
            .findOne({
                _id: hotelId,
                isActive: true
            })
            .populate(
                "location",
                "name country description image"
            )
            .lean();

        if (!hotel) {
            return res
                .status(404)
                .json({
                    success: false,
                    message: "Hotel not found"
                });
        }

        return res
            .status(200)
            .json({
                success: true,
                message: "Hotel fetched successfully",
                data: hotel
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
