import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Message } from "../features/messages/messageSlice";

export type Messageinterface = {
  message: Message;
  isTyping: Boolean;
};

const MessageComponent = ({ message, isTyping }: Messageinterface) => {
  const { user } = useSelector((state: RootState) => state.auth);

  const { _id, sender, content, contentImage, createdAt, updatedAt } =
    message as Message;

  const isSenderTheAuth = sender === user?._id;

  // console.log("isTyping", isTyping);

  return (
    <div
      className={`flex flex-col ${
        isSenderTheAuth ? "items-end" : "items-start"
      }`}
    >
      {contentImage && (
        <div className="w-52 h-52   mt-3">
          <img
            src={contentImage}
            alt=""
            className="rounded-lg w-full h-full object-cover"
          />
        </div>
      )}
      {content && (
        <div className="flex items-center justify-end max-w-[48%]  bg-primaryColor rounded-lg pl-2 pr-2 pt-1 pb-1 mt-2 ">
          <small className="break-all text-secondaryColor ">{content}</small>
        </div>
      )}
      {isSenderTheAuth && (
        <div className=" w-3 h-3 mt-1 mr-1 ">
          <img
            src="../../src//assets/ayo.jpg"
            alt=""
            className="rounded-full w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  );
};
export default MessageComponent;
