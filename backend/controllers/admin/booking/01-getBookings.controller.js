import bookingModel from "../../../models/booking.model.js";

export const getBookings = async (req, res) => {
    try {
        const bookings = await bookingModel
            .find({ isActive: true })
            .populate(
                "user",
                "name email contact"
            )
            .populate(
                "travelPackage",
                "title price duration tripType thumbnail location hotel",
            )
            .sort({ createdAt: -1 });

        return res
            .status(200)
            .json({
                success: true,
                message: "Bookings fetched successfully",
                data: bookings,
            });
    } catch (err) {
        return res
            .status(500)
            .json({
                success: false,
                message: err.message || "Internal Server Error",
            });
    }
};
