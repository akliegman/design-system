import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import { Switch } from './Switch';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    docs: {
      description: {
        component: `
An on/off setting that takes effect the moment it changes. Exposed as \`role="switch"\`. The thumb changes position
and color, and the track changes fill, so state does not rely on color alone.

### Do
- Apply the change immediately and show its effect; a switch implies no Save button.
- Name the setting, not the action: "Email notifications".
- Group related switches in a list with consistent label alignment.

### Don't
- Don't use a switch inside a form that is submitted later. Use a Checkbox.
- Don't change the label when the state changes ("On" / "Off"); the switch state already says it.
- Don't use a switch for choices with more than two states. Use a RadioGroup or Select.
`,
      },
    },
  },
  argTypes: {
    children: { description: 'The setting name.', control: 'text' },
    isSelected: { description: 'Controlled on state.' },
    defaultSelected: { description: 'Initial state when uncontrolled.' },
    size: { description: '`sm` for dense settings lists.', control: 'inline-radio', options: ['sm', 'md'] },
    isDisabled: { description: 'Locked setting. Say why nearby.' },
  },
  args: { children: 'Email notifications', onChange: fn() },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** On. */
export const On: Story = { args: { defaultSelected: true } };

/** Both sizes, both states. */
export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3">
      <Switch {...args} size="sm">
        Compact
      </Switch>
      <Switch {...args} size="sm" defaultSelected>
        Compact, on
      </Switch>
      <Switch {...args} size="md">
        Default
      </Switch>
      <Switch {...args} size="md" defaultSelected>
        Default, on
      </Switch>
    </div>
  ),
};

/** Disabled, keeping its state visible. */
export const Disabled: Story = { args: { isDisabled: true, defaultSelected: true, children: 'Managed by your admin' } };

/** The thumb travels toward the start edge in right-to-left layouts. */
export const RightToLeft: Story = {
  args: { children: 'إشعارات البريد الإلكتروني', defaultSelected: true },
  decorators: [(Story) => <div dir="rtl">{Story()}</div>],
};

/** Space toggles the focused switch. */
export const KeyboardInteraction: Story = {
  play: async ({ canvas, userEvent, args }) => {
    const control = canvas.getByRole('switch', { name: 'Email notifications' });
    await userEvent.tab();
    await expect(control).toHaveFocus();
    await userEvent.keyboard(' ');
    await expect(control).toBeChecked();
    await expect(args.onChange).toHaveBeenCalledWith(true);
  },
};
