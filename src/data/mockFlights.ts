import { Flight } from '../types/flight';

export const mockFlights: Flight[] = [
  {
    id: '1',
    flightNumber: 'SQ321',
    airline: 'Singapore Airlines',
    airlineLogo: '🛫',
    status: 'on-time',
    departure: {
      airport: { code: 'SIN', name: 'Changi Airport', city: 'Singapore' },
      terminal: 'T3',
      gate: 'B12',
      time: { scheduled: '2025-01-25T08:30:00', estimated: '2025-01-25T08:30:00' }
    },
    arrival: {
      airport: { code: 'LHR', name: 'Heathrow Airport', city: 'London' },
      terminal: 'T2',
      gate: 'A45',
      time: { scheduled: '2025-01-25T15:45:00', estimated: '2025-01-25T15:45:00' }
    },
    aircraft: 'Airbus A380-800',
    progress: 0,
    duration: '13h 15m'
  },
  {
    id: '2',
    flightNumber: 'UA123',
    airline: 'United Airlines',
    airlineLogo: '✈️',
    status: 'delayed',
    departure: {
      airport: { code: 'JFK', name: 'John F. Kennedy Intl', city: 'New York' },
      terminal: 'T7',
      gate: 'C22',
      time: { scheduled: '2025-01-25T10:00:00', estimated: '2025-01-25T11:30:00' }
    },
    arrival: {
      airport: { code: 'LAX', name: 'Los Angeles Intl', city: 'Los Angeles' },
      terminal: 'T5',
      gate: 'D18',
      time: { scheduled: '2025-01-25T13:30:00', estimated: '2025-01-25T15:00:00' }
    },
    aircraft: 'Boeing 787-9',
    progress: 0,
    duration: '5h 30m'
  },
  {
    id: '3',
    flightNumber: 'BA456',
    airline: 'British Airways',
    airlineLogo: '🇬🇧',
    status: 'boarding',
    departure: {
      airport: { code: 'LHR', name: 'Heathrow Airport', city: 'London' },
      terminal: 'T5',
      gate: 'A10',
      time: { scheduled: '2025-01-25T09:15:00', estimated: '2025-01-25T09:15:00' }
    },
    arrival: {
      airport: { code: 'CDG', name: 'Charles de Gaulle', city: 'Paris' },
      terminal: 'T2E',
      gate: 'K55',
      time: { scheduled: '2025-01-25T11:30:00', estimated: '2025-01-25T11:30:00' }
    },
    aircraft: 'Airbus A320neo',
    progress: 0,
    duration: '1h 15m'
  },
  {
    id: '4',
    flightNumber: 'EK888',
    airline: 'Emirates',
    airlineLogo: '🏜️',
    status: 'departed',
    departure: {
      airport: { code: 'DXB', name: 'Dubai Intl', city: 'Dubai' },
      terminal: 'T3',
      gate: 'B38',
      time: { scheduled: '2025-01-25T02:00:00', actual: '2025-01-25T02:05:00' }
    },
    arrival: {
      airport: { code: 'SYD', name: 'Sydney Airport', city: 'Sydney' },
      terminal: 'T1',
      gate: 'A22',
      time: { scheduled: '2025-01-25T16:30:00', estimated: '2025-01-25T16:25:00' }
    },
    aircraft: 'Airbus A380-800',
    progress: 65,
    duration: '14h 30m'
  },
  {
    id: '5',
    flightNumber: 'AA789',
    airline: 'American Airlines',
    airlineLogo: '🦅',
    status: 'cancelled',
    departure: {
      airport: { code: 'ORD', name: "O'Hare Intl", city: 'Chicago' },
      terminal: 'T3',
      gate: 'H15',
      time: { scheduled: '2025-01-25T14:00:00' }
    },
    arrival: {
      airport: { code: 'MIA', name: 'Miami Intl', city: 'Miami' },
      terminal: 'N',
      gate: 'D12',
      time: { scheduled: '2025-01-25T18:30:00' }
    },
    aircraft: 'Boeing 737 MAX 8',
    progress: 0,
    duration: '3h 30m'
  },
  {
    id: '6',
    flightNumber: 'QF12',
    airline: 'Qantas',
    airlineLogo: '🦘',
    status: 'arrived',
    departure: {
      airport: { code: 'SYD', name: 'Sydney Airport', city: 'Sydney' },
      terminal: 'T1',
      gate: 'B52',
      time: { scheduled: '2025-01-24T16:00:00', actual: '2025-01-24T16:10:00' }
    },
    arrival: {
      airport: { code: 'LAX', name: 'Los Angeles Intl', city: 'Los Angeles' },
      terminal: 'TB',
      gate: 'A9',
      time: { scheduled: '2025-01-24T13:30:00', actual: '2025-01-24T13:25:00' }
    },
    aircraft: 'Airbus A380-800',
    progress: 100,
    duration: '13h 30m'
  },
  {
    id: '7',
    flightNumber: 'LH901',
    airline: 'Lufthansa',
    airlineLogo: '🇩🇪',
    status: 'on-time',
    departure: {
      airport: { code: 'FRA', name: 'Frankfurt Airport', city: 'Frankfurt' },
      terminal: 'T1',
      gate: 'A26',
      time: { scheduled: '2025-01-25T18:45:00', estimated: '2025-01-25T18:45:00' }
    },
    arrival: {
      airport: { code: 'NRT', name: 'Narita Intl', city: 'Tokyo' },
      terminal: 'T1',
      gate: 'Gate 32',
      time: { scheduled: '2025-01-26T14:15:00', estimated: '2025-01-26T14:15:00' }
    },
    aircraft: 'Boeing 747-8',
    progress: 0,
    duration: '11h 30m'
  },
  {
    id: '8',
    flightNumber: 'AF1234',
    airline: 'Air France',
    airlineLogo: '🇫🇷',
    status: 'departed',
    departure: {
      airport: { code: 'CDG', name: 'Charles de Gaulle', city: 'Paris' },
      terminal: 'T2E',
      gate: 'L42',
      time: { scheduled: '2025-01-25T06:00:00', actual: '2025-01-25T06:08:00' }
    },
    arrival: {
      airport: { code: 'JFK', name: 'John F. Kennedy Intl', city: 'New York' },
      terminal: 'T1',
      gate: 'B8',
      time: { scheduled: '2025-01-25T08:45:00', estimated: '2025-01-25T08:40:00' }
    },
    aircraft: 'Airbus A350-900',
    progress: 42,
    duration: '8h 45m'
  }
];

export function searchFlights(query: string): Flight[] {
  if (!query.trim()) return mockFlights;
  
  const normalizedQuery = query.toLowerCase().trim();
  
  return mockFlights.filter(flight => 
    flight.flightNumber.toLowerCase().includes(normalizedQuery) ||
    flight.departure.airport.code.toLowerCase().includes(normalizedQuery) ||
    flight.arrival.airport.code.toLowerCase().includes(normalizedQuery) ||
    flight.departure.airport.city.toLowerCase().includes(normalizedQuery) ||
    flight.arrival.airport.city.toLowerCase().includes(normalizedQuery) ||
    flight.airline.toLowerCase().includes(normalizedQuery)
  );
}
