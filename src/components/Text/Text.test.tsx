import { render, screen } from '@testing-library/react';
import { axe } from '../../test/axe';
import { Text } from './Text';

describe('Text', () => {
  it('renders a paragraph by default', () => {
    render(<Text>Hello</Text>);
    expect(screen.getByText('Hello').tagName).toBe('P');
  });

  it('renders the element passed to as', () => {
    render(<Text as="code">id_123</Text>);
    expect(screen.getByText('id_123').tagName).toBe('CODE');
  });

  it('applies tone, size and weight from variants', () => {
    render(
      <Text tone="muted" size="sm" weight="medium">
        Detail
      </Text>,
    );
    expect(screen.getByText('Detail')).toHaveClass('text-fg-muted', 'text-sm', 'font-medium');
  });

  it('keeps size and color classes separate when merging', () => {
    render(
      <Text size="sm" className="text-fg-muted">
        Detail
      </Text>,
    );
    expect(screen.getByText('Detail')).toHaveClass('text-sm', 'text-fg-muted');
    expect(screen.getByText('Detail')).not.toHaveClass('text-fg');
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <div>
        <Text>Body</Text>
        <Text tone="muted">Muted</Text>
      </div>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
