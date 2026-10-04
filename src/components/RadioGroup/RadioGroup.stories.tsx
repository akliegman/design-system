import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import { Radio, RadioGroup } from './RadioGroup';

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  subcomponents: { Radio },
  parameters: {
    docs: {
      description: {
        component: `
Exactly one choice from a short list where seeing every option matters. The group is a single tab stop; arrow keys
move the selection, which is the native radio pattern screen reader users expect.

### Do
- Use it for two to six options that benefit from side-by-side comparison.
- Pre-select the safest or most common option when there is one.
- Use a description to explain consequences ("You can change this later").

### Don't
- Don't use it for more than about six options. Use a Select.
- Don't use a single radio. A lone yes/no choice is a Checkbox or Switch.
- Don't lay out options horizontally if any label is longer than two or three words.
`,
      },
    },
  },
  argTypes: {
    label: { description: 'Names the group. Required.' },
    description: { description: 'Context for the choice, read when the group receives focus.' },
    orientation: {
      description: '`vertical` by default. `horizontal` only for two or three short options.',
      control: 'inline-radio',
      options: ['vertical', 'horizontal'],
    },
    value: { description: 'Controlled selected value.' },
    defaultValue: { description: 'Initial value when uncontrolled.' },
    isInvalid: { description: 'Shows the error message and danger boundaries.' },
    errorMessage: { description: 'Explains what to choose.' },
    children: { description: 'Radio options.', control: false },
  },
  args: {
    label: 'Billing cycle',
    description: 'You can switch at the end of any cycle.',
    defaultValue: 'monthly',
    onChange: fn(),
    children: null,
  },
  render: (args) => (
    <RadioGroup {...args}>
      <Radio value="monthly">Monthly</Radio>
      <Radio value="quarterly">Quarterly</Radio>
      <Radio value="yearly">Yearly, two months free</Radio>
    </RadioGroup>
  ),
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Two or three short options can sit in a row. */
export const Horizontal: Story = { args: { orientation: 'horizontal' } };

/** Required with nothing chosen. */
export const Invalid: Story = {
  args: { defaultValue: undefined, isRequired: true, isInvalid: true, errorMessage: 'Choose a billing cycle.' },
};

/** A disabled option stays visible so users know it exists. */
export const DisabledOption: Story = {
  render: (args) => (
    <RadioGroup {...args}>
      <Radio value="monthly">Monthly</Radio>
      <Radio value="quarterly" isDisabled>
        Quarterly, not available in your region
      </Radio>
      <Radio value="yearly">Yearly</Radio>
    </RadioGroup>
  ),
};

/** Mirrored for right-to-left; arrow keys follow the visual direction. */
export const RightToLeft: Story = {
  args: { label: 'دورة الفوترة', description: undefined, orientation: 'horizontal' },
  render: (args) => (
    <div dir="rtl">
      <RadioGroup {...args}>
        <Radio value="monthly">شهري</Radio>
        <Radio value="yearly">سنوي</Radio>
      </RadioGroup>
    </div>
  ),
};

/** Tab enters the group on the selected radio; arrow keys move and select; Tab leaves. */
export const KeyboardInteraction: Story = {
  play: async ({ canvas, userEvent, args }) => {
    await userEvent.tab();
    await expect(canvas.getByRole('radio', { name: 'Monthly' })).toHaveFocus();
    await userEvent.keyboard('{ArrowDown}');
    await expect(canvas.getByRole('radio', { name: 'Quarterly' })).toBeChecked();
    await expect(args.onChange).toHaveBeenCalledWith('quarterly');
  },
};
