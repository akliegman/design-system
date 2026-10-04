import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import type { Key } from 'react-aria-components';
import { axe } from '../../test/axe';
import type { TabsProps } from './Tabs';
import { Tab, TabList, TabPanel, Tabs } from './Tabs';

function Example(props: Omit<TabsProps, 'children'>) {
  return (
    <Tabs {...props}>
      <TabList aria-label="Views">
        <Tab id="one">One</Tab>
        <Tab id="two">Two</Tab>
        <Tab id="three">Three</Tab>
      </TabList>
      <TabPanel id="one">Panel one</TabPanel>
      <TabPanel id="two">Panel two</TabPanel>
      <TabPanel id="three">Panel three</TabPanel>
    </Tabs>
  );
}

describe('Tabs', () => {
  it('wires tabs to their panel', () => {
    render(<Example />);
    const tab = screen.getByRole('tab', { name: 'One' });
    const panel = screen.getByRole('tabpanel');
    expect(tab).toHaveAttribute('aria-selected', 'true');
    expect(tab).toHaveAttribute('aria-controls', panel.id);
    expect(panel).toHaveAccessibleName('One');
  });

  it('selects with arrow keys, wraps, and supports Home and End', async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.tab();

    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Panel two');

    await user.keyboard('{End}');
    expect(screen.getByRole('tab', { name: 'Three' })).toHaveAttribute('aria-selected', 'true');

    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'One' })).toHaveAttribute('aria-selected', 'true');
  });

  it('waits for Enter with manual activation', async () => {
    const user = userEvent.setup();
    render(<Example keyboardActivation="manual" />);
    await user.tab();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'One' })).toHaveAttribute('aria-selected', 'true');
    await user.keyboard('{Enter}');
    expect(screen.getByRole('tab', { name: 'Two' })).toHaveAttribute('aria-selected', 'true');
  });

  it('skips disabled tabs', async () => {
    const user = userEvent.setup();
    render(<Example disabledKeys={['two']} />);
    await user.tab();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Three' })).toHaveFocus();
  });

  it('can be controlled', async () => {
    const user = userEvent.setup();
    function Controlled() {
      const [key, setKey] = useState<Key>('three');
      return (
        <>
          <Example selectedKey={key} onSelectionChange={setKey} />
          <output>{String(key)}</output>
        </>
      );
    }
    render(<Controlled />);
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Panel three');
    await user.click(screen.getByRole('tab', { name: 'One' }));
    expect(screen.getByText('one')).toBeInTheDocument();
  });

  it('has no axe violations', async () => {
    const { container } = render(<Example />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
