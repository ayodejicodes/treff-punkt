const asyncHandler = require("express-async-handler");
const Post = require("../models/PostModel");
const User = require("../models/UserModel");

// ------------------------Gets Posts------------------------

// @desc        Gets all Posts
// @Route       POST (/api/posts)
// @Access      Public
const getPostsController = asyncHandler(async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", ["-posts", "-password"])
      .populate({
        path: "comments",
        populate: {
          path: "author",
          select: ["firstName", "lastName", "userName", "profilePic"],
        },
      })
      .sort({ createdAt: -1 });

    const mapPosts = posts.map((post) => {
      return post;
    });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ------------------------Create New Post------------------------

// @desc        Creates Post
// @Route       POST (/api/posts)
// @Access      Public
const createPostController = asyncHandler(async (req, res) => {
  const { caption, postImage } = req.body;

  // Validation check
  if (!caption && !postImage) {
    res.status(400);
    throw new Error("What's on your mind field is empty");
  }

  // create new Post
  const newPost = await Post.create({
    caption,
    postImage,
    author: req.user.id,
  });

  // Pushing the Post to the User posts array
  const foundUser = await User.findById({ _id: req.user._id });
  if (!foundUser) {
    throw new Error("Can not push Post to an invalid user ID");
  }

  res.status(200).json(newPost);
});

// ------------------------Update Existing Post------------------------

// @desc        Updates Post
// @Route       PUT (/api/posts/:id)
// @Access      Private
const updatePostController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { caption, postImage } = req.body;

  // Validation check
  if (!caption && !postImage) {
    res.status(400);
    throw new Error("What's on your mind field is empty");
  }

  // Check if Post exists
  const foundPost = await Post.findById(id);

  if (!foundPost) {
    res.status(400);
    throw new Error("Unable to find Post with that ID");
  }

  // Authorization check
  if (req.user._id.toString() === foundPost.author.toString()) {
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { caption, postImage },
      {
        new: true,
      }
    );

    res.status(200).json(updatedPost);
  } else {
    res.status(403);
    throw new Error("Update Post failed, Unauthorized User");
  }
});

// ------------------------Delete Existing Post------------------------

// @desc        Delete Post
// @Route       DELETE (/api/posts/:id)
// @Access      Public
const deletePostController = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Check if Post exists
  const foundPost = await Post.findById(id);

  if (!foundPost) {
    res.status(400);
    throw new Error("Cannot delete Post with an invalid ID");
  }

  // Authorization check
  if (req.user._id.toString() === foundPost.author.toString()) {
    const deletedPost = await Post.findByIdAndDelete(id);

    res.status(200).json(deletedPost.id);
  } else {
    res.status(403);
    throw new Error("Can not delete, Unauthorized User");
  }
});

// ------------------------Like/Dislike Post------------------------

// @desc        Like/Dislike Post
// @Route       PUT (/api/posts/:id/like)
// @Access      Private
const likeDislikePostController = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Check if Post exists
  const foundPost = await Post.findById(id);

  if (!foundPost) {
    res.status(400);
    throw new Error("Unable to find Post with that ID");
  }

  // Logic
  if (foundPost.likes.includes(req.user._id.toString())) {
    // Remove Like if already liked
    const removedLike = await Post.findByIdAndUpdate(
      id,
      { $pull: { likes: req.user._id } },
      { new: true }
    );

    res.status(200).json(removedLike);
  } else {
    // Add Like if not included
    const addedLike = await Post.findByIdAndUpdate(
      id,
      { $push: { likes: req.user._id } },
      { new: true }
    );

    res.status(200).json(addedLike);
  }
});

// @desc        Bookmark Post
// @Route       PUT (/api/posts/:id/bookmark)
// @Access      Private
const bookmarkPostController = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Check if Post exists
  const foundPost = await Post.findById(id);

  if (!foundPost) {
    res.status(400);
    throw new Error("Unable to find Post with that ID");
  }

  // Logic
  if (foundPost.bookmarkedPostsUsers.includes(req.user._id.toString())) {
    // Remove post from bookmarked Array
    const removedBookmarkedPostsUsers = await Post.findByIdAndUpdate(
      id,
      { $pull: { bookmarkedPostsUsers: req.user._id } },
      { new: true }
    );

    // Remove User bookmarked Post
    await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { bookmarkedPosts: foundPost._id } },
      { new: true }
    );

    res.status(200).json(removedBookmarkedPostsUsers);
  } else {
    // Add user if not already included in bookmarked Array
    const addedBookmarkedPostsUsers = await Post.findByIdAndUpdate(
      id,
      { $push: { bookmarkedPostsUsers: req.user._id } },
      { new: true }
    );

    // Push to User bookmarked Post
    await User.findByIdAndUpdate(
      req.user._id,
      { $push: { bookmarkedPosts: foundPost._id } },
      { new: true }
    );

    res.status(200).json(addedBookmarkedPostsUsers);
  }
});

module.exports = {
  getPostsController,
  createPostController,
  updatePostController,
  deletePostController,
  // fetchInitialStateLike,
  likeDislikePostController,
  bookmarkPostController,
};
