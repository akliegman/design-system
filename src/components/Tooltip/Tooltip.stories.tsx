import type { Meta, StoryObj } from '@storybook/react-vite';
import { Copy, Info, Pencil } from 'lucide-react';
import { expect, screen, waitFor } from 'storybook/test';
import { Button } from '../Button';
import { IconButton } from '../IconButton';
import { Tooltip } from './Tooltip';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    docs: {
      description: {
        component: `
A short label that appears on hover after a delay and immediately on keyboard focus. It is linked to its trigger with
\`aria-describedby\`, closes on Escape, and never traps focus. Once one tooltip is open, neighbors open without delay
so scanning a toolbar is quick.

### Do
- Pair every IconButton with a tooltip that repeats its \`aria-label\`.
- Keep it to a few words. Show keyboard shortcuts here if the action has one.
- Use a focusable React Aria trigger: Button, IconButton, Link, ToggleButton.

### Don't
- Don't put links, buttons or anything interactive inside. The tooltip disappears when focus moves.
- Don't hide information the user needs to complete a task. Put it in visible text.
- Don't attach tooltips to disabled controls; they cannot receive focus, so keyboard users never see it.
`,
      },
    },
  },
  argTypes: {
    content: { description: 'The tooltip text. A few words.', control: 'text' },
    placement: {
      description: 'Preferred side. Flips automatically when there is no room.',
      control: 'select',
      options: ['top', 'bottom', 'start', 'end'],
    },
    delay: { description: 'Hover delay in ms before opening. Keyboard focus ignores it.' },
    isDisabled: { description: 'Suppress the tooltip without restructuring the tree.' },
    children: { control: false, description: 'A single focusable React Aria element.' },
  },
  args: {
    content: 'Edit invoice',
    placement: 'top',
    children: <IconButton icon={Pencil} aria-label="Edit invoice" variant="secondary" />,
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Placement on each side. */
export const Placements: Story = {
  render: (args) => (
    <div className="grid grid-cols-2 gap-4 p-10">
      {(['top', 'bottom', 'start', 'end'] as const).map((placement) => (
        <Tooltip key={placement} {...args} placement={placement} content={`Placed ${placement}`}>
          <Button size="sm">{placement}</Button>
        </Tooltip>
      ))}
    </div>
  ),
};

/** Long text wraps at a fixed maximum width. If it needs more than two lines, it belongs on the page. */
export const LongContent: Story = {
  args: {
    content: 'Invoices are numbered per workspace and cannot be renumbered once sent.',
    children: <IconButton icon={Info} aria-label="About invoice numbers" />,
  },
};

/** A toolbar: hover one, then move to the next, and the second opens without waiting. */
export const Toolbar: Story = {
  render: () => (
    <div className="flex gap-1">
      <Tooltip content="Edit">
        <IconButton icon={Pencil} aria-label="Edit" />
      </Tooltip>
      <Tooltip content="Duplicate">
        <IconButton icon={Copy} aria-label="Duplicate" />
      </Tooltip>
    </div>
  ),
};

/** Keyboard focus opens it immediately; Escape closes it while focus stays on the trigger. */
export const KeyboardInteraction: Story = {
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole('button', { name: 'Edit invoice' });
    await userEvent.tab();
    const tooltip = await screen.findByRole('tooltip');
    await expect(tooltip).toHaveTextContent('Edit invoice');
    await expect(trigger).toHaveAttribute('aria-describedby', tooltip.id);
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('tooltip')).not.toBeInTheDocument());
    await expect(trigger).toHaveFocus();
  },
};
