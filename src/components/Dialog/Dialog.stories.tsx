import type { Meta, StoryObj } from '@storybook/react-vite';
import { Form } from 'react-aria-components';
import { expect, screen, waitFor } from 'storybook/test';
import { Button } from '../Button';
import { Text } from '../Text';
import { TextField } from '../TextField';
import { Dialog, DialogActions, DialogTrigger } from './Dialog';

const CLAUSES = Array.from({ length: 12 }, (_, index) => `Clause ${index + 1}`);

const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  subcomponents: { DialogTrigger, DialogActions },
  parameters: {
    layout: 'centered',
    docs: {
      story: { inline: false, height: '420px' },
      description: {
        component: `
A modal dialog for focused tasks and confirmations. Place it in a \`DialogTrigger\` beside the button that opens it.
React Aria moves focus into the dialog, traps Tab inside, closes on Escape, hides the page behind it from assistive
technology, locks scroll, and returns focus to the trigger on close. The \`title\` becomes the accessible name.

### Do
- Title the dialog with what it does: "Invite a teammate", "Delete project?".
- Put the primary action last in \`DialogActions\`, and make destructive confirmations use \`variant="danger"\`.
- Use \`role="alertdialog"\` for confirmations that interrupt the user and require a decision.

### Don't
- Don't open a dialog without a user action. Interrupting flows belong in inline messages.
- Don't stack dialogs. If a dialog needs another, the flow needs a page.
- Don't disable dismissal unless closing would lose work; users expect Escape to work.
`,
      },
    },
  },
  argTypes: {
    title: { description: 'Heading and accessible name. Phrase confirmations as a question.' },
    description: { description: 'One supporting sentence under the title, linked as the accessible description.' },
    size: {
      description: 'Maximum width. `sm` for confirmations, `md` for short forms, `lg` for multi-column content.',
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
    },
    isDismissable: {
      description: 'Allow backdrop click, Escape and the close button. Turn off only to protect unsaved work.',
    },
    role: {
      description: '`alertdialog` for confirmations that need an explicit answer.',
      control: 'inline-radio',
      options: ['dialog', 'alertdialog'],
    },
    children: { control: false, description: 'Content, or a function receiving `close`.' },
  },
  args: {
    title: 'Invite a teammate',
    description: 'They will get an email with a link to join this workspace.',
    size: 'md',
    children: null,
  },
  render: (args) => (
    <DialogTrigger>
      <Button variant="primary">Invite teammate</Button>
      <Dialog {...args}>
        {({ close }) => (
          <Form
            className="flex flex-col gap-4"
            onSubmit={(event) => {
              event.preventDefault();
              close();
            }}
          >
            <TextField label="Email" type="email" isRequired autoFocus />
            <DialogActions>
              <Button variant="secondary" onPress={close}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Send invite
              </Button>
            </DialogActions>
          </Form>
        )}
      </Dialog>
    </DialogTrigger>
  ),
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** A destructive confirmation: small, `alertdialog`, danger action last. */
export const Confirmation: Story = {
  args: { title: 'Delete this project?', description: undefined, size: 'sm', role: 'alertdialog' },
  render: (args) => (
    <DialogTrigger>
      <Button variant="danger">Delete project</Button>
      <Dialog {...args}>
        {({ close }) => (
          <>
            <Text tone="muted">All 48 invoices and their history will be removed. This cannot be undone.</Text>
            <DialogActions>
              <Button variant="secondary" onPress={close} autoFocus>
                Keep project
              </Button>
              <Button variant="danger" onPress={close}>
                Delete project
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </DialogTrigger>
  ),
};

/** Long content scrolls inside the dialog body while the title stays put. */
export const LongContent: Story = {
  args: { title: 'Terms of service', description: 'Last updated 1 October 2026.', size: 'lg' },
  render: (args) => (
    <DialogTrigger>
      <Button>Read terms</Button>
      <Dialog {...args}>
        <div className="flex flex-col gap-3">
          {CLAUSES.map((clause) => (
            <Text key={clause}>
              {clause}. These terms govern access to the workspace and every invoice, export and integration created in
              it. Continued use after a change means you accept the updated terms.
            </Text>
          ))}
        </div>
      </Dialog>
    </DialogTrigger>
  ),
};

/** Without dismissal, only the explicit actions close it. */
export const NotDismissable: Story = {
  args: { isDismissable: false, title: 'Finish setup', description: 'Choose a workspace name to continue.' },
};

/**
 * Enter on the trigger opens the dialog and moves focus inside; Escape closes it and focus returns to the trigger.
 */
export const KeyboardInteraction: Story = {
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole('button', { name: 'Invite teammate' });
    await userEvent.tab();
    await userEvent.keyboard('{Enter}');
    const dialog = await screen.findByRole('dialog', { name: 'Invite a teammate' });
    await waitFor(() => expect(dialog).toContainElement(document.activeElement as HTMLElement));
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    await waitFor(() => expect(trigger).toHaveFocus());
  },
};
