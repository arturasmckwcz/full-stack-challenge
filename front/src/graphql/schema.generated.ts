export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: "Mutation";
  setRoomBooked?: Maybe<Scalars["Boolean"]>;
};

export type MutationSetRoomBookedArgs = {
  booked: Scalars["Boolean"];
  roomId: Scalars["Int"];
};

export type Query = {
  __typename?: "Query";
  rooms?: Maybe<Array<Maybe<Room>>>;
};

export type Room = {
  __typename?: "Room";
  booked: Scalars["Boolean"];
  description: Scalars["String"];
  desks: Scalars["Int"];
  id: Scalars["Int"];
  image: Scalars["String"];
  name: Scalars["String"];
};
