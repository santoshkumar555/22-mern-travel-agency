import packageModel from "../../../models/package.model.js";

export const getPackageSearchData = async (req, res) => {
    try {
        const packages = await packageModel
            .find({ isActive: true })
            .select("title duration location")
            .populate("location", "name country")
            .sort({ createdAt: -1 });

        return res
            .status(200)
            .json({ 
                success: true, 
                message: "Package search data fetched successfully", 
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
