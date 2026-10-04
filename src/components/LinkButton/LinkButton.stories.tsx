import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArrowRight, BookOpen } from 'lucide-react';
import { expect } from 'storybook/test';
import { LinkButton } from './LinkButton';

const meta = {
  title: 'Components/LinkButton',
  component: LinkButton,
  parameters: {
    docs: {
      description: {
        component: `
An anchor styled as a Button. Use it when the "action" is going somewhere: the browser then handles middle-click, open
in new tab, copy link and history correctly.

### Do
- Use it for calls to action that navigate: "View pricing", "Read the docs".
- Use the same \`variant\` and \`size\` scale as Button so links and buttons in one row match.
- Add a trailing arrow when the destination leaves the current flow.

### Don't
- Don't use it for actions that change data; those are Buttons.
- Don't add \`onPress\` handlers that cancel navigation. If it does not navigate, it is a Button.
- Don't put a LinkButton inside running text. Use Link there.
`,
      },
    },
  },
  argTypes: {
    href: { description: 'Destination. Required; without one this should be a Button.' },
    variant: {
      description: 'Same visual scale as Button.',
      control: 'inline-radio',
      options: ['primary', 'secondary', 'ghost', 'danger'],
      table: { defaultValue: { summary: 'secondary' } },
    },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'], description: 'Same heights as Button.' },
    isDisabled: { description: 'Removes the href and focusability. Prefer not rendering the link at all.' },
  },
  args: { href: '#pricing', children: 'View pricing', variant: 'primary', iconEnd: ArrowRight },
} satisfies Meta<typeof LinkButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Secondary navigation next to a primary call to action. */
export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Read the docs', iconStart: BookOpen, iconEnd: undefined },
};

/** A disabled link is not focusable and has no destination. */
export const Disabled: Story = { args: { isDisabled: true } };

/** It is still a link to assistive technology and the keyboard: Tab focuses it, Enter follows it. */
export const KeyboardInteraction: Story = {
  play: async ({ canvas, userEvent }) => {
    const link = canvas.getByRole('link', { name: 'View pricing' });
    await userEvent.tab();
    await expect(link).toHaveFocus();
    await expect(link).toHaveAttribute('href', '#pricing');
  },
};
