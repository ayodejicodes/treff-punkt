const asyncHandler = require("express-async-handler");
const PostModel = require("../models/PostModel");

// ------------------------Gets Posts------------------------

// @desc        Gets all Posts
// @Route       POST (/api/posts)
// @Access      Public
const getPostsController = asyncHandler(async (req, res) => {
  const posts = await PostModel.find();

  // Filters only posts of authenticated user
  const filteredPosts = posts.filter(
    (post) => req.user.id === post.userID.toString()
  );
  res.status(200).json(filteredPosts);
});

// ------------------------Create New Post------------------------

// @desc        Creates Post
// @Route       POST (/api/posts)
// @Access      Public
const createPostController = asyncHandler(async (req, res) => {
  const { title, photo, video, location } = req.body;

  // Validation check
  if (!title) {
    res.status(400);
    throw new Error("What's on your mind field is empty");
  }

  // create new Post
  const newPost = await PostModel.create({
    title,
    photo,
    video,
    location,
    userID: req.user.id,
  });
  res.status(200).json(newPost);
});

// ------------------------Update Existing Post------------------------

// @desc        Updates Post
// @Route       PUT (/api/posts/:id)
// @Access      Public
const updatePostController = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Check if Post exists
  const foundPost = await PostModel.findById(id);

  if (!foundPost) {
    res.status(400);
    throw new Error("Unable to find Post with that ID");
  }

  // Authorization check
  if (req.user.id === foundPost.userID.toString()) {
    const updatedPost = await PostModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedPost);
  } else {
    res.status(403);
    throw new Error("Update failed, Unauthorized User");
  }
});

// ------------------------Delete Existing Post------------------------

// @desc        Delete Post
// @Route       DELETE (/api/posts/:id)
// @Access      Public
const deletePostController = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Check if Post exists
  const foundPost = await PostModel.findById(id);

  if (!foundPost) {
    res.status(400);
    throw new Error("Cannot delete Post with an invalid ID");
  }

  // Authorization check
  if (req.user.id === foundPost.userID.toString()) {
    const deletedPost = await PostModel.findByIdAndDelete(id);

    res.status(200).json(deletedPost.id);
  } else {
    res.status(403);
    throw new Error("Can not delete, Unauthorized User");
  }
});

module.exports = {
  getPostsController,
  createPostController,
  updatePostController,
  deletePostController,
};
