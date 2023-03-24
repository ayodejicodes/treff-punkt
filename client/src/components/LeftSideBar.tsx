import { AiTwotoneHome } from "react-icons/ai";
import { FaRegUser, FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import MenuComponent from "./MenuComponent";
import ShortProfile from "./ShortProfile";

// Menu Links

const NavIconStyle = "cursor-pointer text-secondaryColor dark:text-whiteColor ";

const navLinks = [
  {
    to: "/home",
    menuText: "Home",
    activeIcon: <AiTwotoneHome size={18} className={NavIconStyle} />,
    InactiveIcon: <AiTwotoneHome size={18} className={NavIconStyle} />,
  },
  {
    to: "/profile",
    menuText: "Profile",
    activeIcon: <FaUser size={18} className={NavIconStyle} />,
    InactiveIcon: <FaRegUser size={18} className={NavIconStyle} />,
  },
];

const LeftSideBar = () => {
  let activeMenuClassName = "text-red-500";
  return (
    <div className="hidden  md:flex flex-col gap-5 p-7 w-3/12 bgSecondaryColorLight dark:bgWhiteColorLight rounded-xl  overflow-y-scroll  pageViewportHeight scrollbar dark:scrollbarDark ">
      {/* Short-Profile */}
      <div className=" flex flex-col bg-whiteColor dark:bg-secondaryColor border border-secondaryColor/[10%] dark:border-blackColor/[10%] gap-3 rounded-xl p-4">
        <h3 className="font-semibold text-secondaryColor dark:text-whiteColor text-[16px] ">
          Welcome, FirstName
        </h3>
        <ShortProfile />
      </div>

      {/* Navigation */}
      <div className=" flex flex-col bg-whiteColor dark:bg-secondaryColor border border-secondaryColor/[10%] dark:border-blackColor/[10%] gap-3 rounded-xl p-4">
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
    </div>
  );
};
export default LeftSideBar;

// {/* Copyright */}
// <div className="flexjustify-center">
// <small className="text-secondaryColor dark:text-whiteColor text-[11px] text-center opacity-75">
//   &copy;
//   {` ${new Date().getFullYear()}`} | Designed and Developed by
//   <span className="font-semibold"> Ayodeji Fabusiwa</span>
// </small>
// </div>
