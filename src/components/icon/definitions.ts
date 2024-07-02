import { IconType } from "react-icons";

export interface IconSizes {
  small: string;
  medium: string;
  large: string;
  display: string;
  h1: string;
  h2: string;
  h3: string;
  h4: string;
  h5: string;
  h6: string;
}

export interface IconVariants {
  none: string;
  primary: string;
  secondary: string;
  tertiary: string;
}

export interface IconProps {
  className?: string;
  size?: keyof IconSizes;
  variant?: keyof IconVariants;
  icon: IconType;
}
