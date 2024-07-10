import clsx from "clsx";

import type { CustomButtonProps } from "@/components/buttons/Button";

export interface GetButtonClassNamesProps
  extends Omit<
    CustomButtonProps,
    "children" | "iconLeading" | "iconTrailing"
  > {}

export interface GetButtonClassNamesOptions {
  isIconButton?: boolean;
  isLoading?: boolean;
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
    variant = "none",
    withShadow = false,
  } = props;

  const { isIconButton, isLoading = true, styles } = options;

  console.log(isLoading);

  return clsx(
    styles.button,
    isLoading && styles[`loading`],
    variant && styles[`variant-${variant}`],
    size && styles[`size-${size}`],
    radius && styles[`radius-${radius}`],
    isIconButton && styles["equal-height-width"],
    fullWidth && styles["full-width"],
    isDisabled && styles["disabled"],
    orientation && styles[`orientation-${orientation}`],
    withShadow && styles["with-shadow"],
    className,
    additionalClassName,
  );
};
