const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization").split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided" });
  }

  try {
    const jwtSecret = process.env.JWT_SECRET;
    const tokenDecoded = jwt.verify(token, jwtSecret);
    req.user = tokenDecoded;
    next();
  } catch (err) {
    console.error("Invalid token: ", err);
    return res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
