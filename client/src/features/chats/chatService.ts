import axios from "axios";

const API_URL = "/api/chats/";

const createChat = async (
  userID: { userID: string | undefined },
  token: string
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.post(API_URL, userID, config);
    return response.data;
  } catch (error) {
    throw new Error("Chat was not sent");
  }
};

const getChats = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.get(API_URL, config);

    return response.data;
  } catch (error) {
    throw new Error("Chats could not be fetched");
  }
};

const chatService = {
  createChat,
  getChats,
};

export default chatService;
