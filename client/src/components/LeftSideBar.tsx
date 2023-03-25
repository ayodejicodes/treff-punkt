import { AiOutlineHome, AiTwotoneHome } from "react-icons/ai";
import { BsChatLeftText, BsChatLeftTextFill } from "react-icons/bs";
import { FaRegUser, FaUser } from "react-icons/fa";
import { HiOutlineUsers, HiUsers } from "react-icons/hi";
import MenuComponent from "./MenuComponent";
import ShortProfile from "./ShortProfile";

// Menu Links

const NavIconStyle = "cursor-pointer text-secondaryColor dark:text-whiteColor ";

const navLinks = [
  {
    to: "/home",
    menuText: "Home",
    activeIcon: <AiTwotoneHome size={18} className={NavIconStyle} />,
    InactiveIcon: <AiOutlineHome size={18} className={NavIconStyle} />,
  },
  {
    to: "/profile",
    menuText: "Profile",
    activeIcon: <FaUser size={18} className={NavIconStyle} />,
    InactiveIcon: <FaRegUser size={18} className={NavIconStyle} />,
  },
  {
    to: "/friends",
    menuText: "Friends",
    activeIcon: <HiUsers size={18} className={NavIconStyle} />,
    InactiveIcon: <HiOutlineUsers size={18} className={NavIconStyle} />,
  },
  {
    to: "/chats",
    menuText: "Chats",
    activeIcon: <BsChatLeftTextFill size={18} className={NavIconStyle} />,
    InactiveIcon: <BsChatLeftText size={18} className={NavIconStyle} />,
  },
];

const LeftSideBar = () => {
  return (
    <div className="hidden  md:flex flex-col gap-5 p-7  bgSecondaryColorLight dark:bgWhiteColorLight rounded-xl  overflow-y-scroll  pageViewportHeight scrollbar dark:scrollbarDark absolute left-0 w-[24%] top-[10vh] mt-2">
      {/* Short-Profile */}
      <div className=" flex flex-col bg-whiteColor dark:bg-secondaryColor gap-3 rounded-xl p-4">
        <h3 className="font-semibold text-secondaryColor dark:text-whiteColor text-[16px] ">
          Welcome, FirstName
        </h3>
        {/* Line Break */}
        <hr className="border-t-1  w-full  border borderSecondaryColorLight dark:borderWhiteColorLight "></hr>

        <ShortProfile />
      </div>

      {/* Navigation */}
      <div className=" flex flex-col bg-whiteColor dark:bg-secondaryColor  dark:border-blackColor/[10%] gap-3 rounded-xl p-4">
        {navLinks.map((link, index) => (
          <MenuComponent
            to={link.to}
            menuText={link.menuText}
            activeIcon={link.activeIcon}
            InactiveIcon={link.InactiveIcon}
            key={index}
          />
        ))}
      </div>

      {/* Copyright */}
      <div className="mt-4">
        <small className="text-secondaryColor dark:text-whiteColor text-[11px] flex flex-col text-center opacity-75">
          &copy;
          {` ${new Date().getFullYear()}`} | Designed and Developed by
          <span className="font-semibold"> Ayodeji Fabusiwa</span>
        </small>
      </div>
    </div>
  );
};
export default LeftSideBar;
