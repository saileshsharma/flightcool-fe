export type FlightStatus = 'on-time' | 'delayed' | 'cancelled' | 'boarding' | 'departed' | 'arrived';

export interface Airport {
  code: string;
  name: string;
  city: string;
}

export interface FlightTime {
  scheduled: string;
  estimated?: string;
  actual?: string;
}

export interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  airlineLogo: string;
  status: FlightStatus;
  departure: {
    airport: Airport;
    terminal: string;
    gate: string;
    time: FlightTime;
  };
  arrival: {
    airport: Airport;
    terminal: string;
    gate: string;
    time: FlightTime;
  };
  aircraft: string;
  progress: number; // 0-100
  duration: string;
}
