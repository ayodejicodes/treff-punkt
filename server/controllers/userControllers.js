const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

// ------------------------Register------------------------

// @Desc        Registers User
// @Route       POST (/api/users/register)
// @Access      Public
const register = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, userName, password, confirmPassword } =
    req.body;

  //   validation check
  if (
    !firstName ||
    !lastName ||
    !email ||
    !userName ||
    !password ||
    !confirmPassword
  ) {
    res.status(400);
    throw new Error("All fields are required");
  }

  //   check if user with email given already exist
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("A user with this Email already exists");
  }

  //   Hashing Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //   Create new User nand add to database
  const newUser = await User.create({
    ...req.body,
    password: hashedPassword,
  });

  // Checks if user was successfully registered and assign token
  if (newUser) {
    // format response for frontend
    const { password, ...others } = newUser._doc;
    res.status(200).json({
      ...others,
      token: generateToken(newUser._id),
    });
  } else {
    res.status(400);
    throw new Error("Account was not registered");
  }
});

// ------------------------Login------------------------

// @Desc        Login User
// @Route       POST (/api/users/login)
// @Access      Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Email and Password are required");
  }

  //   Check if user has an account or not
  const userExists = await User.findOne({ email });

  if (!userExists) {
    res.status(400);
    throw new Error("User with this email does not Exist, Please register!");
  }

  const comparedPassword = await bcrypt.compare(password, userExists.password);

  const {
    _id,
    firstName,
    lastName,
    userName,
    profilePic,
    coverPic,
    followings,
    followers,
    // role,
    bio,
    // posts,
    // stories,
    // bookmarkedPosts,
    // blocked,
    createdAt,
    updatedAt,
  } = userExists;

  //   Authenticate User
  if (userExists && comparedPassword) {
    res.status(201).json({
      _id,
      email,
      firstName,
      lastName,
      userName,
      profilePic,
      coverPic,
      followings,
      followers,
      // role,
      bio,
      // posts,
      // stories,
      // bookmarkedPosts,
      // blocked,
      createdAt,
      updatedAt,
      token: generateToken(userExists._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Credentials");
  }
});

// ------------------------Get Single User profile------------------------

// @Desc        Gets User Profile
// @Route       GET (/api/users/:id)
// @Access      Private
const getUserProfile = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Check if User exists
  const foundUser = await User.findById(id);

  if (!foundUser) {
    res.status(400);
    throw new Error("Unable to find User with that ID");
  }
  if (foundUser) {
    // format response for frontend
    const { password, ...others } = foundUser._doc;
    res.status(200).json(others);
  }
});

// -----------------------------------------------------------------------

// Generates Token
const generateToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });
  return token;
};

// ------------------------Follow User------------------------

// @desc        Follow User
// @Route       POST (/api/users/:id/follow)
// @Access      Private
const followController = asyncHandler(async (req, res) => {
  const { id } = req.body;

  // Check if User exists
  const foundUser = await User.findById(id);

  if (!foundUser) {
    res.status(400);
    throw new Error("Unable to find User with that ID");
  }

  // Logic
  if (foundUser.followers.includes(req.user._id.toString())) {
    // format response for frontend
    const { password, ...others } = foundUser._doc;
    res.status(200).json(others);
  } else {
    // Add User if not included
    const addedUser = await User.findByIdAndUpdate(
      id,
      { $push: { followers: req.user._id } },
      { new: true }
    );
    await User.findByIdAndUpdate(
      req.user._id,
      { $push: { followings: id } },
      { new: true }
    );

    // format response for frontend
    const { password, ...others } = addedUser._doc;
    res.status(200).json(others);
  }
});

// ------------------------Unfollow User------------------------

// @desc        Unfollow User
// @Route       POST (/api/users/:id/unfollow)
// @Access      Private
const unfollowController = asyncHandler(async (req, res) => {
  const { id } = req.body;

  // Check if User exists
  const foundUser = await User.findById(id);

  if (!foundUser) {
    res.status(400);
    throw new Error("Unable to find User with that ID");
  }

  // Logic
  if (!foundUser.followers.includes(req.user._id.toString())) {
    // format response for frontend
    const { password, ...others } = foundUser._doc;
    res.status(200).json(others);
  } else {
    // Add User if not included
    const removedUser = await User.findByIdAndUpdate(
      id,
      { $pull: { followers: req.user._id } },
      { new: true }
    );
    await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { followings: id } },
      { new: true }
    );

    const { password, ...others } = removedUser._doc;
    res.status(200).json(others);
  }
});

// ------------------------Search Users------------------------

// @Desc        Search User
// @Route       GET (/api/users?search=)
// @Access      Private
const searchUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { firstName: { $regex: req.query.search, $options: "i" } },
          { lastName: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  let users = await User.find({ ...keyword, _id: { $ne: req.user._id } });

  const filteredUsers = users.map((user) => {
    const { password, ...others } = user._doc;
    return others;
  });

  res.status(200).json(filteredUsers);
});

// ------------------------Update Existing User------------------------

// @desc        Updates User
// @Route       PUT (/api/users/:id)
// @Access      Private
const updateUserController = asyncHandler(async (req, res) => {
  const updatedProfile = req.body;
  const updateObj = { $set: { ...updatedProfile } };

  // Validation check
  if (!updatedProfile) {
    res.status(400);
    throw new Error("You did not Update any Data");
  }

  // Check if User exists
  const foundUser = await User.findById(req.user._id);

  if (!foundUser) {
    res.status(400);
    throw new Error("Unable to find User with that ID");
  }

  // Authorization check
  if (req.user._id.toString() === foundUser._id.toString()) {
    const updatedUser = await User.findByIdAndUpdate(req.user._id, updateObj, {
      new: true,
    });

    const { password, ...others } = updatedUser._doc;
    res.status(200).json(others);
  } else {
    res.status(403);
    throw new Error("Update User failed, Unauthorized User");
  }
});

module.exports = {
  register,
  login,
  getUserProfile,
  followController,
  unfollowController,
  searchUsers,
  updateUserController,
};
