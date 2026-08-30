export const getConnectedAccounts = async (req, res) => {
    try {
        return res
            .status(200)
            .json({ 
                success: true, 
                message: "Connected accounts fetched successfully", 
                data: [] 
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
