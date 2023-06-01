import { useEffect, useState } from 'react';

import { useRoomsBookedContext } from '../contexts/RoomBookedContext';
import { useRoomsContext } from '../contexts/RoomsContext';
import { Room } from '../graphql';

interface Props {
  room: Room;
}

const RoomBookingButton = ({ room }: Props) => {
  const {
    roomsQueryResult: { refetch },
  } = useRoomsContext();

  const {
    roomBookedMutationResult: [bookRoom, bookRoomResult],
  } = useRoomsBookedContext();
  const { loading, error, called, reset } = bookRoomResult;

  const [loadingFlag, setLoadingFlag] = useState(false);

  const onClickHandler = async (room: Room) => {
    await bookRoom({
      variables: { roomId: room.id, booked: !room.booked },
    });
  };

  useEffect(() => {
    if (error) {
      reset();
      alert(`Failed with error: ${error.message}`);
    }
  }, [error, reset]);

  useEffect(() => {
    if (called) {
      (async () => {
        await refetch();
        reset();
      })();
    }
  }, [called, refetch, reset]);

  return (
    <button
      className='button room-book-cancel'
      onClick={() => onClickHandler(room)}
    >
      <span className='horizontal-scroll'>
        {loading ? 'booking...' : room.booked ? 'cancel booking' : 'book'}
      </span>
    </button>
  );
};

export default RoomBookingButton;
