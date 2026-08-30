import cors from "cors";

import { corsOptions } from "../config/cors.config.js";
import { requestLoggerMiddleware } from "../middleware/logger/index.js";
import { bodyParserMiddleware } from "../middleware/bodyParser/index.js";

export const registerMiddleware = (app) => {
    app.use(cors(corsOptions));
    app.use(requestLoggerMiddleware);
    app.use(bodyParserMiddleware);
};