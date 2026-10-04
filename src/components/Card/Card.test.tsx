import { render, screen } from '@testing-library/react';
import { axe } from '../../test/axe';
import { Heading } from '../Heading';
import { Card } from './Card';

describe('Card', () => {
  it('renders its parts in order', () => {
    render(
      <Card data-testid="card">
        <Card.Header>Header</Card.Header>
        <Card.Body>Body</Card.Body>
        <Card.Footer>Footer</Card.Footer>
      </Card>,
    );
    expect(screen.getByTestId('card')).toHaveTextContent('HeaderBodyFooter');
  });

  it('applies elevation through a variant', () => {
    const { rerender } = render(<Card data-testid="card" />);
    expect(screen.getByTestId('card')).toHaveClass('shadow-raised');
    rerender(<Card data-testid="card" elevation="flat" />);
    expect(screen.getByTestId('card')).not.toHaveClass('shadow-raised');
  });

  it('merges className on every part', () => {
    render(
      <Card>
        <Card.Body data-testid="body" className="px-0">
          Body
        </Card.Body>
      </Card>,
    );
    expect(screen.getByTestId('body')).toHaveClass('px-0');
    expect(screen.getByTestId('body')).not.toHaveClass('px-5');
  });

  it('forwards refs', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<Card ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <Card>
        <Card.Header>
          <Heading level={2}>Plan</Heading>
        </Card.Header>
        <Card.Body>Details</Card.Body>
        <Card.Footer>Footer</Card.Footer>
      </Card>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
