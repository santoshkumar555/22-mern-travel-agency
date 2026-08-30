import bookingModel from "../../../models/booking.model.js";

export const getBooking = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const userId = req.user._id;

        const booking = await bookingModel
            .findOne({
                bookingId,
                user: userId,
                isActive: true
            })
            .populate({
                path: "travelPackage",
                select: "title description price duration tripType thumbnail images itinerary location hotel",
                populate: [
                    { path: "location", select: "name country" },
                    { path: "hotel", select: "name rating pricePerNight images thumbnail amenities" },
                ],
            })
            .populate("user", "name email contact");

        if (!booking) {
            return res
                .status(404)
                .json({
                    success: false,
                    message: "Booking not found!"
                });
        }

        return res
            .status(200)
            .json({
                success: true,
                message: "Booking fetched successfully",
                data: booking
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
