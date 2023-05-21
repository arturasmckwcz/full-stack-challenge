import { RoomsAndDesks } from './types';
import { getRooms } from './utils';

describe('utils', () => {
  describe('getRooms()', () => {
    it('should return proper value of desks', async () => {
      const roomsAndDesks: RoomsAndDesks = {
        rooms: [
          {
            id: 1,
            name: 'TV-Room',
            description: 'Wednesday is horror movie night!',
            image: '',
            booked: true,
            desks: null,
          },
          {
            id: 2,
            name: '101',
            description: 'Backend-Room',
            image: '',
            booked: false,
          },
        ],
        desks: [
          { id: 1, roomId: 2, booked: false },
          { id: 2, roomId: 2, booked: false },
        ],
      };
      const rooms = await getRooms(roomsAndDesks);

      expect(rooms.find(room => room?.desks === 2)).toBeTruthy();
      expect(rooms.find(room => room?.desks === 0)).toBeTruthy();
    });
  });
});
