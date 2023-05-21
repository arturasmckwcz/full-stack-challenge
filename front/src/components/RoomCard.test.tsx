import { render, screen } from '@testing-library/react';

import RoomCard from './RoomCard';

jest.mock('../contexts/RoomsContext.tsx', () => ({
  __esModule: true,
  useRoomsContext: () => ({ setRooms: jest.fn() }),
}));

test('renders booked but not Desks:', () => {
  const room = {
    id: 1,
    name: '',
    description: '',
    booked: true,
    desks: 0,
    image: '',
  };
  render(<RoomCard room={room} />);

  const bookedElement = screen.getByText(/booked/);
  expect(bookedElement).toBeInTheDocument();
  const cancelElement = screen.getByText(/cancel booking/);
  expect(cancelElement).toBeInTheDocument();
  const desksElement = screen.queryByText(/Desks:/);
  expect(desksElement).not.toBeInTheDocument();
});

test('renders free', () => {
  const room = {
    id: 1,
    name: '',
    description: '',
    booked: false,
    desks: 0,
    image: '',
  };
  render(<RoomCard room={room} />);
  const freeElement = screen.getByText(/free/);
  expect(freeElement).toBeInTheDocument();
  const bookElement = screen.getByText(/book/);
  expect(bookElement).toBeInTheDocument();
});

test('renders Desks: 16', () => {
  const room = {
    id: 1,
    name: '',
    description: '',
    booked: false,
    desks: 16,
    image: '',
  };
  render(<RoomCard room={room} />);
  const deskElement = screen.getByText(/Desks: 16/);
  expect(deskElement).toBeInTheDocument();
});
