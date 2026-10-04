import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Plus } from 'lucide-react';
import { axe } from '../../test/axe';
import { Button } from './Button';

describe('Button', () => {
  it('fires onPress from mouse, Enter and Space', async () => {
    const user = userEvent.setup();
    const onPress = vi.fn();
    render(<Button onPress={onPress}>Save</Button>);

    await user.click(screen.getByRole('button', { name: 'Save' }));
    await user.keyboard('{Enter}');
    await user.keyboard(' ');

    expect(onPress).toHaveBeenCalledTimes(3);
  });

  it('ignores presses while disabled', async () => {
    const user = userEvent.setup();
    const onPress = vi.fn();
    render(
      <Button onPress={onPress} isDisabled>
        Save
      </Button>,
    );

    await user.click(screen.getByRole('button'));

    expect(onPress).not.toHaveBeenCalled();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('marks itself busy while loading, ignores presses, and stays focusable', async () => {
    const user = userEvent.setup();
    const onPress = vi.fn();
    render(
      <Button onPress={onPress} isLoading>
        Save
      </Button>,
    );
    const button = screen.getByRole('button', { name: /save/i });

    await user.tab();
    await user.click(button);

    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button).toHaveFocus();
    expect(onPress).not.toHaveBeenCalled();
    expect(screen.getByRole('progressbar', { name: 'Loading' })).toBeInTheDocument();
  });

  it('keeps the label in the DOM while loading so the width does not change', () => {
    render(<Button isLoading>Save changes</Button>);
    expect(screen.getByText('Save changes')).toBeInTheDocument();
    expect(screen.getByText('Save changes')).toHaveClass('invisible');
  });

  it('hides decorative icons from assistive technology', () => {
    render(<Button iconStart={Plus}>Add</Button>);
    expect(screen.getByRole('button', { name: 'Add' }).querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  });

  it('merges consumer classes last', () => {
    render(<Button className="w-full px-8">Save</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('w-full', 'px-8');
    expect(button).not.toHaveClass('px-4');
  });

  it('forwards its ref to the button element', () => {
    const ref = { current: null as HTMLButtonElement | null };
    render(<Button ref={ref}>Save</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('has no axe violations in any variant or state', async () => {
    const { container } = render(
      <div>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
        <Button isLoading>Loading</Button>
        <Button isDisabled>Disabled</Button>
      </div>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
