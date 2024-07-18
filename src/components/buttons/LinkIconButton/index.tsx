"use client";

import { AriaLinkOptions } from "react-aria";
import { Link as ReactAriaLink } from "react-aria-components";

import { CustomIconButtonProps } from "@/components/buttons/IconButton";
import { IconButtonContent } from "@/components/buttons/IconButtonContent";
import { getButtonClassNames } from "@/components/buttons/utils/getButtonClassNames";
import { useTheme } from "@/providers/theme";

import styles from "@/components/buttons/styles.module.scss";

export interface LinkIconButtonProps extends CustomIconButtonProps, AriaLinkOptions {
  href: string;
}

export const LinkIconButton = (props: LinkIconButtonProps) => {
  const { themeIsMounted, prefersDark } = useTheme();
  return (
    <ReactAriaLink
      {...props}
      className={getButtonClassNames(props, {
        isIconButton: true,
        styles: styles,
        isLoading: !themeIsMounted,
        prefersDark: prefersDark,
      })}
    >
      <IconButtonContent {...props} styles={styles} />
    </ReactAriaLink>
  );
};
