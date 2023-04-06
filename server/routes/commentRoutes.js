const express = require("express");
const {
  getcommentsController,
  createCommentController,
  updateCommentController,
  deleteCommentController,
} = require("../controllers/commentController");
const protect = require("../middlewares/authMiddleware");
const router = express.Router();

// HTTP methods
router.get("/:postID", protect, getcommentsController);
router.post("/:postID", protect, createCommentController);
router.put("/:postID/:id", protect, updateCommentController);
router.delete("/:postID/:id", protect, deleteCommentController);

module.exports = router;
