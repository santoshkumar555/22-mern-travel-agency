import hotelModel from "../../../models/hotel.model.js";

export const getHotels = async (req, res) => {
    try {
        const hotels = await hotelModel
            .find()
            .populate(
                "location",
                "name country"
            );

        return res
            .status(200)
            .json({
                success: true,
                message: "Hotels fetched successfully", data: hotels
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
