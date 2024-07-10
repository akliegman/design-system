import { Link } from "@/components";
import { LinkProps } from "@/components/Link";

const config = {
  name: "Link",
  component: Link,
  argTypes: {
    children: { control: "text" },
    href: { control: "text" },
    target: { table: { disable: true } },
    rel: { table: { disable: true } },
    className: { table: { disable: true } },
    isDisabled: { control: "boolean" },
  } as Record<string, any>,
  args: {
    children: "Link",
    href: "https://google.com",
    target: "_blank",
  },
};

export default config;

export const Default = (args: LinkProps) => <Link {...args} />;
