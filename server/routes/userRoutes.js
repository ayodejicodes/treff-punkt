const express = require("express");
const {
  register,
  login,
  getUserProfile,
  deleteUserController,
  followController,
  unfollowController,
  searchUsers,
} = require("../controllers/userControllers");
const protect = require("../middlewares/authMiddleware");
// const specificAuth = require("../middlewares/specificAuthMiddleware");

const router = express.Router();

// HTTP methods
router.post("/register", register);
router.post("/login", login);
router.get("/:id", protect, getUserProfile);
router.put("/:id/follow", protect, followController);
router.put("/:id/unfollow", protect, unfollowController);
router.get("/", protect, searchUsers);
// router.delete("/delete/:id", protect, deleteUserController);

module.exports = router;
