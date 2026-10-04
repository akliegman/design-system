import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Bold } from 'lucide-react';
import { useState } from 'react';
import { axe } from '../../test/axe';
import { ToggleButton } from './ToggleButton';

describe('ToggleButton', () => {
  it('toggles aria-pressed when uncontrolled', async () => {
    const user = userEvent.setup();
    render(<ToggleButton>Pin</ToggleButton>);
    const toggle = screen.getByRole('button', { name: 'Pin' });

    expect(toggle).toHaveAttribute('aria-pressed', 'false');
    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-pressed', 'true');
  });

  it('follows the isSelected prop when controlled', async () => {
    const user = userEvent.setup();
    function Controlled() {
      const [pinned, setPinned] = useState(true);
      return (
        <>
          <ToggleButton isSelected={pinned} onChange={setPinned}>
            Pin
          </ToggleButton>
          <output>{pinned ? 'pinned' : 'unpinned'}</output>
        </>
      );
    }
    render(<Controlled />);

    await user.tab();
    await user.keyboard(' ');

    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByText('unpinned')).toBeInTheDocument();
  });

  it('renders a square icon-only toggle named by aria-label', () => {
    render(<ToggleButton icon={Bold} aria-label="Bold" />);
    expect(screen.getByRole('button', { name: 'Bold' })).toHaveClass('size-9', 'px-0');
  });

  it('rejects an icon-only toggle without a name at compile time', () => {
    // @ts-expect-error: icon-only toggles require aria-label
    const element = <ToggleButton icon={Bold} />;
    expect(element).toBeTruthy();
  });

  it('has no axe violations selected or unselected', async () => {
    const { container } = render(
      <div>
        <ToggleButton>Off</ToggleButton>
        <ToggleButton defaultSelected>On</ToggleButton>
        <ToggleButton icon={Bold} aria-label="Bold" variant="ghost" />
      </div>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
