interface Props {
  name: string;
  description: string;
  booked: boolean;
  desks: number;
}

const RoomInfo = ({ name, description, booked, desks }: Props) => (
  <div data-testid={name} className='room-info'>
    <div className='room-name rails-yellow'>{name}</div>
    <div className='room-description'>{description}</div>
    {desks ? (
      <div data-testid='desks' className='room-desks'>
        Desks: {desks}
      </div>
    ) : booked ? (
      <div data-testid='bookable' className='room-booked background-booked'>
        booked
      </div>
    ) : (
      <div data-testid='bookable' className='room-booked background-free'>
        free
      </div>
    )}
  </div>
);

export default RoomInfo;
