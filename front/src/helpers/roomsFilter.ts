import { RoomsQuery } from '../api/mockGraphql';

export const roomsFilter = (
  rooms: RoomsQuery[],
  search: string,
): RoomsQuery[] => {
  return search
    ? rooms.filter(
        ({ name, description }) =>
          name.includes(search) || description.includes(search),
      )
    : rooms;
};
