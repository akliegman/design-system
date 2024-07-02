import { Icon } from "@/components/icon";
import type { IconProps } from "@/components/icon/definitions";

import * as ReactIcons from "react-icons/fa";

const iconOptionsMapping = Object.entries(ReactIcons).reduce(
  (acc, [key, value]) => {
    acc[key] = value;
    return acc;
  },
  {} as Record<string, any>
);

const config = {
  name: "Icon",
  component: Icon,
  argTypes: {
    icon: {
      control: "select",
      options: Object.keys(ReactIcons),
      mapping: iconOptionsMapping,
    },

    className: { table: { disable: true } },
  },
  args: {
    icon: "FaBeer",
  },
};

export default config;

export const Default = (args: IconProps) => <Icon {...args} />;
