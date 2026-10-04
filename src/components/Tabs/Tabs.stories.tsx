import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import { Text } from '../Text';
import { Tab, TabList, TabPanel, Tabs } from './Tabs';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  subcomponents: { TabList, Tab, TabPanel },
  parameters: {
    docs: {
      description: {
        component: `
Switches between related views in the same place. React Aria implements the tabs pattern: the list is one tab stop,
arrow keys move between tabs (left and right, or up and down when vertical), and Home and End jump to the ends. The
selection indicator slides between tabs and stops moving when reduced motion is requested.

### Do
- Use short, parallel labels: "Overview", "Invoices", "Settings".
- Keep the panels at the same level of importance; nothing should depend on visiting tabs in order.
- Set \`keyboardActivation="manual"\` when switching panels is expensive.

### Don't
- Don't use tabs for sequential steps. Use a stepper or separate pages.
- Don't nest tabs inside tabs.
- Don't use tabs as primary site navigation; that is a nav landmark with links.
`,
      },
    },
  },
  argTypes: {
    orientation: {
      description: 'Arrow-key axis and layout. `vertical` for settings-style side navigation within a page.',
      control: 'inline-radio',
      options: ['horizontal', 'vertical'],
    },
    keyboardActivation: {
      description: '`automatic` selects on arrow; `manual` waits for Enter or Space.',
      control: 'inline-radio',
      options: ['automatic', 'manual'],
    },
    defaultSelectedKey: { description: 'Initially selected tab when uncontrolled.' },
    selectedKey: { description: 'Controlled selected tab.' },
    disabledKeys: { description: 'Tabs that are visible but cannot be selected.' },
  },
  args: { onSelectionChange: fn() },
  render: (args) => (
    <Tabs {...args} className="w-[28rem]">
      <TabList aria-label="Invoice views">
        <Tab id="overview">Overview</Tab>
        <Tab id="activity">Activity</Tab>
        <Tab id="settings">Settings</Tab>
      </TabList>
      <TabPanel id="overview">
        <Text>Totals, due dates and the customer for this invoice.</Text>
      </TabPanel>
      <TabPanel id="activity">
        <Text>Every send, view and payment attempt, newest first.</Text>
      </TabPanel>
      <TabPanel id="settings">
        <Text>Reminders, late fees and payment methods for this invoice.</Text>
      </TabPanel>
    </Tabs>
  ),
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Vertical tabs; arrows move up and down. */
export const Vertical: Story = { args: { orientation: 'vertical' } };

/** A disabled tab stays visible and is skipped by arrow keys. */
export const DisabledTab: Story = { args: { disabledKeys: ['activity'] } };

/** Tabs mirror in right-to-left layouts, and Left and Right arrows follow the visual order. */
export const RightToLeft: Story = {
  render: (args) => (
    <div dir="rtl">
      <Tabs {...args}>
        <TabList aria-label="عروض الفاتورة">
          <Tab id="a">نظرة عامة</Tab>
          <Tab id="b">النشاط</Tab>
        </TabList>
        <TabPanel id="a">
          <Text>الإجماليات وتواريخ الاستحقاق.</Text>
        </TabPanel>
        <TabPanel id="b">
          <Text>كل عملية إرسال ودفع.</Text>
        </TabPanel>
      </Tabs>
    </div>
  ),
};

/** Tab focuses the selected tab, arrows move and select, End jumps to the last tab. */
export const KeyboardInteraction: Story = {
  play: async ({ canvas, userEvent, args }) => {
    // React Aria renders collection items in a second pass, so wait for the tabs before pressing Tab.
    await canvas.findByRole('tab', { name: 'Overview' });
    await userEvent.tab();
    await expect(canvas.getByRole('tab', { name: 'Overview' })).toHaveFocus();
    await userEvent.keyboard('{ArrowRight}');
    await expect(canvas.getByRole('tab', { name: 'Activity' })).toHaveAttribute('aria-selected', 'true');
    await expect(canvas.getByRole('tabpanel')).toHaveTextContent(/payment attempt/);
    await userEvent.keyboard('{End}');
    await expect(canvas.getByRole('tab', { name: 'Settings' })).toHaveFocus();
    await expect(args.onSelectionChange).toHaveBeenLastCalledWith('settings');
  },
};
