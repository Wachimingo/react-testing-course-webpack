import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom';
// import '../../../tests/setupTests';
import SumaryForm from '../SumaryForm';

test('Button is disable when checkbox is unchecked', () => {
    render(<SumaryForm />);
    const checkbox = screen.getByRole('checkbox', { name: /terms and conditions/i });
    const button = screen.getByRole('button', { name: 'Confirm order' });
    expect(checkbox).not.toBeChecked();
    expect(button).toBeDisabled();
})
test('Button is enable when checkbox is checked', async () => {
    const user = userEvent.setup();
    render(<SumaryForm />);
    const checkbox = screen.getByRole('checkbox', { name: /terms and conditions/i });
    const button = screen.getByRole('button', { name: 'Confirm order' });
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(button).toBeEnabled();
})

test('Popover responds to hover', async () => {
    const user = userEvent.setup();
    render(<SumaryForm />);
    const nullPopover = screen.queryByText(/No ice cream will actually be delivered/i);
    expect(nullPopover).not.toBeInTheDocument();
    const termAndConditions = screen.getByText(/terms and conditions/i);
    await user.hover(termAndConditions);
    const popover = screen.getByText(/No ice cream will actually be delivered/i);
    expect(popover).toBeInTheDocument();

    await user.unhover(termAndConditions);
    const nullPopoverAgain = screen.queryByText(/No ice cream will actually be delivered/i);
    expect(nullPopoverAgain).not.toBeInTheDocument();
});