/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext(undefined);

// Helper functions moved to module scope so they are stable for hooks
const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : null;
};

const getLuminance = (hex) => {
  const rgb = hexToRgb(hex);
  const [r, g, b] = rgb.map((c) => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [accentColor, setAccentColor] = useState("#10b981"); // Default eco-green

  useEffect(() => {
    // Load theme and accent color from localStorage on mount
    const storedTheme = localStorage.getItem("verdigo_theme");
    if (storedTheme) {
      setTheme(storedTheme);
    }
    const storedAccent = localStorage.getItem("verdigo_accent");
    if (storedAccent) {
      setAccentColor(storedAccent);
    }
  }, []);

  useEffect(() => {
    // Apply theme to document
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    // Save to localStorage
    localStorage.setItem("verdigo_theme", theme);
  }, [theme]);

  useEffect(() => {
    // Apply accent color
    document.documentElement.style.setProperty("--accent", accentColor);
    // Calculate contrasting foreground color
    const isLight = getLuminance(accentColor) > 0.5;
    const foreground = isLight ? "#000000" : "#ffffff";
    document.documentElement.style.setProperty(
      "--accent-foreground",
      foreground,
    );
    // Save to localStorage
    localStorage.setItem("verdigo_accent", accentColor);
  }, [accentColor]);

  // helpers are declared at module scope

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const updateAccentColor = (color) => {
    setAccentColor(color);
  };

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, accentColor, updateAccentColor }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
