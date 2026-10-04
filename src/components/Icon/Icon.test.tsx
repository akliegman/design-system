import { render, screen } from '@testing-library/react';
import { Bell } from 'lucide-react';
import { axe } from '../../test/axe';
import { Icon } from './Icon';

describe('Icon', () => {
  it('is hidden from assistive technology without a label', () => {
    const { container } = render(<Icon icon={Bell} />);
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('becomes a named image with a label', () => {
    render(<Icon icon={Bell} label="Notifications" />);
    expect(screen.getByRole('img', { name: 'Notifications' })).not.toHaveAttribute('aria-hidden');
  });

  it('maps size to the type scale and merges className', () => {
    const { container } = render(<Icon icon={Bell} size="lg" className="text-accent-text" />);
    expect(container.querySelector('svg')).toHaveClass('size-6', 'text-accent-text');
  });

  it('has no axe violations in either mode', async () => {
    const { container } = render(
      <p>
        <Icon icon={Bell} /> New <Icon icon={Bell} label="Unread" />
      </p>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
