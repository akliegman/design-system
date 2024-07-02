import clsx from "clsx";

import {
  GetButtonClassNamesProps,
  GetButtonClassNamesOptions,
} from "./definitions";

const getButtonClassNames = (
  props: GetButtonClassNamesProps,
  options: GetButtonClassNamesOptions
) => {
  const {
    className,
    additionalClassName,
    size,
    radius,
    variant,
    fullWidth,
    isDisabled,
  } = props;

  const { isIconButton, styles } = options;

  return clsx(
    styles.button,
    variant && styles[`variant-${variant}`],
    size && styles[`size-${size}`],
    radius && styles[`radius-${radius}`],
    isIconButton && styles["fixed-width"],
    fullWidth && styles["full-width"],
    isDisabled && styles["disabled"],
    className,
    additionalClassName
  );
};

export { getButtonClassNames };
