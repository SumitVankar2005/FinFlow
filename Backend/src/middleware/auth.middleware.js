const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {

  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ msg: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "Invalid token format" });
  }

  try {

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "finflowsecret"
    );

    req.user = {
      id: decoded.id
    };

    next();

  } catch (err) {
    return res.status(401).json({ msg: "Token invalid or expired" });
  }
};