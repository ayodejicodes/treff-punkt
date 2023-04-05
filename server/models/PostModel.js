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
      required: true,
      validate: {
        validator: function (url) {
          const urlRegex =
            /^https?:\/\/(?:www\.)?([a-zA-Z0-9-]+)\.[a-zA-Z]{2,}\/?$/;
          return urlRegex.test(url);
        },
        message: (props) => `${props.value} is not a valid URL!`,
      },
    },
    caption: { type: String, maxlength: 500 },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [
      {
        author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        text: { type: String, required: true, maxlength: 500 },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    shares: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
