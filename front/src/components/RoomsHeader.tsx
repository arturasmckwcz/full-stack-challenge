import CreateNewRoom from './CreateNewRoom';
import SearchRooms from './SearchRooms';

const RoomsHeader = () => (
  <div className='rooms-header top-stick'>
    <div className='rooms-in-rails rails-yellow'>Rooms</div>
    <CreateNewRoom />
    <SearchRooms />
  </div>
);

export default RoomsHeader;
