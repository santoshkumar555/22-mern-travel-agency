import healthRoute from "./health/health.route.js"
import authRoute from "./auth/auth.route.js";
import adminRoutes from "./admin.routes.js";
import userRoutes from "./user.routes.js";
import paymentRoute from "./payment/payment.route.js";

export const registerRoutes = (app) => {
    app.use("/api/v1/health", healthRoute)
    app.use("/api/v1/auth", authRoute);
    app.use("/api/v1/admin", adminRoutes);
    app.use("/api/v1/user", userRoutes);
    app.use("/api/v1/payment", paymentRoute);
};