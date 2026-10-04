import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, screen, waitFor } from 'storybook/test';
import { Select, SelectItem } from './Select';

const timezones = [
  { id: 'pt', name: 'Pacific Time (Los Angeles)' },
  { id: 'mt', name: 'Mountain Time (Denver)' },
  { id: 'ct', name: 'Central Time (Chicago)' },
  { id: 'et', name: 'Eastern Time (New York)' },
  { id: 'gmt', name: 'Greenwich Mean Time (London)' },
  { id: 'cet', name: 'Central European Time (Berlin)' },
  { id: 'ist', name: 'India Standard Time (Mumbai)' },
  { id: 'jst', name: 'Japan Standard Time (Tokyo)' },
];

const meta = {
  title: 'Components/Select',
  component: Select,
  subcomponents: { SelectItem },
  parameters: {
    docs: {
      description: {
        component: `
Choose one option from a list that is too long to show as radios. React Aria implements the listbox pattern: the
trigger is a button, the popover is a listbox, typeahead jumps to matching options, and focus returns to the trigger
on close. The popover matches the trigger width.

### Do
- Use it for 6 or more options, or when space is tight.
- Sort options in an order users expect: alphabetical, chronological or by frequency.
- Write a placeholder that says what to choose: "Select a timezone".

### Don't
- Don't use it for two or three options. Use a RadioGroup so every choice is visible.
- Don't use it for navigation or actions. Use Tabs, Links or a menu.
- Don't put rich content such as descriptions and icons in every option if users need to compare them; use radios.
`,
      },
    },
  },
  argTypes: {
    label: { description: 'Visible label. Required.' },
    description: { description: 'Hint below the label.' },
    placeholder: { description: 'Shown until something is selected. Says what to pick.' },
    selectedKey: { description: 'Controlled selection, by option id.' },
    defaultSelectedKey: { description: 'Initial selection when uncontrolled.' },
    isInvalid: { description: 'Shows the error message and danger boundary.' },
    errorMessage: { description: 'Says what to choose.' },
    size: { control: 'inline-radio', options: ['sm', 'md'], description: 'Matches TextField and Button heights.' },
    children: { control: false, description: '`SelectItem` elements, or a render function when `items` is set.' },
  },
  args: {
    label: 'Timezone',
    placeholder: 'Select a timezone',
    onSelectionChange: fn(),
    children: null,
  },
  render: (args) => (
    <Select {...args} items={timezones} className="w-72">
      {(item) => <SelectItem id={item.id}>{item.name}</SelectItem>}
    </Select>
  ),
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** With a description and an initial value. */
export const WithValue: Story = {
  args: { defaultSelectedKey: 'et', description: 'Used for invoice dates and reminders.' },
};

/** Required and empty after a submit attempt. */
export const Invalid: Story = {
  args: { isRequired: true, isInvalid: true, errorMessage: 'Choose a timezone so reminders arrive on time.' },
};

/** Disabled select and a disabled option. */
export const Disabled: Story = {
  render: (args) => (
    <div className="flex flex-col gap-6">
      <Select {...args} isDisabled defaultSelectedKey="pt" className="w-72">
        <SelectItem id="pt">Pacific Time (Los Angeles)</SelectItem>
      </Select>
      <Select {...args} label="Region" className="w-72" disabledKeys={['eu']}>
        <SelectItem id="us">United States</SelectItem>
        <SelectItem id="eu">European Union, coming soon</SelectItem>
      </Select>
    </div>
  ),
};

/** Long option labels truncate in the trigger rather than resizing the layout. */
export const LongContent: Story = {
  args: { defaultSelectedKey: 'long' },
  render: (args) => (
    <Select {...args} label="Cost center" className="w-60">
      <SelectItem id="long">Platform engineering, shared infrastructure and developer tooling</SelectItem>
      <SelectItem id="short">Design</SelectItem>
    </Select>
  ),
};

/** Opens with the keyboard, moves with arrows, selects with Enter, and returns focus to the trigger. */
export const KeyboardInteraction: Story = {
  play: async ({ canvas, userEvent, args }) => {
    const trigger = await canvas.findByRole('button', { name: /timezone/i });
    await userEvent.tab();
    await expect(trigger).toHaveFocus();
    await userEvent.keyboard('{ArrowDown}');
    const listbox = await screen.findByRole('listbox');
    // The popover animates in from zero opacity, so visibility is checked until the entrance settles.
    await waitFor(() => expect(listbox).toBeVisible());
    await userEvent.keyboard('{ArrowDown}{Enter}');
    await waitFor(() => expect(screen.queryByRole('listbox')).not.toBeInTheDocument());
    await expect(args.onSelectionChange).toHaveBeenCalledWith('mt');
    await waitFor(() => expect(trigger).toHaveFocus());
  },
};
