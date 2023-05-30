import sinon, { SinonSandbox } from 'sinon';
import * as utils from '../db/utils';

import { RoomsAndDesks } from '../db/types';
import { getRoomsWithNumberOfDesks, setBooked } from '../graphql/helpers';

describe('helpers', () => {
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

  let sandbox: SinonSandbox;

  beforeAll(() => {
    sandbox = sinon.createSandbox();
    sandbox.stub(utils, 'getRooms').resolves(roomsAndDesks.rooms);
    sandbox.stub(utils, 'getDesks').resolves(roomsAndDesks.desks);
    sandbox.stub(utils, 'findRoom').resolves(roomsAndDesks.rooms[1]);
  });

  afterAll(() => sandbox.restore());

  describe('getRoomsWithNumberOfDesks()', () => {
    it('should return proper value of desks', async () => {
      const rooms = await getRoomsWithNumberOfDesks();

      expect(
        rooms.find(room => room?.name === 'TV-Room' && room?.desks === 0),
      ).toBeTruthy();
      expect(
        rooms.find(room => room?.name === '101' && room?.desks === 2),
      ).toBeTruthy();
    });
  });

  describe('setBooked', () => {
    it('should not set booked for room 101', async () => {
      expect(await setBooked(2, true)).toBeFalsy();
    });
  });
});
