import locationModel from "../../../models/location.model.js";

export const getLocations = async (req, res) => {
    try {
        const locations = await locationModel.find();

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
