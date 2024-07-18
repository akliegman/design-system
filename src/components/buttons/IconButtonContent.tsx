"use client";

import clsx from "clsx";

import { Icon } from "@/components";
import { CustomIconButtonProps } from "@/components/buttons/IconButton";

export interface IconButtonContentProps
  extends Omit<
    CustomIconButtonProps,
    "additionalClassName" | "className" | "fullWidth" | "variant" | "radius" | "children"
  > {
  styles?: Record<string, string>;
}

export const IconButtonContent = (props: IconButtonContentProps) => {
  const { icon, size, styles } = props;

  return (
    <Icon icon={icon} className={clsx(styles?.["icon"], styles?.["icon-leading"])} size={size} />
  );
};
