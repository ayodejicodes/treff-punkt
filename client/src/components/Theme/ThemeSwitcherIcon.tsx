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
      } p-[5px] rounded-lg cursor-pointer`}
      onClick={onSwitchClick}
    >
      <div className="hidden " ref={sunRef}>
        <BsMoonFill size={size} className="text-whiteColor" />
      </div>

      <div className="hidden " ref={moonRef}>
        <BsSunFill size={size} className="text-secondaryColor" />
      </div>
    </div>
  );
};
export default ThemeSwitcherIcon;
