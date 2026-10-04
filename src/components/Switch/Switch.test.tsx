import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { axe } from '../../test/axe';
import { Switch } from './Switch';

describe('Switch', () => {
  it('exposes role switch and toggles with Space', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Switch onChange={onChange}>Notifications</Switch>);
    const control = screen.getByRole('switch', { name: 'Notifications' });

    await user.tab();
    await user.keyboard(' ');

    expect(control).toBeChecked();
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('can be controlled', async () => {
    const user = userEvent.setup();
    function Controlled() {
      const [on, setOn] = useState(true);
      return (
        <>
          <Switch isSelected={on} onChange={setOn}>
            Notifications
          </Switch>
          <span>{on ? 'on' : 'off'}</span>
        </>
      );
    }
    render(<Controlled />);
    await user.click(screen.getByRole('switch'));
    expect(screen.getByText('off')).toBeInTheDocument();
  });

  it('cannot change while disabled', async () => {
    const user = userEvent.setup();
    render(
      <Switch isDisabled defaultSelected>
        Locked
      </Switch>,
    );
    await user.click(screen.getByText('Locked'));
    expect(screen.getByRole('switch')).toBeChecked();
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <div>
        <Switch>Off</Switch>
        <Switch defaultSelected>On</Switch>
      </div>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
