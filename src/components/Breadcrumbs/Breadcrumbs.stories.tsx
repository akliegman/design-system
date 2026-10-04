import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Breadcrumb, Breadcrumbs } from './Breadcrumbs';

const meta = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    docs: {
      description: {
        component: `
Shows where the current page sits in the hierarchy. Renders a \`nav\` landmark around an ordered list; separators are
decorative and hidden from assistive technology, and the last item is the current page, marked with
\`aria-current="page"\`.

### Do
- Start at the top of the hierarchy and end at the current page.
- Use the page's real title for the last item so it matches the heading below.
- Place it directly above the page heading.

### Don't
- Don't use breadcrumbs for a linear flow such as a checkout. Use a step indicator.
- Don't link the last item; it is where the user already is.
- Don't show a single-item trail. If there is no parent, omit the component.
`,
      },
    },
  },
  argTypes: {
    size: {
      description: '`sm` above a page title; `base` when the trail is the main navigation.',
      control: 'inline-radio',
      options: ['sm', 'base'],
    },
    'aria-label': { description: 'Landmark name. Change it only when a page has two trails.' },
  },
  args: { size: 'sm' },
  render: (args) => (
    <Breadcrumbs {...args}>
      <Breadcrumb href="#home">Home</Breadcrumb>
      <Breadcrumb href="#settings">Settings</Breadcrumb>
      <Breadcrumb>Billing</Breadcrumb>
    </Breadcrumbs>
  ),
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    // React Aria renders collection items in a second pass, so wait for them rather than query once.
    await expect(await canvas.findByRole('navigation', { name: 'Breadcrumbs' })).toBeInTheDocument();
    await expect(await canvas.findByText('Billing')).toHaveAttribute('aria-current', 'page');
  },
};

/** The larger size, for trails that do the work of primary navigation. */
export const Base: Story = { args: { size: 'base' } };

/** Long trails wrap at separators rather than overflowing. */
export const LongContent: Story = {
  render: (args) => (
    <div className="max-w-sm">
      <Breadcrumbs {...args}>
        <Breadcrumb href="#">Workspace</Breadcrumb>
        <Breadcrumb href="#">Engineering</Breadcrumb>
        <Breadcrumb href="#">Design systems</Breadcrumb>
        <Breadcrumb href="#">Component library</Breadcrumb>
        <Breadcrumb>Accessibility audit, October 2026</Breadcrumb>
      </Breadcrumbs>
    </div>
  ),
};

/** Separators flip direction in right-to-left layouts. */
export const RightToLeft: Story = {
  render: (args) => (
    <div dir="rtl">
      <Breadcrumbs {...args}>
        <Breadcrumb href="#">الرئيسية</Breadcrumb>
        <Breadcrumb href="#">الإعدادات</Breadcrumb>
        <Breadcrumb>الفوترة</Breadcrumb>
      </Breadcrumbs>
    </div>
  ),
};

/** Tab visits each ancestor link and skips the current page. */
export const KeyboardInteraction: Story = {
  play: async ({ canvas, userEvent }) => {
    await canvas.findByRole('link', { name: 'Home' });
    await userEvent.tab();
    await expect(canvas.getByRole('link', { name: 'Home' })).toHaveFocus();
    await userEvent.tab();
    await expect(canvas.getByRole('link', { name: 'Settings' })).toHaveFocus();
    await userEvent.tab();
    await expect(canvas.getByRole('link', { name: 'Settings' })).not.toHaveFocus();
  },
};
