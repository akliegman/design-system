import { ReactElement } from "react";
import { AriaLinkOptions } from "react-aria";
import { Link as ReactAriaLink } from "react-aria-components";

import { CustomButtonProps } from "@/components/buttons/Button";
import { ButtonContent } from "@/components/buttons/ButtonContent";
import { getButtonClassNames } from "@/components/buttons/utils/getButtonClassNames";
import { useTheme } from "@/providers/theme";

import styles from "@/components/buttons/styles.module.scss";

export interface LinkButtonProps extends CustomButtonProps, AriaLinkOptions {
  href: string;
  children?: ReactElement;
  isDisabled?: boolean;
}

export const LinkButton = (props: LinkButtonProps) => {
  const { themeIsMounted } = useTheme();
  return (
    <ReactAriaLink
      {...props}
      className={getButtonClassNames(props, {
        styles: styles,
        isLoading: !themeIsMounted,
      })}
    >
      <ButtonContent {...props} styles={styles} />
    </ReactAriaLink>
  );
};
