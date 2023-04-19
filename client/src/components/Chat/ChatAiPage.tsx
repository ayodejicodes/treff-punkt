import { MdVerified } from "react-icons/md";
import { BiPaperPlane } from "react-icons/bi";
import { AppDispatch, RootState } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { format, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setAiChatArray } from "../../features/chats/chatSlice";
import AiChatMessageComponent from "../AiChatMessageComponent";

export interface AiChat {
  firstName: string;
  lastName: string;
  profilePic: string;
  latestMessage: string;
}

const ChatAiPage = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { aiChatArray } = useSelector((state: RootState) => state.chats);
  const token = user?.token;
  const [error, setError] = useState(false);

  const [prompt, setPrompt] = useState<string>();
  const [promptDisplay, setPromptDisplay] = useState<string>();
  const [aiResponse, setAiResponse] = useState<string>();
  const [isResponseLoading, setIsResponseLoading] = useState<Boolean>(false);
  const chatBoxScrollRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    chatBoxScrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatBoxScrollRef, aiChatArray]);

  const chat = {
    firstName: "Ai",
    lastName: "Chat",
    profilePic: "jfjfjf",
    latestMessage: "content from chat",
  } as AiChat;

  const handleAiChatPromptSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    setPromptDisplay(prompt);
    dispatch(setAiChatArray(prompt));

    const getAiResponse = async () => {
      setIsResponseLoading(true);

      try {
        const response = await axios.post(
          `http://localhost:1024/api/chatsai`,
          { prompt },
          config
        );

        setPrompt("");

        const res = await response.data;

        setAiResponse(res);
        setIsResponseLoading(false);
        dispatch(setAiChatArray(res));

        setError(false);
      } catch (error) {
        setError(true);
        setIsResponseLoading(false);
      }
    };

    getAiResponse();
  };

  return (
    <div className=" w-full lg:w-[50%] lg:flex flex-col bgSecondaryColorLight dark:bgWhiteColorLight rounded-xl overflow-y-scroll pageViewportHeight scrollbar dark:scrollbarDark divide-y-[2px] divideSecondaryColorLight dark:divideWhiteColorLight">
      {/* Chat Header-------------------------------------------- */}
      <div className=" flex flex-col items-center pl-7 pr-7 pt-4 pb-2 sticky z-20 top-[-8px] bg-[#f0f3f4] dark:bg-[#164055] border-b-2 dark:border-[#f0f3f4]/[0.15]  border-[#164055]/[0.15]  ">
        {/* Image */}
        <div className="  w-8 h-8 mb-1">
          <img
            src="../../src/assets/ai-photo.jpg"
            alt=""
            className=" rounded-full cursor-pointer w-full h-full object-cover"
          />
        </div>

        {/* Name, Last Seen */}

        <div>
          <div className="flex items-center gap-1">
            <small className="text-secondaryColor dark:text-whiteColor font-semibold">
              {`${chat?.firstName} ${chat?.lastName}`}
            </small>
            <span>
              <MdVerified
                size={12}
                className=" text-secondaryColor dark:text-whiteColor"
              />
            </span>
          </div>
        </div>
        <small className="text-secondaryColor dark:text-whiteColor text-[12px] mt-[-2px]">
          Chatting with Ai
        </small>
      </div>

      <div>
        <div className="flex-1 ">
          <div className="flex flex-col h-[calc(73vh)] divide-y-[1px] divideSecondaryColorLight dark:divideWhiteColorLight">
            {/* Chat Messages------------------------------------------ */}

            <div className="flex-1  pl-7 pr-7">
              {aiChatArray.map((aichat: any, index, loading) => (
                <AiChatMessageComponent
                  content={aichat}
                  index={index}
                  loading={isResponseLoading}
                  key={index}
                />
              ))}
              <div className="flex-1  pl-7 pr-7">
                {isResponseLoading && (
                  <div className="flex flex-col items-start">
                    <div className="flex items-center justify-end max-w-[48%]  bg-primaryColor rounded-lg pl-2 pr-2 pt-1 pb-1 mt-3 ">
                      <small className="break-words text-secondaryColor ">
                        Loading...
                      </small>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div
              className="bg-transparent w-full mt-3"
              ref={chatBoxScrollRef}
            ></div>

            <form onSubmit={handleAiChatPromptSubmit}>
              {/* Chat Form------------------------------------------ */}
              <div className="flex items-center pl-7 pr-7 pt-3 pb-3 gap-4 ">
                <div className=""></div>
                <div className=" w-full ">
                  <div className="flex items-center bgSecondaryColorLight dark:bgWhiteColorLight gap-1 rounded-full ">
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder="Ask me anything..."
                      className=" md:inputStyle bg-transparent w-full focus:outline-none text-secondaryColor dark:text-whiteColor text-sm p-2"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                    />
                    <div className="flex gap-1.5 items-center justify-center pl-3 pr-3">
                      {prompt !== "" && !isResponseLoading && (
                        <button type="submit">
                          <BiPaperPlane
                            size={18}
                            className="cursor-pointer text-secondaryColor dark:text-whiteColorcursor-pointer  dark:text-whiteColor"
                          />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChatAiPage;
