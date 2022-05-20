/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '../../../test-utils/testing-library-utils';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Options from '../Options';

// src/setupTests.js
import { server } from '../../../mocks/server.js'
import OrderEntry from '../OrderEntry';
// Establish API mocking before all tests.
beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());

test('Update scoop subtotal when scoops change', async () => {
    const user = userEvent.setup();
    render(<Options optionType="scoops" />);

    const scoopsSubTotal = screen.getByText("Scoops total: $", { exact: false })
    expect(scoopsSubTotal).toHaveTextContent("0.00");

    const vanillaInput = await screen.findByRole('spinbutton', {
        name: 'Vanilla',
    });
    user.clear(vanillaInput);
    await user.type(vanillaInput, "1");
    expect(scoopsSubTotal).toHaveTextContent("2.00")

    const chocolateInput = await screen.findByRole('spinbutton', {
        name: 'Chocolate'
    });
    user.clear(chocolateInput);
    await user.type(chocolateInput, "2");
    expect(scoopsSubTotal).toHaveTextContent("6.00")
});

test('Update toppings total when toppings are selected', async () => {
    const user = userEvent.setup();
    render(<Options optionType="toppings" />);
    const cherriesCheckbox = await screen.findByRole('checkbox', { name: "Cherries" });
    const toppingsSubTotal = screen.getByText('Toppings total: $', { exact: false });

    expect(toppingsSubTotal).toHaveTextContent('0.00');
    await user.click(cherriesCheckbox);
    expect(toppingsSubTotal).toHaveTextContent('1.50');

    const m_and_msCheckbox = await screen.findByRole('checkbox', { name: "M&Ms" });

    await user.click(m_and_msCheckbox);

    expect(toppingsSubTotal).toHaveTextContent('3.00');

    await user.click(cherriesCheckbox);

    expect(toppingsSubTotal).toHaveTextContent('1.50');
});

describe('Grand total', () => {
    test('Grand total starts at $0.00', async () => {
        render(<OrderEntry />);
        const grandTotal = screen.getByRole('heading', { name: /Grand total: \$/i });
        expect(grandTotal).toHaveTextContent('$0.00');
    });
    test('Grand total updates properly if scoop is added first', async () => {
        const user = userEvent.setup();
        render(<OrderEntry />);
        const grandTotal = screen.getByRole('heading', { name: /Grand total: \$/i });

        const chocolateInput = await screen.findByRole('spinbutton', { name: 'Chocolate' });
        await user.type(chocolateInput, '1');
        expect(grandTotal).toHaveTextContent('$2.00');

        const cherriesCheckbox = await screen.findByRole('checkbox', { name: "Cherries" });
        await user.click(cherriesCheckbox);
        expect(grandTotal).toHaveTextContent('$3.50');

    })
    test('Grand total updates properly if topping is added first', async () => {
        const user = userEvent.setup();
        render(<OrderEntry />);
        const grandTotal = screen.getByRole('heading', { name: /Grand total: \$/i });

        const cherriesCheckbox = await screen.findByRole('checkbox', { name: "Cherries" });
        await user.click(cherriesCheckbox);
        expect(grandTotal).toHaveTextContent('$1.50');

        const chocolateInput = await screen.findByRole('spinbutton', { name: 'Chocolate' });
        await user.type(chocolateInput, '1');
        expect(grandTotal).toHaveTextContent('$3.50');
    })
    test('Grand total updates properly if items is removed', async () => {
        const user = userEvent.setup();
        render(<OrderEntry />);
        const grandTotal = screen.getByRole('heading', { name: /Grand total: \$/i });

        const cherriesCheckbox = await screen.findByRole('checkbox', { name: "Cherries" });
        await user.click(cherriesCheckbox);
        expect(grandTotal).toHaveTextContent('$1.50');

        const chocolateInput = await screen.findByRole('spinbutton', { name: 'Chocolate' });
        await user.type(chocolateInput, '1');
        expect(grandTotal).toHaveTextContent('$3.50');

        await user.click(cherriesCheckbox);
        await user.clear(chocolateInput);
        await user.type(chocolateInput, '0');

        expect(grandTotal).toHaveTextContent('$0.00');
    })
})