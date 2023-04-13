import axios from "axios";
import { CreateNewMessage } from "./messageSlice";

const API_URL = "/api/messages/";

const createMessage = async (messageData: CreateNewMessage, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { chat } = messageData;

  try {
    const response = await axios.post(`${API_URL}${chat}`, messageData, config);
    return response.data;
  } catch (error) {
    throw new Error("Message was not sent");
  }
};

const getMessages = async (chat: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.get(`${API_URL}${chat}`, config);

    return response.data;
  } catch (error) {
    throw new Error("Messages could not be fetched");
  }
};

const messageService = {
  createMessage,
  getMessages,
};

export default messageService;
