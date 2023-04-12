const express = require("express");
const colors = require("colors");
const cors = require("cors");
const errorHandlerMiddleware = require("./middlewares/errorHandlerMiddleware");
const connectDB = require("./config/db");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Connects to database
connectDB();

const app = express();
const port = process.env.PORT || 8000;

// Handles JSON data
app.use(express.json());
// Handles form data
app.use(express.urlencoded({ extended: false }));

// Cross Origin sharing
app.use(cors());

// Routes
app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/comments", require("./routes/commentRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/chats", require("./routes/chatRoutes"));
app.use("/api/messages", require("./routes/messageRoutes"));

// Error Handling..
app.use(errorHandlerMiddleware);

// Listen to predefined port
app.listen(port, () => console.log(`Server running on port: ${port}`.blue));
