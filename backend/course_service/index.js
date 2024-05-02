const express = require("express");
const cors = require("cors");
const multer = require("multer");
require("dotenv").config();
const multerObject = multer();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.url} =====> ${req.method}`);
  next();
});

app.use(
  "/api/courses",
  multerObject.single("thumbnail"),
  require("./src/routes/courseRoutes")
);

app.listen(PORT, () => {
  console.log(`COURSE SERVICE STARTED ON ${PORT}`);
});
