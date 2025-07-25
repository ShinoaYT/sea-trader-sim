export interface Ship {
  id: string;
  name: string;
  capacity: number;
  price: number;
  speed: number; // knots
  profitPerTrip: number;
  owned: boolean;
}

export interface Harbor {
  id: string;
  name: string;
  x: number;
  y: number;
}

export interface GameState {
  money: number;
  ships: Ship[];
  activeShip: Ship | null;
  harbors: Harbor[];
  currentRoute: {
    from: Harbor;
    to: Harbor;
    progress: number; // 0-100
    traveling: boolean;
  } | null;
}

export const INITIAL_SHIPS: Ship[] = [
  {
    id: 'starter',
    name: 'Container Freighter',
    capacity: 100,
    price: 50000,
    speed: 20,
    profitPerTrip: 10000,
    owned: false
  },
  {
    id: 'big',
    name: 'Big Freighter',
    capacity: 500,
    price: 200000,
    speed: 18,
    profitPerTrip: 50000,
    owned: false
  }
];

export const HARBORS: Harbor[] = [
  { id: 'a', name: 'Harbor Alpha', x: 15, y: 40 },
  { id: 'b', name: 'Harbor Beta', x: 85, y: 60 }
];