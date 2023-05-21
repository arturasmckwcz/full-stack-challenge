import { render, screen } from '@testing-library/react';
import RoomInfo from './RoomInfo';

test('renders booked but not Desks:', () => {
  render(<RoomInfo name='' description='' booked={true} desks={0} />);
  const bookedElement = screen.getByText(/booked/);
  expect(bookedElement).toBeInTheDocument();
  const desksElement = screen.queryByText(/Desks:/);
  expect(desksElement).not.toBeInTheDocument();
});

test('renders free', () => {
  render(<RoomInfo name='' description='' booked={false} desks={0} />);
  const bookedElement = screen.getByText(/free/);
  expect(bookedElement).toBeInTheDocument();
});

test('renders Desks: 16', () => {
  render(<RoomInfo name='' description='' booked={false} desks={16} />);
  const bookedElement = screen.getByText(/Desks: 16/);
  expect(bookedElement).toBeInTheDocument();
});
