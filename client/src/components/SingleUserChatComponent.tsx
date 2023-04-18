import { MdVerified } from "react-icons/md";
// import useOnlineStatus from "../hooks/useOnlineStatus";
import NotificationIcon from "./Notifications/NotificationIcon";
import { Chat } from "../features/chats/chatSlice";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";

interface ChatCard {
  chat: Chat;
  onClick: () => void;
}

const SingleUserChatComponent: React.FC<ChatCard> = ({ chat, onClick }) => {
  // const online = useOnlineStatus();

  const { user, isSuccess, isError, message } = useSelector(
    (state: RootState) => state.auth
  );

  const { _id, users, latestMessage, createdAt, updatedAt } = chat;

  const sender = users.find((u) => u?._id === user?._id);
  const receiver = users.find((u) => u?._id !== user?._id);

  return (
    <div>
      {/* Image and Details */}
      <div className="border-b-2  w-full borderSecondaryColorLight dark:borderWhiteColorLight cursor-pointer">
        <div
          className="flex gap-3  hoverSecondaryColorLight dark:hoverWhiteColorLight p-3 rounded-xl mb-2.5 "
          onClick={onClick}
        >
          {/* Image */}
          <div>
            <div className="relative w-10 h-10">
              <img
                src={receiver?.profilePic}
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
                  {`${receiver?.firstName} ${receiver?.lastName}`}
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
                {latestMessage?.content
                  ? latestMessage?.content
                  : !latestMessage?.content && latestMessage?.contentImage
                  ? "An image was sent..."
                  : ""}
              </small>
              {/* <NotificationIcon /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SingleUserChatComponent;
