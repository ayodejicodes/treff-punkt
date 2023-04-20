import { useEffect, useRef, useState } from "react";

const useTheme = () => {
  const sunRef = useRef<HTMLInputElement>(null);
  const moonRef = useRef<HTMLInputElement>(null);

  const [isDarkMode, setIsDarkMode] = useState<Boolean>(
    localStorage.getItem("color-theme") === "dark" ||
      (!("color-theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  const onSwitchClick = () => {
    // toggle icons inside button
    sunRef.current?.classList.toggle("hidden");
    moonRef.current?.classList.toggle("hidden");
    document.documentElement.classList.toggle("dark");

    // update localStorage and isDarkMode state
    if (isDarkMode) {
      localStorage.setItem("color-theme", "light");
      setIsDarkMode(false);
    } else {
      localStorage.setItem("color-theme", "dark");
      setIsDarkMode(true);
    }
  };

  useEffect(() => {
    // set the class and icon based on the isDarkMode state
    if (isDarkMode) {
      sunRef.current?.classList.add("hidden");
      moonRef.current?.classList.remove("hidden");
      document.documentElement.classList.add("dark");
    } else {
      moonRef.current?.classList.add("hidden");
      sunRef.current?.classList.remove("hidden");
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return { isDarkMode, onSwitchClick, sunRef, moonRef };
};

export default useTheme;
