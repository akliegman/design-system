export interface Color {
  color: string;
  shade: number;
  name: string;
}

export interface HeadingTags {
  h1: string;
  h2: string;
  h3: string;
  h4: string;
  h5: string;
  h6: string;
}

export interface HeadingLevels extends HeadingTags {
  display: string;
}

export interface ParagraphLevels extends Sizes {}

export interface IconLevels extends ParagraphLevels, HeadingLevels {}

export interface Variants {
  none: string;
  primary: string;
  secondary: string;
  tertiary: string;
  neutral: string;
  success: string;
  warning: string;
  danger: string;
  info: string;
}

export interface Sizes {
  small: string;
  medium: string;
  large: string;
}

export interface RadiusTypes {
  none: string;
  small: string;
  medium: string;
  large: string;
  pill: string;
}

export interface Orientations {
  horizontal: string;
  vertical: string;
}
