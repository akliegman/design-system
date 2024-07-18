import clsx from "clsx";
import {
  Breadcrumb as ReactAriaBreadcrumb,
  BreadcrumbProps as ReactAriaBreadcrumbProps,
  Breadcrumbs as ReactAriaBreadcrumbs,
  BreadcrumbsProps as ReactAriaBreadcrumbsProps,
} from "react-aria-components";
import { FaChevronRight } from "react-icons/fa";

import { Icon, Link } from "@/components";
import { LinkProps, LinkVariants } from "@/components/Link";
import { Sizes } from "@/global";
import { useTheme } from "@/providers/theme";

import styles from "@/components/Breadcrumbs/styles.module.scss";

export interface BreadcrumbProps extends Omit<ReactAriaBreadcrumbProps & LinkProps, "children"> {
  label: string;
}

export interface BreadcrumbsProps<T> extends Omit<ReactAriaBreadcrumbsProps<T>, "children"> {
  breadcrumbs: BreadcrumbProps[];
  variant?: keyof LinkVariants;
  size?: keyof Sizes;
  withUnderline?: boolean;
}

export const Breadcrumbs = (props: BreadcrumbsProps<ReactAriaBreadcrumbProps>) => {
  const {
    breadcrumbs = [],
    variant = "default",
    size = "small",
    withUnderline = true,
    ...rest
  } = props;

  const { prefersDark } = useTheme();

  const rootClassNames = clsx(
    styles[`breadcrumbs`],
    size && styles[`size-${size}`],
    prefersDark && styles[`prefers-dark`],
  );

  return (
    <ReactAriaBreadcrumbs {...rest} className={rootClassNames}>
      {breadcrumbs.map((breadcrumb, index) => (
        <ReactAriaBreadcrumb {...breadcrumb} key={index} className={styles[`breadcrumb`]}>
          {index < breadcrumbs.length - 1 ? (
            <>
              <Link {...breadcrumb} variant={variant} withUnderline={withUnderline}>
                {breadcrumb.label}
              </Link>
              <Icon
                icon={FaChevronRight}
                aria-hidden="true"
                size={size === "large" ? "medium" : "small"}
                className={clsx(styles[`separator`])}
              />
            </>
          ) : (
            <span className={clsx(styles[`label`])}>{breadcrumb.label}</span>
          )}
        </ReactAriaBreadcrumb>
      ))}
    </ReactAriaBreadcrumbs>
  );
};
