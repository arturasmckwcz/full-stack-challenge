import fs from 'fs';

import { Room } from './types';
import data from './data';

const convertJpgToBase64 = (filePath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      const base64String = data.toString('base64');
      resolve(base64String);
    });
  });
};

const getBase64 = async (filePath: string): Promise<string> => {
  try {
    return await convertJpgToBase64(filePath);
  } catch (error) {
    console.error((error as Error).message);
    return '';
  }
};

const getImage = async (roomId: number): Promise<string> => {
  switch (roomId) {
    case 1:
      return await getBase64('./src/db/images/TV-Room.jpg');
    case 2:
      return await getBase64('./src/db/images/101.jpg');
    case 3:
      return await getBase64('./src/db/images/101.jpg');
    case 4:
      return await getBase64('./src/db/images/102.jpg');
  }
  return '';
};

export const findRoom = (roomId: number): Room | undefined =>
  data.rooms.find(({ id }) => roomId === id);

export const setRoom = (roomId: number, roomData: Partial<Room>): boolean => {
  const room:
    | {
        [key: string]: unknown;
      }
    | undefined = findRoom(roomId);

  if (!room) return false;

  Object.keys(roomData).forEach((key: string) => {
    room && (room[key] = (roomData as { [key: string]: unknown })[key]);
  });
  return true;
};

export const getRooms = async () =>
  await Promise.all(
    data.rooms.map(async room => ({ ...room, image: await getImage(room.id) })),
  );

export const getDesks = async () => data.desks;
