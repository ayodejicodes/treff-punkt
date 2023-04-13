import { useNavigate } from "react-router-dom";
import ChatsPage from "./Chat/ChatsPage";
import SingleUserChatComponent from "./SingleUserChatComponent";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { useEffect, useState } from "react";
import { Chat, getChats, setSelectedChatId } from "../features/chats/chatSlice";

const SideChat = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { chats, isSuccess, isError, message } = useSelector(
    (state: RootState) => state.chats
  );

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [chatArray, setChatArray] = useState<Chat[]>();
  // const [selectedChatId, setSelectedChatId] = useState<string | null>();

  const fetchChat = async () => {
    const res = await dispatch(getChats());
    return res;
  };

  useEffect(() => {
    const fetchedChat = async () => {
      const response = await fetchChat();
      await Promise.resolve();
      setChatArray(response.payload);
    };
    fetchedChat();
  }, []);

  const fetchNewChat = async () => {
    const res = await fetchChat();
    return res;
  };

  useEffect(() => {
    const homeFeedChats = async () => {
      const res = await fetchNewChat();
      await Promise.resolve();
      setChatArray(res.payload);
    };
    homeFeedChats();
  }, []);

  // console.log("chatArray", chatArray);
  // console.log("selectedChatId", selectedChatId);

  const handleChatClick = (chatID: string) => {
    dispatch(setSelectedChatId(chatID));
  };

  return (
    <div className="flex flex-col gap-2">
      {chatArray?.map((chat: Chat, index: number) => (
        <SingleUserChatComponent
          chat={chat}
          key={index}
          onClick={() => {
            handleChatClick(chat._id);
            navigate("/chats");
          }}
        />
      ))}
    </div>
  );
};
export default SideChat;
