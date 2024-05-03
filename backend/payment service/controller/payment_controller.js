const { isEmpty } = require("../utils/object_isEmpty");
const { PAYMENT_MODEL } = require("../validation_model/payment_validations");
const connection = require("../config/dbConnection");
const Stripe = require("stripe");

const stripe = new Stripe(
  "sk_test_51PHCSQSByHq1Rm7DJPzesXeubs6KsVuK5OfOE8sz5heejzOOiGa5mAIqabdbxNHVriSTklcxhkpuqLzKcytSDaGf00XE6ruiN3"
);

exports.ready_stripe_payment = async (req, res) => {
  try {
    const { course_id, title, thumbnailUrl, enrollment_fee } = req.body.data;

    console.log(req.body.data);
    const items = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: title,
            images: [thumbnailUrl],
          },
          unit_amount: Math.round(enrollment_fee * 100),
        },
        quantity: 1,
      },
    ];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items,
      mode: "payment",
      success_url: `http://localhost:5173/payment/status?user=${req.user}&course=${course_id}&price=${enrollment_fee}`,
      cancel_url: "http://localhost:5173/payment/status",
    });

    res.status(200).json({ id: session.id });
  } catch (err) {
    return res.json({
      status: false,
      message: "internal server error",
      error: err,
    });
  }
};

exports.create_db_record = async (req, res) => {
  if (isEmpty(req.body)) {
    return res.json({
      status: false,
      message: "form data not found",
    });
  }

  console.log(req.body);

  try {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();

    const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;

    connection.query(
      "INSERT INTO payments VALUES(Null, ?)",
      [[req.body.userId, req.body.courseId, req.body.courseFee, formattedDate]],
      (err, data, fields) => {
        if (err) {
          return res.json({
            status: false,
            message: "internal server error",
            error: err,
          });
        }

        res.json({
          status: true,
          message: "successfully added payment record",
        });
      }
    );
  } catch (err) {
    return res.json({
      status: false,
      message: "internal server error",
      error: err,
    });
  }
};
