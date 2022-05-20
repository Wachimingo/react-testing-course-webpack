/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';

// src/setupTests.js
import { server } from '../mocks/server.js'
// Establish API mocking before all tests.
beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());

test('Order phases for happy path', async () => {
    const user = userEvent.setup();
    render(<App />);

    const orderButton = screen.getByRole('button', { name: "Order Sundae!" });
    const [chocolateInput, cherriesCheckbox] = await Promise.all([
        screen.findByRole('spinbutton', { name: "Chocolate" }),
        screen.findByRole('checkbox', { name: "Cherries" }),
    ]);

    user.clear(chocolateInput);
    await user.type(chocolateInput, "2");
    await user.click(cherriesCheckbox);

    await user.click(orderButton);

    const orderSummaryTitle = screen.getByRole("heading", { name: "Order Summary" });
    const scoopsSummary = screen.getByRole("heading", { name: /Scoops: /i });
    const toppingsSummary = screen.getByRole("heading", { name: /Toppings: /i });
    expect(scoopsSummary).toHaveTextContent("$4.00");
    expect(toppingsSummary).toHaveTextContent("$1.50");

    const termsCheckbox = screen.getByRole("checkbox", { name: /terms and conditions/i });
    const acceptButton = screen.getByRole('button', { name: 'Confirm order' });

    await user.click(termsCheckbox);
    await user.click(acceptButton);

    const orderNumber = await screen.findByText(/Your order number is/i)

});