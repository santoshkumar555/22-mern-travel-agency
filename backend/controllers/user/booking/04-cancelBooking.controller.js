import bookingModel from "../../../models/booking.model.js";
import packageModel from "../../../models/package.model.js";
import userModel from "../../../models/user.model.js";
import razorpay from "../../../services/payment/index.js";
import { sendBookingCancelledEmail } from "../../../services/email/index.js";

export const cancelBooking = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const userId = req.user._id;
        const booking = await bookingModel
            .findOne({
                bookingId,
                user: userId,
                isActive: true
            });

        if (!booking) {
            return res
                .status(404)
                .json({
                    success: false,
                    message: "Booking not found!"
                });
        }

        if (booking.bookingStatus === "cancelled") {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Booking is already cancelled"
                });
        }

        booking.bookingStatus = "cancelled";

        if (booking.paymentStatus === "paid" && booking.razorpayPaymentId) {
            try {
                await razorpay.payments.refund(booking.razorpayPaymentId, {
                    amount: booking.totalPrice * 100,
                    notes: { reason: "Customer cancellation", bookingId: booking.bookingId },
                });
                booking.paymentStatus = "refunded";
            } catch (refundErr) {
                console.error("Razorpay refund failed:", refundErr.message);
                return res.status(502).json({
                    success: false,
                    message: "Booking cancellation failed: could not process refund. Please contact support.",
                });
            }
        }

        await booking.save();

        try {
            const [user, packageData] = await Promise.all([
                userModel.findById(userId),
                packageModel.findById(booking.travelPackage),
            ]);
            if (user?.email) {
                await sendBookingCancelledEmail({
                    to: user.email,
                    name: user.name,
                    bookingId: booking.bookingId,
                    packageTitle: packageData?.title ?? "Travel Package",
                    totalPrice: booking.totalPrice,
                    travelDate: booking.travelDate,
                });
            }
        } catch (emailErr) {
            console.error("Booking cancellation email failed:", emailErr.message);
        }

        return res
            .status(200)
            .json({
                success: true,
                message: "Booking cancelled successfully",
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
