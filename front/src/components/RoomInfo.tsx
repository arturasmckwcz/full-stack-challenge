interface Props {
  name: string;
  description: string;
  booked: boolean;
  desks: number;
}

const RoomInfo = ({ name, description, booked, desks }: Props) => (
  <div className='room-info'>
    <div className='room-name rails-yellow'>{name}</div>
    <div className='room-description'>{description}</div>
    {desks ? (
      <div className='room-desks'>Desks: {desks}</div>
    ) : booked ? (
      <div className='room-booked background-booked'>booked</div>
    ) : (
      <div className='room-booked background-free'>free</div>
    )}
  </div>
);

export default RoomInfo;
