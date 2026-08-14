"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);

  const [resolvedTheme, setResolvedTheme] = useState<
    "light" | "dark"
  >("light");

  /* =========================================
     Load saved theme
  ========================================= */

  useEffect(() => {
    const savedTheme = localStorage.getItem(
      "mhob-theme"
    ) as Theme | null;

    if (
      savedTheme === "light" ||
      savedTheme === "dark" ||
      savedTheme === "system"
    ) {
      setThemeState(savedTheme);
    }
  }, []);

  /* =========================================
     Apply theme
  ========================================= */

  useEffect(() => {
    const root = document.documentElement;

    const applyTheme = () => {
      let currentTheme: "light" | "dark";

      if (theme === "system") {
        currentTheme = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches
          ? "dark"
          : "light";
      } else {
        currentTheme = theme;
      }

      /* Remove previous theme */
      root.classList.remove("light", "dark");

      /* Add current theme */
      root.classList.add(currentTheme);

      /* Browser color scheme */
      root.style.colorScheme = currentTheme;

      /* Update state */
      setResolvedTheme(currentTheme);
    };

    applyTheme();

    /* =========================================
       Listen for system theme changes
    ========================================= */

    if (theme === "system") {
      const mediaQuery = window.matchMedia(
        "(prefers-color-scheme: dark)"
      );

      const handleChange = () => {
        applyTheme();
      };

      mediaQuery.addEventListener(
        "change",
        handleChange
      );

      return () => {
        mediaQuery.removeEventListener(
          "change",
          handleChange
        );
      };
    }
  }, [theme]);

  /* =========================================
     Set theme
  ========================================= */

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);

    localStorage.setItem(
      "mhob-theme",
      newTheme
    );
  };

  /* =========================================
     Toggle theme
  ========================================= */

  const toggleTheme = () => {
    setTheme(
      resolvedTheme === "dark"
        ? "light"
        : "dark"
    );
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        resolvedTheme,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

/* =========================================
   useTheme Hook
========================================= */

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used inside ThemeProvider"
    );
  }

  return context;
}