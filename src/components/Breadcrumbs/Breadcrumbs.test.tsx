import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import { Breadcrumb, Breadcrumbs } from './Breadcrumbs';

function Trail() {
  return (
    <Breadcrumbs>
      <Breadcrumb href="/">Home</Breadcrumb>
      <Breadcrumb href="/settings">Settings</Breadcrumb>
      <Breadcrumb>Billing</Breadcrumb>
    </Breadcrumbs>
  );
}

describe('Breadcrumbs', () => {
  it('renders a named navigation landmark with an ordered list', () => {
    render(<Trail />);
    const nav = screen.getByRole('navigation', { name: 'Breadcrumbs' });
    expect(nav.querySelector('ol')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });

  it('marks the last item as the current page and does not link it', () => {
    render(<Trail />);
    const current = screen.getByText('Billing');
    expect(current).toHaveAttribute('aria-current', 'page');
    expect(screen.queryByRole('link', { name: 'Billing' })).not.toBeInTheDocument();
  });

  it('moves through ancestor links with Tab', async () => {
    const user = userEvent.setup();
    render(<Trail />);
    await user.tab();
    expect(screen.getByRole('link', { name: 'Home' })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole('link', { name: 'Settings' })).toHaveFocus();
  });

  it('hides separators from assistive technology', () => {
    render(<Trail />);
    for (const svg of screen.getByRole('navigation').querySelectorAll('svg')) {
      expect(svg).toHaveAttribute('aria-hidden', 'true');
    }
  });

  it('has no axe violations', async () => {
    const { container } = render(<Trail />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
