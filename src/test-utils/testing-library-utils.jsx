/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom';
import { render } from "@testing-library/react";
import { OrderDetailsProvider } from "../contexts/OrderDetails";


const renderWithContext = (ui, options) => {
    render(ui, { wrapper: OrderDetailsProvider, ...options });
}

export * from '@testing-library/react';
export { renderWithContext as render };