const express = require("express");
const colors = require("colors");
const cors = require("cors");
const errorHandlerMiddleware = require("./middlewares/errorHandlerMiddleware");
const connectDB = require("./config/db");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const { createServer } = require("http");
const { Server } = require("socket.io");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Connects to database
connectDB();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});
// const port = process.env.PORT || 8000;
const port = 1024;

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

io.on("connection", (socket) => {
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("sendMessage", ({ receiverId, senderId, message }) => {
    io.to(receiverId).emit("private_message", { senderId, message });
  });

  socket.on("typing", (data) => socket.broadcast.emit("typing", data));
  socket.on("stop typing", (data) =>
    socket.broadcast.emit("stop typing", data)
  );

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// Listen to predefined port
httpServer.listen(port, () =>
  console.log(`Server running on port: ${port}`.blue)
);
