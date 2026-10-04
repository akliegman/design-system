import type { Meta, StoryObj } from '@storybook/react-vite';
import { Form } from 'react-aria-components';
import { expect, fn } from 'storybook/test';
import { Button } from '../Button';
import { TextField } from './TextField';

const meta = {
  title: 'Components/TextField',
  component: TextField,
  parameters: {
    docs: {
      description: {
        component: `
A single-line text input with a visible label, an optional description, and an error message. React Aria connects
all three with \`aria-labelledby\`, \`aria-describedby\` and \`aria-invalid\`, and runs native constraint validation
(\`isRequired\`, \`type="email"\`, \`minLength\`) when the field sits in a form.

### Do
- Always set \`label\`. Hide it visually only in rare, well-understood patterns like a search bar, and then use \`aria-label\`.
- Put format hints in \`description\` ("Use the email on your invoice"), not in the placeholder.
- Write error messages that say how to fix the problem: "Enter an email like name@example.com".

### Don't
- Don't use the placeholder as the label. It vanishes on input and fails contrast as a label.
- Don't validate on every keystroke. React Aria validates on blur and on submit.
- Don't disable fields to show they are read-only. Use \`isReadOnly\` so the value can still be selected and copied.
`,
      },
    },
  },
  argTypes: {
    label: { description: 'Visible label. Always required.' },
    description: { description: 'Persistent hint about format or constraints, read after the label.' },
    errorMessage: { description: 'Shown when invalid. Say how to fix it, not just that it is wrong.' },
    isRequired: { description: 'Adds a required marker and native required validation.' },
    isInvalid: { description: 'Force the invalid state, for errors that come from the server.' },
    isDisabled: {
      description: 'Not focusable and not submitted. Prefer `isReadOnly` for values the user cannot change.',
    },
    isReadOnly: { description: 'Focusable and selectable, but not editable.' },
    size: { control: 'inline-radio', options: ['sm', 'md'], description: 'Matches Button heights.' },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'search', 'tel', 'url'],
      description: 'Native input type. Picks the right mobile keyboard and built-in validation.',
    },
  },
  args: { label: 'Work email', placeholder: 'name@company.com', type: 'email', onChange: fn() },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** A description sits between label and input and is read as part of the field. */
export const WithDescription: Story = {
  args: { description: 'We send receipts and security alerts here.' },
};

/** Required fields show a marker; the requirement itself reaches screen readers through the native attribute. */
export const Required: Story = { args: { isRequired: true } };

/** Server-side errors use `isInvalid` with a specific message. */
export const Invalid: Story = {
  args: { isInvalid: true, defaultValue: 'adam@', errorMessage: 'Enter a full email address, like name@company.com.' },
};

/** Disabled fields are skipped by Tab and not submitted. */
export const Disabled: Story = { args: { isDisabled: true, defaultValue: 'adam@company.com' } };

/** Read-only fields stay focusable so the value can be copied. */
export const ReadOnly: Story = { args: { isReadOnly: true, defaultValue: 'adam@company.com', label: 'Account email' } };

/** Long labels and descriptions wrap; the input keeps its height. */
export const LongContent: Story = {
  args: {
    label: 'Email address for invoices, receipts and payment failure notifications',
    description:
      'Use a shared inbox if several people handle billing, so nobody misses a failed payment while someone is away.',
  },
  decorators: [(Story) => <div className="max-w-sm">{Story()}</div>],
};

/**
 * Native validation inside a form: submit with the field empty, and focus moves to the field with its error shown.
 * Type a valid value and the error clears.
 */
export const KeyboardValidation: Story = {
  args: { isRequired: true, errorMessage: 'Enter your work email.' },
  render: (args) => (
    <Form className="flex w-80 flex-col items-start gap-4" onSubmit={(event) => event.preventDefault()}>
      <TextField {...args} className="w-full" />
      <Button type="submit" variant="primary">
        Continue
      </Button>
    </Form>
  ),
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByRole('textbox', { name: /work email/i });
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.keyboard('{Enter}');
    await expect(input).toHaveAttribute('aria-invalid', 'true');
    await expect(input).toHaveFocus();
    await userEvent.type(input, 'adam@company.com');
    await userEvent.tab();
    await expect(input).not.toHaveAttribute('aria-invalid');
  },
};
