const express = require("express");
const payment_route = require("./route/payment_route");
const cors = require("cors");
const app = express();

const { PORT } = require("./utils/constant");

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.url} ====> ${req.method}`);
  next();
});
app.use("/api/payment", payment_route);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
