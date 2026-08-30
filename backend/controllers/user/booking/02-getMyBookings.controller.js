import bookingModel from "../../../models/booking.model.js";

export const getMyBookings = async (req, res) => {
    try {
        const userId = req.user._id;

        const bookings = await bookingModel
            .find({ user: userId, isActive: true })
            .populate({
                path: "travelPackage",
                select: "title price duration tripType thumbnail location",
                populate: { path: "location", select: "name country" },
            })
            .sort({ createdAt: -1 });

        return res
            .status(200)
            .json({ 
                success: true, 
                message: "Bookings fetched successfully", 
                data: bookings 
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
