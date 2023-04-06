// const jwt = require("jsonwebtoken");
// const asyncHandler = require("express-async-handler");

// const specificAuth = (req, res, next) => {
//   console.log("Specific Auth");

//   // Access Token--Place in Headers
//   const token = req.header("x-access-token");
//   console.log("token", token);

//   if (!token) {
//     res.status(403);
//     throw new Error("No access token, Authorization denied");
//   }

//   // Verify the token with the secret
//   const verified = jwt.verify(token, process.env.JWT_SECRET);

//   if (!verified) {
//     res.status(403);
//     throw new Error("Verification Failed");
//   }

//   req.user_id = verified.id;

//   next();
// };

// module.exports = specificAuth;
