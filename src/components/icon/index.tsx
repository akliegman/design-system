"use client";

import clsx from "clsx";
import { FaBeer } from "react-icons/fa";

import { IconProps } from "./definitions";

import styles from "./styles.module.scss";

const Icon = (props: IconProps) => {
  const {
    className,
    size = "medium",
    variant,
    icon: ReactIcon = FaBeer,
  } = props;

  const rootClassNames = clsx(
    styles[`icon`],
    size && styles[`size-${size}`],
    variant && styles[`variant-${variant}`],
    className
  );

  return (
    <span className={rootClassNames}>
      <ReactIcon />
    </span>
  );
};

export { Icon };
