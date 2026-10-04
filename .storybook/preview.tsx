import '@fontsource-variable/geist';
import '@fontsource-variable/geist-mono';
import '../src/styles/index.css';

import type { Decorator, Preview } from '@storybook/react-vite';
import { useEffect } from 'react';

type ThemeGlobal = 'light' | 'dark';

const withTheme: Decorator = (Story, context) => {
  const theme = (context.globals.theme ?? 'light') as ThemeGlobal;

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <div data-theme={theme} className="bg-surface p-6 text-fg">
      <Story />
    </div>
  );
};

const preview: Preview = {
  tags: ['autodocs'],
  decorators: [withTheme],
  globalTypes: {
    theme: {
      description: 'Color theme for the canvas',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'light' },
  parameters: {
    layout: 'centered',
    controls: { expanded: true, sort: 'requiredFirst' },
    a11y: { test: 'error' },
    options: {
      storySort: {
        order: ['Introduction', 'Foundations', ['Tokens', 'Accessibility'], 'Contributing', 'Components'],
      },
    },
  },
};

export default preview;
