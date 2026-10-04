import type { Meta, StoryObj } from '@storybook/react-vite';
import { Bold, Copy, MoreHorizontal, Pencil, Settings, Trash2 } from 'lucide-react';
import { expect, fn } from 'storybook/test';
import { Tooltip } from '../Tooltip';
import { IconButton } from './IconButton';

const icons = { Settings, Pencil, Copy, Trash2, MoreHorizontal, Bold };

const meta = {
  title: 'Components/IconButton',
  component: IconButton,
  parameters: {
    docs: {
      description: {
        component: `
A Button whose only content is an icon. \`aria-label\` is a required prop, so a nameless icon button fails to compile
rather than failing an audit later.

### Do
- Name the action in \`aria-label\`: "Delete invoice", not "Trash icon".
- Wrap it in a \`Tooltip\` with the same text so sighted mouse users learn what it does.
- Use \`ghost\` in toolbars and table rows, where several sit side by side.

### Don't
- Don't use an icon button for an action that has no widely understood icon. Use a Button with a label.
- Don't pair \`primary\` icon buttons with a primary Button in the same row; there should be one primary.
- Don't shrink below \`sm\` for touch targets. \`lg\` meets 44px on its own.
`,
      },
    },
  },
  argTypes: {
    icon: {
      description: 'The glyph. Pick one whose meaning is conventional; the tooltip should confirm it, not explain it.',
      options: Object.keys(icons),
      mapping: icons,
      control: 'select',
    },
    'aria-label': { description: 'The accessible name and the tooltip text. Describe the action, not the picture.' },
    variant: {
      description: 'Same scale as Button. Defaults to `ghost` because icon buttons usually live in dense UI.',
      control: 'inline-radio',
      options: ['primary', 'secondary', 'ghost', 'danger'],
      table: { defaultValue: { summary: 'ghost' } },
    },
    size: {
      description: 'Square size matching Button heights.',
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      table: { defaultValue: { summary: 'md' } },
    },
    isLoading: { description: 'Swaps the icon for a spinner and ignores presses while focus stays put.' },
  },
  args: { icon: Settings, 'aria-label': 'Open settings', onPress: fn() },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Each variant with a fitting action. */
export const Variants: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <IconButton {...args} variant="ghost" icon={Pencil} aria-label="Edit" />
      <IconButton {...args} variant="secondary" icon={Copy} aria-label="Duplicate" />
      <IconButton {...args} variant="primary" icon={Settings} aria-label="Settings" />
      <IconButton {...args} variant="danger" icon={Trash2} aria-label="Delete" />
    </div>
  ),
};

/** The recommended pairing: the tooltip shows the same words a screen reader announces. */
export const WithTooltip: Story = {
  render: (args) => (
    <Tooltip content={args['aria-label']}>
      <IconButton {...args} />
    </Tooltip>
  ),
  play: async ({ canvas, userEvent }) => {
    await userEvent.tab();
    await expect(canvas.getByRole('button', { name: 'Open settings' })).toHaveFocus();
  },
};

/** Loading keeps the square footprint. */
export const Loading: Story = { args: { isLoading: true, variant: 'secondary' } };

/** Disabled icon buttons leave the tab order. Prefer hiding actions the user can never take. */
export const Disabled: Story = { args: { isDisabled: true, variant: 'secondary' } };

/** A row of toolbar actions. Tab reaches each one, and Enter or Space activates it. */
export const KeyboardInteraction: Story = {
  render: (args) => (
    <div className="flex items-center gap-1">
      <IconButton {...args} icon={Pencil} aria-label="Edit" />
      <IconButton {...args} icon={Copy} aria-label="Duplicate" />
    </div>
  ),
  play: async ({ canvas, userEvent, args }) => {
    await userEvent.tab();
    await userEvent.tab();
    await expect(canvas.getByRole('button', { name: 'Duplicate' })).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await expect(args.onPress).toHaveBeenCalledTimes(1);
  },
};
