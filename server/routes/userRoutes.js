const express = require("express");
const {
  register,
  login,
  getUserProfile,
} = require("../controllers/userControllers");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();

// HTTP methods
router.post("/register", register);
router.post("/login", login);
router.get("/:id", protect, getUserProfile);

module.exports = router;
