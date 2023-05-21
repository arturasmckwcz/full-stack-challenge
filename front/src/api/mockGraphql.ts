export type RoomsQuery = {
  id: number;
  name: string;
  description: string;
  desks: number;
  booked: boolean;
  image: string;
};

export const rooms: RoomsQuery[] = require('./rooms.json');

export const useRoomsQuery = ({
  onCompleted,
}: {
  onCompleted: (data: { rooms: RoomsQuery[] }) => void;
}): { loading: boolean; error: object | null } => {
  onCompleted({ rooms });
  return { loading: false, error: null };
};

export type RoomBookedMutationVariables = { id: number; booked: boolean };

type MutationResult = {
  data: RoomsQuery | null;
  loading: boolean;
  error: Error | null;
  called: boolean;
};

export type MutationHookReturnValue<T> = [
  (variables: T) => Promise<void>,
  MutationResult,
];

export const useRoomBookedMutation =
  (): MutationHookReturnValue<RoomBookedMutationVariables> => {
    const mutate = ({ id, booked }: RoomBookedMutationVariables) => {
      const room = rooms.find(room => room.id === id);
      let { loading, error } = mutationResult;
      if (room) {
        loading = true;
        room.booked = booked;
        loading = false;
        error = null;
        return Promise.resolve();
      }
      error = new Error('Something wrong');
      loading = false;
      return Promise.reject(error);
    };
    const mutationResult: MutationResult = {
      data: null,
      loading: false,
      error: null,
      called: false,
    };

    return [mutate, mutationResult];
  };
