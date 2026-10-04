import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Text } from '../Text';
import { Heading } from './Heading';

const meta = {
  title: 'Components/Heading',
  component: Heading,
  parameters: {
    docs: {
      description: {
        component: `
Section headings with semantics and appearance separated. \`level\` builds the document outline that screen reader
users navigate by; \`size\` controls how it looks. Each level has a default size, so most headings only need \`level\`.

### Do
- Pick \`level\` from the page structure: one \`1\`, then nest without skipping levels.
- Override \`size\` when the design calls for a smaller look at the same level, such as a dialog title.
- Keep headings short enough to scan; long ones balance across lines automatically.

### Don't
- Don't choose a level for its size. A visually small h2 is still an h2.
- Don't use Heading for emphasis inside body copy. Use Text with \`weight="medium"\`.
- Don't color headings with status tones; headings name sections, they do not report state.
`,
      },
    },
  },
  argTypes: {
    level: {
      description: 'Position in the document outline. Renders h1 through h6.',
      control: 'inline-radio',
      options: [1, 2, 3, 4, 5, 6],
    },
    size: {
      description: 'Visual size. Leave unset to use the default for the level.',
      control: 'select',
      options: [undefined, 'base', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'],
    },
  },
  args: { level: 1, children: 'Billing settings' },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Every level at its default size. */
export const Levels: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {([1, 2, 3, 4, 5, 6] as const).map((level) => (
        <Heading key={level} level={level}>
          Heading level {level}
        </Heading>
      ))}
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole('heading')).toHaveLength(6);
    await expect(canvas.getByRole('heading', { level: 3 })).toHaveTextContent('Heading level 3');
  },
};

/** Same h2 semantics, smaller look: the case `size` exists for. */
export const SizeIndependentOfLevel: Story = {
  args: { level: 2, size: 'lg', children: 'Payment method' },
};

/** Long headings balance across lines instead of leaving a single orphaned word. */
export const LongContent: Story = {
  args: { level: 2, children: 'Everything you need to know before migrating your workspace to the new billing model' },
  decorators: [(Story) => <div className="max-w-md">{Story()}</div>],
};

/** A heading with its supporting text, the most common pairing. */
export const WithDescription: Story = {
  render: (args) => (
    <div className="flex flex-col gap-1.5">
      <Heading {...args} />
      <Text tone="muted">Manage how you pay and where invoices are sent.</Text>
    </div>
  ),
};

/** Right-to-left scripts align to the start edge. */
export const RightToLeft: Story = {
  args: { children: 'إعدادات الفوترة' },
  decorators: [(Story) => <div dir="rtl">{Story()}</div>],
};
