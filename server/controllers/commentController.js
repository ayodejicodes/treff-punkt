const asyncHandler = require("express-async-handler");
const Comment = require("../models/CommentModel");
const Post = require("../models/PostModel");

// ------------------------Gets Comments------------------------

// @desc        Gets all Comments fo a Post
// @Route       POST (/api/comments/:postID)
// @Access      Public
const getcommentsController = asyncHandler(async (req, res) => {
  const { postID } = req.params;

  const foundComments = await Comment.find({ post: postID });

  const comments = async () => {
    const populatedComments = await Promise.all(
      foundComments.map(async (foundComment) => {
        const mappedCommentswithAuthors = await foundComment.populate({
          path: "author",
          model: "User",
          select: ["firstName", "lastName", "userName", "profilePic"],
        });
        return mappedCommentswithAuthors;
      })
    );
    return populatedComments;
  };

  const populatedComments = await comments();
  res.status(200).json(populatedComments);
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
// @Route       DELETE (/api/comments/:postID/:id)
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

// ------------------------Upvote comment------------------------

// @desc        Upvote Comment
// @Route       PUT (/api/comments/:postID/:id/upvote)
// @Access      Private
const upvoteController = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Check if Comment exists
  const foundComment = await Comment.findById(id);

  if (!foundComment) {
    res.status(400);
    throw new Error("Cannot upvote Comment with an invalid ID");
  }

  // Logic
  if (foundComment.downvotes.includes(req.user._id.toString())) {
    // Remove Downvote first
    const removedDownvote = await Comment.findByIdAndUpdate(
      id,
      { $pull: { downvotes: req.user._id } },
      { new: true }
    );
    const addedUpvote = await Comment.findByIdAndUpdate(
      id,
      { $push: { upvotes: req.user._id } },
      { new: true }
    );

    res.status(200).json(addedUpvote);
  } else if (foundComment.upvotes.includes(req.user._id.toString())) {
    // Remove Upvote
    const removedUpvote = await Comment.findByIdAndUpdate(
      id,
      { $pull: { upvotes: req.user._id } },
      { new: true }
    );
    res.status(200).json(removedUpvote);
  } else {
    // Add upvote if not included
    const addedUpvote = await Comment.findByIdAndUpdate(
      id,
      { $push: { upvotes: req.user._id } },
      { new: true }
    );
    res.status(200).json(addedUpvote);
  }
});

// ------------------------Downvote comment------------------------

// @desc        Downvote Comment
// @Route       PUT (/api/comments/:postID/:id/downvote)
// @Access      Private
const downvoteController = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Check if Comment exists
  const foundComment = await Comment.findById(id);

  if (!foundComment) {
    res.status(400);
    throw new Error("Cannot downvote Comment with an invalid ID");
  }

  // Logic
  if (foundComment.upvotes.includes(req.user._id.toString())) {
    // Remove Upvote first
    const removedUpvote = await Comment.findByIdAndUpdate(
      id,
      { $pull: { upvotes: req.user._id } },
      { new: true }
    );
    const addedDownvote = await Comment.findByIdAndUpdate(
      id,
      { $push: { downvotes: req.user._id } },
      { new: true }
    );

    res.status(200).json(addedDownvote);
  } else if (foundComment.downvotes.includes(req.user._id.toString())) {
    // Remove Downvote
    const removedDownvote = await Comment.findByIdAndUpdate(
      id,
      { $pull: { downvotes: req.user._id } },
      { new: true }
    );

    res.status(200).json(removedDownvote);
  } else {
    // Add downvote if not included

    const addedDownvote = await Comment.findByIdAndUpdate(
      id,
      { $push: { downvotes: req.user._id } },
      { new: true }
    );

    res.status(200).json(addedDownvote);
  }
});

module.exports = {
  getcommentsController,
  createCommentController,
  updateCommentController,
  deleteCommentController,
  upvoteController,
  downvoteController,
};
