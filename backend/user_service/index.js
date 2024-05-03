import express from "express";
import "dotenv/config";
import cors from "cors";
import UserRoutes from "./routes/userRoutes.js";
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(`${req.url} =====> ${req.method}`);
  next();
});

app.use("/api/users/", UserRoutes);

app.listen(PORT, () => {
  console.log(`User service started on port ${PORT}`);
});
