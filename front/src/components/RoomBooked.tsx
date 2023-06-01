import { useRoomsBookedContext } from '../contexts/RoomBookedContext';
import { useRoomsContext } from '../contexts/RoomsContext';

interface Props {
  booked: boolean;
}

const RoomBooked = ({ booked }: Props) => {
  const {
    roomBookedMutationResult: [_, bookRoomResult],
  } = useRoomsBookedContext();
  const { loading: loadingMutation } = bookRoomResult;
  const {
    roomsQueryResult: { loading: loadingQuery },
  } = useRoomsContext();

  if (loadingMutation || loadingQuery)
    return (
      <div
        className={`room-booked ${
          booked ? 'background-booked' : 'background-free'
        }`}
      >
        loading...
      </div>
    );

  return booked ? (
    <div data-testid='bookable' className='room-booked background-booked'>
      booked
    </div>
  ) : (
    <div data-testid='bookable' className='room-booked background-free'>
      free
    </div>
  );
};

export default RoomBooked;
