import { ApolloError } from '@apollo/client';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { Room, useRoomsQuery } from '../graphql';

type RoomsQueryResult = {
  loading: boolean;
  error?: ApolloError;
  rooms: Room[];
};

export interface IRoomsContext {
  setRooms: (rooms: Room[]) => void;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  roomsQueryResult: RoomsQueryResult;
}

const RoomsContext = createContext<IRoomsContext | undefined>(undefined);

interface RoomsProviderProps {
  value?: IRoomsContext;
  children: ReactNode;
}

export const RoomsProvider = ({ value, children }: RoomsProviderProps) => {
  const [roomsQueryResult, setRoomsQueryResult] = useState<RoomsQueryResult>(
    {} as RoomsQueryResult,
  );
  const [search, setSearch] = useState<string>('');
  const queryResult = useRoomsQuery({});

  const setRooms = (rooms: Room[]) => {
    setRoomsQueryResult(prev => ({ ...prev, rooms }));
  };

  useEffect(() => {
    (async () => {
      const result = await queryResult;
      if (result) {
        setRoomsQueryResult({
          ...result,
          rooms: result.data?.rooms as Room[],
          // rooms: require('../testHelpers/testFixtures.json').rooms,
        } as RoomsQueryResult);
      }
    })();
  }, [queryResult]);

  return (
    <RoomsContext.Provider
      value={
        value ?? {
          setRooms,
          search,
          setSearch,
          roomsQueryResult,
        }
      }
    >
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
