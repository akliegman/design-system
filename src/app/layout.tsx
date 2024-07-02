import type { Metadata } from "next";
import type { Colors } from "@/utils/colors";

import { Poppins } from "next/font/google";

import { setColors } from "@/utils/colors";

import { COLORS } from "@/constants";

import "./globals.scss";

const font = Poppins({
  subsets: ["latin"],
  variable: "--font-family-base",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  colors,
  children,
}: Readonly<{
  colors?: Colors;
  children: React.ReactNode;
}>) {
  const styles = { ...setColors(COLORS) };

  return (
    <html lang="en" style={styles} className={font.variable}>
      <body>{children}</body>
    </html>
  );
}
