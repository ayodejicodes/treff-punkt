const asyncHandler = require("express-async-handler");
const Message = require("../models/MessageModel");
const Chat = require("../models/ChatModel");
const User = require("../models/UserModel");

// ------------------------Get Messages------------------------

// @desc        Gets all one on one Message of User
// @Route       GET (/api/messages/:chat)
// @Access      private
const getMessagesController = asyncHandler(async (req, res) => {
  const { chat } = req.params;

  // Validation check
  if (!chat) {
    res.status(400);
    throw new Error("No ChatID given");
  }

  // Check for auth user
  const authID = req.user._id;
  const authUser = await User.findById(authID);
  if (!authUser) {
    res.status(400);
    throw new Error("User not found");
  }

  //   Check if user is allowed to fetch Chat
  const chatObj = await Chat.findById(chat);

  const isAllowedToFetch = chatObj.users.includes(authID);

  if (!isAllowedToFetch) {
    res.status(400);
    throw new Error("Unauthorized, User is not allowed to fetch messages");
  }

  if (isAllowedToFetch) {
    try {
      const messages = await Message.find({ chat: chat });

      // Validation check
      if (!messages) {
        res.status(400);
        throw new Error("There are no messages in this Chat yet");
      }

      res.status(200).json(messages);
    } catch (error) {
      res.status(400);
      throw new Error("Could not fetch Messages");
    }
  }
});

// ------------------------Create New Message------------------------

// @desc        Creates Message
// @Route       POST (/api/messages/:chat)
// @Access      Private

const createMessageController = asyncHandler(async (req, res) => {
  //   const { chat } = req.params;
  const { chat, content, contentImage } = req.body;

  // Validation check
  if (!chat) {
    res.status(400);
    throw new Error("No ChatID given");
  }

  if (!content && !contentImage) {
    res.status(400);
    throw new Error("Add Content to Chat");
  }

  // Check for sender

  const senderID = req.user._id;
  const sender = await User.findById(senderID);
  if (!sender) {
    res.status(400);
    throw new Error("Sender not found");
  }

  //   Check if sender is allowed in the chat
  const chatObj = await Chat.findById(chat);

  const isSenderAllowed = chatObj.users.includes(senderID);

  if (!isSenderAllowed) {
    res.status(400);
    throw new Error("Sender is not allowed to send message in this chat");
  }

  if (isSenderAllowed) {
    try {
      // create new Message
      const newMessage = await Message.create({
        chat,
        sender: req.user._id,
        content,
        contentImage,
      });

      newMessage.populate("sender", "firstName lastName profilePic");

      await Chat.findByIdAndUpdate(chat, { latestMessage: newMessage });

      res.status(200).json(newMessage);
    } catch (error) {
      res.status(400);
      throw new Error("Could not send Message");
    }
  }
});

module.exports = {
  getMessagesController,
  createMessageController,
};
