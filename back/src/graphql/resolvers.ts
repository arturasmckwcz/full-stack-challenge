import { getRoomsWithNumberOfDesks, setBooked } from './helpers';
import { Room } from './__generated__/resolvers-types';

export const resolvers = {
  Query: {
    rooms: async (): Promise<Room[]> => await getRoomsWithNumberOfDesks(),
  },
  Mutation: {
    setRoomBooked: async (
      _: unknown,
      { roomId, booked }: { roomId: number; booked: boolean },
    ): Promise<boolean> => await setBooked(roomId, booked),
  },
};
