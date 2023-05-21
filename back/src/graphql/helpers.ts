import { getRoomsWithNumberOfDesks } from '../db';
import { Room } from './__generated__/resolvers-types';

export const getRooms = () => getRoomsWithNumberOfDesks() as unknown as Room[];
