import packageModel from "../../../models/package.model.js";

export const getPackage = async (req, res) => {
    try {
        const { packageId } = req.params;

        const singlePackage = await packageModel
            .findOne({ _id: packageId })
            .populate(
                "location",
                "name country description image"
            )
            .populate(
                "hotel",
                "name description rating pricePerNight roomsAvailable amenities hotelType thumbnail images"
            );

        if (!singlePackage) {
            return res
                .status(404)
                .json({
                    success: false,
                    message: "Package not found"
                });
        }

        return res
            .status(200)
            .json({
                success: true,
                message: "Package fetched successfully",
                data: singlePackage
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
