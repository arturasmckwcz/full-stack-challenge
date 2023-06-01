import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

import { useRoomsQuery, RoomsQueryResult } from '../graphql';

export interface IRoomsContext {
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
  const [search, setSearch] = useState<string>('');
  const queryResult = useRoomsQuery({});

  return (
    <RoomsContext.Provider
      value={
        value ?? {
          search,
          setSearch,
          roomsQueryResult: queryResult,
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
