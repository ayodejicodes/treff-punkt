const express = require("express");
const {
  createChatController,
  getChatsController,
} = require("../controllers/chatController");

const protect = require("../middlewares/authMiddleware");
const router = express.Router();

// HTTP methods
router.get("/", protect, getChatsController);
router.post("/", protect, createChatController);

module.exports = router;
