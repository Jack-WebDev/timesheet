const jwt = require("jsonwebtoken")

const verifyToken = async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Token missing" });
  }

  try {
    jwt.verify(token, process.env.JWT_KEY);

    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

const isAdmin = async (req, res, next) => {
  let token = req.cookies.jwt;

  const decoded = jwt.verify(token, process.env.JWT_KEY);

  if (decoded.role === "Admin") {
    return next();
  }
  return res.status(403).json({ message: "Forbidden: Admin access required" });
};


module.exports = { verifyToken, isAdmin };