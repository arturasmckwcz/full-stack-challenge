import { Room } from '../graphql';

export const roomsFilter = (rooms: Room[], search: string): Room[] =>
  search
    ? rooms.filter(
        ({ name, description }) =>
          name.includes(search) || description.includes(search),
      )
    : rooms;
