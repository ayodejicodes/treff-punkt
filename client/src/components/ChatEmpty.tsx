import { AiOutlineCaretRight } from "react-icons/ai";
import { FaHandPointRight } from "react-icons/fa";

const ChatEmpty = () => {
  return (
    <div className="md:w-[50%] flex flex-col gap-5 p-7 bgSecondaryColorLight dark:bgWhiteColorLight rounded-xl overflow-y-scroll pageViewportHeight scrollbar dark:scrollbarDark justify-center">
      <div className="flex flex-col justify-center items-center bg-whiteColor dark:bg-secondaryColor  rounded-xl p-10 gap-2 h-full ">
        <div className="w-[60%] flex flex-col items-center gap-5 ">
          <p className="text-center dark:text-whiteColor text-secondaryColor">
            Select a chat on the right or Start a new conversation with anyone
          </p>

          <FaHandPointRight
            size={22}
            className="text-secondaryColor dark:text-whiteColor cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
export default ChatEmpty;
