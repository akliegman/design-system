import clsx from "clsx";
import { Playfair_Display, Poppins } from "next/font/google";

import { ThemeProvider } from "@/providers/theme";

import "../app/index.scss";
import styles from "./styles.module.scss";

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
  return (
    <div className={clsx(styles[`main`], font.className, fontDisplay.variable)}>{children}</div>
  );
}

export default function RootStoryDecorator(Story: () => React.ReactNode, context: any) {
  const { globals } = context;
  const prefersDark = globals?.theme === "dark";

  return (
    <ThemeProvider prefersDark={prefersDark}>
      <RootLayout>{<Story />} </RootLayout>
    </ThemeProvider>
  );
}
