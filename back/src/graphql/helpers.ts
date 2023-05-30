import { getRooms, getDesks, setRoom, findRoom } from '../db';
import { Room } from './__generated__/resolvers-types';

export const getRoomsWithNumberOfDesks = async (): Promise<Room[]> => {
  const rooms = await getRooms();
  const desks = await getDesks();

  const roomsAndDesks = rooms.map(room => {
    room.desks =
      room.desks === null
        ? 0
        : desks.reduce(
            (acc, desk) => (desk.roomId === room.id ? acc + 1 : acc),
            0,
          );
    return room;
  });

  return roomsAndDesks as Room[];
};

export const setBooked = async (
  roomId: number,
  booked: boolean,
): Promise<boolean> => {
  const room = findRoom(roomId);
  return room?.desks === null ? await setRoom(roomId, { booked }) : false;
};
