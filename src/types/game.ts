export interface Ship {
  id: string;
  name: string;
  type: string;
  capacity: number;
  price: number;
  speed: number; // knots
  profitPerNM: number; // profit per nautical mile
  profitPerTrip: number; // deprecated, kept for compatibility
  owned: boolean;
  imageUrl?: string;
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
  // Container Ships
  {
    id: 'container-small',
    name: 'Small Container Ship',
    type: 'Container',
    capacity: 150,
    price: 80000,
    speed: 22,
    profitPerNM: 5,
    profitPerTrip: 8000,
    owned: false,
    imageUrl: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21'
  },
  {
    id: 'container-medium',
    name: 'Medium Container Ship',
    type: 'Container',
    capacity: 400,
    price: 180000,
    speed: 20,
    profitPerNM: 8,
    profitPerTrip: 15000,
    owned: false,
    imageUrl: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21'
  },
  {
    id: 'container-large',
    name: 'Large Container Ship',
    type: 'Container',
    capacity: 800,
    price: 350000,
    speed: 18,
    profitPerNM: 12,
    profitPerTrip: 28000,
    owned: false,
    imageUrl: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21'
  },
  
  // Oil Tankers
  {
    id: 'oil-small',
    name: 'Small Oil Tanker',
    type: 'Oil Tanker',
    capacity: 200,
    price: 120000,
    speed: 18,
    profitPerNM: 7,
    profitPerTrip: 12000,
    owned: false,
    imageUrl: 'https://images.unsplash.com/photo-1518877593221-1f28583780b4'
  },
  {
    id: 'oil-large',
    name: 'Large Oil Tanker',
    type: 'Oil Tanker',
    capacity: 1200,
    price: 600000,
    speed: 15,
    profitPerNM: 20,
    profitPerTrip: 45000,
    owned: false,
    imageUrl: 'https://images.unsplash.com/photo-1518877593221-1f28583780b4'
  },
  
  // Gas Ships
  {
    id: 'gas-medium',
    name: 'LNG Carrier',
    type: 'Gas Ship',
    capacity: 300,
    price: 280000,
    speed: 19,
    profitPerNM: 15,
    profitPerTrip: 22000,
    owned: false,
    imageUrl: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7'
  },
  
  // Ferries
  {
    id: 'ferry-small',
    name: 'Passenger Ferry',
    type: 'Ferry',
    capacity: 80,
    price: 95000,
    speed: 25,
    profitPerNM: 6,
    profitPerTrip: 7500,
    owned: false,
    imageUrl: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716'
  },
  
  // Cruise Ships
  {
    id: 'cruise-large',
    name: 'Luxury Cruise Ship',
    type: 'Cruise Ship',
    capacity: 500,
    price: 800000,
    speed: 22,
    profitPerNM: 25,
    profitPerTrip: 60000,
    owned: false,
    imageUrl: 'https://images.unsplash.com/photo-1472396961693-142e6e269027'
  }
];

export const HARBORS: Harbor[] = [
  { id: 'hamburg', name: 'Hamburg', x: 25, y: 30 },
  { id: 'rotterdam', name: 'Rotterdam', x: 45, y: 25 },
  { id: 'antwerp', name: 'Antwerp', x: 40, y: 35 },
  { id: 'london', name: 'London', x: 35, y: 40 },
  { id: 'liverpool', name: 'Liverpool', x: 20, y: 45 },
  { id: 'bremen', name: 'Bremen', x: 30, y: 25 },
  { id: 'gothenburg', name: 'Gothenburg', x: 50, y: 15 },
  { id: 'oslo', name: 'Oslo', x: 55, y: 10 },
  { id: 'copenhagen', name: 'Copenhagen', x: 60, y: 20 },
  { id: 'stockholm', name: 'Stockholm', x: 75, y: 12 },
  { id: 'helsinki', name: 'Helsinki', x: 85, y: 15 },
  { id: 'gdansk', name: 'Gdansk', x: 70, y: 25 },
  { id: 'barcelona', name: 'Barcelona', x: 15, y: 75 },
  { id: 'marseille', name: 'Marseille', x: 25, y: 80 },
  { id: 'genoa', name: 'Genoa', x: 35, y: 85 },
  { id: 'naples', name: 'Naples', x: 45, y: 90 },
  { id: 'venice', name: 'Venice', x: 50, y: 82 },
  { id: 'istanbul', name: 'Istanbul', x: 85, y: 75 },
  { id: 'piraeus', name: 'Piraeus', x: 70, y: 85 },
  { id: 'valencia', name: 'Valencia', x: 10, y: 70 }
];