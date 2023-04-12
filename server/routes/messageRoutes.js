const express = require("express");
const {
  createMessageController,
  getMessagesController,
} = require("../controllers/messageController");

const protect = require("../middlewares/authMiddleware");
const router = express.Router();

// HTTP methods
router.get("/:chat", protect, getMessagesController);
router.post("/:chat", protect, createMessageController);

module.exports = router;
