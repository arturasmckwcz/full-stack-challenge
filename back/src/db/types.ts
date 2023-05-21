export type Room = {
  id: number;
  name: string;
  description: string;
  image: string;
  booked: boolean;
  desks?: number | null;
};

export type Desk = {
  id: number;
  roomId: number;
  booked: boolean;
};

export type RoomsAndDesks = {
  rooms: Room[];
  desks: Desk[];
};
