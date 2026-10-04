import { render, screen } from '@testing-library/react';
import { Check } from 'lucide-react';
import { axe } from '../../test/axe';
import { Badge } from './Badge';

describe('Badge', () => {
  it('maps tone to a background and text role pair', () => {
    render(<Badge tone="danger">Overdue</Badge>);
    expect(screen.getByText('Overdue')).toHaveClass('bg-danger-subtle', 'text-danger-text');
  });

  it('defaults to the neutral tone', () => {
    render(<Badge>Draft</Badge>);
    expect(screen.getByText('Draft')).toHaveClass('bg-surface-hover', 'text-fg');
  });

  it('hides its icon from assistive technology', () => {
    render(
      <Badge tone="success" icon={Check}>
        Paid
      </Badge>,
    );
    expect(screen.getByText('Paid').querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <div>
        {(['neutral', 'accent', 'success', 'warning', 'danger'] as const).map((tone) => (
          <Badge key={tone} tone={tone}>
            {tone}
          </Badge>
        ))}
      </div>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
