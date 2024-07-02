import type { Preview } from "@storybook/react";

import RootStoryDecorator from "../src/stories/root";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [RootStoryDecorator],
};

export default preview;