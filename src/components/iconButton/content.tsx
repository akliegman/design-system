"use client";

import clsx from "clsx";

import { Icon } from "@/components/icon";

import { IconButtonContentProps } from "@/components/iconButton/definitions";

const IconButtonContent = (props: IconButtonContentProps) => {
  const { icon, size, styles } = props;

  return (
    <Icon
      icon={icon}
      className={clsx(styles?.["icon"], styles?.["icon-leading"])}
      size={size}
    />
  );
};

export { IconButtonContent };
