import RoomsHeader from './RoomsHeader';
import RoomsList from './RoomsList';
import { RoomsProvider } from '../contexts/RoomsContext';

const Rooms = () => {
  return (
    <RoomsProvider>
      <RoomsHeader />
      <RoomsList />
    </RoomsProvider>
  );
};

export default Rooms;
