import RoomCard from './RoomCard';
import { useRoomsContext } from '../contexts/RoomsContext';
import { roomsFilter } from '../helpers';
import RoomsLoading from './RoomsLoading';
import RoomsError from './RoomsError';
import { Room } from '../graphql';

const RoomsList = () => {
  const {
    search,
    roomsQueryResult: { loading, error, rooms },
  } = useRoomsContext();

  return (
    <div className='rooms-list'>
      {loading && <RoomsLoading />}
      {error && <RoomsError error={error} />}
      {rooms &&
        roomsFilter(rooms, search).map((room: Room) => (
          <RoomCard key={room.id} room={room} />
        ))}
    </div>
  );
};

export default RoomsList;
