"use client";

import clsx from "clsx";

import { Icon } from "@/components/icon";

import { ButtonContentProps } from "./definitions";

const ButtonContent = (props: ButtonContentProps) => {
  const { iconLeading, iconTrailing, size, styles, text } = props;
  return (
    <>
      {iconLeading && (
        <Icon
          icon={iconLeading}
          className={clsx(styles?.["icon"], styles?.["icon-leading"])}
          size={size}
        />
      )}
      {text && <span className={styles?.text}>{text}</span>}
      {iconTrailing && (
        <Icon
          icon={iconTrailing}
          className={clsx(styles?.["icon"], styles?.["icon-trailing"])}
          size={size}
        />
      )}
    </>
  );
};

export { ButtonContent };
