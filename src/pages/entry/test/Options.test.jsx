/** 
 *@jest-enviroment jsdom
*/

import React from 'react';
import { render, screen } from '../../../test-utils/testing-library-utils';
import Options from '../options';

// src/setupTests.js
import { server } from '../../../mocks/server.js'
// Establish API mocking before all tests.
beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());

test('Display image for each scoop option from server', async () => {
    render(<Options optionType="scoops" />);

    const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
    expect(scoopImages).toHaveLength(2);

    const altTexts = scoopImages.map(images => images.alt);
    expect(altTexts).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});

test('Display image for each topping option from server', async () => {
    render(<Options optionType="toppings" />);

    const scoopImages = await screen.findAllByRole('img', { name: /topping$/i });
    expect(scoopImages).toHaveLength(3);

    const altTexts = scoopImages.map(images => images.alt);
    expect(altTexts).toEqual(['Cherries topping', 'M&Ms topping', 'Hot Fudge topping']);
})