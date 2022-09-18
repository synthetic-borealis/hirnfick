import React from 'react';
import { act, render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import App from '../App';

test('Renders main page correctly', async () => {
  // Setup
  render(<App />);
  const buttonCount = await screen.findByRole('button');
  let codeCount = await screen.queryByText(/The count is now:/);

  // Pre-expectations
  expect(buttonCount.innerHTML).toBe('count is: 0');
  expect(codeCount).not.toBeInTheDocument();

  // Init
  await act(async () => {
    await user.click(buttonCount);
  });
  await act(async () => {
    await user.click(buttonCount);
  });
  codeCount = await screen.queryByText(/The count is now:/);

  // Post-expectations
  expect(buttonCount.innerHTML).toBe('count is: 2');
  expect(codeCount).toBeInTheDocument();
});
