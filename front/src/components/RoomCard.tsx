import { RoomBookedProvider } from '../contexts/RoomBookedContext';
import { Room } from '../graphql';
import RoomButtons from './RoomButtons';
import RoomImage from './RoomImage';
import RoomInfo from './RoomInfo';

interface Props {
  room: Room;
}

const RoomCard = ({ room }: Props) => (
  <RoomBookedProvider>
    <div className='room-card'>
      <RoomImage image={room.image} />
      <RoomInfo
        name={room.name}
        description={room.description}
        booked={room.booked}
        desks={room.desks}
      />
      <RoomButtons room={room} />
    </div>
  </RoomBookedProvider>
);

export default RoomCard;
