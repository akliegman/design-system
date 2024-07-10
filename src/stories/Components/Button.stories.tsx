import * as ReactIcons from "react-icons/fa";

import { Button } from "@/components";
import { ButtonProps } from "@/components/buttons/Button";

const iconOptionsMapping = Object.entries(ReactIcons).reduce(
  (acc, [key, value]) => {
    acc[key] = value;
    return acc;
  },
  {} as Record<string, any>,
);

const config = {
  name: "Button",
  component: Button,
  argTypes: {
    text: { control: "text" },
    isDisabled: { control: "boolean" },
    additionalClassName: { table: { disable: true } },
    className: { table: { disable: true } },
    iconLeading: {
      control: "select",
      options: ["", ...Object.keys(ReactIcons)],
      mapping: { undefined, ...iconOptionsMapping },
    },
    iconTrailing: {
      control: "select",
      options: ["", ...Object.keys(ReactIcons)],
      mapping: { undefined, ...iconOptionsMapping },
    },
  } as Record<string, any>,
  args: {
    isDisabled: false,
    withShadow: false,
    fullWidth: false,
    text: "Button",
    variant: "primary",
    size: "medium",
    radius: "medium",
    iconLeading: "",
    iconTrailing: "",
    orientation: "horizontal",
  },
};

export default config;

export const Default = (args: ButtonProps) => <Button {...args} />;
