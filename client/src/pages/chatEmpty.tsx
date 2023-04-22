import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import ChatEmpty from "../components/Chat/ChatEmpty";

const ChatsNoSelection = () => {
  return (
    <div className=" pageViewportHeight mt-2 mb-4 ">
      <div className="container containerPadding gap-6  flex justify-center ">
        <ChatEmpty />
      </div>
    </div>
  );
};
export default ChatsNoSelection;
