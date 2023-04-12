import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import ChatsPage from "../components/Chat/ChatsPage";

const Chats = () => {
  const { chats, selectedChatId, isSuccess, isError, message } = useSelector(
    (state: RootState) => state.chats
  );

  return (
    <div className=" pageViewportHeight mt-2 mb-4 ">
      <div className="container containerPadding gap-6  flex justify-center ">
        {selectedChatId && <ChatsPage chatID={selectedChatId} />}
      </div>
    </div>
  );
};
export default Chats;
