// authMiddleware.js

const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Authorization token is missing" });
  }

  //   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWY4MDBhNTk1OWRkYWNlYjIwM2ZlNDYiLCJpYXQiOjE3MTA3NTY0MzUsImV4cCI6MTcxMDc2MDAzNX0.WMPl6ycEw1loR-gWeGMLsnUMgXU9Cw1T-5CMEKGfwp8"

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
    req.userId = decoded.userId;
    console.log("decoded:", decoded);

    next();
  });
};

module.exports = { verifyToken };
