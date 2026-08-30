import { randomBytes } from "crypto";
import bookingModel from "../../../models/booking.model.js";
import packageModel from "../../../models/package.model.js";
import userModel from "../../../models/user.model.js";
import { sendBookingConfirmationEmail } from "../../../services/email/index.js";

const MAX_PEOPLE = 20;

export const createBooking = async (req, res) => {
    try {
        const { travelPackage, travelDate, numberOfPeople, paymentMethod } = req.body;
        const userId = req.user._id;

        if (numberOfPeople > MAX_PEOPLE) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: `Number of people cannot exceed ${MAX_PEOPLE}`,
                });
        }

        const packageData = await packageModel.findOne({ _id: travelPackage, isActive: true });
        if (!packageData) {
            return res
                .status(404)
                .json({
                    success: false,
                    message: "Package not found"
                });
        }

        const totalPrice = numberOfPeople * packageData.price;

        const RAZORPAY_MAX_AMOUNT = 1500000; // ₹15,00,000 — Razorpay's per-transaction limit
        if (totalPrice > RAZORPAY_MAX_AMOUNT) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "This booking total exceeds the maximum amount allowed for online payment. Please reduce the number of travelers.",
                });
        }

        const bookingId = `BOOK-${Date.now()}-${randomBytes(8).toString("hex")}`;

        const created = await bookingModel
            .create({
                user: userId,
                travelPackage,
                travelDate,
                numberOfPeople,
                totalPrice,
                paymentMethod,
                bookingId,
            });

        try {
            const user = await userModel.findById(userId);
            if (user?.email) {
                await sendBookingConfirmationEmail({
                    to: user.email,
                    name: user.name,
                    bookingId: created.bookingId,
                    packageTitle: packageData.title,
                    travelDate,
                    numberOfPeople,
                    totalPrice,
                });
            }
        } catch (emailErr) {
            console.error("Booking confirmation email failed:", emailErr.message);
        }

        return res
            .status(201)
            .json({
                success: true,
                message: "Booking created successfully",
                data: created
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
