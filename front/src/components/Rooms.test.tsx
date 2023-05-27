import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import fixtures from '../testHelpers/testFixtures.json';
import Rooms from './Rooms';
import { renderWithContextAndMockedProvider } from '../testHelpers';
import * as RoomsContext from '../contexts/RoomsContext';

const mockContext = {
  roomsQueryResult: { loading: false, rooms: fixtures.rooms },
  setRooms: jest.fn(),
  search: '',
  setSearch: jest.fn(),
};

let mock: jest.SpyInstance<RoomsContext.IRoomsContext, []>;

beforeAll(() => {
  mock = jest.spyOn(RoomsContext, 'useRoomsContext');
});

afterAll(() => {
  mock.mockClear();
});

test('renders RoomsHeader', async () => {
  mock.mockReturnValue(mockContext);
  renderWithContextAndMockedProvider(<Rooms />);

  expect(screen.getByText(/Rooms/)).toBeInTheDocument();
  expect(screen.getByText(/Create New Room/)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Search/)).toBeInTheDocument();
});

test('renders 4 room cards', async () => {
  mock.mockReturnValue(mockContext);
  renderWithContextAndMockedProvider(<Rooms />);

  expect(screen.getByText(/TV-Room/)).toBeInTheDocument();
  expect(screen.getByText(/101/)).toBeInTheDocument();
  expect(screen.getByText(/Kicker Room/)).toBeInTheDocument();
  expect(screen.getByText(/102/)).toBeInTheDocument();
});

test('renders 1 room card filtered by search "TV"', async () => {
  mock.mockReturnValue({ ...mockContext, search: 'TV' });
  renderWithContextAndMockedProvider(<Rooms />);

  expect(screen.getByText(/TV-Room/)).toBeInTheDocument();
  expect(screen.queryByText(/101/)).toBeFalsy();
  expect(screen.queryByText(/Kicker Room/)).toBeFalsy();
  expect(screen.queryByText(/102/)).toBeFalsy();
});
