import { Room } from '../graphql';

export const roomsFilter = (rooms: Room[], search: string): Room[] =>
  search
    ? rooms.filter(
        ({ name, description }) =>
          name.includes(search) || description.includes(search),
      )
    : rooms;

export const updateRoom = (rooms: Room[], room: Room): Room[] => {
  return rooms.map(item => (item.id === room.id ? room : item));
};
