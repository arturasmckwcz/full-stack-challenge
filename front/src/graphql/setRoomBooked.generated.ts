import type * as Types from "./schema.generated";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type SetRoomBookedMutationVariables = Types.Exact<{
  roomId: Types.Scalars["Int"];
  booked: Types.Scalars["Boolean"];
}>;

export type SetRoomBookedMutation = {
  __typename?: "Mutation";
  setRoomBooked?: boolean | null;
};

export const SetRoomBookedDocument = gql`
  mutation setRoomBooked($roomId: Int!, $booked: Boolean!) {
    setRoomBooked(roomId: $roomId, booked: $booked)
  }
`;
export type SetRoomBookedMutationFn = Apollo.MutationFunction<
  SetRoomBookedMutation,
  SetRoomBookedMutationVariables
>;

/**
 * __useSetRoomBookedMutation__
 *
 * To run a mutation, you first call `useSetRoomBookedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetRoomBookedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setRoomBookedMutation, { data, loading, error }] = useSetRoomBookedMutation({
 *   variables: {
 *      roomId: // value for 'roomId'
 *      booked: // value for 'booked'
 *   },
 * });
 */
export function useSetRoomBookedMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SetRoomBookedMutation,
    SetRoomBookedMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SetRoomBookedMutation,
    SetRoomBookedMutationVariables
  >(SetRoomBookedDocument, options);
}
export type SetRoomBookedMutationHookResult = ReturnType<
  typeof useSetRoomBookedMutation
>;
export type SetRoomBookedMutationResult =
  Apollo.MutationResult<SetRoomBookedMutation>;
export type SetRoomBookedMutationOptions = Apollo.BaseMutationOptions<
  SetRoomBookedMutation,
  SetRoomBookedMutationVariables
>;
