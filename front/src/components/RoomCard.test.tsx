import { screen } from '@testing-library/react';

import fixtures from '../testHelpers/testFixtures.json';
import RoomCard from './RoomCard';
import { renderWithContextAndMockedProvider } from '../testHelpers';

test('renders all defaults and booked but not Desks:', async () => {
  renderWithContextAndMockedProvider(<RoomCard room={fixtures.rooms[0]} />);

  expect(screen.getByText(/TV-Room/)).toBeInTheDocument();
  expect(
    screen.getByText(/Wednesday is horror movie night!/),
  ).toBeInTheDocument();
  expect(screen.getByText(/edit/)).toBeInTheDocument();
  expect(screen.getByText(/delete/)).toBeInTheDocument();
  expect(screen.getByText(/booked/)).toBeInTheDocument();
  expect(screen.getByText(/cancel booking/)).toBeInTheDocument();
  expect(screen.queryByText(/Desks:/)).not.toBeInTheDocument();
});

test('renders free', () => {
  renderWithContextAndMockedProvider(<RoomCard room={fixtures.rooms[2]} />);
  expect(screen.getByText(/free/)).toBeInTheDocument();
  expect(screen.getByText(/book/)).toBeInTheDocument();
});

test('renders not booked nor free but Desks: 16', () => {
  renderWithContextAndMockedProvider(<RoomCard room={fixtures.rooms[3]} />);
  expect(screen.getByText(/Desks: 16/)).toBeInTheDocument();
});
