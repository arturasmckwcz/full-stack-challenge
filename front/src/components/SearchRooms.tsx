import { useRoomsContext } from '../contexts/RoomsContext';

const SearchRooms = () => {
  const { search, setSearch } = useRoomsContext();

  return (
    <>
      <input
        className='button search'
        placeholder='Search'
        onChange={e => setSearch(e.target.value)}
        value={search}
      />
    </>
  );
};

export default SearchRooms;
