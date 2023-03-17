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
router.get("/", protect, getcommentsController);
router.post("/", protect, createCommentController);
router.put("/:id", protect, updateCommentController);
router.delete("/:id", protect, deleteCommentController);

module.exports = router;
