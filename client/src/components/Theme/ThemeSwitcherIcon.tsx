import { BsMoonFill, BsSunFill } from "react-icons/bs";
import useTheme from "../../hooks/useTheme";

interface Theme {
  size: number;
}

const ThemeSwitcherIcon = ({ size }: Theme) => {
  const { isDarkMode, onSwitchClick, sunRef, moonRef } = useTheme();

  return (
    <div
      className={`flex justify-center items-center text-center ${
        isDarkMode ? "bg-whiteColor " : "bg-secondaryColor"
      } p-[5px] rounded-lg`}
      onClick={onSwitchClick}
    >
      <div className="hidden " ref={sunRef}>
        <BsSunFill
          size={size}
          className={` ${
            isDarkMode && "dark:text-secondaryColor "
          }cursor-pointer`}
        />
      </div>

      <div className="hidden " ref={moonRef}>
        <BsMoonFill
          size={size}
          className={` ${!isDarkMode && "text-whiteColor "}cursor-pointer`}
        />
      </div>
    </div>
  );
};
export default ThemeSwitcherIcon;
