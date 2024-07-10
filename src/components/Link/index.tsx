import clsx from "clsx";
import { AriaLinkOptions } from "react-aria";
import { Link as ReactAriaLink } from "react-aria-components";

import { Variants } from "@/global";

import styles from "@/components/Link/styles.module.scss";

export interface LinkVariants extends Variants {
  "primary-light": string;
  "secondary-light": string;
  "tertiary-light": string;
  "neutral-light": string;
  "success-light": string;
  "danger-light": string;
  "warning-light": string;
  "info-light": string;
}

export interface LinkProps extends AriaLinkOptions {
  children: React.ReactNode;
  withUnderline?: boolean;
  variant?: keyof LinkVariants;
}

const Link = (props: LinkProps) => {
  const {
    children,
    withUnderline = true,
    variant = "none",
    isDisabled = false,
    ...rest
  } = props;
  const rootClassNames = clsx(
    styles[`link`],
    withUnderline && styles[`with-underline`],
    variant && styles[`variant-${variant}`],
    isDisabled && styles[`disabled`],
  );

  return (
    <ReactAriaLink {...rest} className={rootClassNames}>
      {children}
    </ReactAriaLink>
  );
};

export { Link };
