import { AiOutlinePaperClip } from "react-icons/ai";

import { MdVerified } from "react-icons/md";
import Dropzone from "react-dropzone";
import { BiPaperPlane } from "react-icons/bi";
import MyDropzone from "../Dropzone/MyDropzone";

const ChatsPage = () => {
  return (
    <div className="md:w-[50%] flex flex-col bgSecondaryColorLight dark:bgWhiteColorLight rounded-xl overflow-y-scroll pageViewportHeight scrollbar dark:scrollbarDark divide-y-[2px] divideSecondaryColorLight dark:divideWhiteColorLight">
      {/* Chat Header-------------------------------------------- */}
      <div className=" flex flex-col items-center pl-7 pr-7 pt-4 pb-2">
        {/* Image */}
        <div className="  w-8 h-8 mb-1">
          <img
            src="../src/assets/ayo.jpg"
            alt=""
            className=" rounded-full cursor-pointer"
          />
        </div>

        {/* Name, Last Seen */}

        <div>
          <div className="flex items-center gap-1">
            <small className="text-secondaryColor dark:text-whiteColor font-semibold">
              FirstName LastName
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
          Last Seen 30 mins ago
        </small>
      </div>

      {/* Messages and Chat Form */}
      <MyDropzone />
    </div>
  );
};
export default ChatsPage;

{
  /* <div className="flex-1 ">
<div className="flex flex-col h-[calc(75.2vh)] divide-y-[2px] divideSecondaryColorLight dark:divideWhiteColorLight">
  Chat Messages------------------------------------------
  <div className="flex-1  pl-7 pr-7 ">Messages</div>

  Chat Form------------------------------------------
  <div className=" pl-7 pr-7 pt-3 pb-3 ">
    <div className="flex items-center bgSecondaryColorLight dark:bgWhiteColorLight gap-1 rounded-full ">
      <input
        type="text"
        name=""
        id=""
        placeholder="Start a Conversation"
        className=" md:inputStyle bg-transparent w-full focus:outline-none text-secondaryColor dark:text-whiteColor"
      />

      <div className="flex gap-1.5 items-center justify-center pl-3 pr-3">
        <div>
          <AiOutlinePaperClip
            size={18}
            className="cursor-pointer text-secondaryColor dark:text-whiteColorcursor-pointer  dark:text-whiteColor"
          />
        </div>

        <div>
          <BiPaperPlane
            size={18}
            className="cursor-pointer text-secondaryColor dark:text-whiteColorcursor-pointer  dark:text-whiteColor"
          />
        </div>
      </div>
    </div>
  </div>
</div>
</div> */
}
