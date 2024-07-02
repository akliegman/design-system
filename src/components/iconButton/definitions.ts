import { IconType } from "react-icons";
import { AriaButtonProps, AriaLinkOptions } from "react-aria";

import { CustomButtonProps } from "@/components/button/definitions";

interface CustomIconButtonProps
  extends Omit<CustomButtonProps, "iconLeading" | "iconTrailing"> {
  icon: IconType;
}

interface IconButtonProps
  extends CustomIconButtonProps,
    AriaButtonProps<"button"> {}

interface LinkIconButtonProps extends CustomIconButtonProps, AriaLinkOptions {
  href: string;
}

interface IconButtonContentProps
  extends Omit<
    CustomIconButtonProps,
    | "additionalClassName"
    | "className"
    | "fullWidth"
    | "variant"
    | "radius"
    | "children"
  > {
  styles?: Record<string, string>;
}

export type {
  IconButtonProps,
  CustomIconButtonProps,
  LinkIconButtonProps,
  IconButtonContentProps,
};
