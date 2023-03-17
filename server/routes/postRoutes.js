const express = require("express");
const {
  getPostsController,
  createPostController,
  updatePostController,
  deletePostController,
} = require("../controllers/postController");
const protect = require("../middlewares/authMiddleware");
const router = express.Router();

// HTTP methods
router.get("/", protect, getPostsController);
router.post("/", protect, createPostController);
router.put("/:id", protect, updatePostController);
router.delete("/:id", protect, deletePostController);

module.exports = router;
