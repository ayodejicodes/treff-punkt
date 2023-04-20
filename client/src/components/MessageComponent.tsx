import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Message } from "../features/messages/messageSlice";
import { format, parseISO } from "date-fns";

export type Messageinterface = {
  message: Message;
};

const MessageComponent = ({ message }: Messageinterface) => {
  const { user } = useSelector((state: RootState) => state.auth);

  const { _id, sender, content, contentImage, createdAt, updatedAt } =
    message as Message;

  const isSenderTheAuth = sender === user?._id;

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
        <div className="flex items-center justify-end max-w-[48%]  bg-primaryColor rounded-lg pl-2 pr-2 pt-1 pb-1 mt-3 ">
          <small className="break-all text-secondaryColor ">{content}</small>
        </div>
      )}
      {/* {isSenderTheAuth && (
        <div className=" w-3 h-3 mt-1 mr-1 ">
          <img
            src="../../src//assets/ayo.jpg"
            alt=""
            className="rounded-full w-full h-full object-cover"
          />
        </div>
      )} */}

      {/* <small className="text-secondaryColor dark:text-whiteColor text-[10px] mt-1">
        {message && `${format(parseISO(createdAt), " HH:mm a")}`}
      </small> */}
    </div>
  );
};
export default MessageComponent;
