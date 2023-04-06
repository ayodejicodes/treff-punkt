const asyncHandler = require("express-async-handler");
const Comment = require("../models/CommentModel");
const Post = require("../models/PostModel");

// ------------------------Gets Comments------------------------

// @desc        Gets all Comments
// @Route       POST (/api/comments)
// @Access      Public
const getcommentsController = asyncHandler(async (req, res) => {
  const { postID } = req.params;

  const comments = await Comment.find();

  // Filters only comments of authenticated user
  const filteredComments = comments.filter(
    (comment) => comment.post.toString() === postID
  );
  res.status(200).json(filteredComments);
});

// ------------------------Create New Comment------------------------

// @desc        Creates Comment
// @Route       POST (/api/comments)
// @Access      Public
const createCommentController = asyncHandler(async (req, res) => {
  const { caption } = req.body;
  const { postID } = req.params;

  // Validation check
  if (!caption) {
    res.status(400);
    throw new Error("Comment TextArea can not be empty");
  }

  // Check if user is authenticated
  if (!req.user || !req.user._id) {
    res.status(401).json({ error: "User not authenticated" });
    return;
  }

  // create new Comment
  const newComment = await Comment.create({
    caption,
    author: req.user._id,
    post: postID,
  });

  // Pushing the comment to the post's comments array
  const foundPost = await Post.findById({ _id: postID });
  if (!foundPost) {
    throw new Error("Can not Comment, post not found");
  }

  const updatedPost = await Post.findByIdAndUpdate(
    { _id: postID },
    { $push: { comments: newComment._id } },
    { new: true }
  );
  res.status(200).json(newComment);
});

// ------------------------Update Existing Comment------------------------

// @desc        Updates Comment
// @Route       PUT (/api/comments/:id)
// @Access      Public
const updateCommentController = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Check if Comment exists
  const foundComment = await Comment.findById(id);

  if (!foundComment) {
    res.status(400);
    throw new Error("Cannot update Comment with an invalid ID");
  }

  // Authorization check
  if (req.user._id.toString() === foundComment.author.toString()) {
    const updatedComment = await Comment.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedComment);
  } else {
    res.status(403);
    throw new Error("Can not update Comment, Unauthorized User");
  }
});

// ------------------------Delete Existing Comment------------------------

// @desc        Delete Comment
// @Route       DELETE (/api/comments/:id)
// @Access      Public
const deleteCommentController = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Check if Comment exists
  const foundComment = await Comment.findById(id);

  if (!foundComment) {
    res.status(400);
    throw new Error("Cannot delete Comment with an invalid ID");
  }

  // Authorization check
  if (req.user._id.toString() === foundComment.author.toString()) {
    const deletedComment = await Comment.findByIdAndDelete(id);

    res.status(200).json(deletedComment.id);
  } else {
    res.status(403);
    throw new Error("Can not delete Comment, Unauthorized User");
  }
});

module.exports = {
  getcommentsController,
  createCommentController,
  updateCommentController,
  deleteCommentController,
};
