const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check if token exists in the header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Isolate the token string
      token = req.headers.authorization.split(" ")[1];

      // Verify the token with the secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Authorized User
      const authorizedUser = await User.findById(decoded.id);

      // Check if user exists
      if (!authorizedUser) {
        res.status(403);
        throw new Error("Unauthorized User, user does not exist");
      }

      req.user = authorizedUser;

      next();
    } catch (error) {
      res.status(403);
      throw new Error("Unauthorized User");
    }
  } else {
    res.status(400);
    throw new Error("No token available");
  }
});

module.exports = protect;
