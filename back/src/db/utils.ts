import { roomsAndDesks } from './data';
import { Room, RoomsAndDesks } from './types';

export const getRooms = async (roomsAndDesks: RoomsAndDesks): Promise<Room[]> =>
  roomsAndDesks.rooms.map(room => {
    room.desks =
      room.desks === null
        ? 0
        : roomsAndDesks.desks.reduce(
            (acc, desk) => (desk.roomId === room.id ? acc + 1 : acc),
            0,
          );
    return room;
  });

export const getRoomsWithNumberOfDesks = () => getRooms(roomsAndDesks);
