const CLIENT_LABELS = {
    admin: "Admin",
    frontend: "Frontend",
};

export const requestLoggerMiddleware = (req, res, next) => {
    const source = req.headers["x-client-source"];
    const label = CLIENT_LABELS[source] ?? "Unknown";
    console.log(`[${label}] ${req.method} ${req.path}`);
    next();
};