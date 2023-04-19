import { MdVerified } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { AiChat } from "./Chat/ChatAiPage";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useEffect, useState } from "react";

const AiSideChat = () => {
  const { aiChatArray } = useSelector((state: RootState) => state.chats);
  const navigate = useNavigate();
  const chat = {
    firstName: "Ai",
    lastName: "Chat",
    profilePic: "jfjfjf",
    latestMessage: "content from chat",
  } as AiChat;

  const [latestMessage, setLatestMessage] = useState<string>();

  useEffect(() => {
    setLatestMessage(aiChatArray[aiChatArray.length - 1] as any);
  }, [aiChatArray]);

  return (
    <div className="">
      <div onClick={() => navigate("/chatsai")}>
        {/* Image and Details */}
        <div className="border-t-2  w-full borderSecondaryColorLight dark:borderWhiteColorLight cursor-pointer">
          <div className="flex gap-3  hoverSecondaryColorLight dark:hoverWhiteColorLight p-3 rounded-xl mb-2 mt-1.5 ">
            {/* Image */}
            <div>
              <div className="relative w-10 h-10">
                <img
                  src="../../src/assets/ai-photo.jpg"
                  alt=""
                  className=" rounded-full w-full h-full object-cover"
                />
                {/* {online ? (
                <div className="absolute border-4 border-whiteColor bg-onlineGreen w-4 h-4 right-0 top-0 rounded-full mt-7"></div>
              ) : (
                <div className="absolute border-4 border-whiteColor bg-offlineGray w-4 h-4 right-0 top-0 rounded-full mt-7"></div>
              )} */}
              </div>
            </div>

            {/* Message Details */}
            <div className="flex flex-col  w-full">
              <div className="flex flex-col">
                <div className="flex items-center gap-1 ">
                  <small className="text-secondaryColor dark:text-whiteColor text-[12px] font-semibold ">
                    {`${chat?.firstName} ${chat?.lastName}`}
                  </small>
                  <span>
                    <MdVerified
                      size={12}
                      className=" text-secondaryColor dark:text-whiteColor"
                    />
                  </span>
                </div>

                {/* <small className="text-secondaryColor dark:text-whiteColor text-[10px] italic ">
                {online ? "Online" : "Offline"}
              </small> */}
              </div>
              <div className="flex gap-3 justify-between items-center">
                <small className="text-secondaryColor dark:text-whiteColor text-[12px] overflow-hidden whitespace-nowrap overflow-ellipsis w-4 grow">
                  {aiChatArray.length === 0 && "Ask me anything"}
                  {aiChatArray.length !== 0 && latestMessage}
                </small>
                {/* <NotificationIcon /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AiSideChat;
