import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { Form } from 'react-aria-components';
import { axe } from '../../test/axe';
import { TextField } from './TextField';

describe('TextField', () => {
  it('labels the input and links its description', () => {
    render(<TextField label="Email" description="We never share it." />);
    const input = screen.getByRole('textbox', { name: 'Email' });
    expect(input).toHaveAccessibleDescription('We never share it.');
  });

  it('is uncontrolled by default', async () => {
    const user = userEvent.setup();
    render(<TextField label="Name" defaultValue="Ada" />);
    const input = screen.getByRole('textbox');
    await user.type(input, ' Lovelace');
    expect(input).toHaveValue('Ada Lovelace');
  });

  it('can be controlled', async () => {
    const user = userEvent.setup();
    function Controlled() {
      const [value, setValue] = useState('');
      return <TextField label="Name" value={value} onChange={(next) => setValue(next.toUpperCase())} />;
    }
    render(<Controlled />);
    await user.type(screen.getByRole('textbox'), 'ada');
    expect(screen.getByRole('textbox')).toHaveValue('ADA');
  });

  it('shows the error message and marks the input invalid', () => {
    render(<TextField label="Email" isInvalid errorMessage="Enter a full email address." />);
    const input = screen.getByRole('textbox', { name: 'Email' });
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('Enter a full email address.');
  });

  it('validates required fields on submit and focuses the first invalid one', async () => {
    const user = userEvent.setup();
    render(
      <Form onSubmit={(event) => event.preventDefault()}>
        <TextField label="Email" isRequired errorMessage="Enter your email." />
        <button type="submit">Submit</button>
      </Form>,
    );

    await user.click(screen.getByRole('button', { name: 'Submit' }));

    const input = screen.getByRole('textbox', { name: /email/i });
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveFocus();
    expect(screen.getByText('Enter your email.')).toBeInTheDocument();

    await user.type(input, 'adam@company.com');
    await user.tab();
    expect(input).not.toHaveAttribute('aria-invalid');
  });

  it('forwards its ref to the input', () => {
    const ref = { current: null as HTMLInputElement | null };
    render(<TextField label="Email" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('has no axe violations in default and invalid states', async () => {
    const { container } = render(
      <div>
        <TextField label="Name" description="As it appears on your card." />
        <TextField label="Email" isRequired isInvalid errorMessage="Required." />
        <TextField label="Account" isDisabled defaultValue="adam" />
      </div>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
