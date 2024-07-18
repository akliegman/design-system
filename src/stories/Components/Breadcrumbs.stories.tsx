import { Breadcrumbs } from "@/components";
import { BreadcrumbProps, BreadcrumbsProps } from "@/components/Breadcrumbs";

const config = {
  name: "Breadcrumbs",
  component: Breadcrumbs,
  argTypes: {
    variant: { control: "select" },
    withUnderline: { control: "boolean" },
    breadcrumbs: { table: { disable: true } },
  } as Record<string, any>,
  args: {
    variant: "primary",
    withUnderline: true,
    breadcrumbs: [
      { label: "Home", href: "#" },
      { label: "Products", href: "#" },
      { label: "Category", href: "#" },
      { label: "Product", href: "#" },
    ],
  },
};

export default config;

export const Default = (args: BreadcrumbsProps<BreadcrumbProps>) => <Breadcrumbs {...args} />;
