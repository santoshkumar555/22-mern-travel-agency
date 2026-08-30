import packageModel from "../../../models/package.model.js";

export const getPackage = async (req, res) => {
    try {
        const { packageId } = req.params;

        const pkg = await packageModel
            .findOne({ _id: packageId, isActive: true })
            .select("title description duration price thumbnail itinerary tripType location hotel")
            .populate("location", "name country description image")
            .populate("hotel", "name description hotelType rating pricePerNight roomsAvailable amenities images thumbnail")
            .lean();

        if (!pkg) {
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
                data: pkg 
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
