import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Card } from '../Card';
import { Heading } from '../Heading';
import { Text } from '../Text';
import { ThemeToggle } from '../ThemeToggle';
import { ThemeProvider, useTheme } from './ThemeProvider';

function ThemeReadout() {
  const { theme, resolvedTheme } = useTheme();
  return (
    <Card className="w-96">
      <Card.Header>
        <div className="flex items-center justify-between">
          <Heading level={3} size="lg">
            Appearance
          </Heading>
          <ThemeToggle />
        </div>
        <Text tone="muted">
          Preference <Badge size="sm">{theme}</Badge>, showing <Badge size="sm">{resolvedTheme}</Badge>
        </Text>
      </Card.Header>
      <Card.Body>
        <Text>
          Every color here comes from a semantic role resolved with light-dark(), so nothing re-renders to theme.
        </Text>
      </Card.Body>
      <Card.Footer>
        <Button variant="primary" size="sm">
          Save
        </Button>
      </Card.Footer>
    </Card>
  );
}

const meta = {
  title: 'Components/ThemeProvider',
  component: ThemeProvider,
  subcomponents: { ThemeToggle },
  parameters: {
    docs: {
      description: {
        component: `
Owns the light, dark or system preference. It writes \`data-theme\` on \`<html>\`, which sets \`color-scheme\`, which
switches every \`light-dark()\` token at once. Components never read the theme. Render \`ThemeScript\` in the document
head so a stored choice is applied before first paint; "system" needs no script because the tokens follow
\`prefers-color-scheme\` by default.

\`\`\`tsx
<head>
  <ThemeScript />
</head>
<body>
  <ThemeProvider>{app}</ThemeProvider>
</body>
\`\`\`

### Do
- Render \`ThemeScript\` before any stylesheet that paints, with the same \`storageKey\` as the provider.
- Default to \`system\`, and let users override it.
- Use \`resolvedTheme\` only for things CSS cannot theme, such as choosing a chart library palette.

### Don't
- Don't branch component styles on the theme in JavaScript. Use semantic tokens.
- Don't render more than one provider per document; they would fight over the root attribute.
- Don't store the theme in a cookie and render it on the server unless the script is removed; one source of truth.
`,
      },
    },
  },
  argTypes: {
    defaultTheme: {
      description: 'Used when nothing is stored.',
      control: 'inline-radio',
      options: ['system', 'light', 'dark'],
    },
    storageKey: { description: 'localStorage key, shared with ThemeScript.' },
    children: { control: false },
  },
  args: { defaultTheme: 'system', storageKey: 'ds-theme-story', children: null },
  render: (args) => (
    <ThemeProvider {...args}>
      <ThemeReadout />
    </ThemeProvider>
  ),
} satisfies Meta<typeof ThemeProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Choose a theme in the card. The toolbar theme switch is a separate, Storybook-only control. */
export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('radio', { name: 'Dark theme' }));
    await expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
    await userEvent.click(canvas.getByRole('radio', { name: 'Match system theme' }));
  },
};
