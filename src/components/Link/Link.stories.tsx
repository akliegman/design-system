import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Text } from '../Text';
import { Link } from './Link';

const meta = {
  title: 'Components/Link',
  component: Link,
  parameters: {
    docs: {
      description: {
        component: `
Inline navigation. Underlined by default so links are distinguishable without color (WCAG 1.4.1). Absolute http(s)
URLs are treated as external: they open in a new tab with \`rel="noopener noreferrer"\`, get an arrow, and tell
screen reader users that a new tab will open.

### Do
- Write link text that makes sense out of context: "Read the migration guide", not "click here".
- Keep \`underline="always"\` inside paragraphs.
- Set \`isExternal={false}\` for absolute URLs on your own domain that should stay in the tab.

### Don't
- Don't use Link for actions that do not navigate. Use a Button.
- Don't style a Link to look like a button. Use LinkButton.
- Don't open internal pages in new tabs; it breaks the back button.
`,
      },
    },
  },
  argTypes: {
    href: { description: 'Destination. Absolute http(s) URLs are external unless `isExternal` is false.' },
    tone: {
      description: '`accent` for links in content, `inherit` for footers and metadata.',
      control: 'inline-radio',
      options: ['accent', 'inherit'],
    },
    underline: {
      description: '`always` inside prose; `hover` only where position already makes the link obvious.',
      control: 'inline-radio',
      options: ['always', 'hover'],
    },
    isExternal: { description: 'Override the automatic external detection.' },
  },
  args: { href: '#tokens', children: 'Read about tokens' },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Opens in a new tab. The arrow is decorative; the visually hidden suffix is what screen readers hear. */
export const External: Story = {
  args: { href: 'https://www.w3.org/WAI/WCAG22/quickref/', children: 'WCAG 2.2 quick reference' },
  play: async ({ canvas }) => {
    const link = canvas.getByRole('link', { name: /WCAG 2.2 quick reference \(opens in a new tab\)/ });
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  },
};

/** Links inside a paragraph wrap with the text, external icon included. */
export const InProse: Story = {
  render: (args) => (
    <Text className="max-w-prose">
      Every color in this system resolves through a semantic role. The <Link {...args}>token reference</Link> lists each
      role, and the{' '}
      <Link href="https://design-tokens.github.io/community-group/format/">Design Tokens Community Group format</Link>{' '}
      explains the JSON shape the build script reads.
    </Text>
  ),
};

/** Muted links for footers, where an accent color would compete with content. */
export const InheritTone: Story = {
  render: (args) => (
    <Text tone="muted" size="sm">
      Built by Adam Kliegman.{' '}
      <Link {...args} tone="inherit" underline="hover" href="#source">
        View source
      </Link>
    </Text>
  ),
};

/** Disabled links are not focusable and drop their underline. */
export const Disabled: Story = { args: { isDisabled: true } };

/** Tab moves focus to the link; the focus ring hugs the text. */
export const KeyboardInteraction: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.tab();
    await expect(canvas.getByRole('link')).toHaveFocus();
  },
};
