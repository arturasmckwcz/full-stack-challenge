import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders ROOM PLANNER', () => {
  render(<App />);
  const linkElement = screen.getByText(/ROOM PLANNER/i);
  expect(linkElement).toBeInTheDocument();
});
