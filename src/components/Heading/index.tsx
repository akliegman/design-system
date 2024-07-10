import clsx from "clsx";

import { HeadingLevels, HeadingTags, Variants } from "@/global";
import { useTheme } from "@/providers/theme";

import styles from "@/components/Heading/styles.module.scss";

export interface HeadingProps {
  className?: string;
  variant?: keyof Variants;
  tag: keyof HeadingTags;
  level?: keyof HeadingLevels;
  children: React.ReactNode;
}

export const Heading = (props: HeadingProps) => {
  const {
    className,
    variant = "none",
    tag = "h1",
    level: providedLevel,
    children,
  } = props;

  const Element = tag;

  const { themeIsMounted } = useTheme();

  const level = providedLevel || tag;

  const rootClassNames = clsx(
    styles[`heading`],
    !themeIsMounted && styles[`loading`],
    variant && styles[`variant-${variant}`],
    level && styles[`level-${level}`],
    className,
  );

  return <Element className={rootClassNames}>{children}</Element>;
};
