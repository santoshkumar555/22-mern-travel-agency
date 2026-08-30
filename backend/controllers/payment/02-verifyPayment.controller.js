import crypto from "crypto";
import bookingModel from "../../models/booking.model.js";
import packageModel from "../../models/package.model.js";
import userModel from "../../models/user.model.js";
import { sendPaymentSuccessEmail } from "../../services/email/index.js";

export const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = req.body;
        const booking = await bookingModel.findOne({ bookingId, user: req.user._id, isActive: true });

        if (!booking) {
            return res
                .status(404)
                .json({ 
                    success: false, 
                    message: "Booking not found" 
                });
        }

        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (generatedSignature !== razorpay_signature) {
            return res
                .status(400)
                .json({ 
                    success: false, 
                    message: "Invalid payment signature" 
                });
        }

        booking.razorpayOrderId = razorpay_order_id;
        booking.razorpayPaymentId = razorpay_payment_id;
        booking.paymentStatus = "paid";
        booking.bookingStatus = "confirmed";
        
        await booking.save();

        try {
            const [user, packageData] = await Promise.all([
                userModel.findById(booking.user),
                packageModel.findById(booking.travelPackage),
            ]);

            if (user?.email) {
                await sendPaymentSuccessEmail({
                    to: user.email,
                    name: user.name,
                    bookingId: booking.bookingId,
                    packageTitle: packageData?.title ?? "Travel Package",
                    totalPrice: booking.totalPrice,
                });
            }
        } catch (emailErr) {
            console.error("Payment success email failed:", emailErr.message);
        }

        return res
            .status(200)
            .json({ 
                success: true, 
                message: "Payment verified successfully", 
                data: booking });
    } catch (err) {
        return res
            .status(500)
            .json({ 
                success: false, 
                message: err.message || "Internal Server Error" });
    }
};
