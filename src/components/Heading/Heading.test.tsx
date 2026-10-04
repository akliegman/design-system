import { render, screen } from '@testing-library/react';
import { axe } from '../../test/axe';
import { Heading } from './Heading';

describe('Heading', () => {
  it('renders the semantic level', () => {
    render(<Heading level={3}>Usage</Heading>);
    expect(screen.getByRole('heading', { level: 3, name: 'Usage' }).tagName).toBe('H3');
  });

  it('defaults the size from the level', () => {
    render(<Heading level={1}>Title</Heading>);
    expect(screen.getByRole('heading')).toHaveClass('text-3xl');
  });

  it('lets size diverge from level', () => {
    render(
      <Heading level={1} size="lg">
        Title
      </Heading>,
    );
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveClass('text-lg');
    expect(heading).not.toHaveClass('text-3xl');
  });

  it('merges className last', () => {
    render(
      <Heading level={2} className="text-fg-muted">
        Muted
      </Heading>,
    );
    const heading = screen.getByRole('heading');
    expect(heading).toHaveClass('text-fg-muted');
    expect(heading).not.toHaveClass('text-fg');
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <main>
        <Heading level={1}>Page</Heading>
        <Heading level={2}>Section</Heading>
      </main>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
