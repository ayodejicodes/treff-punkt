import { useState, useEffect } from "react";

const useTheme = () => {
  const [theme, setTheme] = useState<string | null>(null);

  // Check for window prefered theme
  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme:dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  // Toggle Light'Dark Mode
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return { theme, setTheme };
};
export default useTheme;
