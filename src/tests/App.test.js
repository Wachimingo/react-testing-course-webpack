import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import '@testing-library/jest-dom';

test('Button has correct initial color and text', () => {
  render(<App />);
  const button = screen.getByRole('button', { name: 'Change to blue' });
  expect(button).toHaveStyle({ backgroundColor: 'red' });

  fireEvent.click(button);
  expect(button).toHaveStyle({ backgroundColor: 'blue' });
  expect(button).toHaveTextContent('Change to red')
});

test('Checkbox enables btn', () => {
  render(<App />);

  const button = screen.getByRole('button', { name: 'Change to blue' });
  expect(button).toBeEnabled();

  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });
  expect(checkbox).not.toBeChecked();

  fireEvent.click(checkbox);
  expect(button).toBeDisabled;

  expect(button).toHaveStyle({ backgroundColor: 'gray' })
})