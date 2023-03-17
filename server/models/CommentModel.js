const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "UserModel",
    },

    // postID: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: "PostModel",
    // },
    text: {
      type: String,
      required: true,
      min: 2,
    },
  },
  { timestamps: true }
);

const CommentModel = mongoose.model("comment", commentSchema);
module.exports = CommentModel;
