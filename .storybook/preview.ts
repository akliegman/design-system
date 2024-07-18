import { Preview } from "@storybook/react";
import { HttpResponse, http } from "msw";
import { initialize, mswLoader } from "msw-storybook-addon";

import { colors } from "../data";
import RootStoryDecorator from "../src/stories/layout";

initialize();

const preview: Preview = {
  parameters: {
    backgrounds: {
      disable: true,
    },
    layout: "fullscreen",
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
  globalTypes: {
    theme: {
      description: "Dark mode.",
      defaultValue: "dark",
      toolbar: {
        title: "Color Scheme Mode",
        icon: "mirror",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [RootStoryDecorator],
  loaders: [mswLoader],
  tags: ["autodocs"],
};

export default preview;
