"use client";

import { AriaButtonProps } from "react-aria";
import { Button as ReactAriaButton } from "react-aria-components";
import { IconType } from "react-icons";

import { ButtonContent } from "@/components/buttons/ButtonContent";
import { getButtonClassNames } from "@/components/buttons/utils/getButtonClassNames";
import { Orientations, RadiusTypes, Sizes, Variants } from "@/global";
import { useTheme } from "@/providers/theme";

import styles from "@/components/buttons/styles.module.scss";

export interface ButtonVariants extends Variants {
  "primary-outline": string;
  "secondary-outline": string;
  "tertiary-outline": string;
  "neutral-outline": string;
  "success-outline": string;
  "danger-outline": string;
  "warning-outline": string;
  "info-outline": string;
}

export interface ButtonSizes extends Sizes {}

export interface ButtonRadiusTypes extends RadiusTypes {}

export interface ButtonOrientations extends Orientations {}

export interface CustomButtonProps {
  additionalClassName?: string;
  className?: string;
  fullWidth?: boolean;
  withShadow?: boolean;
  text: string;
  variant?: keyof ButtonVariants;
  size?: keyof ButtonSizes;
  radius?: keyof ButtonRadiusTypes;
  orientation?: keyof ButtonOrientations;
  iconLeading?: IconType;
  iconTrailing?: IconType;
  isDisabled?: boolean;
}

export interface ButtonProps extends CustomButtonProps, AriaButtonProps<"button"> {}

export const Button = (props: ButtonProps) => {
  const { themeIsMounted, prefersDark } = useTheme();
  return (
    <ReactAriaButton
      {...props}
      className={getButtonClassNames(props, {
        styles: styles,
        isLoading: !themeIsMounted,
        prefersDark: prefersDark,
      })}
    >
      <ButtonContent {...props} styles={styles} />
    </ReactAriaButton>
  );
};
