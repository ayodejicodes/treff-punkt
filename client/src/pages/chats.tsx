import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import ChatsPage from "../components/Chat/ChatsPage";
import ChatEmpty from "../components/Chat/ChatEmpty";

const Chats = () => {
  const { chats, selectedChatId, isSuccess, isError, message } = useSelector(
    (state: RootState) => state.chats
  );

  return (
    <div className=" pageViewportHeight mt-2 mb-4 ">
      <div className="container containerPadding gap-6  flex justify-center ">
        {selectedChatId ? <ChatsPage /> : <ChatEmpty />}
      </div>
    </div>
  );
};
export default Chats;
