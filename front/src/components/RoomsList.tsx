import RoomCard from './RoomCard';
import { useRoomsContext } from '../contexts/RoomsContext';
import { roomsFilter } from '../helpers';

const RoomsList = () => {
  const { rooms, search } = useRoomsContext();

  return (
    <div className='rooms-list'>
      {roomsFilter(rooms, search).map(room => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  );
};

export default RoomsList;
