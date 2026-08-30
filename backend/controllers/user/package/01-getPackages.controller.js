import packageModel from "../../../models/package.model.js";

export const getPackages = async (req, res) => {
    try {
        const { search, location, tripType, minPrice, maxPrice, sort, page, limit } = req.query;
        const pageNumber = Math.max(Number(page) || 1, 1);
        const limitNumber = Math.min(Math.max(Number(limit) || 9, 1), 24);
        const skipValue = (pageNumber - 1) * limitNumber;
        const filter = { isActive: true };

        if (search?.trim()) {
            filter.$or = [
                { title: { $regex: search.trim(), $options: "i" } },
                { description: { $regex: search.trim(), $options: "i" } },
                { tripType: { $regex: search.trim(), $options: "i" } },
            ];
        }

        if (location) filter.location = location;
        if (tripType) filter.tripType = tripType;

        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }

        const sortMap = {
            old: { createdAt: 1 },
            ltoh: { price: 1 },
            htol: { price: -1 },
            shortDuration: { duration: 1 },
            longDuration: { duration: -1 },
        };

        const sortBy = sortMap[sort] || { createdAt: -1 };

        const [packages, total] = await Promise.all([
            packageModel
                .find(filter)
                .populate(
                    "location",
                    "name country"
                )
                .sort(sortBy)
                .skip(skipValue)
                .limit(limitNumber)
                .lean(),
            packageModel
                .countDocuments(filter),
        ]);

        return res
            .status(200)
            .json({
                success: true,
                message: "Packages fetched successfully",
                data: {
                    packages,
                    pagination: {
                        total,
                        page: pageNumber,
                        limit: limitNumber,
                        totalPages: Math.ceil(total / limitNumber),
                    },
                },
            }
            );
    } catch (err) {
        return res
            .status(500)
            .json({
                success: false,
                message: err.message || "Internal Server Error"
            });
    }
};
