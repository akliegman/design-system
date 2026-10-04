import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArrowRight, Download, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { expect, fn } from 'storybook/test';
import { Button } from './Button';

const icons = { none: undefined, Plus, ArrowRight, Download, Trash2 };

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: `
Triggers an action in place: submits a form, opens a dialog, saves. Built on React Aria's \`Button\`, so press handling
is consistent across mouse, touch, keyboard and screen readers, and \`onPress\` never fires for a disabled button.

### Do
- Write the label as a verb phrase that names the outcome: "Save changes", "Invite member".
- Use \`isLoading\` for async work. It keeps focus on the button, keeps its width, and announces the busy state.
- Keep one \`primary\` per view, and put it at the trailing edge of its button row.

### Don't
- Don't use Button for navigation. Use \`LinkButton\`, which renders an anchor and works with new tabs and history.
- Don't disable a submit button to signal invalid input. Let the user submit and show field errors instead.
- Don't override colors through \`className\`. Pick a \`variant\`; \`className\` is for layout such as width or margin.
`,
      },
    },
  },
  argTypes: {
    variant: {
      description:
        'Visual weight. `primary` for the one main action, `secondary` beside it, `ghost` in dense toolbars, `danger` for destructive actions.',
      control: 'inline-radio',
      options: ['primary', 'secondary', 'ghost', 'danger'],
      table: { defaultValue: { summary: 'secondary' } },
    },
    size: {
      description:
        'Height. `md` for forms and dialogs, `sm` in tables and toolbars, `lg` on touch-first or marketing surfaces.',
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      table: { defaultValue: { summary: 'md' } },
    },
    isLoading: {
      description:
        'Set while the action is in flight. Prevents double submission without moving focus or resizing the button.',
    },
    isDisabled: {
      description:
        'Use sparingly. Disabled buttons cannot be focused, so users cannot discover why they are unavailable.',
    },
    iconStart: {
      description: 'Decorative icon before the label. Reinforces the label; never replaces it.',
      options: Object.keys(icons),
      mapping: icons,
      control: 'select',
    },
    iconEnd: {
      description: 'Decorative icon after the label, usually a direction hint such as an arrow.',
      options: Object.keys(icons),
      mapping: icons,
      control: 'select',
    },
    onPress: {
      description:
        'Fires on click, tap, Enter or Space. Prefer it over `onClick`; it ignores disabled and loading states.',
    },
    children: { description: 'The label. A short verb phrase.', control: 'text' },
  },
  args: { children: 'Save changes', variant: 'primary', size: 'md', onPress: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** All four variants in their usual order of emphasis. */
export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args} variant="primary">
        Publish
      </Button>
      <Button {...args} variant="secondary">
        Save draft
      </Button>
      <Button {...args} variant="ghost">
        Cancel
      </Button>
      <Button {...args} variant="danger" iconStart={Trash2}>
        Delete
      </Button>
    </div>
  ),
};

/** Sizes share horizontal rhythm with IconButton, TextField and Select of the same size. */
export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
    </div>
  ),
};

/** Icons sit inside the button's gap and scale with its size. */
export const WithIcons: Story = {
  args: { children: 'Continue', iconEnd: ArrowRight },
};

/**
 * Press the button: the label hides but still sizes the button, so nothing shifts. The button stays focusable and
 * announces "Loading"; further presses are ignored until the work finishes.
 */
export const Loading: Story = {
  render: function LoadingStory(args) {
    const [isLoading, setLoading] = useState(false);
    return (
      <Button
        {...args}
        isLoading={isLoading}
        onPress={(event) => {
          args.onPress?.(event);
          setLoading(true);
          setTimeout(() => setLoading(false), 2000);
        }}
      />
    );
  },
  play: async ({ canvas, userEvent, args }) => {
    const button = canvas.getByRole('button', { name: /save changes/i });
    await userEvent.click(button);
    await expect(button).toHaveAttribute('aria-busy', 'true');
    await userEvent.click(button);
    await expect(args.onPress).toHaveBeenCalledTimes(1);
  },
};

/** Disabled buttons are removed from the tab order and ignore presses. */
export const Disabled: Story = {
  args: { isDisabled: true },
  play: async ({ canvas, userEvent, args }) => {
    await userEvent.click(canvas.getByRole('button'));
    await expect(args.onPress).not.toHaveBeenCalled();
  },
};

/** Labels never wrap. Long labels are a copy problem; shorten them rather than letting the button grow tall. */
export const LongLabel: Story = {
  args: { children: 'Export all invoices from the last fiscal year', iconStart: Download },
};

/** Tab to the button, then press Enter and Space. Both fire `onPress` once, and the focus ring appears only for keyboard focus. */
export const KeyboardInteraction: Story = {
  play: async ({ canvas, userEvent, args }) => {
    const button = canvas.getByRole('button');
    await userEvent.tab();
    await expect(button).toHaveFocus();
    await expect(button).toHaveAttribute('data-focus-visible', 'true');
    await userEvent.keyboard('{Enter}');
    await userEvent.keyboard(' ');
    await expect(args.onPress).toHaveBeenCalledTimes(2);
  },
};
