import { Room } from '../graphql';
import RoomBookingButton from './RoomBookingButton';

interface Props {
  room: Room;
}

const RoomButtons = ({ room }: Props) => (
  <div className='room-buttons'>
    <div className='buttons-edit-delete'>
      <button className='button'>edit</button>
      <button className='button'>delete</button>
    </div>
    {room.desks ? null : <RoomBookingButton room={room} />}
  </div>
);

export default RoomButtons;
