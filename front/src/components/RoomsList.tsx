import RoomCard from './RoomCard';
import { useRoomsContext } from '../contexts/RoomsContext';
import { roomsFilter } from '../helpers';
import RoomsLoading from './RoomsLoading';
import RoomsError from './RoomsError';
import { Room } from '../graphql';

const RoomsList = () => {
  const {
    search,
    roomsQueryResult: { loading, error, data },
  } = useRoomsContext();

  return (
    <div className='rooms-list'>
      {loading && <RoomsLoading />}
      {error && <RoomsError error={error} />}
      {data?.rooms &&
        roomsFilter(data?.rooms as Room[], search).map((room: Room) => (
          <RoomCard key={room.id} room={room} />
        ))}
    </div>
  );
};

export default RoomsList;
