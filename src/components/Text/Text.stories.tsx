import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Text } from './Text';

const meta = {
  title: 'Components/Text',
  component: Text,
  parameters: {
    docs: {
      description: {
        component: `
Body and UI text on the type scale. Every tone maps to a semantic color role that passes 4.5:1 on every surface in
both themes; the contrast test enforces it.

### Do
- Use \`tone="muted"\` for supporting copy. It is tested for contrast, so it is safe for real content.
- Use \`as="span"\` inside other text, and \`family="mono"\` for IDs, code and numbers that should align.
- Cap long-form paragraphs with \`max-w-prose\` for a comfortable line length.

### Don't
- Don't use status tones decoratively. \`danger\` means something went wrong.
- Don't fake headings with \`size="lg" weight="semibold"\`. Use Heading so the outline stays correct.
- Don't set raw colors through \`className\`. Pick a tone; \`className\` is for layout.
`,
      },
    },
  },
  argTypes: {
    as: {
      description: 'Element to render. `p` for paragraphs, `span` inline, `div` around block content.',
      control: 'select',
      options: ['p', 'span', 'div', 'strong', 'em', 'small', 'code'],
    },
    size: {
      description: '`base` for UI and body, `md` for long reading, `sm` and `xs` for supporting detail.',
      control: 'inline-radio',
      options: ['xs', 'sm', 'base', 'md', 'lg'],
    },
    tone: {
      description: 'Semantic color. Status tones only for messages about that status.',
      control: 'inline-radio',
      options: ['default', 'muted', 'accent', 'danger', 'success', 'warning'],
    },
    weight: {
      control: 'inline-radio',
      options: ['regular', 'medium', 'semibold'],
      description: 'Use `medium` for emphasis in UI.',
    },
    family: { control: 'inline-radio', options: ['sans', 'mono'], description: '`mono` for code and tabular values.' },
  },
  args: { children: 'Invoices are sent on the first business day of each month.' },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** The type scale from xs to lg. */
export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-2">
      {(['xs', 'sm', 'base', 'md', 'lg'] as const).map((size) => (
        <Text key={size} {...args} size={size}>
          {size}: The quick brown fox jumps over the lazy dog.
        </Text>
      ))}
    </div>
  ),
};

/** Every tone. Each passes 4.5:1 against surface and surface-raised in both themes. */
export const Tones: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Text>Default text for most content.</Text>
      <Text tone="muted">Muted text for descriptions and metadata.</Text>
      <Text tone="accent">Accent text for highlighted values.</Text>
      <Text tone="danger">Danger text for errors.</Text>
      <Text tone="success">Success text for confirmations.</Text>
      <Text tone="warning">Warning text for things that need attention.</Text>
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/Muted text/)).toHaveClass('text-fg-muted');
  },
};

/** A long paragraph wraps within a readable measure. */
export const LongContent: Story = {
  args: {
    size: 'md',
    className: 'max-w-prose',
    children:
      'Tokens are the contract between design and code. Primitives describe what a color is; semantic roles describe what it is for. Components only ever reference roles, which is why a theme can change every color in the product without touching a single component file, and why the contrast of every pairing can be tested before anything ships.',
  },
};

/** Monospace for identifiers. */
export const Mono: Story = { args: { family: 'mono', size: 'sm', children: 'inv_01J9Z3K4R8M2' } };

/** Arabic text flows right to left with the same scale. */
export const RightToLeft: Story = {
  args: { children: 'يتم إرسال الفواتير في أول يوم عمل من كل شهر.' },
  decorators: [(Story) => <div dir="rtl">{Story()}</div>],
};
