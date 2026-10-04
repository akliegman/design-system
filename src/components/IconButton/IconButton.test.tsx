import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Trash2 } from 'lucide-react';
import { axe } from '../../test/axe';
import { IconButton } from './IconButton';

describe('IconButton', () => {
  it('uses aria-label as its accessible name and hides the glyph', () => {
    render(<IconButton icon={Trash2} aria-label="Delete invoice" />);
    const button = screen.getByRole('button', { name: 'Delete invoice' });
    expect(button.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  });

  it('requires an accessible name at compile time', () => {
    // @ts-expect-error: aria-label is required
    const element = <IconButton icon={Trash2} />;
    expect(element).toBeTruthy();
  });

  it('fires onPress from the keyboard', async () => {
    const user = userEvent.setup();
    const onPress = vi.fn();
    render(<IconButton icon={Trash2} aria-label="Delete" onPress={onPress} />);

    await user.tab();
    await user.keyboard('{Enter}');

    expect(onPress).toHaveBeenCalledOnce();
  });

  it('is busy and inert while loading', async () => {
    const user = userEvent.setup();
    const onPress = vi.fn();
    render(<IconButton icon={Trash2} aria-label="Delete" onPress={onPress} isLoading />);

    await user.click(screen.getByRole('button'));

    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
    expect(onPress).not.toHaveBeenCalled();
  });

  it('has no axe violations', async () => {
    const { container } = render(<IconButton icon={Trash2} aria-label="Delete" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('fails axe when the name is bypassed, which proves the assertion is live', async () => {
    // @ts-expect-error: deliberately omitting the required name
    const { container } = render(<IconButton icon={Trash2} />);
    expect(await axe(container)).not.toHaveNoViolations();
  });
});
