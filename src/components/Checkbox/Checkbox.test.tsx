import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { axe } from '../../test/axe';
import { Checkbox, CheckboxGroup } from './Checkbox';

describe('Checkbox', () => {
  it('toggles with a click on the label and with Space', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Checkbox onChange={onChange}>Subscribe</Checkbox>);
    const checkbox = screen.getByRole('checkbox', { name: 'Subscribe' });

    await user.click(screen.getByText('Subscribe'));
    expect(checkbox).toBeChecked();

    await user.keyboard(' ');
    expect(checkbox).not.toBeChecked();
    expect(onChange).toHaveBeenNthCalledWith(1, true);
    expect(onChange).toHaveBeenNthCalledWith(2, false);
  });

  it('respects the controlled value', async () => {
    const user = userEvent.setup();
    function Controlled() {
      const [checked, setChecked] = useState(false);
      return (
        <>
          <Checkbox isSelected={checked} onChange={setChecked}>
            Subscribe
          </Checkbox>
          <span>{checked ? 'yes' : 'no'}</span>
        </>
      );
    }
    render(<Controlled />);
    await user.click(screen.getByRole('checkbox'));
    expect(screen.getByText('yes')).toBeInTheDocument();
  });

  it('exposes the indeterminate state', () => {
    render(<Checkbox isIndeterminate>All</Checkbox>);
    expect(screen.getByRole('checkbox')).toHaveProperty('indeterminate', true);
  });

  it('cannot be toggled while disabled', async () => {
    const user = userEvent.setup();
    render(<Checkbox isDisabled>Subscribe</Checkbox>);
    await user.click(screen.getByText('Subscribe'));
    expect(screen.getByRole('checkbox')).not.toBeChecked();
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <div>
        <Checkbox>Unchecked</Checkbox>
        <Checkbox defaultSelected>Checked</Checkbox>
        <Checkbox isIndeterminate>Mixed</Checkbox>
        <Checkbox isInvalid>Invalid</Checkbox>
      </div>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe('CheckboxGroup', () => {
  it('labels the group and reports the checked values', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <CheckboxGroup label="Notify me about" description="Sent by email." onChange={onChange}>
        <Checkbox value="paid">Paid</Checkbox>
        <Checkbox value="failed">Failed</Checkbox>
      </CheckboxGroup>,
    );
    const group = screen.getByRole('group', { name: 'Notify me about' });
    expect(group).toHaveAccessibleDescription('Sent by email.');

    await user.click(screen.getByRole('checkbox', { name: 'Failed' }));
    expect(onChange).toHaveBeenLastCalledWith(['failed']);
  });

  it('shows a required error after a failed submit', async () => {
    render(
      <CheckboxGroup label="Topics" isRequired isInvalid errorMessage="Pick at least one topic.">
        <Checkbox value="a">A</Checkbox>
      </CheckboxGroup>,
    );
    expect(screen.getByText('Pick at least one topic.')).toBeInTheDocument();
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <CheckboxGroup label="Notify me about" defaultValue={['paid']}>
        <Checkbox value="paid">Paid</Checkbox>
        <Checkbox value="failed">Failed</Checkbox>
      </CheckboxGroup>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
