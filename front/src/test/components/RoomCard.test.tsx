import { screen } from '@testing-library/react';

import fixtures from '../e2e/testFixtures.json';
import RoomCard from '../../components/RoomCard';
import { renderWithContextAndMockedProvider } from '../helpers';

test('renders all defaults and booked but not Desks:', async () => {
  renderWithContextAndMockedProvider(
    <RoomCard room={fixtures.data.rooms[0]} />,
  );

  expect(screen.getByText(/TV-Room/)).toBeInTheDocument();
  expect(
    screen.getByText(/Wednesday is horror movie night!/),
  ).toBeInTheDocument();
  expect(screen.getByText(/edit/)).toBeInTheDocument();
  expect(screen.getByText(/delete/)).toBeInTheDocument();
  expect(screen.getByText(/booked/)).toBeInTheDocument();
  expect(screen.getByText(/cancel booking/)).toBeInTheDocument();
});

test('renders free', () => {
  renderWithContextAndMockedProvider(
    <RoomCard room={fixtures.data.rooms[2]} />,
  );
  expect(screen.getByText(/free/)).toBeInTheDocument();
  expect(screen.getByText(/book/)).toBeInTheDocument();
  expect(screen.queryByText(/Desks:/)).not.toBeInTheDocument();
});

test('renders not booked nor free but Desks: 16', () => {
  renderWithContextAndMockedProvider(
    <RoomCard room={fixtures.data.rooms[3]} />,
  );
  expect(screen.queryByText(/free/)).not.toBeInTheDocument();
  expect(screen.queryByText(/booked/)).not.toBeInTheDocument();
  expect(screen.queryByText(/book/)).not.toBeInTheDocument();
  expect(screen.getByText(/Desks: 16/)).toBeInTheDocument();
});
