import { MutationTuple } from '@apollo/client';

import { ReactNode, createContext, useContext } from 'react';

import {
  useSetRoomBookedMutation,
  SetRoomBookedMutationResult,
  SetRoomBookedMutationVariables,
} from '../graphql';

type RoomBookedMutationResult = MutationTuple<
  SetRoomBookedMutationResult,
  SetRoomBookedMutationVariables
>;

export interface IRoomBookedContext {
  roomBookedMutationResult: RoomBookedMutationResult;
}

const RoomBookedContext = createContext<IRoomBookedContext | undefined>(
  undefined,
);

interface RoomBookedProviderProps {
  children: ReactNode;
}

export const RoomBookedProvider = ({ children }: RoomBookedProviderProps) => {
  const mutationResult = useSetRoomBookedMutation({
    variables: { roomId: 0, booked: false },
  });

  return (
    <RoomBookedContext.Provider
      value={{
        roomBookedMutationResult: mutationResult as RoomBookedMutationResult,
      }}
    >
      {children}
    </RoomBookedContext.Provider>
  );
};

export const useRoomsBookedContext = () => {
  const context = useContext(RoomBookedContext);

  if (!context)
    throw new Error(
      'RoomBookedContext should be used inside RoomBookedProvider',
    );

  return context;
};

export default RoomBookedContext;
