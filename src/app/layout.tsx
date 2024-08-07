import clsx from "clsx";
import { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";

import { Providers } from "@/providers";

import "@/app/index.scss";

const font = Poppins({
  subsets: ["latin"],
  variable: "--font-family-base",
  weight: ["400", "500", "600"],
});

const fontDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-family-display",
  weight: ["500"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={clsx(font.className, fontDisplay.variable)} dir="ltr">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
