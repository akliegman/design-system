"use client";

import clsx from "clsx";

import styles from "@/components/ThemeWrapper/styles.module.scss";

export interface ThemeWrapperProps {
  children: React.ReactNode;
  prefersDark: boolean;
  themeIsMounted: boolean;
}

export const ThemeWrapper = (props: ThemeWrapperProps) => {
  const { children, prefersDark, themeIsMounted } = props;

  const rootClassNames = clsx(
    prefersDark ? styles[`prefers-dark`] : styles[`light`],
    !themeIsMounted && styles[`loading`],
  );

  return <div className={rootClassNames}>{children}</div>;
};
