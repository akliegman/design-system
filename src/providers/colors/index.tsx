"use client";

import { createContext, useContext, useEffect } from "react";
import useSWR from "swr";

import { LoadingOverlay } from "@/components/loadingOverlay";
import { getColorVariables } from "@/utils/colors";

import { ColorsContextProps, ColorsProviderProps } from "./definitions";

const ColorsContext: React.Context<ColorsContextProps> = createContext({});

const ColorsProvider = ({ children }: ColorsProviderProps) => {
  const fetcher = async (url: string) => {
    const res = await fetch(url);
    const data = await res.json();

    return data;
  };

  const { data, error, isLoading } = useSWR("/api/colors", fetcher);

  useEffect(() => {
    if (data) {
      const colorsArray = getColorVariables(data);
      Object.entries(colorsArray).forEach(([name, value]) => {
        document.documentElement.style.setProperty(name, value);
      });
    }
  }, [data]);

  if (error) console.error(error);

  const value = {
    colorsMounted: !isLoading,
  };

  return (
    <ColorsContext.Provider value={value}>
      {children}
      <LoadingOverlay isLoading={!value.colorsMounted} />
    </ColorsContext.Provider>
  );
};

const useColors = () => {
  const context = useContext(ColorsContext);

  if (!context) {
    throw new Error("useColors must be used within a ColorsProvider");
  }

  return context;
};

export { ColorsProvider, useColors };
