import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

// Storybook's own chrome cannot read CSS custom properties, so these hex values mirror tokens:
// colorSecondary is ultramarine.600, text is neutral.950, appBorderColor is neutral.150.
addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'Adam Kliegman / Design System',
    brandUrl: 'https://adamkliegman.com',
    brandTarget: '_self',
    colorSecondary: '#2a54ea',
    textColor: '#12151a',
    appBorderColor: '#e0e3e8',
    appBorderRadius: 8,
    fontBase: '"Geist Variable", ui-sans-serif, system-ui, sans-serif',
    fontCode: '"Geist Mono Variable", ui-monospace, monospace',
  }),
});
