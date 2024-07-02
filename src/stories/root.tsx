import React, { useEffect } from "react";
import clsx from "clsx";

import { Poppins } from "next/font/google";

import "../app/globals.scss";
import styles from "./styles.module.scss";

import { COLORS } from "@/constants";
import { setColors } from "@/utils/colors";

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
  useEffect(() => {
    const styles = { ...setColors(COLORS) };
    Object.entries(styles).forEach(([name, value]) => {
      document.documentElement.style.setProperty(name, value);
    });
  }, []);

  return <div className={clsx(styles["root"], font.className)}>{children}</div>;
}

export default function RootStoryDecorator(Story: () => React.ReactNode) {
  return <RootLayout>{<Story />}</RootLayout>;
}
