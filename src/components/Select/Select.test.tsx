import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import type { Key } from 'react-aria-components';
import { axe } from '../../test/axe';
import type { SelectProps } from './Select';
import { Select, SelectItem } from './Select';

function Fruit(props: Partial<SelectProps<object>>) {
  return (
    <Select label="Fruit" placeholder="Select a fruit" {...props}>
      <SelectItem id="apple">Apple</SelectItem>
      <SelectItem id="banana">Banana</SelectItem>
      <SelectItem id="cherry">Cherry</SelectItem>
    </Select>
  );
}

describe('Select', () => {
  it('shows the placeholder and labels the trigger', () => {
    render(<Fruit />);
    expect(screen.getByRole('button', { name: /select a fruit.*fruit/i })).toBeInTheDocument();
  });

  it('opens with the keyboard, selects with Enter, and returns focus', async () => {
    const user = userEvent.setup();
    const onSelectionChange = vi.fn();
    render(<Fruit onSelectionChange={onSelectionChange} />);

    await user.tab();
    await user.keyboard('{ArrowDown}');
    expect(await screen.findByRole('listbox')).toBeInTheDocument();

    await user.keyboard('{ArrowDown}{Enter}');

    await waitFor(() => expect(screen.queryByRole('listbox')).not.toBeInTheDocument());
    expect(onSelectionChange).toHaveBeenCalledWith('banana');
    expect(screen.getByRole('button', { name: /banana/i })).toHaveFocus();
  });

  it('closes on Escape without changing the value', async () => {
    const user = userEvent.setup();
    render(<Fruit defaultSelectedKey="apple" />);
    await user.click(screen.getByRole('button'));
    await user.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('listbox')).not.toBeInTheDocument());
    expect(screen.getByRole('button', { name: /apple/i })).toBeInTheDocument();
  });

  it('can be controlled', async () => {
    const user = userEvent.setup();
    function Controlled() {
      const [key, setKey] = useState<Key | null>('cherry');
      return (
        <>
          <Fruit selectedKey={key} onSelectionChange={setKey} />
          <output>{String(key)}</output>
        </>
      );
    }
    render(<Controlled />);
    await user.click(screen.getByRole('button'));
    await user.click(await screen.findByRole('option', { name: 'Apple' }));
    expect(screen.getByText('apple')).toBeInTheDocument();
  });

  it('shows the error message when invalid', () => {
    render(<Fruit isInvalid errorMessage="Pick one." />);
    expect(screen.getByText('Pick one.')).toBeInTheDocument();
  });

  it('has no axe violations closed or open', async () => {
    const user = userEvent.setup();
    const { baseElement } = render(<Fruit description="Fresh daily." />);
    expect(await axe(baseElement)).toHaveNoViolations();
    await user.click(screen.getByRole('button'));
    await screen.findByRole('listbox');
    expect(await axe(baseElement)).toHaveNoViolations();
  });
});
