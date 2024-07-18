"use client";

import { AriaButtonProps } from "react-aria";
import { Button as ReactAriaButton } from "react-aria-components";
import { IconType } from "react-icons";

import { CustomButtonProps } from "@/components/buttons/Button";
import { IconButtonContent } from "@/components/buttons/IconButtonContent";
import { getButtonClassNames } from "@/components/buttons/utils/getButtonClassNames";
import { useTheme } from "@/providers/theme";

import styles from "@/components/buttons/styles.module.scss";

export interface CustomIconButtonProps
  extends Omit<CustomButtonProps, "iconLeading" | "iconTrailing" | "orientation"> {
  icon: IconType;
}

export interface IconButtonProps extends CustomIconButtonProps, AriaButtonProps<"button"> {}

export const IconButton = (props: IconButtonProps) => {
  const { themeIsMounted, prefersDark } = useTheme();
  return (
    <ReactAriaButton
      {...props}
      className={getButtonClassNames(props, {
        isIconButton: true,
        styles: styles,
        isLoading: !themeIsMounted,
        prefersDark: prefersDark,
      })}
    >
      <IconButtonContent {...props} styles={styles} />
    </ReactAriaButton>
  );
};
