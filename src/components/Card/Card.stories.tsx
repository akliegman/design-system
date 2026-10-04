import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Heading } from '../Heading';
import { Link } from '../Link';
import { Text } from '../Text';
import { Card } from './Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    docs: {
      description: {
        component: `
A raised surface that groups related content. It is a compound component: \`Card.Header\`, \`Card.Body\` and
\`Card.Footer\` own the spacing so every card in the product has the same rhythm. The card itself is not interactive.

### Do
- Put a Heading in \`Card.Header\` at the level that fits the page outline.
- Put actions in \`Card.Footer\`, primary last, so they land at the trailing edge.
- Use \`elevation="flat"\` for cards packed into a grid.

### Don't
- Don't make the whole card a click target. Put a Link in the heading so the target is explicit and keyboard reachable.
- Don't nest cards. Use a divider or spacing inside one card instead.
- Don't override padding per card; if a layout needs different spacing, it needs a different component.
`,
      },
    },
  },
  argTypes: {
    elevation: {
      description: '`raised` lifts the card off the page; `flat` relies on the border alone.',
      control: 'inline-radio',
      options: ['flat', 'raised'],
    },
  },
  args: { elevation: 'raised' },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Card {...args} className="w-96">
      <Card.Header>
        <div className="flex items-center justify-between gap-2">
          <Heading level={3} size="lg">
            Pro plan
          </Heading>
          <Badge tone="success" size="sm">
            Active
          </Badge>
        </div>
        <Text tone="muted">Renews on 1 November 2026.</Text>
      </Card.Header>
      <Card.Body>
        <Text>Unlimited projects, 20 seats and priority support. You are using 14 of 20 seats.</Text>
      </Card.Body>
      <Card.Footer>
        <Button variant="ghost" size="sm" onPress={fn()}>
          Cancel plan
        </Button>
        <Button variant="primary" size="sm" onPress={fn()}>
          Add seats
        </Button>
      </Card.Footer>
    </Card>
  ),
};

/** Flat cards in a grid. The heading link is the click target, and Tab moves between cards through it. */
export const FlatGrid: Story = {
  args: { elevation: 'flat' },
  render: (args) => (
    <div className="grid w-[40rem] grid-cols-2 gap-4">
      {['Tokens', 'Accessibility'].map((title) => (
        <Card key={title} {...args}>
          <Card.Header>
            <Heading level={3} size="md">
              <Link href={`#${title.toLowerCase()}`} underline="hover">
                {title}
              </Link>
            </Heading>
          </Card.Header>
          <Card.Body>
            <Text tone="muted">How the system handles {title.toLowerCase()}, and what it enforces.</Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  ),
  play: async ({ canvas, userEvent }) => {
    await userEvent.tab();
    await expect(canvas.getByRole('link', { name: 'Tokens' })).toHaveFocus();
    await userEvent.tab();
    await expect(canvas.getByRole('link', { name: 'Accessibility' })).toHaveFocus();
  },
};

/** Long content grows the body; header and footer keep their spacing. */
export const LongContent: Story = {
  render: (args) => (
    <Card {...args} className="w-96">
      <Card.Header>
        <Heading level={3} size="lg">
          Release notes
        </Heading>
      </Card.Header>
      <Card.Body className="flex flex-col gap-3">
        <Text>
          Select now opens on arrow keys and matches typed characters, so long option lists are quick to navigate
          without a mouse.
        </Text>
        <Text>
          The popover width is tied to the trigger, so long option labels truncate instead of reflowing the page around
          an open menu.
        </Text>
        <Text>
          Dialog bodies scroll independently of their title, which keeps the close button and the accessible name in
          view on short screens.
        </Text>
      </Card.Body>
      <Card.Footer>Updated 2 October 2026</Card.Footer>
    </Card>
  ),
};
