import SideChat from "../SideChat";
import SuggestedFriend from "../SuggestedFriend";
import { RxMagnifyingGlass } from "react-icons/rx";
import InputText from "../InputText";
import AiSideChat from "../AiSideChat";

const RightSideBar = () => {
  return (
    <div className="hidden lg:flex flex-col gap-5 p-7  bgSecondaryColorLight dark:bgWhiteColorLight rounded-xl  overflow-y-scroll  pageViewportHeight scrollbar dark:scrollbarDark absolute right-0 w-[24%] top-[10vh] mt-2">
      {/* Suggestions */}
      {/* <div className=" flex flex-col bg-whiteColor dark:bg-secondaryColor border border-secondaryColor/[10%] dark:border-blackColor/[10%] gap-3 rounded-xl p-4"> */}
      {/* <h3 className="font-semibold text-secondaryColor dark:text-whiteColor text-[15px] ">
          Suggestions
        </h3> */}
      {/* <SuggestedFriend /> */}
      {/* <SuggestedFriend /> */}
      {/* <SuggestedFriend /> */}
      {/* </div> */}

      {/* Chat with Ai */}
      <div className=" flex flex-col bg-whiteColor dark:bg-secondaryColor border border-secondaryColor/[10%] dark:border-blackColor/[10%] gap-3 rounded-xl p-4 ">
        <h3 className="font-semibold text-secondaryColor dark:text-whiteColor text-[15px] ">
          Chat with Ai
        </h3>
        <AiSideChat />
      </div>

      {/* Chats */}
      <div className=" flex flex-col bg-whiteColor dark:bg-secondaryColor border border-secondaryColor/[10%] dark:border-blackColor/[10%] gap-3 rounded-xl p-4 ">
        <h3 className="font-semibold text-secondaryColor dark:text-whiteColor text-[15px] ">
          Chat with Friends
        </h3>
        <div className="border-b-2  w-full borderSecondaryColorLight dark:borderWhiteColorLight"></div>

        {/* Search Chats */}
        {/* <InputText
          placeholder="Search Chats..."
          icon={<RxMagnifyingGlass size={20} className="inputIconStyle" />}
        /> */}
        <SideChat />
      </div>
    </div>
  );
};
export default RightSideBar;
