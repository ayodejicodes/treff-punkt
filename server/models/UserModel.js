const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (email) {
          const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
          return emailRegex.test(email);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },

    userName: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 20,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      //   maxlength: 30,
    },

    profilePic: {
      type: String,
      validate: {
        validator: function (url) {
          const urlRegex =
            /^https?:\/\/(?:www\.)?([a-zA-Z0-9-]+)\.[a-zA-Z]{2,}\/?$/;
          return urlRegex.test(url);
        },
        message: (props) => `${props.value} is not a valid URL!`,
      },
    },
    coverPic: {
      type: String,
      validate: {
        validator: function (url) {
          const urlRegex =
            /^https?:\/\/(?:www\.)?([a-zA-Z0-9-]+)\.[a-zA-Z]{2,}\/?$/;
          return urlRegex.test(url);
        },
        message: (props) => `${props.value} is not a valid URL!`,
      },
    },
    followings: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    role: { type: String, enum: ["user", "admin"], default: "user" },
    bio: { type: String, maxlength: 500 },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    stories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Story" }],
    bookmarkedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  },
  { timestamps: true }
);

// Error throwing for duplicate usernames and emails
userSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoError" && error.code === 11000) {
    const key = Object.keys(error.keyPattern)[0];
    if (key === "userName") {
      next(new Error("Username already exists!"));
    } else if (key === "email") {
      next(new Error("Email already exists!"));
    } else {
      next(error);
    }
  } else {
    next(error);
  }
});

module.exports = mongoose.model("User", userSchema);
