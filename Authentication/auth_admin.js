require("dotenv").config();

const jwt = require("jsonwebtoken");

const auth_admin = (req, res, next) => {
  const token = req.headers["authorization"].replace("Bearer ", "");
  // console.log(`this token is ${token}`);

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
      console.log(decoded);
      req.decoded = decoded;

      if (decoded.role !== "admin") {
        return res.status(401).send({
          status: "error",
          message: "You are not a paid user!",
        });
      }

      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(401).send({
          status: "error",
          message: "Expired",
        });
      } else {
        console.log(error);
        return res.status(401).send({
          status: "error",
          message: "Not Authorised",
        });
      }
    }
  } else {
    return res.status(403).json({
      status: "error",
      message: "missing token",
    });
  }
};

module.exports = auth_admin;
