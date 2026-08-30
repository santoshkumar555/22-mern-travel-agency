import bookingModel from "../../../models/booking.model.js";

export const updateBooking = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const { bookingStatus, paymentStatus, paymentMethod } = req.body;

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

        if (bookingStatus !== undefined) booking.bookingStatus = bookingStatus;
        if (paymentStatus !== undefined) booking.paymentStatus = paymentStatus;
        if (paymentMethod !== undefined) booking.paymentMethod = paymentMethod;
        await booking.save();

        return res
            .status(200)
            .json({ 
                success: true, 
                message: "Booking updated successfully", 
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
