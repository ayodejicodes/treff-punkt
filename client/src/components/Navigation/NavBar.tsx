import { BsChatRightQuoteFill, BsChatDots, BsBell } from "react-icons/bs";
import { BiChevronDown } from "react-icons/bi";
import { RxMagnifyingGlass } from "react-icons/rx";
import { GiHamburgerMenu } from "react-icons/gi";
import InputText from "../Reusables/InputText";
import NotificationIcon from "../Notifications/NotificationIcon";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { AppDispatch } from "../../app/store";
import { User, logout, reset, setKeyword } from "../../features/auth/authSlice";
import ThemeSwitcherIcon from "../Theme/ThemeSwitcherIcon";
import { toast } from "react-toastify";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import axios from "axios";

const NavBar = () => {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [mobileprofileDropdownOpen, setMobileProfileDropdownOpen] =
    useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const dropDownRefMobile = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const { user, keyword } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const [searchInputParams, setSearchInputParams] = useSearchParams();
  // const keyword = searchInputParams?.get("search");

  // Handles Outside box Click---------------------------------------

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropDownRef.current &&
      !dropDownRef.current.contains(e.target as Node)
    ) {
      setProfileDropdownOpen(false);
    }
  };

  const handleClickOutsideMobile = (e: MouseEvent) => {
    if (
      dropDownRefMobile.current &&
      !dropDownRefMobile.current.contains(e.target as Node)
    ) {
      setMobileProfileDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("mousedown", handleClickOutsideMobile);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("mousedown", handleClickOutsideMobile);
    };
  }, [dropDownRef, dropDownRefMobile]);

  // ----------------------------------------------------------------------
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInputParams({ search: e.target.value });
    dispatch(setKeyword(searchInputParams?.get("search")));
  };

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    dispatch(logout());
    dispatch(reset());
    navigate("/");

    toast.success("Logged Out");
  };

  return (
    <div>
      <div className="container containerPadding  md:gap-36 flex justify-between h-[10vh]  items-center bg-white  dark:bg-secondaryColor sticky top-0  overflow-hidden ">
        {/* Left */}

        <div
          className=" relative flex grow-[1] gap-3 items-center cursor-pointer ml-3 mr-2 "
          onClick={() => {
            user ? navigate("/") : navigate("/login");
          }}
        >
          {/* <BsChatRightQuoteFill size={28} className="text-primaryColor" /> */}

          <div className="w-7 h-7">
            <img
              src="https://res.cloudinary.com/dpcdcpyln/image/upload/v1682116122/treffPunkt/m050nnak0ahappfndx6r.png"
              alt=""
            />
          </div>
          <h1 className="font-semibold text-lg text-secondaryColor whitespace-nowrap dark:text-whiteColor ">
            Treff Punkt
          </h1>
        </div>

        {/* Search Field */}
        <div className="relative hidden lg:block grow-[3.5] w-full ">
          {/* <InputText
            placeholder="Search for friends..."
            icon={<RxMagnifyingGlass size={20} className="inputIconStyle" />} 
          /> */}

          <div className="flex items-center bgSecondaryColorLight dark:bgWhiteColorLight gap-1 rounded-full ">
            <input
              type="text"
              name=""
              id=""
              placeholder="Search for friends..."
              className=" md:inputStyle bg-transparent w-full focus:outline-none text-secondaryColor dark:text-whiteColor"
              onChange={handleChange}
            />
            <RxMagnifyingGlass size={20} className="inputIconStyle" />
          </div>
        </div>

        {/* Right */}

        <div className=" flex gap-5 grow-[1] items-center justify-end">
          <div className="flex gap-5 ">
            {/* ---------Light/Dark --------------------------------------------*/}

            <div className="flex items-center justify-center">
              <ThemeSwitcherIcon size={16} />
            </div>

            {/* ----------------------------------------------------------------------- */}

            <div className="relative flex items-center justify-center">
              <BsChatDots
                size={22}
                className=" text-secondaryColor dark:text-whiteColor cursor-pointer "
                onClick={() => navigate("/chats")}
              />
              {/* <div className="absolute right-[-5px] top-[-2px]">
                <NotificationIcon />
              </div> */}
            </div>
            {/* <div className="relative flex items-center justify-center">
              <BsBell
                size={22}
                className="text-secondaryColor dark:text-whiteColor cursor-pointer"
              />
              <div className="absolute right-[-2px] top-[-2px]">
                <NotificationIcon />
              </div>
            </div> */}
          </div>

          <div
            className="hidden lg:flex bgSecondaryColorLight dark:bgWhiteColorLight rounded-full pt-2 pb-2 pl-3 pr-3 cursor-pointer"
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
          >
            <div className=" relative w-7 h-7">
              <ProfilePicture />
            </div>
            <BiChevronDown
              size={22}
              className="text-primaryColor dark:text-whiteColor"
            />
          </div>

          {/* Mobile Hamburger ------------------------*/}
          <div
            className=" lg:hidden flex items-end"
            onClick={() =>
              setMobileProfileDropdownOpen(!mobileprofileDropdownOpen)
            }
          >
            <div>
              <GiHamburgerMenu
                size={23}
                className="cursor-pointer text-secondaryColor dark:text-whiteColor "
              />
            </div>
          </div>
        </div>
      </div>

      {/* Profile Dropdown */}
      {profileDropdownOpen ? (
        <div
          className="absolute top-9 right-9 w-[10em]  mt-8 z-40 "
          ref={dropDownRef}
        >
          <div className="absolute top-[-3px] right-[6px] w-2.5 h-2.5 gap-3 rounded-sm bg-secondaryColor text-whiteColor dark:bg-white rotate-45"></div>
          <div className="flex flex-col p-4 gap-5 rounded-lg bg-secondaryColor text-whiteColor dark:bg-white">
            <Link
              to={"/profile"}
              className=" dark:text-secondaryColor text-whiteColor hoverWhiteColorLight dark:hoverSecondaryColorLight pl-2 pr-2 cursor-pointer text-sm "
              onClick={() => setProfileDropdownOpen(false)}
            >
              <small className="text-sm">Profile</small>
            </Link>
            <button className="btnPrimary" onClick={handleLogout}>
              Log Out
            </button>
          </div>
        </div>
      ) : null}

      {/* --------Mobile dropdown------------------ */}
      {mobileprofileDropdownOpen && (
        <div
          className="absolute lg:hidden top-[10vh] right-0 w-[60%] md:w-[50%]  mr-4 p-4 flex flex-col gap-3 rounded lg items-center bg-secondaryColor text-whiteColor dark:bg-white z-50 "
          ref={dropDownRefMobile}
        >
          <div className="  w-7 h-7">
            <ProfilePicture />
          </div>
          <small className="text-sm dark:text-secondaryColor text-whiteColor">
            Welcome, <span className="font-semibold">{user?.firstName}</span>
          </small>
          <Link
            to="/"
            className=" dark:text-secondaryColor text-whiteColor hoverWhiteColorLight dark:hoverSecondaryColorLight pl-2 pr-2 cursor-pointer text-sm "
            onClick={() => setMobileProfileDropdownOpen(false)}
          >
            <small className="text-sm ">Home</small>
          </Link>
          <Link
            to="/profile"
            className=" dark:text-secondaryColor text-whiteColor hoverWhiteColorLight dark:hoverSecondaryColorLight pl-2 pr-2 cursor-pointer text-sm "
            onClick={() => setMobileProfileDropdownOpen(false)}
          >
            <small className="text-sm ">Profile</small>
          </Link>
          <Link
            to="/chats"
            className=" dark:text-secondaryColor text-whiteColor hoverWhiteColorLight dark:hoverSecondaryColorLight pl-2 pr-2 cursor-pointer text-sm "
            onClick={() => setMobileProfileDropdownOpen(false)}
          >
            <small className="text-sm">Chats</small>
          </Link>
          <Link to="/profile">
            <button className="btnPrimary text-[12px]" onClick={handleLogout}>
              Log Out
            </button>
          </Link>
        </div>
      )}

      {/* <div className="md:hidden">Hey sm</div>
      <div className="lg:hidden">Hey md</div>
      <div className="xl:hidden">Hey lg</div>
      <div className="2xl:hidden"> Hey xl</div> */}
      {/* <div>Hey 2xl</div> */}
    </div>
  );
};
export default NavBar;
