import { screen } from '@testing-library/react';
import { ApolloClient, ApolloQueryResult } from '@apollo/client';

import fixtures from '../e2e/testFixtures.json';
import RoomCard from '../../components/RoomCard';
import { renderWithContextAndMockedProvider } from '../helpers';
import * as RoomsContext from '../../contexts/RoomsContext';
import * as RoomBookedContext from '../../contexts/RoomBookedContext';
import { RoomsQuery, RoomsQueryResult } from '../../graphql';

describe('<RoomCard/>', () => {
  const mockRoomsResult: RoomsContext.IRoomsContext = {
    roomsQueryResult: {
      loading: false,
      data: fixtures.data,
      refetch: jest.fn() as () => Promise<ApolloQueryResult<RoomsQuery>>,
    } as RoomsQueryResult,
    search: '',
    setSearch: jest.fn(),
  };
  const mockRoomBookedResult: RoomBookedContext.IRoomBookedContext = {
    roomBookedMutationResult: [
      jest.fn(),
      {
        loading: false,
        called: true,
        reset: jest.fn(),
        client: {} as ApolloClient<object>,
      },
    ],
  };

  let mockRoomsContext: jest.SpyInstance<RoomsContext.IRoomsContext, []>;
  let mockRoomBookedContext: jest.SpyInstance<
    RoomBookedContext.IRoomBookedContext,
    []
  >;

  beforeEach(() => {
    mockRoomsContext = jest.spyOn(RoomsContext, 'useRoomsContext');
    mockRoomBookedContext = jest.spyOn(
      RoomBookedContext,
      'useRoomsBookedContext',
    );
    mockRoomsContext.mockReturnValue(mockRoomsResult);
    mockRoomBookedContext.mockReturnValue(mockRoomBookedResult);
  });

  afterEach(() => {
    mockRoomsContext.mockClear();
    mockRoomBookedContext.mockClear();
  });

  test('renders all defaults and booked but not Desks', () => {
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
});
