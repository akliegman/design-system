import type { Meta, StoryObj } from '@storybook/react-vite';
import { AlertTriangle, CheckCircle2, Clock, Sparkles, XCircle } from 'lucide-react';
import { expect } from 'storybook/test';
import { Badge } from './Badge';

const icons = { none: undefined, CheckCircle2, AlertTriangle, XCircle, Clock, Sparkles };

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    docs: {
      description: {
        component: `
A compact, non-interactive status label. Each tone pairs a tinted background with a text role that passes 4.5:1 on it
in both themes.

### Do
- Keep the label to one or two words: "Paid", "Past due", "Draft".
- Pick the tone from what the status means, and use it consistently across the product.
- Add an icon when badges appear in long lists, so status is scannable without reading color.

### Don't
- Don't make a Badge clickable. Use a ToggleButton or Link for anything interactive.
- Don't rely on tone alone to carry meaning. The label must say the status.
- Don't use \`accent\` for warnings or errors just because it stands out.
`,
      },
    },
  },
  argTypes: {
    tone: {
      description: 'What the status means. `neutral` for metadata, status tones only for matching states.',
      control: 'inline-radio',
      options: ['neutral', 'accent', 'success', 'warning', 'danger'],
    },
    size: { description: '`sm` inside tables and dense lists.', control: 'inline-radio', options: ['sm', 'md'] },
    icon: { options: Object.keys(icons), mapping: icons, control: 'select', description: 'Optional, decorative.' },
  },
  args: { children: 'Paid', tone: 'success', icon: CheckCircle2 },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Every tone with a realistic label. */
export const Tones: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge tone="neutral">Draft</Badge>
      <Badge tone="accent" icon={Sparkles}>
        New
      </Badge>
      <Badge tone="success" icon={CheckCircle2}>
        Paid
      </Badge>
      <Badge tone="warning" icon={Clock}>
        Due soon
      </Badge>
      <Badge tone="danger" icon={XCircle}>
        Overdue
      </Badge>
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Overdue')).toBeVisible();
  },
};

/** The small size for tables. */
export const Small: Story = { args: { size: 'sm', children: 'Past due', tone: 'danger', icon: XCircle } };

/** Badges never wrap. A long label is a sign the content belongs in Text instead. */
export const LongContent: Story = {
  args: { tone: 'warning', icon: AlertTriangle, children: 'Awaiting customer signature' },
};
