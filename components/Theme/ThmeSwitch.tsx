"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";

export const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const ChangeTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex justify-end cursor-pointer">
      {theme === "light" ? (
        <div className="flex mr-6">
          <Image
            src="/night_black.svg"
            alt="night_black"
            width={32}
            height={32}
            onClick={ChangeTheme}
            className="transition-transform duration-300 ease-in-out transform hover:scale-110"
          />
        </div>
      ) : (
        <div className="flex mr-6">
          <Image
            src="/sun_white.svg"
            alt="sun_white"
            width={32}
            height={32}
            onClick={ChangeTheme}
            className="transition-transform duration-300 ease-in-out transform hover:scale-110"
          />
        </div>
      )}
    </div>
  );
};
