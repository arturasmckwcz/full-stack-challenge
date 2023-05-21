import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

import { RoomsQuery, useRoomsQuery } from '../api/mockGraphql';

interface RoomsContextType {
  rooms: RoomsQuery[];
  setRooms: Dispatch<SetStateAction<RoomsQuery[]>>;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

const RoomsContext = createContext<RoomsContextType | undefined>(undefined);

interface RoomsProviderProps {
  children: ReactNode;
}

export const RoomsProvider = ({ children }: RoomsProviderProps) => {
  const [rooms, setRooms] = useState<RoomsQuery[]>([]);
  const [search, setSearch] = useState<string>('');
  const { loading, error } = useRoomsQuery({
    onCompleted: data => !rooms.length && setRooms(data.rooms),
  });
  return (
    <RoomsContext.Provider value={{ rooms, setRooms, search, setSearch }}>
      {children}
    </RoomsContext.Provider>
  );
};

export const useRoomsContext = () => {
  const context = useContext(RoomsContext);

  if (!context)
    throw new Error('RoomsContext should be used inside RoomsProvider');

  return context;
};

export default RoomsContext;
