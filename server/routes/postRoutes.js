const express = require("express");
const {
  getPostsController,
  createPostController,
  updatePostController,
  deletePostController,
  likeDislikePostController,
  fetchInitialStateLike,
  bookmarkPostController,
} = require("../controllers/postController");
const protect = require("../middlewares/authMiddleware");
const router = express.Router();

// HTTP methods
router.get("/", protect, getPostsController);
router.post("/", protect, createPostController);
router.put("/:id", protect, updatePostController);
router.delete("/:id", protect, deletePostController);
// router.get("/:id", protect, fetchInitialStateLike);
router.put("/:id/like", protect, likeDislikePostController);
router.put("/:id/bookmark", protect, bookmarkPostController);

module.exports = router;
