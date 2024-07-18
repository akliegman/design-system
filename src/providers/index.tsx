"use client";

import { useEffect, useState } from "react";

import { ThemeProvider } from "@/providers/theme";

export interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  const [prefersDark, setPrefersDark] = useState(false);

  useEffect(() => {
    // check localStorage first
    const localPrefersDark = localStorage.getItem("prefersDark");

    if (localPrefersDark) {
      setPrefersDark(JSON.parse(localPrefersDark));
    } else {
      const mediaPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      localStorage.setItem("prefersDark", JSON.stringify(mediaPrefersDark));
      setPrefersDark(mediaPrefersDark);
    }
  }, []);

  return <ThemeProvider prefersDark={prefersDark}>{children}</ThemeProvider>;
};
