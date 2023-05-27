import { useCallback } from 'react';

// import { useRoomBookedMutation } from '../api/mockGraphql';
import { useRoomsContext } from '../contexts/RoomsContext';
import { Room } from '../graphql';
import { updateRoom } from '../helpers';

interface Props {
  room: Room;
}

const RoomBookingButton = ({ room }: Props) => {
  const {
    roomsQueryResult: { rooms },
    setRooms,
  } = useRoomsContext();
  // const [bookRoom] = useRoomBookedMutation();
  const onClickHandler = useCallback(
    async (room: Room) => {
      const booked = !room.booked;
      // await bookRoom({ id: room.id, booked });
      setRooms(updateRoom(rooms, { ...room, booked }));
    },
    [rooms, setRooms],
  );

  return (
    <button
      className='button room-book-cancel'
      onClick={() => onClickHandler(room)}
    >
      {room.booked ? 'cancel booking' : 'book'}
    </button>
  );
};

export default RoomBookingButton;
