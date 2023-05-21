import { useCallback } from 'react';

import {
  RoomsQuery,
  useRoomBookedMutation,
  rooms as data,
} from '../api/mockGraphql';
import { useRoomsContext } from '../contexts/RoomsContext';

interface Props {
  room: RoomsQuery;
}

interface OnClickArgs extends Props {}

const RoomBookingButton = ({ room }: Props) => {
  const { setRooms } = useRoomsContext();
  const [bookRoom] = useRoomBookedMutation();
  const onClickHandler = useCallback(
    async ({ room }: OnClickArgs) => {
      const booked = !room.booked;
      await bookRoom({ id: room.id, booked });
      setRooms(prev =>
        prev.map(item => (item.id === room.id ? { ...item, booked } : item)),
      );
    },
    [bookRoom, setRooms],
  );

  return (
    <button
      className='button room-book-cancel'
      onClick={() => onClickHandler({ room })}
    >
      {room.booked ? 'cancel booking' : 'book'}
    </button>
  );
};

export default RoomBookingButton;
