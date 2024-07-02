import { useEffect, useState } from "react";

import { Poppins } from "next/font/google";

import { getColorVariables } from "@/utils/colors";
import { Color } from "@/global";

import { colors } from "../../data";

import "../app/globals.scss";
import { LoadingOverlay } from "@/components/loadingOverlay";

const font = Poppins({
  subsets: ["latin"],
  variable: "--font-family-base",
  weight: ["400", "500", "600"],
});

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const colorsArray = getColorVariables(colors);
    Object.entries(colorsArray).forEach(([name, value]) => {
      document.documentElement.style.setProperty(name, value);
    });
    setIsLoading(false);
  }, []);

  return (
    <div className={font.className}>
      {children}
      <LoadingOverlay isLoading={isLoading} />
    </div>
  );
}

export default function RootStoryDecorator(Story: () => React.ReactNode) {
  return <RootLayout>{<Story />}</RootLayout>;
}
