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

  console.log(theme);

  return (
    <div className=" flex justify-between h-[70px]  items-center mr-2 ml-2  gap-8 dark:bg-secondaryColor">
      {/* Left */}

      <div className="flex grow-[1] gap-3 items-center cursor-pointer">
        <BsChatRightQuoteFill size={28} className="text-primaryColor" />
        <h1 className="font-semibold text-lg text-secondaryColor md:whitespace-nowrap dark:text-whiteColor">
          Treff Punkt
        </h1>
      </div>

      {/* Search Field */}
      <div className="hidden md:block grow-[5] w-full ">
        <div className="flex items-center bg-secondaryColor/[0.08] dark:bg-whiteColor/[0.08] gap-1 rounded-full">
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

      {/* Light/Dark */}
      <div>
        {theme === "dark" ? (
          <BsSun
            size={22}
            className="cursor-pointer text-secondaryColor dark:text-whiteColor mr-3 "
            onClick={() => {
              setTheme("light");
            }}
          />
        ) : (
          <BsMoon
            size={22}
            className="cursor-pointer text-secondaryColor  mr-3 "
            onClick={() => setTheme("dark")}
          />
        )}
      </div>
      {/* Mobile Hamburger ------------------------*/}
      <div className="  flex items-end">
        <div>
          <GiHamburgerMenu
            size={23}
            className="cursor-pointer text-secondaryColor dark:text-whiteColor md:hidden"
          />
        </div>

        {/* -------------------------- */}

        <div className="hidden md:flex gap-5 grow-[1] items-center">
          <BsChatDots
            size={22}
            className="text-secondaryColor dark:text-whiteColor cursor-pointer"
          />
          <BsBell
            size={22}
            className="text-secondaryColor dark:text-whiteColor cursor-pointer"
          />

          <div className="flex bg-secondaryColor/[0.08] dark:bg-whiteColor/[0.08] rounded-full p-2 cursor-pointer">
            <FaUserCircle
              size={22}
              className="text-secondaryColor dark:text-whiteColor"
            />
            <BiChevronDown
              size={22}
              className="text-primaryColor dark:text-whiteColor"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default NavBar;
