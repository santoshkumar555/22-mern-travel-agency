import locationModel from "../../../models/location.model.js";

export const getLocation = async (req, res) => {
    try {
        const { locationId } = req.params;
        const location = await locationModel.findOne({ _id: locationId });

        if (!location) {
            return res
                .status(404)
                .json({ 
                    success: false, 
                    message: "Location not found!" 
                });
        }

        return res
            .status(200)
            .json({ 
                success: true, 
                message: "Location fetched successfully", 
                data: location 
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
