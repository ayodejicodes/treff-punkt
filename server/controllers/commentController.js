const asyncHandler = require("express-async-handler");
const CommentModel = require("../models/CommentModel");

// ------------------------Gets Comments------------------------

// @desc        Gets all Comments
// @Route       POST (/api/comments)
// @Access      Public
const getcommentsController = asyncHandler(async (req, res) => {
  const comments = await CommentModel.find();

  // Filters only comments of authenticated user
  const filteredComments = comments.filter(
    (comments) => req.user.id === comments.userID.toString()
  );
  res.status(200).json(filteredComments);
});

// ------------------------Create New Comment------------------------

// @desc        Creates Comment
// @Route       POST (/api/comments)
// @Access      Public
const createCommentController = asyncHandler(async (req, res) => {
  const { text } = req.body;

  // Validation check
  if (!text) {
    res.status(400);
    throw new Error("Comment TextArea can not be empty");
  }

  // create new Comment
  const newComment = await CommentModel.create({
    text,

    userID: req.user.id,
  });
  res.status(200).json(newComment);
});

// ------------------------Update Existing Comment------------------------

// @desc        Updates Comment
// @Route       PUT (/api/comments/:id)
// @Access      Public
const updateCommentController = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Check if Comment exists
  const foundComment = await CommentModel.findById(id);

  if (!foundComment) {
    res.status(400);
    throw new Error("Unable to find Comment with that ID");
  }

  // Authorization check
  if (req.user.id === foundComment.userID.toString()) {
    const updatedComment = await CommentModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedComment);
  } else {
    res.status(403);
    throw new Error("Update Comment failed, Unauthorized User");
  }
});

// ------------------------Delete Existing Comment------------------------

// @desc        Delete Comment
// @Route       DELETE (/api/comments/:id)
// @Access      Public
const deleteCommentController = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Check if Comment exists
  const foundComment = await CommentModel.findById(id);

  if (!foundComment) {
    res.status(400);
    throw new Error("Cannot delete Comment with an invalid ID");
  }

  // Authorization check
  if (req.user.id === foundComment.userID.toString()) {
    const deletedComment = await CommentModel.findByIdAndDelete(id);

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
