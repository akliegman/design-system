import clsx from "clsx";
import { AriaLinkOptions } from "react-aria";
import { Link as ReactAriaLink } from "react-aria-components";

import { Variants } from "@/global";
import { useTheme } from "@/providers/theme";

import styles from "@/components/Link/styles.module.scss";

export interface LinkVariants extends Variants {}

export interface LinkProps extends AriaLinkOptions {
  children: React.ReactNode;
  withUnderline?: boolean;
  variant?: keyof LinkVariants;
}

export const Link = (props: LinkProps) => {
  const {
    children,
    withUnderline = true,
    variant = "default",
    isDisabled = false,
    ...rest
  } = props;

  const { prefersDark } = useTheme();

  const rootClassNames = clsx(
    styles[`link`],
    withUnderline && styles[`with-underline`],
    variant && styles[`variant-${variant}`],
    isDisabled && styles[`disabled`],
    prefersDark && styles[`dark`],
  );

  return (
    <ReactAriaLink {...rest} className={rootClassNames}>
      {children}
    </ReactAriaLink>
  );
};
