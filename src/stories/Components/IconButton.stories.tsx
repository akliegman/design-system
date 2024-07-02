import * as ReactIcons from "react-icons/fa";

import { IconButton, LinkIconButton } from "@/components/iconButton";

import {
  IconButtonProps,
  LinkIconButtonProps,
} from "@/components/iconButton/definitions";

const iconOptionsMapping = Object.entries(ReactIcons).reduce(
  (acc, [key, value]) => {
    acc[key] = value;
    return acc;
  },
  {} as Record<string, any>
);

const config = {
  name: "IconButton",
  component: IconButton,
  argTypes: {
    isDisabled: { control: "boolean" },
    additionalClassName: { table: { disable: true } },
    className: { table: { disable: true } },
    icon: {
      control: "select",
      options: ["", ...Object.keys(ReactIcons)],
      mapping: { undefined, ...iconOptionsMapping },
    },
  } as Record<string, any>,
  args: {
    isDisabled: false,
    icon: "FaBeer",
  },
};

export default config;

export const Regular_IconButton = (args: IconButtonProps) => (
  <IconButton {...args} />
);

export const Link_IconButton = (args: LinkIconButtonProps) => (
  <LinkIconButton {...args} href="https://google.com" target="_blank" />
);
