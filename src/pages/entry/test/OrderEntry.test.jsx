/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '../../../test-utils/testing-library-utils';
import OrderEntry from '../OrderEntry';
import { rest } from 'msw';

// src/setupTests.js
import { server } from '../../../mocks/server.js'
// Establish API mocking before all tests.
beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());

test('Handles error for scoops and toppings routes', async () => {
    server.resetHandlers(
        rest.get('http://localhost:3000/scoops', (req, res, ctx) => {
            res(ctx.status(500).json({}));
        }),
        rest.get('http://localhost:3000/toppings', (req, res, ctx) => {
            res(ctx.status(500).json({}));
        })
    );

    render(<OrderEntry />);

    const alerts = await screen.findAllByRole('alert',
        // { name: /An unexpected error occurred. Please try again later./i }
    );

    expect(alerts).toHaveLength(2);
});
