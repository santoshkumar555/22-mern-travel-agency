import crypto from "crypto";
import bookingModel from "../../models/booking.model.js";
import packageModel from "../../models/package.model.js";
import userModel from "../../models/user.model.js";
import { sendPaymentSuccessEmail } from "../../services/email/index.js";

export const handleWebhook = async (req, res) => {
    try {
        const signature = req.headers["x-razorpay-signature"];
        const rawBody = req.body instanceof Buffer ? req.body : Buffer.from(JSON.stringify(req.body));

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
            .update(rawBody)
            .digest("hex");

        if (signature !== expectedSignature) {
            return resa
                .status(400)
                .json({ success: false, message: "Invalid webhook signature" });
        }

        const payload = JSON.parse(rawBody.toString());
        const event = payload.event;
        const entity = payload.payload;

        if (event === "payment.captured") {
            const orderId = entity.payment.entity.order_id;
            const paymentId = entity.payment.entity.id;
            const booking = await bookingModel.findOne({ razorpayOrderId: orderId });

            if (booking) {
                const wasAlreadyPaid = booking.paymentStatus === "paid";
                booking.razorpayPaymentId = paymentId;
                booking.paymentStatus = "paid";
                booking.bookingStatus = "confirmed";
                
                await booking.save();

                if (!wasAlreadyPaid) {
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
                        console.error("Webhook payment success email failed:", emailErr.message);
                    }
                }
            }
        }

        if (event === "payment.failed") {
            const orderId = entity.payment.entity.order_id;
            const booking = await bookingModel.findOne({ razorpayOrderId: orderId });
            
            if (booking) {
                booking.paymentStatus = "failed";
                await booking.save();
            }
        }

        return res
            .status(200)
            .json({ 
                success: true 
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
