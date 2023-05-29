import { screen } from '@testing-library/react';

import App from '../../App';
import { renderWithContextAndMockedProvider } from '../helpers';

test('renders ROOM PLANNER', () => {
  renderWithContextAndMockedProvider(<App />);
  expect(screen.getByText(/ROOM PLANNER/i)).toBeInTheDocument();
});
