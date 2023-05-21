import { getRooms } from './helpers';
import { Room } from './__generated__/resolvers-types';

export const resolvers = {
  Query: {
    rooms: async (): Promise<Room[]> => await getRooms(),
  },
};
