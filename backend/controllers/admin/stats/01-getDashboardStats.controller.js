import bookingModel from "../../../models/booking.model.js";
import packageModel from "../../../models/package.model.js";
import userModel from "../../../models/user.model.js";

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let statsCache = null;
let statsCachedAt = 0;
const CACHE_TTL_MS = 60 * 1000;

export const getDashboardStats = async (req, res) => {
    try {
        const now = Date.now();

        if (statsCache && now - statsCachedAt < CACHE_TTL_MS) {
            return res
                .status(200)
                .json({
                    success: true,
                    message: "Dashboard stats fetched successfully",
                    data: statsCache,
                    meta: { cached: true, cachedAt: new Date(statsCachedAt).toISOString() },
                });
        }

        const [
            totalUsers, totalBookings, totalPackages,
            totalPaidBookings, totalPendingBookings, totalCancelledBookings,
            totalPendingPayments, totalFailedPayments,
        ] = await Promise.all([
            userModel.countDocuments(),
            bookingModel.countDocuments(),
            packageModel.countDocuments(),
            bookingModel.countDocuments({ paymentStatus: "paid" }),
            bookingModel.countDocuments({ bookingStatus: "pending" }),
            bookingModel.countDocuments({ bookingStatus: "cancelled" }),
            bookingModel.countDocuments({ paymentStatus: "pending" }),
            bookingModel.countDocuments({ paymentStatus: "failed" }),
        ]);

        const [latestUsers, latestBookings, latestPackages] = await Promise.all([
            userModel
                .find()
                .select("name email image createdAt")
                .sort({ createdAt: -1 }).limit(5),
            bookingModel
                .find()
                .populate({ path: "user", select: "name email" })
                .populate({ path: "travelPackage", select: "title price thumbnail" })
                .select("bookingId totalPrice bookingStatus paymentStatus numberOfPeople travelDate createdAt")
                .sort({ createdAt: -1 })
                .limit(6),
            packageModel
                .find()
                .select("title price duration tripType thumbnail createdAt")
                .sort({ createdAt: -1 })
                .limit(5),
        ]);

        const [revenueAgg, monthlyRevenueAgg, bookingStatusAgg, paymentStatusAgg, topPackagesAgg] = await Promise.all([
            bookingModel.aggregate([
                { $match: { paymentStatus: "paid" } },
                { $group: { _id: null, totalRevenue: { $sum: "$totalPrice" } } },
            ]),
            bookingModel.aggregate([
                { $match: { paymentStatus: "paid", createdAt: { $gte: new Date(new Date().getFullYear(), 0, 1) } } },
                { $group: { _id: { $month: "$createdAt" }, revenue: { $sum: "$totalPrice" }, bookings: { $sum: 1 } } },
                { $sort: { _id: 1 } },
            ]),
            bookingModel.aggregate([{ $group: { _id: "$bookingStatus", count: { $sum: 1 } } }]),
            bookingModel.aggregate([{ $group: { _id: "$paymentStatus", count: { $sum: 1 } } }]),
            bookingModel.aggregate([
                { $group: { _id: "$travelPackage", totalBookings: { $sum: 1 }, totalRevenue: { $sum: "$totalPrice" } } },
                { $sort: { totalBookings: -1, totalRevenue: -1 } },
                { $limit: 5 },
                { $lookup: { from: "packages", localField: "_id", foreignField: "_id", as: "package" } },
                { $unwind: "$package" },
                { $project: { _id: 0, packageId: "$package._id", title: "$package.title", price: "$package.price", thumbnail: "$package.thumbnail", totalBookings: 1, totalRevenue: 1 } },
            ]),
        ]);

        const totalRevenue = revenueAgg?.[0]?.totalRevenue || 0;
        const bookingPerUser = totalUsers > 0 ? Number((totalBookings / totalUsers).toFixed(2)) : 0;
        const revenuePerBooking = totalBookings > 0 ? Math.round(totalRevenue / totalBookings) : 0;
        const conversionRate = totalBookings > 0 ? Number(((totalPaidBookings / totalBookings) * 100).toFixed(1)) : 0;

        const monthlyRevenueMap = new Map(
            monthlyRevenueAgg.map((item) => [item._id, { month: monthNames[item._id - 1], revenue: item.revenue, bookings: item.bookings }])
        );

        const monthlyRevenue = Array.from({ length: 12 }, (_, i) => {
            const monthIndex = i + 1;
            return monthlyRevenueMap.get(monthIndex) || { month: monthNames[i], revenue: 0, bookings: 0 };
        });

        const data = {
            overview: {
                totalUsers, totalBookings, totalPackages, totalRevenue,
                totalPaidBookings, totalPendingBookings, totalCancelledBookings,
                totalPendingPayments, totalFailedPayments,
                bookingPerUser, revenuePerBooking, conversionRate,
            },
            charts: {
                monthlyRevenue,
                bookingStatus: bookingStatusAgg.map((item) => ({ name: item._id || "unknown", value: item.count })),
                paymentStatus: paymentStatusAgg.map((item) => ({ name: item._id || "unknown", value: item.count })),
            },
            recent: { latestUsers, latestBookings, latestPackages },
            topPackages: topPackagesAgg,
        };

        statsCache = data;
        statsCachedAt = now;

        return res
            .status(200)
            .json({
                success: true,
                message: "Dashboard stats fetched successfully",
                data,
                meta: { cached: false },
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
