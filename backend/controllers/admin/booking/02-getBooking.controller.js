import bookingModel from "../../../models/booking.model.js";

export const getBooking = async (req, res) => {
    try {
        const { bookingId } = req.params;

        const booking = await bookingModel
            .findOne({ bookingId, isActive: true })
            .populate(
                "user", 
                "name email contact"
            )
            .populate(
                "travelPackage", 
                "title description price duration tripType thumbnail location hotel"
            );

        if (!booking) {
            return res
                .status(404)
                .json({
                    success: false,
                    message: "Booking not found"
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
