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
    },

    profilePic: {
      type: String,
      default:
        "https://res.cloudinary.com/dpcdcpyln/image/upload/v1682113172/treffPunkt/mzoj7qv5dwmkrffajejo.png",
      validate: {
        validator: function (url) {
          const urlRegex =
            /^https?:\/\/[a-zA-Z0-9-]+\.cloudinary\.com\/[a-zA-Z0-9-]+\/image\/upload\/v\d+\/[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+\.(?:jpg|jpeg|png|gif|bmp)$/i;
          return urlRegex.test(url);
        },
        message: (props) => `${props.value} is not a valid URL!`,
      },
    },
    coverPic: {
      type: String,
      default:
        "https://res.cloudinary.com/dpcdcpyln/image/upload/v1682113620/treffPunkt/npkbrojsw8l6bkbrj9lv.jpg",
      validate: {
        validator: function (url) {
          const urlRegex =
            /^https?:\/\/[a-zA-Z0-9-]+\.cloudinary\.com\/[a-zA-Z0-9-]+\/image\/upload\/v\d+\/[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+\.(?:jpg|jpeg|png|gif|bmp)$/i;
          return urlRegex.test(url);
        },
        message: (props) => `${props.value} is not a valid URL!`,
      },
    },
    followings: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    role: { type: String, enum: ["user", "admin"], default: "user" },
    bio: { type: String, maxlength: 500 },
    // posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    stories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Story" }],
    bookmarkedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    blocked: { type: Boolean, default: false }, // added blocked field
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

// Block a user
userSchema.methods.blockUser = function (userId) {
  if (!this.blockedUsers.includes(userId)) {
    this.blockedUsers.push(userId);
  }
  return this.save();
};

// Unblock a user
userSchema.methods.unblockUser = function (userId) {
  const index = this.blockedUsers.indexOf(userId);
  if (index !== -1) {
    this.blockedUsers.splice(index, 1);
  }
  return this.save();
};

const User = mongoose.model("User", userSchema);

module.exports = User;

// Assuming you have a User model instance called currentUser
// const userIdToUnblock = "12345"; // The userId of the user to unblock
// currentUser.unblockUser(userIdToUnblock)
//   .then(updatedUser => {
//     console.log(`User with userId ${userIdToUnblock} has been unblocked successfully.`);
//   })
//   .catch(error => {
//     console.error(`Failed to unblock user: ${error}`);
//   });
