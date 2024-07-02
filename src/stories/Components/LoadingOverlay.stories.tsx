import { LoadingOverlay } from "@/components/loadingOverlay";

const config = {
  name: "LoadingOverlay",
  component: LoadingOverlay,
  argTypes: {
    isLoading: {
      control: "boolean",
    },
  },
  args: {
    isLoading: true,
  },
};

export default config;

export const Default = (args: { isLoading: boolean }) => (
  <LoadingOverlay {...args} />
);
