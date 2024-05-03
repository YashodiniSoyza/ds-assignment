import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

//loads .env file
dotenv.config();

// eslint-disable-next-line no-console
console.log("Starting API GATEWAY Service.");

export const apiGateway = express();

apiGateway.use(cors());
// apiGateway.use(express.json())

//cretaing proxies below
const userProxy = createProxyMiddleware({
  target: process.env.USER_API,
  changeOrigin: true,
});

const courseProxy = createProxyMiddleware({
  target: process.env.COURSE_API,
  changeOrigin: true,
});

const enrollmentProxy = createProxyMiddleware({
  target: process.env.ENROLLMENT_API,
  changeOrigin: true,
  pathRewrite: {
    "^/enrollment": "/",
  },
});

const paymentProxy = createProxyMiddleware({
  target: process.env.PAYMENT_API,
  changeOrigin: true,
  pathRewrite: {
    "^/payment": "/",
  },
});

apiGateway.use((req, _res, next) => {
  // eslint-disable-next-line no-console
  console.log(req.path, req.method);
  next();
});

//defining routes for other microservices
apiGateway.use("/api/users", userProxy);
apiGateway.use("/api/courses", courseProxy);
apiGateway.use("/api/payment", paymentProxy);
apiGateway.use("/api/enrollment", enrollmentProxy);

if (process.env.NODE_ENV !== "test") {
  apiGateway.listen(process.env.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is listening at http://localhost:${process.env.PORT}`);
  });
}
