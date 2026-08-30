import packageModel from "../../../models/package.model.js";

export const getPackages = async (req, res) => {
    try {
        const packages = await packageModel
            .find()
            .populate(
                "location",
                "name country"
            )
            .populate(
                "hotel",
                "name hotelType rating thumbnail"
            );

        return res
            .status(200)
            .json({
                success: true,
                message: "Packages fetched successfully",
                data: packages
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
