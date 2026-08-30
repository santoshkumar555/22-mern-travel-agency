export const getLoginSessions = async (req, res) => {
    try {
        const sessions = [
            {
                _id: "current-session",
                device: "Current Device",
                browser: req.headers["user-agent"] || "Unknown Browser",
                location: "Unknown Location",
                ip: req.ip || "IP not available",
                lastActive: "Active now",
            },
        ];

        return res
            .status(200)
            .json({ 
                success: true, 
                message: "Login sessions fetched successfully", 
                data: sessions 
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
