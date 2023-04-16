import { AiOutlinePaperClip } from "react-icons/ai";

import { MdVerified } from "react-icons/md";
import Dropzone from "react-dropzone";
import { BiPaperPlane } from "react-icons/bi";
import MyDropzone from "../Dropzone/MyDropzone";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import { Chat } from "../../features/chats/chatSlice";
import { useEffect, useRef, useState } from "react";
import { format, parseISO } from "date-fns";

const ChatsPage = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const { chats, selectedChatId, isSuccess, isError, message } = useSelector(
    (state: RootState) => state.chats
  );

  const chat = chats.find((chat) => chat._id === selectedChatId);
  const { _id, users, latestMessage, createdAt, updatedAt } = chat as Chat;

  const sender = users.find((u) => u?._id === user?._id);
  const receiver = users.find((u) => u?._id !== user?._id);

  return (
    <div className=" md:w-[50%] flex flex-col bgSecondaryColorLight dark:bgWhiteColorLight rounded-xl overflow-y-scroll pageViewportHeight scrollbar dark:scrollbarDark divide-y-[2px] divideSecondaryColorLight dark:divideWhiteColorLight">
      {/* Chat Header-------------------------------------------- */}
      <div className=" flex flex-col items-center pl-7 pr-7 pt-4 pb-2 sticky top-0 bg-[#f0f3f4] dark:bg-[#164055] border-b-2 dark:border-[#f0f3f4]/[0.15]  border-[#164055]/[0.15] ">
        {/* Image */}
        <div className="  w-8 h-8 mb-1">
          <img
            src={receiver?.profilePic}
            alt=""
            className=" rounded-full cursor-pointer w-full h-full object-cover"
          />
        </div>

        {/* Name, Last Seen */}

        <div>
          <div className="flex items-center gap-1">
            <small className="text-secondaryColor dark:text-whiteColor font-semibold">
              {`${receiver?.firstName} ${receiver?.lastName}`}
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
          {/* {`${format(parseISO(createdAt), "dd MMM yyyy HH:mm a")}`} */}

          {latestMessage
            ? `Last Seen ${format(
                parseISO(latestMessage?.createdAt),
                "dd MMM yyyy HH:mm a"
              )}`
            : `Last Seen ${format(
                parseISO(user?.createdAt as string),
                "dd MMM yyyy HH:mm a"
              )}`}
        </small>
      </div>

      {/* Messages and Chat Form */}

      <div>
        <MyDropzone />
      </div>
    </div>
  );
};
export default ChatsPage;
