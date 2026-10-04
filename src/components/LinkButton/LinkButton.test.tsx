import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ArrowRight } from 'lucide-react';
import { axe } from '../../test/axe';
import { LinkButton } from './LinkButton';

describe('LinkButton', () => {
  it('renders a link with button styling', () => {
    render(
      <LinkButton href="/pricing" variant="primary">
        View pricing
      </LinkButton>,
    );
    const link = screen.getByRole('link', { name: 'View pricing' });
    expect(link).toHaveAttribute('href', '/pricing');
    expect(link).toHaveClass('bg-accent');
  });

  it('is reachable with Tab', async () => {
    const user = userEvent.setup();
    render(<LinkButton href="/docs">Docs</LinkButton>);
    await user.tab();
    expect(screen.getByRole('link')).toHaveFocus();
  });

  it('marks itself disabled', () => {
    render(
      <LinkButton href="/docs" isDisabled>
        Docs
      </LinkButton>,
    );
    expect(screen.getByRole('link')).toHaveAttribute('aria-disabled', 'true');
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <LinkButton href="/next" iconEnd={ArrowRight}>
        Next step
      </LinkButton>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
