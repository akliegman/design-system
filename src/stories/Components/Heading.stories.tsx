import { Heading } from "@/components";
import { HeadingProps } from "@/components/Heading";

const config = {
  name: "Heading",
  component: Heading,
  argTypes: {
    children: { control: "text" },
    className: { table: { disable: true } },
  } as Record<string, any>,
  args: {
    children: "Lorem ipsum dolor sit amet.",
    variant: "none",
    tag: "h1",
  },
};

export default config;

export const Default = (args: HeadingProps) => <Heading {...args} />;
