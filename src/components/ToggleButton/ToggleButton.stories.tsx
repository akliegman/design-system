import type { Meta, StoryObj } from '@storybook/react-vite';
import { Bold, Italic, Pin, Star, Underline } from 'lucide-react';
import { ToggleButtonGroup } from 'react-aria-components';
import { expect, fn } from 'storybook/test';
import { ToggleButton } from './ToggleButton';

const meta = {
  title: 'Components/ToggleButton',
  component: ToggleButton,
  parameters: {
    docs: {
      description: {
        component: `
A button with an on and off state, exposed to assistive technology as \`aria-pressed\`. Selected toggles use the accent
tint plus a border so the state does not rely on color alone. Group several with React Aria's \`ToggleButtonGroup\`
for single or multiple selection with arrow-key navigation.

### Do
- Label the state, not the action: "Bold", "Pinned". Screen readers announce "Bold, toggle button, pressed".
- Use \`ghost\` inside a toolbar or group and \`secondary\` when the toggle stands alone.
- Give icon-only toggles an \`aria-label\`; the types require it.

### Don't
- Don't change the label when the state changes ("Pin" to "Unpin"). The pressed state already says it.
- Don't use a toggle for a setting that applies on save; use a Checkbox or Switch in a form.
- Don't use a group of toggles for navigation between views. Use Tabs.
`,
      },
    },
  },
  argTypes: {
    variant: {
      description: '`secondary` for a standalone toggle, `ghost` inside a toolbar or group.',
      control: 'inline-radio',
      options: ['secondary', 'ghost'],
      table: { defaultValue: { summary: 'secondary' } },
    },
    size: { control: 'inline-radio', options: ['sm', 'md'], description: 'Matches Button heights.' },
    isSelected: { description: 'Controlled pressed state. Pair with `onChange`.' },
    defaultSelected: { description: 'Initial pressed state when uncontrolled.' },
    onChange: { description: 'Called with the next pressed state.' },
  },
  args: { children: 'Pin', icon: Pin, onChange: fn() },
} satisfies Meta<typeof ToggleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Starts pressed. */
export const Selected: Story = { args: { defaultSelected: true, children: 'Starred', icon: Star } };

/** Icon-only toggles are square and must carry an aria-label. */
export const IconOnly: Story = {
  args: { children: undefined, icon: Bold, 'aria-label': 'Bold', variant: 'ghost' },
};

/** A formatting toolbar. Arrow keys move between the toggles; Tab leaves the group. */
export const Group: Story = {
  render: () => (
    <ToggleButtonGroup selectionMode="multiple" aria-label="Text formatting" className="flex gap-1">
      <ToggleButton id="bold" icon={Bold} aria-label="Bold" variant="ghost" />
      <ToggleButton id="italic" icon={Italic} aria-label="Italic" variant="ghost" />
      <ToggleButton id="underline" icon={Underline} aria-label="Underline" variant="ghost" />
    </ToggleButtonGroup>
  ),
  play: async ({ canvas, userEvent }) => {
    await userEvent.tab();
    await expect(canvas.getByRole('button', { name: 'Bold' })).toHaveFocus();
    await userEvent.keyboard('{ArrowRight}');
    await expect(canvas.getByRole('button', { name: 'Italic' })).toHaveFocus();
    await userEvent.keyboard(' ');
    await expect(canvas.getByRole('button', { name: 'Italic' })).toHaveAttribute('aria-pressed', 'true');
  },
};

/** Disabled toggles keep their pressed state visible but cannot change it. */
export const Disabled: Story = { args: { isDisabled: true, defaultSelected: true } };

/** Space and Enter flip the state; `aria-pressed` follows. */
export const KeyboardInteraction: Story = {
  play: async ({ canvas, userEvent, args }) => {
    const toggle = canvas.getByRole('button', { name: 'Pin' });
    await userEvent.tab();
    await userEvent.keyboard(' ');
    await expect(toggle).toHaveAttribute('aria-pressed', 'true');
    await userEvent.keyboard('{Enter}');
    await expect(toggle).toHaveAttribute('aria-pressed', 'false');
    await expect(args.onChange).toHaveBeenCalledTimes(2);
  },
};
