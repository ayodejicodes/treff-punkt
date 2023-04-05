import { useEffect, useRef, useState } from "react";

const useTheme = () => {
  const sunRef = useRef<HTMLInputElement>(null);
  const moonRef = useRef<HTMLInputElement>(null);
  const [isDarkMode, setIsDarkMode] = useState<Boolean>(false);

  useEffect(() => {
    if (
      localStorage.getItem("color-theme") === "dark" ||
      (!("color-theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      sunRef.current?.classList.remove("hidden");
      setIsDarkMode(true);
    } else {
      moonRef.current?.classList.remove("hidden");
      setIsDarkMode(false);
    }
  }, []);

  //   useEffect(() => {
  //     localStorage.getItem("color-theme");
  //   }, []);

  useEffect;

  const onSwitchClick = () => {
    // toggle icons inside button
    sunRef.current?.classList.toggle("hidden");
    moonRef.current?.classList.toggle("hidden");
    document.documentElement.classList.toggle("dark");

    // if set via local storage previously
    if (localStorage.getItem("color-theme")) {
      if (localStorage.getItem("color-theme") === "dark") {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("color-theme", "light");
        setIsDarkMode(false);
      } else {
        document.documentElement.classList.add("dark");
        localStorage.setItem("color-theme", "dark");
        setIsDarkMode(true);
      }

      // if NOT set via local storage previously
    } else {
      if (document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("color-theme", "light");
        setIsDarkMode(false);
      } else {
        document.documentElement.classList.add("dark");
        localStorage.setItem("color-theme", "dark");
        setIsDarkMode(true);
      }
    }
  };

  return { isDarkMode, onSwitchClick, sunRef, moonRef };
};
export default useTheme;
