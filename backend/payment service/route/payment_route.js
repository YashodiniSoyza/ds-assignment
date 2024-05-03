const express = require("express");
const {
  make_payment,
  create_db_record,
  ready_stripe_payment,
} = require("../controller/payment_controller");
const {
  authStudentMiddleware,
} = require("../middlewares/AuthStudentMiddleware");

const router = express.Router();

router.post("/pending", authStudentMiddleware, ready_stripe_payment);
router.route("/create").post(create_db_record);

module.exports = router;
