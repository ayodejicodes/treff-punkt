const express = require("express");
const colors = require("colors");
const errorHandlerMiddleware = require("./middlewares/errorHandlerMiddleware");
const connectDB = require("./config/db");

require("dotenv").config();

// Connects to database
connectDB();

const app = express();
const port = process.env.PORT || 8000;

// Handles JSON data
app.use(express.json());
// Handles form data
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/comments", require("./routes/commentRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// Error Handling..
app.use(errorHandlerMiddleware);

// Listen to predefined port
app.listen(port, () => console.log(`Server running on port: ${port}`.blue));
