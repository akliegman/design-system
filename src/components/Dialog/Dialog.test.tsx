import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { axe } from '../../test/axe';
import { Button } from '../Button';
import type { DialogProps } from './Dialog';
import { Dialog, DialogActions, DialogTrigger } from './Dialog';

function Example(props: Partial<DialogProps>) {
  return (
    <DialogTrigger>
      <Button>Open</Button>
      <Dialog title="Rename file" description="Names must be unique." {...props}>
        {({ close }) => (
          <DialogActions>
            <Button onPress={close}>Cancel</Button>
            <Button variant="primary" onPress={close}>
              Save
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </DialogTrigger>
  );
}

describe('Dialog', () => {
  it('opens from its trigger with an accessible name and description', async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.click(screen.getByRole('button', { name: 'Open' }));

    const dialog = await screen.findByRole('dialog', { name: 'Rename file' });
    expect(dialog).toHaveAccessibleDescription('Names must be unique.');
  });

  it('moves focus inside, traps Tab, and restores focus on Escape', async () => {
    const user = userEvent.setup();
    render(<Example />);
    const trigger = screen.getByRole('button', { name: 'Open' });

    await user.click(trigger);
    const dialog = await screen.findByRole('dialog');
    expect(dialog).toContainElement(document.activeElement as HTMLElement);

    for (let index = 0; index < 5; index += 1) {
      await user.tab();
      expect(dialog).toContainElement(document.activeElement as HTMLElement);
    }

    await user.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it('closes from the close button and from actions that call close', async () => {
    const user = userEvent.setup();
    render(<Example />);

    await user.click(screen.getByRole('button', { name: 'Open' }));
    await user.click(await screen.findByRole('button', { name: 'Close' }));
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());

    await user.click(screen.getByRole('button', { name: 'Open' }));
    await user.click(await screen.findByRole('button', { name: 'Save' }));
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('ignores Escape and hides the close button when not dismissable', async () => {
    const user = userEvent.setup();
    render(<Example isDismissable={false} />);
    await user.click(screen.getByRole('button', { name: 'Open' }));
    await screen.findByRole('dialog');

    await user.keyboard('{Escape}');

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Close' })).not.toBeInTheDocument();
  });

  it('supports controlled open state', async () => {
    const user = userEvent.setup();
    function Controlled() {
      const [isOpen, setOpen] = useState(true);
      return (
        <DialogTrigger isOpen={isOpen} onOpenChange={setOpen}>
          <Button>Open</Button>
          <Dialog title="Controlled">Body</Dialog>
        </DialogTrigger>
      );
    }
    render(<Controlled />);
    expect(await screen.findByRole('dialog')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Close' }));
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('supports the alertdialog role', async () => {
    const user = userEvent.setup();
    render(<Example role="alertdialog" />);
    await user.click(screen.getByRole('button', { name: 'Open' }));
    expect(await screen.findByRole('alertdialog', { name: 'Rename file' })).toBeInTheDocument();
  });

  it('has no axe violations when open', async () => {
    const user = userEvent.setup();
    const { baseElement } = render(<Example />);
    await user.click(screen.getByRole('button', { name: 'Open' }));
    await screen.findByRole('dialog');
    expect(await axe(baseElement)).toHaveNoViolations();
  });
});
