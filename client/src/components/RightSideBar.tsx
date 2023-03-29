import SideChat from "./SideChat";
import SuggestedFriend from "./SuggestedFriend";
import { RxMagnifyingGlass } from "react-icons/rx";
import InputText from "./InputText";

const RightSideBar = () => {
  return (
    <div className="hidden  md:flex flex-col gap-5 p-7  bgSecondaryColorLight dark:bgWhiteColorLight rounded-xl  overflow-y-scroll  pageViewportHeight scrollbar dark:scrollbarDark absolute right-0 w-[24%] top-[10vh] mt-2">
      {/* Suggestions */}
      <div className=" flex flex-col bg-whiteColor dark:bg-secondaryColor border border-secondaryColor/[10%] dark:border-blackColor/[10%] gap-3 rounded-xl p-4">
        <h3 className="font-semibold text-secondaryColor dark:text-whiteColor text-[15px] ">
          Suggestions
        </h3>
        <SuggestedFriend />
        {/* <SuggestedFriend /> */}
        {/* <SuggestedFriend /> */}
      </div>

      {/* Chats */}
      <div className=" flex flex-col bg-whiteColor dark:bg-secondaryColor border border-secondaryColor/[10%] dark:border-blackColor/[10%] gap-3 rounded-xl p-4">
        <h3 className="font-semibold text-secondaryColor dark:text-whiteColor text-[15px] ">
          Chats
        </h3>

        {/* Search Chats */}
        <InputText
          placeholder="Search Chats..."
          icon={<RxMagnifyingGlass size={20} className="inputIconStyle" />}
        />
        <SideChat />
      </div>
    </div>
  );
};
export default RightSideBar;
