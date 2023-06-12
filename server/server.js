const express = require("express");
const colors = require("colors");
const cors = require("cors");
const errorHandlerMiddleware = require("./middlewares/errorHandlerMiddleware");
const connectDB = require("./config/db");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const { createServer } = require("http");
const { Server } = require("socket.io");

const { Configuration, OpenAIApi } = require("openai");
const protect = require("./middlewares/authMiddleware");

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
    origin: ["http://localhost:5173", "https://treffpunkt.onrender.com"],
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

// Open Ai---------------------------------------------
app.post("/api/chatsai", protect, async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    res.status(400).send("Enter a Prompt");
    return;
  }

  // Gpt-- Turbo
  try {
    const config = new Configuration({
      organization: process.env.OPEN_AI_ORG_ID,
      apiKey: process.env.OPEN_AI_KEY,
    });

    const openai = new OpenAIApi(config);

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: `${prompt}` }],
    });

    res.json({ completion: completion.data.choices[0].message });
  } catch (error) {
    res.status(400).send("Could not create Completion");
  }
});

// Error Handling..
app.use(errorHandlerMiddleware);
// ---------------------------------------------------

io.on("connection", (socket) => {
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("sendMessage", ({ receiverId, senderId, message }) => {
    io.to(receiverId).emit("private_message", { senderId, message });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// Listen to predefined port
httpServer.listen(port, () =>
  console.log(`Server running on port: ${port}`.blue)
);
