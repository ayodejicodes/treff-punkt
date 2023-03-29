import { FC, ReactNode, useState } from "react";
import { NavLink, NavLinkProps, matchPath, Link } from "react-router-dom";

interface MenuProps {
  to: string;
  menuText: string;
  activeIcon: ReactNode;
  InactiveIcon: ReactNode;
}

const MenuComponent: FC<MenuProps> = ({
  to,
  menuText,
  activeIcon,
  InactiveIcon,
}) => {
  const [activeMenu, setActiveMenu] = useState(false);

  let activeState =
    " bg-secondaryColor/[0.1] dark:bgWhiteColorLight relative flex items-center gap-3  hoverSecondaryColorLight dark:hoverWhiteColorLight pt-3 pb-3 pr-3 pl-6 rounded-xl mt-2.5 overflow-hidden";
  let inactiveState =
    "relative flex items-center gap-3  hoverSecondaryColorLight dark:hoverWhiteColorLight pt-3 pb-3 pr-3 pl-6 rounded-xl mt-2.5 overflow-hidden";

  console.log(activeMenu);
  return (
    <div>
      <div className=" w-full ">
        {/* Menu */}

        <NavLink
          to={to}
          className={({ isActive }) => {
            if (isActive) {
              setActiveMenu(true);
              return activeState;
            } else {
              setActiveMenu(false);
              return inactiveState;
            }
          }}
        >
          {/* Active Pointer */}
          {activeMenu ? (
            <div className="absolute left-[-9px] top-1 w-4 h-6 mt-2 mb-2 rounded-md bg-primaryColor"></div>
          ) : (
            <div className="absolute left-[-9px] top-1 w-4 h-6 mt-2 mb-2 rounded-md bg-secondaryColor/[0.15] dark:bg-whiteColor/[0.15]"></div>
          )}

          {/* Menu Details */}
          {activeMenu ? (
            <div className="flex items-center gap-3">
              {activeIcon}
              <h4 className="text-secondaryColor dark:text-whiteColor font-semibold">
                {menuText}
              </h4>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              {InactiveIcon}
              <h4 className="text-secondaryColor dark:text-whiteColor ">
                {menuText}
              </h4>
            </div>
          )}
        </NavLink>
      </div>
    </div>
  );
};
export default MenuComponent;

// "text-secondaryColor dark:text-whiteColor text-[14px]"
