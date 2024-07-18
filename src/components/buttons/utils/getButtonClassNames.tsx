import clsx from "clsx";

import type { CustomButtonProps } from "@/components/buttons/Button";

export interface GetButtonClassNamesProps
  extends Omit<CustomButtonProps, "children" | "iconLeading" | "iconTrailing"> {}

export interface GetButtonClassNamesOptions {
  isIconButton?: boolean;
  isLoading?: boolean;
  prefersDark?: boolean;
  styles: Record<string, string>;
}

export const getButtonClassNames = (
  props: GetButtonClassNamesProps,
  options: GetButtonClassNamesOptions,
) => {
  const {
    className,
    additionalClassName,
    fullWidth = false,
    isDisabled,
    orientation = "horizontal",
    radius = "medium",
    size = "medium",
    variant = "default",
    withShadow = false,
  } = props;

  const { isIconButton, isLoading = true, prefersDark, styles } = options;

  return clsx(
    styles[`button`],
    isLoading && styles[`loading`],
    styles[`variant-${variant}`],
    styles[`size-${size}`],
    styles[`radius-${radius}`],
    withShadow && styles[`with-shadow`],
    isIconButton && styles[`equal-height-width`],
    fullWidth && styles[`full-width`],
    prefersDark && styles[`prefers-dark`],
    isDisabled && styles["disabled"],
    orientation && styles[`orientation-${orientation}`],
    className,
    additionalClassName,
  );
};
