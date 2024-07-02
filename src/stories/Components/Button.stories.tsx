import * as ReactIcons from "react-icons/fa";

import { Button, LinkButton } from "@/components/button";

import { ButtonProps, LinkButtonProps } from "@/components/button/definitions";

const iconOptionsMapping = Object.entries(ReactIcons).reduce(
  (acc, [key, value]) => {
    acc[key] = value;
    return acc;
  },
  {} as Record<string, any>
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
    text: "Button",
  },
};

export default config;

export const Regular_Button = (args: ButtonProps) => <Button {...args} />;

export const Link_Button = (args: LinkButtonProps) => (
  <LinkButton {...args} href="https://google.com" target="_blank" />
);
