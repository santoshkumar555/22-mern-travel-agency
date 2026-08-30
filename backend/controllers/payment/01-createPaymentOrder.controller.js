import bookingModel from "../../models/booking.model.js";
import { razorpay } from "../../services/payment/index.js";

export const createPaymentOrder = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const userId = req.user._id;
        const booking = await bookingModel
            .findOne({
                bookingId,
                user: userId, isActive: true
            });

        if (!booking) {
            return res
                .status(404)
                .json({
                    success: false,
                    message: "Booking not found"
                });
        }

        if (booking.bookingStatus === "cancelled") {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Cannot create payment order for cancelled booking"
                });
        }

        if (booking.paymentStatus === "paid") {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Payment already completed for this booking"
                });
        }

        if (booking.paymentStatus === "refunded") {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Cannot create payment order for refunded booking"
                });
        }

        if (booking.razorpayOrderId && booking.paymentStatus === "pending") {
            return res.status(200).json({
                success: true,
                message: "Payment order already exists",
                data: {
                    key: process.env.RAZORPAY_KEY_ID,
                    amount: booking.totalPrice * 100,
                    currency: "INR",
                    orderId: booking.razorpayOrderId,
                    bookingId: booking.bookingId,
                },
            });
        }

        console.log("totalPrice from DB:", booking.totalPrice, "amount sent to Razorpay:", booking.totalPrice * 100);

        const order = await razorpay.orders.create({
            amount: booking.totalPrice * 100,
            currency: "INR",
            receipt: booking.bookingId,
            notes: { bookingId: booking.bookingId, userId: String(userId) },
        });

        booking.razorpayOrderId = order.id;
        if (booking.paymentStatus === "failed") booking.paymentStatus = "pending";
        await booking.save();

        return res.status(200).json({
            success: true,
            message: "Payment order created successfully",
            data: {
                key: process.env.RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                orderId: order.id,
                bookingId: booking.bookingId,
            },
        });
    } catch (err) {
        console.error("[Payment] createPaymentOrder failed", {
            bookingId: req.params.bookingId,
            userId: req.user?._id?.toString(),
            razorpayError: err?.error ?? null,
            statusCode: err?.statusCode ?? null,
            message: err?.message ?? null,
            stack: err?.stack,
        });

        return res.status(500).json({
            success: false,
            message: err?.error?.description || err?.message || "Internal Server Error",
        });
    }
};
