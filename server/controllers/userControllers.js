const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

// ------------------------Register------------------------

// @Desc        Registers User
// @Route       POST (/api/users/register)
// @Access      Public
const register = asyncHandler(async (req, res) => {
  const { name, username, email, password } = req.body;

  //   validation check
  if (!name || !username || !email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  //   check if user with email given already exist
  const userExists = await UserModel.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("A user with this Email already exists");
  }

  //   Hashing Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //   Create new User nand add to database
  const newUser = await UserModel.create({
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
  const { email, username, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Email and Password are required");
  }

  //   Check if user has an account or not
  const userExists = await UserModel.findOne({ email });

  if (!userExists) {
    res.status(400);
    throw new Error("User with this email does not Exist, Please register!");
  }

  const comparedPassword = await bcrypt.compare(password, userExists.password);

  //   Authenticate User
  if (userExists && comparedPassword) {
    res.status(201).json({
      id: userExists._id,
      email: userExists.email,
      username: userExists.username,
      name: userExists.name,
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
  res.json({ msg: "Single User" });
});

// -----------------------------------------------------------------------

// Generates Token
const generateToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};
module.exports = { register, login, getUserProfile };
