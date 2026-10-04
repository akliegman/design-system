import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { ThemeProvider } from '../ThemeProvider';
import { ThemeToggle } from './ThemeToggle';

const meta = {
  title: 'Components/ThemeToggle',
  component: ThemeToggle,
  decorators: [
    (Story) => (
      <ThemeProvider storageKey="ds-theme-story">
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: `
A three-way segmented control for light, dark and system. Built on React Aria's \`ToggleButtonGroup\` with single
selection, so it is one tab stop, arrow keys move between options, and each option announces its pressed state. Must
render inside a \`ThemeProvider\`.

### Do
- Place it in settings or a persistent header, where users expect appearance controls.
- Keep all three options; "system" is the right default for most people.
- Keep the default "Theme" group label unless the page has more than one toggle.

### Don't
- Don't replace it with a single sun/moon button; that hides the system option.
- Don't put it inside a form with a Save button; theme changes apply immediately.
- Don't render it outside a ThemeProvider. It throws so the mistake is caught in development.
`,
      },
    },
  },
  argTypes: {
    'aria-label': { description: 'Group label. Defaults to "Theme".' },
    isDisabled: { description: 'Lock the theme, for example when an admin enforces one.' },
  },
} satisfies Meta<typeof ThemeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Locked by policy. */
export const Disabled: Story = { args: { isDisabled: true } };

/** One tab stop; arrow keys move focus; Space or Enter applies the theme. */
export const KeyboardInteraction: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.tab();
    await userEvent.keyboard('{ArrowRight}');
    await expect(canvas.getByRole('radio', { name: 'Dark theme' })).toHaveFocus();
    await userEvent.keyboard(' ');
    await expect(canvas.getByRole('radio', { name: 'Dark theme' })).toBeChecked();
    await expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
    await userEvent.click(canvas.getByRole('radio', { name: 'Match system theme' }));
  },
};
