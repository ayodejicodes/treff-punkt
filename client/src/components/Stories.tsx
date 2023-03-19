import StoryCard from "./StoryCard";
import { FiPlusSquare } from "react-icons/fi";

const Stories = () => {
  return (
    <div className="flex bg-whiteColor dark:bg-secondaryColor border border-secondaryColor/[0%] dark:border-blackColor/[10%] rounded-xl p-10 gap-4 z-0 overflow-hidden">
      {/* Authenticated User Story */}
      <div className=" w-[6em] h-40 bgSecondaryColorLight dark:bgWhiteColorLight rounded-lg cursor-pointer">
        <div className="flex items-center justify-center w-[6em] h-40 rounded-lg ">
          {/* +sign and create story */}
          <div className="flex flex-col items-center gap-3">
            <FiPlusSquare
              size={20}
              className="text-secondaryColor dark:text-whiteColor "
            />
            <small className="text-secondaryColor dark:text-whiteColor text-[12px]">
              Create Story
            </small>
            {/* --------------------------- */}
          </div>
        </div>
      </div>

      {/* Friends Stories */}
      <StoryCard image={"nature1"} />
      <StoryCard image={"nature2"} />
      <StoryCard image={"nature3"} />
      <StoryCard image={"nature4"} />
      <StoryCard image={"nature5"} />
      <StoryCard image={"nature6"} />
    </div>
  );
};
export default Stories;
