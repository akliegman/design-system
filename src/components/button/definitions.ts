import { ReactElement } from "react";
import { IconType } from "react-icons";
import { AriaButtonProps, AriaLinkOptions } from "react-aria";
import { LinkProps } from "next/link";

interface ButtonLayoutVariants {
  none: string;
  primary: string;
  secondary: string;
  tertiary: string;
  primaryOutline: string;
  secondaryOutline: string;
  tertiaryOutline: string;
  primaryInverted: string;
  secondaryInverted: string;
  tertiaryInverted: string;
}

interface ButtonLayoutSizes {
  small: string;
  medium: string;
  large: string;
}

interface ButtonLayoutRadiusTypes {
  none: string;
  small: string;
  medium: string;
  large: string;
  pill: string;
}

interface CustomButtonProps {
  additionalClassName?: string;
  className?: string;
  fullWidth?: boolean;
  text: string;
  variant?: keyof ButtonLayoutVariants;
  size?: keyof ButtonLayoutSizes;
  radius?: keyof ButtonLayoutRadiusTypes;
  iconLeading?: IconType;
  iconTrailing?: IconType;
}

interface ButtonProps extends CustomButtonProps, AriaButtonProps<"button"> {}

interface LinkButtonProps
  extends CustomButtonProps,
    AriaLinkOptions,
    LinkProps {
  href: string;
  children?: ReactElement;
  isDisabled?: boolean;
}

interface ButtonContentProps
  extends Omit<
    CustomButtonProps,
    | "additionalClassName"
    | "className"
    | "fullWidth"
    | "variant"
    | "radius"
    | "children"
  > {
  styles?: Record<string, string>;
}

interface GetButtonClassNamesProps
  extends Omit<
    ButtonProps | LinkButtonProps,
    "children" | "iconLeading" | "iconTrailing"
  > {}

interface GetButtonClassNamesOptions {
  isIconButton?: boolean;
  styles: Record<string, string>;
}

export type {
  ButtonProps,
  CustomButtonProps,
  LinkButtonProps,
  ButtonContentProps,
  GetButtonClassNamesProps,
  GetButtonClassNamesOptions,
  ButtonLayoutVariants,
};
