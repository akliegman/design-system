"use client";

import clsx from "clsx";

import { Icon } from "@/components";
import { CustomButtonProps } from "@/components/buttons/Button";

export interface ButtonContentProps
  extends Omit<
    CustomButtonProps,
    "additionalClassName" | "className" | "fullWidth" | "variant" | "radius" | "children"
  > {
  styles?: Record<string, string>;
}

export const ButtonContent = (props: ButtonContentProps) => {
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
