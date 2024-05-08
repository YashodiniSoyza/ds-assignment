const JWT = require("jsonwebtoken");

const authAdminAndStudent = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.json({
      status: false,
      message: "Access denied",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.json({
      status: false,
      message: "Access Denied",
    });
  }

  try {
    const verified = JWT.verify(token, process.env.SECRET_KEY);

    if (verified.role !== "student" && verified.role !== "admin") {
      return res.json({
        status: false,
        message: "Access Denied",
      });
    }

    req.user = verified.id;

    next();
  } catch (err) {
    res.json({
      status: false,
      message: "Access Denied",
    });
  }
};

module.exports = {
  authAdminAndStudent,
};
