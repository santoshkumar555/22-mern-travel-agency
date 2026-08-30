import hotelModel from "../../../models/hotel.model.js";

export const getHotels = async (req, res) => {
    try {
        const { location, search, page, limit, sort, hotelType, minPrice, maxPrice, minRating } = req.query;
        const pageNumber = Math.max(Number(page) || 1, 1);
        const limitNumber = Math.min(Math.max(Number(limit) || 12, 1), 24);
        const skipValue = (pageNumber - 1) * limitNumber;
        const filter = { isActive: true };

        if (location) filter.location = location;
        if (hotelType) filter.hotelType = hotelType;

        if (minPrice || maxPrice) {
            filter.pricePerNight = {};
            if (minPrice) filter.pricePerNight.$gte = Number(minPrice);
            if (maxPrice) filter.pricePerNight.$lte = Number(maxPrice);
        }

        if (minRating) filter.rating = { $gte: Number(minRating) };

        if (search?.trim()) {
            filter.$or = [
                { name: { $regex: search.trim(), $options: "i" } },
                { description: { $regex: search.trim(), $options: "i" } },
                { hotelType: { $regex: search.trim(), $options: "i" } },
            ];
        }

        const sortMap = {
            old: { createdAt: 1 },
            ltoh: { pricePerNight: 1 },
            htol: { pricePerNight: -1 },
            ratingHigh: { rating: -1 },
            ratingLow: { rating: 1 },
        };

        const sortBy = sortMap[sort] || { createdAt: -1 };

        const [hotels, total] = await Promise.all([
            hotelModel
                .find(filter)
                .select("name description hotelType rating pricePerNight roomsAvailable amenities images thumbnail location")
                .populate("location", "name country")
                .sort(sortBy)
                .skip(skipValue)
                .limit(limitNumber)
                .lean(),
            hotelModel.countDocuments(filter),
        ]);

        return res
            .status(200)
            .json({
                success: true,
                message: "Hotels fetched successfully",
                data: {
                    hotels,
                    pagination: {
                        total,
                        page: pageNumber,
                        limit: limitNumber,
                        totalPages: Math.ceil(total / limitNumber),
                    },
                },
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
