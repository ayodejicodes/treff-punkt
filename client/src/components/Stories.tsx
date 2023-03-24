import StoryCard from "./StoryCard";
import { FiPlusSquare } from "react-icons/fi";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

// const images = [
//   "nature1",
//   "nature2",
//   "nature3",
//   "nature4",
//   "nature5",
//   "nature6",
// ];

const Stories = () => {
  const [width, setWidth] = useState(0);
  const carousel = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (carousel?.current) {
      setWidth(
        carousel.current.scrollWidth - carousel.current.offsetWidth + 40
      );
    }
  }, []);

  return (
    <motion.div
      ref={carousel}
      className="bg-whiteColor dark:bg-secondaryColor componentsBorder componentsBorder rounded-xl overflow-x-clip p-10 "
      whileTap={{ cursor: "grabbing" }}
    >
      <motion.div
        drag="x"
        dragConstraints={{ right: 0, left: -width }}
        className=" flex  gap-[1.88rem] z-0 "
      >
        {/* Authenticated User Story */}
        <div className=" w-[7.5em] h-40 bgSecondaryColorLight dark:bgWhiteColorLight rounded-lg cursor-pointer ">
          <div className="flex items-center justify-center w-[7.5em] h-40 rounded-lg ">
            {/* +sign and create story */}
            <div className="relative flex flex-col items-center gap-3">
              <FiPlusSquare
                size={20}
                className="text-primaryColor dark:text-whiteColor "
              />

              <small className="text-secondaryColor dark:text-whiteColor text-[11px]">
                Create Story
              </small>

              <input
                type="file"
                name=""
                id=""
                title=""
                style={{ width: "7.5em", height: "10rem" }}
                className="opacity-0 absolute top-[-3.5em] left-[-1.5em] cursor-pointer"
              />

              {/* --------------------------- */}
            </div>
          </div>
        </div>

        {/* Friends Stories, also sort it by time */}
        <StoryCard image={"nature1"} />
        <StoryCard image={"nature2"} />
        <StoryCard image={"nature3"} />
        <StoryCard image={"nature4"} />
        <StoryCard image={"nature5"} />
        <StoryCard image={"nature6"} />
        <StoryCard image={"nature7"} />
        <StoryCard image={"nature8"} />
        <StoryCard image={"nature9"} />
        <StoryCard image={"nature10"} />
      </motion.div>
    </motion.div>
  );
};
export default Stories;
