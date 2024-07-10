"use client";

import { createContext, useContext, useEffect, useState } from "react";
import useSWR from "swr";

import { getColorVariables } from "@/utils/colors";

export interface ThemeProviderProps {
  children: React.ReactNode;
}

export interface ThemeContextProps {
  themeIsMounted?: boolean;
  colors?: Record<string, string>;
}

export const ThemeContext: React.Context<ThemeContextProps> = createContext({});

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const fetcher = async (url: string) => {
    const res = await fetch(url);
    const data = await res.json();

    return data;
  };

  const [themeIsMounted, setThemeIsMounted] = useState(false);
  const [colors, setColors] = useState({});

  const { data, error, isLoading } = useSWR("/api/colors", fetcher);

  useEffect(() => {
    if (data) {
      const { colorsVars, colorsJson } = getColorVariables(data);
      Object.entries(colorsVars).forEach(([name, value]) => {
        document.documentElement.style.setProperty(name, value);
      });

      setColors(colorsJson);

      if (!isLoading) {
        setThemeIsMounted(true);
      }
    }
  }, [data, isLoading]);

  if (error) console.error(error);

  const value = {
    colors,
    themeIsMounted,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
