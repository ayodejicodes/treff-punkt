import { useState, useEffect } from "react";

const useTheme = () => {
  const [theme, setTheme] = useState<string>("");

  // Check for window prefered theme
  useEffect(() => {
    // Checks if theme is already set in localstorage
    const preferredLocalStorageTheme = localStorage.getItem("theme");
    // -------------------------------------

    // Add a class to the body to indicate that the theme is loading
    document.body.classList.add("loading");

    if (preferredLocalStorageTheme) {
      setTheme(preferredLocalStorageTheme);
    } else if (window.matchMedia("(prefers-color-scheme:dark)").matches) {
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  // Toggle Light/Dark Mode
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }

    // Remove the loading class to apply the preferred theme
    document.body.classList.remove("loading");
  }, [theme]);

  return { theme, setTheme };
};
export default useTheme;
