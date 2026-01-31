export type CoverageTier = 'basic' | 'standard' | 'premium';

export interface Traveler {
  id: string;
  age: number;
}

export interface TripDetails {
  destination: string;
  departureDate: string;
  returnDate: string;
  travelers: Traveler[];
}

export interface CoverageOption {
  tier: CoverageTier;
  name: string;
  description: string;
  basePrice: number;
  features: CoverageFeature[];
  color: string;
  popular?: boolean;
}

export interface CoverageFeature {
  name: string;
  included: boolean;
  limit?: string;
}

export interface QuoteResult {
  tier: CoverageTier;
  basePrice: number;
  tripDurationMultiplier: number;
  ageMultiplier: number;
  destinationMultiplier: number;
  totalPrice: number;
  pricePerTraveler: number;
  breakdown: {
    label: string;
    amount: number;
  }[];
}

export const DESTINATIONS = [
  { code: 'US', name: 'United States', riskLevel: 1.0 },
  { code: 'EU', name: 'Europe', riskLevel: 1.1 },
  { code: 'ASIA', name: 'Asia Pacific', riskLevel: 1.2 },
  { code: 'LATAM', name: 'Latin America', riskLevel: 1.3 },
  { code: 'AFRICA', name: 'Africa', riskLevel: 1.4 },
  { code: 'MIDDLE_EAST', name: 'Middle East', riskLevel: 1.3 },
  { code: 'OCEANIA', name: 'Australia / Oceania', riskLevel: 1.1 },
] as const;

export const COVERAGE_OPTIONS: CoverageOption[] = [
  {
    tier: 'basic',
    name: 'Basic',
    description: 'Essential coverage for budget-conscious travelers',
    basePrice: 29,
    color: 'slate',
    features: [
      { name: 'Trip Cancellation', included: true, limit: '$1,000' },
      { name: 'Medical Emergency', included: true, limit: '$10,000' },
      { name: 'Baggage Loss', included: true, limit: '$500' },
      { name: 'Flight Delay', included: true, limit: '$100' },
      { name: 'Emergency Evacuation', included: false },
      { name: '24/7 Assistance', included: false },
      { name: 'Adventure Sports', included: false },
      { name: 'Cancel for Any Reason', included: false },
    ],
  },
  {
    tier: 'standard',
    name: 'Standard',
    description: 'Comprehensive protection for most trips',
    basePrice: 59,
    color: 'blue',
    popular: true,
    features: [
      { name: 'Trip Cancellation', included: true, limit: '$5,000' },
      { name: 'Medical Emergency', included: true, limit: '$50,000' },
      { name: 'Baggage Loss', included: true, limit: '$1,500' },
      { name: 'Flight Delay', included: true, limit: '$300' },
      { name: 'Emergency Evacuation', included: true, limit: '$100,000' },
      { name: '24/7 Assistance', included: true },
      { name: 'Adventure Sports', included: false },
      { name: 'Cancel for Any Reason', included: false },
    ],
  },
  {
    tier: 'premium',
    name: 'Premium',
    description: 'Maximum protection with premium benefits',
    basePrice: 99,
    color: 'purple',
    features: [
      { name: 'Trip Cancellation', included: true, limit: '$10,000' },
      { name: 'Medical Emergency', included: true, limit: '$250,000' },
      { name: 'Baggage Loss', included: true, limit: '$3,000' },
      { name: 'Flight Delay', included: true, limit: '$500' },
      { name: 'Emergency Evacuation', included: true, limit: '$500,000' },
      { name: '24/7 Assistance', included: true },
      { name: 'Adventure Sports', included: true },
      { name: 'Cancel for Any Reason', included: true, limit: '75% refund' },
    ],
  },
];
