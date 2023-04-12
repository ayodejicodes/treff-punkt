const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat", required: true },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: { type: String, required: true, trim: true },
    contentImage: {
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
    readBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
