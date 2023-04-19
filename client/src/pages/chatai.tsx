import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import ChatsPage from "../components/Chat/ChatsPage";
import ChatEmpty from "../components/ChatEmpty";
import ChatAiPage from "../components/Chat/ChatAiPage";

const ChatAi = () => {
  return (
    <div className=" pageViewportHeight mt-2 mb-4 ">
      <div className="container containerPadding gap-6  flex justify-center ">
        <ChatAiPage />
      </div>
    </div>
  );
};
export default ChatAi;
