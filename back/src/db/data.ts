import fs from 'fs';

import { RoomsAndDesks } from './types';

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

export const roomsAndDesks = async (): Promise<RoomsAndDesks> => ({
  rooms: [
    {
      id: 1,
      name: 'TV-Room',
      description: 'Wednesday is horror movie night!',
      image: await getBase64('./src/db/images/TV-Room.jpg'),
      booked: true,
      desks: null,
    },
    {
      id: 2,
      name: '101',
      description: 'Backend-Room',
      image: await getBase64('./src/db/images/101.jpg'),
      booked: false,
    },
    {
      id: 3,
      name: 'Kicker Room',
      description: 'Come and have some fun!',
      image: await getBase64('./src/db/images/Kicker Room.jpg'),
      booked: false,
      desks: null,
    },
    {
      id: 4,
      name: '102',
      description: 'Frontend area',
      image: await getBase64('./src/db/images/102.jpg'),
      booked: false,
    },
  ],
  desks: [
    { id: 1, roomId: 2, booked: false },
    { id: 2, roomId: 2, booked: false },
    { id: 3, roomId: 4, booked: false },
    { id: 4, roomId: 4, booked: false },
    { id: 5, roomId: 4, booked: false },
    { id: 6, roomId: 4, booked: false },
    { id: 7, roomId: 4, booked: false },
    { id: 8, roomId: 4, booked: false },
    { id: 9, roomId: 4, booked: false },
    { id: 10, roomId: 4, booked: false },
    { id: 11, roomId: 4, booked: false },
    { id: 12, roomId: 4, booked: false },
    { id: 13, roomId: 4, booked: false },
    { id: 14, roomId: 4, booked: false },
    { id: 15, roomId: 4, booked: false },
    { id: 16, roomId: 4, booked: false },
    { id: 17, roomId: 4, booked: false },
    { id: 18, roomId: 4, booked: false },
  ],
});
