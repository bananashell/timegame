"use client";

import { Computer } from "@/icons/Computer";
import { DarkMode } from "@/icons/DarkMode";
import { LightMode } from "@/icons/LightMode";
import { useEffect, useState } from "react";

const updateClassName = (): "dark" | "light" | "system" => {
  if (typeof global.localStorage === "undefined") return "system";

  if (
    global.localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
    return "dark";
  }
  document.documentElement.classList.remove("dark");
  return "light";
};

export const ThemeSwitcher = () => {
  const [theme, setTheme] = useState<"dark" | "light" | "system">(
    updateClassName(),
  );

  useEffect(() => {
    if (theme === "system") {
      // Whenever the user explicitly chooses to respect the OS preference
      localStorage.removeItem("theme");
    } else {
      localStorage.theme = theme;
    }

    updateClassName();
  }, [theme]);

  const handleClick = () => {
    if (theme === "dark") {
      setTheme("light");
      return;
    }

    setTheme("dark");
  };

  return (
    <button
      className="absolute top-0 right-0 mt-1 mr-1 text-gray-800 dark:text-white z-10 p-2 dark:bg-gray-800 bg-gray-100 rounded-full"
      onClick={handleClick}
    >
      {theme == "dark" && <DarkMode />}
      {theme == "light" && <LightMode />}
      {theme == "system" && <Computer />}
    </button>
  );
};
