const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Authorization header is required" });
  }

  const tokenParts = authHeader.split(" ");
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return res
      .status(401)
      .json({ message: "Authorization header format is invalid" });
  }

  const token = tokenParts[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    switch (err.name) {
      case "JsonWebTokenError":
        res.status(401).json({ message: "Unauthorized. Token is invalid." });
        break;
      case "TokenExpiredError":
        res.status(401).json({ message: "Unauthorized. Token expired." });
        break;
      default:
        res.status(500).json({ message: "Server error." });
    }
  }
};
