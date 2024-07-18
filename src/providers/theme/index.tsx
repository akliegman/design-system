"use client";

import { createContext, useContext, useEffect, useState } from "react";
import useSWR from "swr";

import { ThemeWrapper } from "@/components";
import { getColorVariables } from "@/utils/colors";
import { fetcher } from "@/utils/fetcher";

export interface ThemeProviderProps {
  children: React.ReactNode;
  prefersDark?: boolean;
}

export interface ThemeContextProps {
  themeIsMounted?: boolean;
  colors?: Record<string, string>;
  prefersDark?: boolean;
  setPrefersDark: (prefersDark: boolean) => void;
}

export const ThemeContext: React.Context<ThemeContextProps> = createContext({
  setPrefersDark: () => {},
});

export const ThemeProvider = ({
  children,
  prefersDark: providedPrefersDark,
}: ThemeProviderProps) => {
  const [themeIsMounted, setThemeIsMounted] = useState(false);
  const [colors, setColors] = useState({});
  const [prefersDark, setPrefersDark] = useState(false);

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

  useEffect(() => {
    if (providedPrefersDark !== undefined) {
      setPrefersDark(providedPrefersDark);
    }
  }, [providedPrefersDark]);

  if (error) console.error(error);

  const value = {
    colors,
    themeIsMounted,
    prefersDark,
    setPrefersDark,
  };

  return (
    <ThemeContext.Provider value={value}>
      <ThemeWrapper prefersDark={prefersDark} themeIsMounted={themeIsMounted}>
        {children}
      </ThemeWrapper>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
