"use client";

import clsx from "clsx";
import { IconType } from "react-icons";
import { FaBeer } from "react-icons/fa";

import { IconLevels, Variants } from "@/global";
import { useTheme } from "@/providers/theme";

import styles from "@/components/Icon/styles.module.scss";

export interface IconProps {
  className?: string;
  size?: keyof IconLevels;
  variant?: keyof Variants;
  icon: IconType;
}

const Icon = (props: IconProps) => {
  const {
    className,
    size = "medium",
    variant = "none",
    icon: ReactIcon = FaBeer,
  } = props;

  const { themeIsMounted } = useTheme();

  const rootClassNames = clsx(
    styles[`icon`],
    !themeIsMounted && styles[`loading`],
    size && styles[`level-${size}`],
    variant && styles[`variant-${variant}`],
    className,
  );

  return (
    <span className={rootClassNames}>
      <ReactIcon />
    </span>
  );
};

export { Icon };
