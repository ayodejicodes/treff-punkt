import {
  BsChatRightQuoteFill,
  BsChatDots,
  BsBell,
  BsSun,
  BsMoon,
} from "react-icons/bs";
import { BiChevronDown } from "react-icons/bi";
import { RxMagnifyingGlass } from "react-icons/rx";
import { GiHamburgerMenu } from "react-icons/gi";
import InputText from "./InputText";
import NotificationIcon from "./Notifications/NotificationIcon";
import { useNavigate } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import { useState } from "react";

const NavBar = () => {
  const { theme, setTheme } = useTheme();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="container containerPadding gap-36 flex justify-between h-[10vh]  items-center bg-white  dark:bg-secondaryColor sticky top-0 z-10 overflow-hidden ">
      {/* Left */}

      <div className="flex grow-[1] gap-3 items-center cursor-pointer ml-3 mr-2 ">
        <BsChatRightQuoteFill size={28} className="text-primaryColor" />
        <h1
          className="font-semibold text-lg text-secondaryColor whitespace-nowrap dark:text-whiteColor "
          onClick={() => navigate("/")}
        >
          Treff Punkt
        </h1>
      </div>

      {/* Search Field */}
      <div className="hidden md:block grow-[3.5] w-full ">
        <InputText
          placeholder="Search for friends..."
          icon={<RxMagnifyingGlass size={20} className="inputIconStyle" />}
        />
      </div>

      {/* Right */}

      <div className=" flex gap-5 grow-[1] items-center justify-end m-3">
        <div className="flex gap-5 ">
          {/* ---------Light/Dark ----------*/}

          {theme === "dark" ? (
            <BsSun
              size={24}
              className="cursor-pointer text-secondaryColor dark:text-whiteColor "
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

          <div className="relative">
            <BsChatDots
              size={22}
              className="text-secondaryColor dark:text-whiteColor cursor-pointer"
            />
            <div className="absolute right-[-5px] top-[-4px]">
              <NotificationIcon />
            </div>
          </div>
          <div className="relative">
            <BsBell
              size={22}
              className="text-secondaryColor dark:text-whiteColor cursor-pointer"
            />
            <div className="absolute right-[-2px] top-[-4px]">
              <NotificationIcon />
            </div>
          </div>
        </div>

        <div
          className="hidden md:flex bgSecondaryColorLight dark:bgWhiteColorLight rounded-full pt-2 pb-2 pl-3 pr-3 cursor-pointer z-10 "
          onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
        >
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

        {/* Profile Dropdown */}
        {profileDropdownOpen ? (
          <div className="absolute top-7 right-4 w-[10em] mt-8 ">
            {/* <div className="absolute top-[-3px] right-[6px] w-2.5 h-2.5 gap-3 rounded-sm bg-secondaryColor text-whiteColor dark:bg-white rotate-45"></div> */}
            <div className="flex flex-col p-4 gap-5 rounded-lg bg-secondaryColor text-whiteColor dark:bg-white">
              <small className=" dark:text-secondaryColor text-whiteColor hoverWhiteColorLight dark:hoverSecondaryColorLight pl-2 pr-2 cursor-pointer text-sm">
                Profile
              </small>
              <button className="btnPrimary">Log Out</button>
            </div>
          </div>
        ) : null}

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
