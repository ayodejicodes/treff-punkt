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
    <>
      {sender === user?._id && (
        <div className={`flex flex-col items-end`}>
          {contentImage && (
            <div className="w-52 h-52   mt-3">
              <img
                src={contentImage}
                alt=""
                className="rounded-lg w-full h-full object-cover"
              />
            </div>
          )}

          <div className="flex items-center justify-end max-w-[48%]  bg-primaryColor rounded-lg pl-2 pr-2 pt-1 pb-1 mt-3 ">
            <small className="break-all text-secondaryColor ">{content}</small>
          </div>
        </div>
      )}
      {sender !== user?._id && (
        <div className={`flex flex-col items-start`}>
          {contentImage && (
            <div className="w-52 h-52   mt-3">
              <img
                src={contentImage}
                alt=""
                className="rounded-lg w-full h-full object-cover"
              />
            </div>
          )}

          <div className="flex items-center justify-end max-w-[48%]  bg-primaryColor rounded-lg pl-2 pr-2 pt-1 pb-1 mt-3 ">
            <small className="break-all text-secondaryColor ">{content}</small>
          </div>
        </div>
      )}
    </>
  );
};
export default MessageComponent;
