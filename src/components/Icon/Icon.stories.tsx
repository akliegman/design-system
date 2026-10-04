import type { Meta, StoryObj } from '@storybook/react-vite';
import { AlertTriangle, Bell, Check, Info, Search, Settings } from 'lucide-react';
import { expect } from 'storybook/test';
import { Text } from '../Text';
import { Icon } from './Icon';

const icons = { Bell, Check, Info, Search, Settings, AlertTriangle };

const meta = {
  title: 'Components/Icon',
  component: Icon,
  parameters: {
    docs: {
      description: {
        component: `
A thin wrapper over lucide-react that fixes stroke weight and sizes to the type scale, and makes the accessibility
decision explicit: without \`label\` the icon is decorative and hidden; with \`label\` it becomes \`role="img"\` with that
name. Icons inherit \`currentColor\`, so they follow whatever text they sit beside.

### Do
- Leave \`label\` off when adjacent text says the same thing.
- Add \`label\` when the icon alone carries meaning, such as a status glyph in a table cell.
- Match \`size\` to the neighboring text: \`sm\` beside base text, \`md\` beside lg.

### Don't
- Don't make an Icon interactive. Wrap it in IconButton, which provides the button semantics and focus ring.
- Don't color icons with raw palette classes. They inherit the text color; set a Text tone instead.
- Don't mix icon sets. Every icon in the system comes from lucide so stroke and corner style match.
`,
      },
    },
  },
  argTypes: {
    icon: { options: Object.keys(icons), mapping: icons, control: 'select', description: 'Any lucide-react icon.' },
    size: {
      description: 'Optical size tied to the type scale.',
      control: 'inline-radio',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    label: { description: 'Set only when the icon is the sole carrier of meaning. Becomes the accessible name.' },
  },
  args: { icon: Bell, size: 'md' },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** The four sizes. */
export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-end gap-4">
      {(['xs', 'sm', 'md', 'lg'] as const).map((size) => (
        <Icon key={size} {...args} size={size} />
      ))}
    </div>
  ),
};

/** A meaningful icon with a label is exposed as an image with that name. */
export const Meaningful: Story = {
  args: { icon: AlertTriangle, label: 'Warning', className: 'text-warning' },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('img', { name: 'Warning' })).toBeInTheDocument();
  },
};

/** Icons take the color of the surrounding text. */
export const InheritsColor: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Text tone="success" className="flex items-center gap-1.5">
        <Icon icon={Check} /> Payment received
      </Text>
      <Text tone="accent" className="flex items-center gap-1.5">
        <Icon icon={Info} /> Renews on 1 November
      </Text>
    </div>
  ),
};
