import { Preview } from "@storybook/react";
import { HttpResponse, http } from "msw";
import { initialize, mswLoader } from "msw-storybook-addon";

import { colors } from "../data";
import RootStoryDecorator from "../src/stories/layout";

initialize();

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    msw: {
      handlers: [
        http.get("/api/colors", () => {
          return HttpResponse.json(colors);
        }),
      ],
    },
    nextjs: {
      appDirectory: true,
    },
    options: {
      storySort: {
        order: ["Theme", "Components"],
      },
    },
  },
  decorators: [RootStoryDecorator],
  loaders: [mswLoader],
  tags: ["autodocs"],
};

export default preview;
