import "./config/env.config.js";
import express from "express";

import { registerMiddleware } from "./middleware/index.js";
import { registerRoutes } from "./routes/index.js";
import { errorMiddleware } from "./middleware/error/index.js";

const app = express();

// Middleware
registerMiddleware(app);

// Routes
registerRoutes(app);

// Error handler
app.use(errorMiddleware);

export default app;