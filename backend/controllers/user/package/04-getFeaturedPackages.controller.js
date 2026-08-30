import packageModel from "../../../models/package.model.js";

export const getFeaturedPackages = async (req, res) => {
    try {
        const packages = await packageModel
            .find({ isActive: true, isFeatured: true })
            .select("title description duration price thumbnail location tripType")
            .populate("location", "name country")
            .sort({ createdAt: -1 })
            .limit(6)
            .lean();

        return res
            .status(200)
            .json({ 
                success: true, 
                message: "Featured packages fetched successfully", 
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
