import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import { ThemeProvider } from '../ThemeProvider';
import { ThemeToggle } from './ThemeToggle';

function renderToggle() {
  return render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>,
  );
}

afterEach(() => {
  localStorage.clear();
  delete document.documentElement.dataset.theme;
});

describe('ThemeToggle', () => {
  it('shows the current preference as the selected option', () => {
    renderToggle();
    expect(screen.getByRole('radiogroup', { name: 'Theme' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Match system theme' })).toBeChecked();
  });

  it('applies a theme on click', async () => {
    const user = userEvent.setup();
    renderToggle();
    await user.click(screen.getByRole('radio', { name: 'Dark theme' }));
    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(screen.getByRole('radio', { name: 'Dark theme' })).toBeChecked();
  });

  it('is a single tab stop with arrow-key movement', async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <ThemeToggle />
        <button type="button">After</button>
      </ThemeProvider>,
    );
    await user.tab();
    expect(screen.getByRole('radio', { name: 'Light theme' })).toHaveFocus();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('radio', { name: 'Dark theme' })).toHaveFocus();
    await user.keyboard(' ');
    expect(document.documentElement.dataset.theme).toBe('dark');
    await user.tab();
    expect(screen.getByRole('button', { name: 'After' })).toHaveFocus();
  });

  it('cannot deselect the current option', async () => {
    const user = userEvent.setup();
    renderToggle();
    await user.click(screen.getByRole('radio', { name: 'Match system theme' }));
    expect(screen.getByRole('radio', { name: 'Match system theme' })).toBeChecked();
  });

  it('has no axe violations', async () => {
    const { container } = renderToggle();
    expect(await axe(container)).toHaveNoViolations();
  });
});
