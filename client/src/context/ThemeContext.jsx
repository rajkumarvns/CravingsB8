import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const palettes = {
    light: {
      "--color-primary": "#c2410c",
      "--color-primary-content": "#ffffff",
      "--color-secondary": "#6b7280",
      "--color-secondary-content": "#ffffff",
      "--color-accent": "#d9468f",
      "--color-accent-content": "#ffffff",
      "--color-neutral": "#3f3f46",
      "--color-neutral-content": "#f4f4f5",
      "--color-base-100": "#fff8f1",
      "--color-base-200": "#f5ede5",
      "--color-base-300": "#e7d9c9",
      "--color-base-content": "#2d1b10",
    },
    dark: {
      "--color-primary": "#0ea5e9",
      "--color-primary-content": "#0b1140",
      "--color-secondary": "#374151",
      "--color-secondary-content": "#e6eef8",
      "--color-accent": "#7c3aed",
      "--color-accent-content": "#ffffff",
      "--color-neutral": "#cbd5e1",
      "--color-neutral-content": "#0f172a",
      "--color-base-100": "#0b1220",
      "--color-base-200": "#0f1724",
      "--color-base-300": "#132033",
      "--color-base-content": "#e6eef8",
    },
    coffee: {
      "--color-primary": "#6b3e26",
      "--color-primary-content": "#fff7f0",
      "--color-secondary": "#8b5e3c",
      "--color-secondary-content": "#ffffff",
      "--color-accent": "#d8a47f",
      "--color-accent-content": "#2b1206",
      "--color-neutral": "#3b2f2f",
      "--color-neutral-content": "#f5efe9",
      "--color-base-100": "#fff7f2",
      "--color-base-200": "#f2e7df",
      "--color-base-300": "#e6d6c9",
      "--color-base-content": "#2b1b12",
    },
    mint: {
      "--color-primary": "#16a34a",
      "--color-primary-content": "#ffffff",
      "--color-secondary": "#10b981",
      "--color-secondary-content": "#052e16",
      "--color-accent": "#14b8a6",
      "--color-accent-content": "#08332a",
      "--color-neutral": "#064e3b",
      "--color-neutral-content": "#e6fff6",
      "--color-base-100": "#f0fff7",
      "--color-base-200": "#e6fff4",
      "--color-base-300": "#ccf7ea",
      "--color-base-content": "#073222",
    },
    sunset: {
      "--color-primary": "#ff7a18",
      "--color-primary-content": "#2b0b00",
      "--color-secondary": "#ff4d6d",
      "--color-secondary-content": "#2b0b00",
      "--color-accent": "#ffb703",
      "--color-accent-content": "#2b0b00",
      "--color-neutral": "#3b3b44",
      "--color-neutral-content": "#fff7f0",
      "--color-base-100": "#fff5ed",
      "--color-base-200": "#fff0e6",
      "--color-base-300": "#ffe6d6",
      "--color-base-content": "#2b0b00",
    },
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);

    const palette = palettes[theme] || palettes.light;
    Object.entries(palette).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
