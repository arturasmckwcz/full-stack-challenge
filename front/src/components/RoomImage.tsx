interface Props {
  image: string;
}

const RoomImage = ({ image }: Props) => (
  <img
    className='room-image'
    src={image ? `data:image/jpeg;base64,${image}` : ''}
    alt='Failed to load'
  ></img>
);

export default RoomImage;
