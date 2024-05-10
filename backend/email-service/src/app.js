import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import helmet from "helmet";
import responseHandler from "./util/response.handler.js";
import specs from "./config/swagger.js";
import swaggerUi from "swagger-ui-express";

const app = express();

// Register Middleware Chain
app.use(cors());
app.use(helmet());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

// Inject Response Handler
app.use((req, res, next) => {
	req.handleResponse = responseHandler;
	next();
});

// Inject Swagger Docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

export default app;
