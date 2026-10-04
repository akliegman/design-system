import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, fn } from 'storybook/test';
import { Checkbox, CheckboxGroup } from './Checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  subcomponents: { CheckboxGroup },
  parameters: {
    docs: {
      description: {
        component: `
A binary choice, or a group of independent choices with \`CheckboxGroup\`. The whole label is the hit target. Checked
and indeterminate states fill with accent and change shape, so state never relies on color alone.

### Do
- Phrase labels as statements that are true when checked: "Email me when an invoice is paid".
- Use \`CheckboxGroup\` for related options so they share one label, description and error.
- Use \`isIndeterminate\` for a "select all" box whose children are partly checked.

### Don't
- Don't use a checkbox for a setting that applies immediately. Use a Switch.
- Don't use checkboxes for mutually exclusive options. Use a RadioGroup.
- Don't hide the label. If space is tight, shorten the copy.
`,
      },
    },
  },
  argTypes: {
    children: { description: 'Visible label, and part of the click target.', control: 'text' },
    isSelected: { description: 'Controlled checked state.' },
    defaultSelected: { description: 'Initial checked state when uncontrolled.' },
    isIndeterminate: { description: 'Partly checked. Only for parents of a set of checkboxes.' },
    isInvalid: { description: 'Shows the danger boundary, for required consent boxes left unchecked.' },
    isDisabled: { description: 'Removed from the tab order. Explain nearby why the option is unavailable.' },
  },
  args: { children: 'Email me when an invoice is paid', onChange: fn() },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Starts checked. */
export const Checked: Story = { args: { defaultSelected: true } };

/** A partly checked parent. */
export const Indeterminate: Story = { args: { isIndeterminate: true, children: 'All notifications' } };

/** Unchecked required consent. */
export const Invalid: Story = { args: { isInvalid: true, children: 'I agree to the terms of service' } };

/** Disabled in both states. */
export const Disabled: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3">
      <Checkbox {...args} isDisabled>
        Unavailable on your plan
      </Checkbox>
      <Checkbox {...args} isDisabled defaultSelected>
        Included with every plan
      </Checkbox>
    </div>
  ),
};

/** Long labels wrap and the box stays aligned with the first line. */
export const LongContent: Story = {
  args: {
    children:
      'Send a weekly summary of paid, pending and overdue invoices to every billing admin in this workspace, including people who joined this week',
  },
  decorators: [(Story) => <div className="max-w-sm">{Story()}</div>],
};

/** A group with a shared label and description. Value is the array of checked option values. */
export const Group: Story = {
  render: () => (
    <CheckboxGroup label="Notify me about" description="Sent to your work email." defaultValue={['paid']}>
      <Checkbox value="paid">Paid invoices</Checkbox>
      <Checkbox value="failed">Failed payments</Checkbox>
      <Checkbox value="renewal">Upcoming renewals</Checkbox>
    </CheckboxGroup>
  ),
};

/** A "select all" parent that is indeterminate while some children are checked. Space toggles the focused box. */
export const SelectAll: Story = {
  render: function SelectAllStory() {
    const options = ['paid', 'failed', 'renewal'];
    const [selected, setSelected] = useState<string[]>(['paid']);
    return (
      <div className="flex flex-col gap-2.5">
        <Checkbox
          isSelected={selected.length === options.length}
          isIndeterminate={selected.length > 0 && selected.length < options.length}
          onChange={(checked) => setSelected(checked ? options : [])}
        >
          All notifications
        </Checkbox>
        <CheckboxGroup label="Notifications" value={selected} onChange={setSelected} className="ps-6.5">
          <Checkbox value="paid">Paid invoices</Checkbox>
          <Checkbox value="failed">Failed payments</Checkbox>
          <Checkbox value="renewal">Upcoming renewals</Checkbox>
        </CheckboxGroup>
      </div>
    );
  },
  play: async ({ canvas, userEvent }) => {
    const all = canvas.getByRole('checkbox', { name: 'All notifications' });
    await expect(all).toHaveProperty('indeterminate', true);
    await userEvent.tab();
    await userEvent.keyboard(' ');
    await expect(all).toBeChecked();
    await expect(canvas.getByRole('checkbox', { name: 'Upcoming renewals' })).toBeChecked();
  },
};

/** Tab focuses the box and Space toggles it. */
export const KeyboardInteraction: Story = {
  play: async ({ canvas, userEvent, args }) => {
    const checkbox = canvas.getByRole('checkbox');
    await userEvent.tab();
    await expect(checkbox).toHaveFocus();
    await userEvent.keyboard(' ');
    await expect(checkbox).toBeChecked();
    await expect(args.onChange).toHaveBeenCalledWith(true);
  },
};
