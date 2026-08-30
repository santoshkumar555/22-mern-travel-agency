import locationModel from "../../../models/location.model.js";

export const getLocations = async (req, res) => {
    try {
        const { search } = req.query;
        const filter = { isActive: true };

        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: "i" } },
                { country: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
            ];
        }

        const locations = await locationModel.find(filter).sort({ createdAt: -1 });

        return res
            .status(200)
            .json({
                success: true,
                message: "Locations fetched successfully",
                data: locations
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
