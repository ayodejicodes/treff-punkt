import {
  BsChatRightQuoteFill,
  BsChatDots,
  BsBell,
  BsSun,
  BsMoon,
} from "react-icons/bs";
import { BiChevronDown } from "react-icons/bi";
import { RxMagnifyingGlass } from "react-icons/rx";
import { FaUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState, useEffect } from "react";

const NavBar = () => {
  const [theme, setTheme] = useState<string | null>(null);

  // Check for window prefered theme
  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme:dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  // Toggle Light'Dark Mode
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="container gap-36 flex justify-between h-[70px]  items-center bg-white  dark:bg-secondaryColor sticky top-0 z-10 ">
      {/* Left */}

      <div className="flex grow-[1] gap-3 items-center cursor-pointer mr-2 ">
        <BsChatRightQuoteFill size={28} className="text-primaryColor" />
        <h1 className="font-semibold text-lg text-secondaryColor whitespace-nowrap dark:text-whiteColor ">
          Treff Punkt
        </h1>
      </div>

      {/* Search Field */}
      <div className="hidden md:block grow-[3.5] w-full ">
        <div className="flex items-center bgSecondaryColorLight dark:bgWhiteColorLight gap-1 rounded-full ">
          <input
            type="text"
            name=""
            id=""
            placeholder="Search for friends..."
            className=" md:text-sm md:bg-transparent md:pr-4 md:pl-4 md:pt-1.5 md:pb-1.5 w-full focus:outline-none text-secondaryColor dark:text-whiteColor"
          />
          <RxMagnifyingGlass
            size={22}
            className="cursor-pointer text-secondaryColor dark:text-whiteColor mr-3"
          />
        </div>
      </div>

      {/* Right */}

      <div className=" flex gap-5 grow-[1] items-center justify-end">
        <div className="flex gap-5 ">
          {/* ---------Light/Dark ----------*/}

          {theme === "dark" ? (
            <BsSun
              size={24}
              className="cursor-pointer text-secondaryColor dark:text-whiteColor mr-3 "
              onClick={() => {
                setTheme("light");
              }}
            />
          ) : (
            <BsMoon
              size={22}
              className="cursor-pointer text-secondaryColor  "
              onClick={() => setTheme("dark")}
            />
          )}
          {/* ------------------------- */}
          <BsChatDots
            size={22}
            className="text-secondaryColor dark:text-whiteColor cursor-pointer"
          />
          <BsBell
            size={22}
            className="text-secondaryColor dark:text-whiteColor cursor-pointer"
          />
        </div>

        <div className="hidden md:flex bgSecondaryColorLight dark:bgWhiteColorLight rounded-full pt-2 pb-2 pl-3 pr-3 cursor-pointer">
          {/* <FaUserCircle
            size={22}
            className="text-secondaryColor dark:text-whiteColor"
          /> */}
          <div className=" relative w-7 h-7">
            <img
              src="../src/assets/ayo.jpg"
              alt=""
              className=" rounded-full object-cover"
            />
          </div>
          <BiChevronDown
            size={22}
            className="text-primaryColor dark:text-whiteColor"
          />
        </div>

        {/* Mobile Hamburger ------------------------*/}
        <div className=" md:hidden flex items-end">
          <div>
            <GiHamburgerMenu
              size={23}
              className="cursor-pointer text-secondaryColor dark:text-whiteColor md:hidden"
            />
          </div>

          {/* -------------------------- */}
        </div>
      </div>
    </div>
  );
};
export default NavBar;
