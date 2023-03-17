const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "UserModel",
    },
    title: {
      type: String,
      required: true,
      min: 4,
    },

    photo: {
      type: String,
      default: "",
    },

    video: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      default: "",
    },

    comments: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CommentModel",
      default: [],
    },
  },
  { timestamps: true }
);

const PostModel = mongoose.model("post", postSchema);
module.exports = PostModel;
