const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postImage: {
      type: String,
      // required: true,
      validate: {
        validator: function (url) {
          const urlRegex =
            /^https?:\/\/[a-zA-Z0-9-]+\.cloudinary\.com\/[a-zA-Z0-9-]+\/image\/upload\/v\d+\/[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+\.(?:jpg|jpeg|png|gif|bmp)$/i;
          return urlRegex.test(url);
        },
        message: (props) => `${props.value} is not a valid URL!`,
      },
    },
    caption: { type: String, maxlength: 500 },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    bookmarkedPostsUsers: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    ],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    shares: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
