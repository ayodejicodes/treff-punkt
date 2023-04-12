const asyncHandler = require("express-async-handler");
const Chat = require("../models/ChatModel");

// ------------------------Get Chats------------------------

// @desc        Gets all one on one Chat of User
// @Route       GET (/api/chats)
// @Access      private
const getChatsController = asyncHandler(async (req, res) => {
  try {
    const chats = await Chat.find({
      users: {
        $in: [req.user._id],
      },
    });

    // Validation check
    if (!chats) {
      res.status(400);
      throw new Error("Chat does not Exist");
    }

    res.status(200).json(chats);
  } catch (error) {
    res.status(400);
    throw new Error("Could not fetch Chats");
  }
});

// ------------------------Create New Chat------------------------

// @desc        Creates Chat
// @Route       POST (/api/chats)
// @Access      Private

const createChatController = asyncHandler(async (req, res) => {
  const { userID } = req.body;

  // Validation check
  if (!userID) {
    res.status(400);
    throw new Error("No UserID");
  }

  const chatExists = await Chat.findOne({
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userID } } },
      { users: { $size: 2 } },
    ],
  });

  // Validation check
  if (chatExists) {
    res.status(200).json(chatExists);
  } else {
    try {
      // create new Chat
      const newChat = await Chat.create({
        sender: req.user._id,
        users: [userID, req.user._id],
      });

      res.status(200).json(newChat);
    } catch (error) {
      res.status(400);

      throw new Error("Could not create chat");
    }
  }
});

module.exports = {
  getChatsController,
  createChatController,
};
