import { FaHandPointRight } from "react-icons/fa";
import { AppDispatch, RootState } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Chat } from "../../features/chats/chatSlice";
import { useEffect, useState } from "react";
import { getChats } from "../../features/chats/chatSlice";
import { setSelectedChatId } from "../../features/chats/chatSlice";
import SingleUserChatComponent from "./SingleUserChatComponent";
import AiSideChat from "./AiSideChat";

const ChatEmpty = () => {
  const { chats, selectedChatId, isSuccess, isError, message } = useSelector(
    (state: RootState) => state.chats
  );
  const { messages } = useSelector((state: RootState) => state.messages);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [chatArray, setChatArray] = useState<Chat[]>();

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
  }, [selectedChatId, messages]);

  const handleChatClick = (chatID: string) => {
    dispatch(setSelectedChatId(chatID));
  };
  return (
    <>
      <div className="hidden  lg:w-[50%] lg:flex flex-col gap-5 p-7 bgSecondaryColorLight dark:bgWhiteColorLight rounded-xl overflow-y-scroll pageViewportHeight scrollbar dark:scrollbarDark justify-center">
        <div className="flex flex-col justify-center items-center bg-whiteColor dark:bg-secondaryColor  rounded-xl p-10 gap-2 h-full ">
          <div className="w-[60%] flex flex-col items-center gap-5 ">
            <p className="text-center dark:text-whiteColor text-secondaryColor">
              Select a chat on the right or Start a new conversation with anyone
            </p>

            <FaHandPointRight
              size={22}
              className="text-secondaryColor dark:text-whiteColor cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div className="lg:hidden w-full md:w-full lg:w-[50%] flex flex-col gap-5 p-7 bgSecondaryColorLight dark:bgWhiteColorLight rounded-xl overflow-y-scroll pageViewportHeight scrollbar dark:scrollbarDark justify-center">
        <div className="bg-whiteColor dark:bg-secondaryColor rounded-xl  ">
          <h3 className="font-semibold text-secondaryColor dark:text-whiteColor text-[15px] p-3">
            Chat With Ai
          </h3>
          <div className="border-b-2  w-full borderSecondaryColorLight dark:borderWhiteColorLight"></div>

          <AiSideChat />
        </div>
        <div className="bg-whiteColor dark:bg-secondaryColor rounded-xl h-full ">
          <h3 className="font-semibold text-secondaryColor dark:text-whiteColor text-[15px] p-3">
            Chat with Friends
          </h3>
          <div className="border-b-2  w-full borderSecondaryColorLight dark:borderWhiteColorLight"></div>
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
      </div>
    </>
  );
};
export default ChatEmpty;
