"use client";

import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/components/ThemeProvider";

export default function ThemeToggle() {
  const {
    resolvedTheme,
    toggleTheme,
  } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      title={
        resolvedTheme === "dark"
          ? "Switch to light mode"
          : "Switch to dark mode"
      }
      className="
        relative
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-full
        border
        border-gray-200
        bg-white
        text-gray-700
        shadow-sm
        transition-all
        duration-200

        hover:bg-gray-100

        dark:border-gray-700
        dark:bg-gray-800
        dark:text-gray-200
        dark:hover:bg-gray-700
      "
    >
      {resolvedTheme === "dark" ? (
        <Sun size={19} />
      ) : (
        <Moon size={19} />
      )}
    </button>
  );
}