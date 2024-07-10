import clsx from "clsx";
import { Playfair_Display, Poppins } from "next/font/google";

import { Providers } from "@/providers";

import "../app/index.scss";

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

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("hello");
  return (
    <Providers>
      <div className={clsx(font.className, fontDisplay.variable)}>
        {children}
      </div>
    </Providers>
  );
}

export default function RootStoryDecorator(Story: () => React.ReactNode) {
  return <RootLayout>{<Story />}</RootLayout>;
}
