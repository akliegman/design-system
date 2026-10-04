import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pencil } from 'lucide-react';
import { axe } from '../../test/axe';
import { IconButton } from '../IconButton';
import { Tooltip } from './Tooltip';

function Example({ isDisabled }: { isDisabled?: boolean }) {
  return (
    <Tooltip content="Edit invoice" {...(isDisabled ? { isDisabled } : {})}>
      <IconButton icon={Pencil} aria-label="Edit invoice" />
    </Tooltip>
  );
}

describe('Tooltip', () => {
  it('opens on keyboard focus and describes its trigger', async () => {
    const user = userEvent.setup();
    render(<Example />);

    await user.tab();

    const tooltip = await screen.findByRole('tooltip');
    expect(tooltip).toHaveTextContent('Edit invoice');
    expect(screen.getByRole('button')).toHaveAttribute('aria-describedby', tooltip.id);
  });

  it('closes on Escape and keeps focus on the trigger', async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.tab();
    await screen.findByRole('tooltip');

    await user.keyboard('{Escape}');

    await waitFor(() => expect(screen.queryByRole('tooltip')).not.toBeInTheDocument());
    expect(screen.getByRole('button')).toHaveFocus();
  });

  it('opens on hover after the delay', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Edit" delay={0}>
        <IconButton icon={Pencil} aria-label="Edit" />
      </Tooltip>,
    );
    // Earlier tests leave React Aria's global input modality on "keyboard"; a pointer press resets it.
    await user.click(document.body);
    await user.hover(screen.getByRole('button'));
    expect(await screen.findByRole('tooltip')).toHaveTextContent('Edit');
  });

  it('stays closed when disabled', async () => {
    const user = userEvent.setup();
    render(<Example isDisabled />);
    await user.tab();
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('has no axe violations while open', async () => {
    const user = userEvent.setup();
    const { baseElement } = render(<Example />);
    await user.tab();
    await screen.findByRole('tooltip');
    expect(await axe(baseElement)).toHaveNoViolations();
  });
});
