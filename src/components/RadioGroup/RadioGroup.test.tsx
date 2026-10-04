import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import type { RadioGroupProps } from './RadioGroup';
import { Radio, RadioGroup } from './RadioGroup';

function Cycle(props: Partial<RadioGroupProps>) {
  return (
    <RadioGroup label="Billing cycle" {...props}>
      <Radio value="monthly">Monthly</Radio>
      <Radio value="quarterly">Quarterly</Radio>
      <Radio value="yearly">Yearly</Radio>
    </RadioGroup>
  );
}

describe('RadioGroup', () => {
  it('names the radiogroup and its orientation', () => {
    render(<Cycle orientation="horizontal" />);
    const group = screen.getByRole('radiogroup', { name: 'Billing cycle' });
    expect(group).toHaveAttribute('aria-orientation', 'horizontal');
  });

  it('is a single tab stop with arrow-key selection', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <>
        <Cycle defaultValue="monthly" onChange={onChange} />
        <button type="button">After</button>
      </>,
    );

    await user.tab();
    expect(screen.getByRole('radio', { name: 'Monthly' })).toHaveFocus();
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('radio', { name: 'Quarterly' })).toBeChecked();
    expect(onChange).toHaveBeenCalledWith('quarterly');
    await user.tab();
    expect(screen.getByRole('button', { name: 'After' })).toHaveFocus();
  });

  it('honors a controlled value', () => {
    render(<Cycle value="yearly" />);
    expect(screen.getByRole('radio', { name: 'Yearly' })).toBeChecked();
  });

  it('shows the error when invalid', () => {
    render(<Cycle isInvalid errorMessage="Choose a billing cycle." />);
    expect(screen.getByText('Choose a billing cycle.')).toBeInTheDocument();
  });

  it('has no axe violations', async () => {
    const { container } = render(<Cycle defaultValue="monthly" description="Change any time." />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
