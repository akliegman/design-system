import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import { Link } from './Link';

describe('Link', () => {
  it('stays in the tab for relative URLs', () => {
    render(<Link href="/docs">Docs</Link>);
    const link = screen.getByRole('link', { name: 'Docs' });
    expect(link).not.toHaveAttribute('target');
    expect(link).not.toHaveAttribute('rel');
  });

  it('treats absolute URLs as external and says so', () => {
    render(<Link href="https://example.com">Example</Link>);
    const link = screen.getByRole('link', { name: /^Example\s*\(opens in a new tab\)$/ });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('lets isExternal override detection', () => {
    render(
      <Link href="https://adamkliegman.com" isExternal={false}>
        Home
      </Link>,
    );
    expect(screen.getByRole('link', { name: 'Home' })).not.toHaveAttribute('target');
  });

  it('is focusable with Tab and calls onPress on Enter', async () => {
    const user = userEvent.setup();
    const onPress = vi.fn();
    render(
      <Link href="#section" onPress={onPress}>
        Section
      </Link>,
    );

    await user.tab();
    await user.keyboard('{Enter}');

    expect(screen.getByRole('link')).toHaveFocus();
    expect(onPress).toHaveBeenCalledOnce();
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <p>
        See <Link href="/a">the guide</Link> or <Link href="https://example.com">the spec</Link>.
      </p>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
