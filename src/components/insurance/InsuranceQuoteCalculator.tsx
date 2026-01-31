import { useState, useMemo, useCallback } from 'react';
import {
  TripDetails,
  Traveler,
  CoverageTier,
  QuoteResult,
  DESTINATIONS,
  COVERAGE_OPTIONS,
} from '../../types/insurance';
import { TripDetailsForm } from './TripDetailsForm';
import { CoverageSelector } from './CoverageSelector';
import { QuoteSummary } from './QuoteSummary';

function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

function calculateAgeMultiplier(travelers: Traveler[]): number {
  if (travelers.length === 0) return 1;
  
  const avgMultiplier = travelers.reduce((sum, t) => {
    if (t.age < 18) return sum + 0.8;
    if (t.age <= 35) return sum + 1.0;
    if (t.age <= 50) return sum + 1.2;
    if (t.age <= 65) return sum + 1.5;
    return sum + 2.0;
  }, 0) / travelers.length;
  
  return avgMultiplier;
}

function calculateTripDuration(departure: string, returnDate: string): number {
  if (!departure || !returnDate) return 0;
  const start = new Date(departure);
  const end = new Date(returnDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function calculateDurationMultiplier(days: number): number {
  if (days <= 3) return 0.8;
  if (days <= 7) return 1.0;
  if (days <= 14) return 1.3;
  if (days <= 30) return 1.6;
  return 2.0;
}

export function InsuranceQuoteCalculator() {
  const [tripDetails, setTripDetails] = useState<TripDetails>({
    destination: '',
    departureDate: '',
    returnDate: '',
    travelers: [{ id: generateId(), age: 30 }],
  });
  
  const [selectedTier, setSelectedTier] = useState<CoverageTier>('standard');
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [cartAdded, setCartAdded] = useState(false);

  const tripDuration = useMemo(
    () => calculateTripDuration(tripDetails.departureDate, tripDetails.returnDate),
    [tripDetails.departureDate, tripDetails.returnDate]
  );

  const quote = useMemo((): QuoteResult | null => {
    const coverage = COVERAGE_OPTIONS.find((c) => c.tier === selectedTier);
    if (!coverage || tripDetails.travelers.length === 0) return null;

    const destination = DESTINATIONS.find((d) => d.code === tripDetails.destination);
    const destinationMultiplier = destination?.riskLevel ?? 1.0;
    const ageMultiplier = calculateAgeMultiplier(tripDetails.travelers);
    const durationMultiplier = calculateDurationMultiplier(tripDuration);

    const baseTotal = coverage.basePrice * tripDetails.travelers.length;
    const withAge = baseTotal * ageMultiplier;
    const withDestination = withAge * destinationMultiplier;
    const withDuration = withDestination * durationMultiplier;
    const totalPrice = Math.round(withDuration * 100) / 100;

    return {
      tier: selectedTier,
      basePrice: coverage.basePrice,
      tripDurationMultiplier: durationMultiplier,
      ageMultiplier,
      destinationMultiplier,
      totalPrice,
      pricePerTraveler: Math.round((totalPrice / tripDetails.travelers.length) * 100) / 100,
      breakdown: [
        { label: `Base price (${tripDetails.travelers.length} traveler${tripDetails.travelers.length > 1 ? 's' : ''})`, amount: baseTotal },
        { label: 'Age adjustment', amount: Math.round((withAge - baseTotal) * 100) / 100 },
        { label: 'Destination risk', amount: Math.round((withDestination - withAge) * 100) / 100 },
        { label: `Trip duration (${tripDuration} days)`, amount: Math.round((withDuration - withDestination) * 100) / 100 },
      ],
    };
  }, [selectedTier, tripDetails, tripDuration]);

  const isFormValid = useMemo(() => {
    return (
      tripDetails.destination !== '' &&
      tripDetails.departureDate !== '' &&
      tripDetails.returnDate !== '' &&
      tripDetails.travelers.length > 0 &&
      tripDetails.travelers.every((t) => t.age > 0 && t.age <= 100) &&
      tripDuration > 0
    );
  }, [tripDetails, tripDuration]);

  const handleAddTraveler = useCallback(() => {
    setTripDetails((prev) => ({
      ...prev,
      travelers: [...prev.travelers, { id: generateId(), age: 30 }],
    }));
  }, []);

  const handleRemoveTraveler = useCallback((id: string) => {
    setTripDetails((prev) => ({
      ...prev,
      travelers: prev.travelers.filter((t) => t.id !== id),
    }));
  }, []);

  const handleTravelerAgeChange = useCallback((id: string, age: number) => {
    setTripDetails((prev) => ({
      ...prev,
      travelers: prev.travelers.map((t) => (t.id === id ? { ...t, age } : t)),
    }));
  }, []);

  const handleAddToCart = useCallback(async () => {
    if (!quote || !isFormValid) return;
    
    setIsAddingToCart(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsAddingToCart(false);
    setCartAdded(true);
    
    // Reset after showing success
    setTimeout(() => setCartAdded(false), 3000);
  }, [quote, isFormValid]);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Travel Insurance Quote</h1>
        <p className="text-gray-600 mt-2">
          Get instant coverage for your next adventure. Protect your trip in minutes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Trip Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Trip Details Form */}
          <TripDetailsForm
            tripDetails={tripDetails}
            tripDuration={tripDuration}
            onDestinationChange={(destination) =>
              setTripDetails((prev) => ({ ...prev, destination }))
            }
            onDepartureDateChange={(departureDate) =>
              setTripDetails((prev) => ({ ...prev, departureDate }))
            }
            onReturnDateChange={(returnDate) =>
              setTripDetails((prev) => ({ ...prev, returnDate }))
            }
            onAddTraveler={handleAddTraveler}
            onRemoveTraveler={handleRemoveTraveler}
            onTravelerAgeChange={handleTravelerAgeChange}
          />

          {/* Coverage Selection */}
          <CoverageSelector
            selectedTier={selectedTier}
            onSelectTier={setSelectedTier}
          />
        </div>

        {/* Right Column - Quote Summary */}
        <div className="lg:col-span-1">
          <QuoteSummary
            quote={quote}
            selectedTier={selectedTier}
            isFormValid={isFormValid}
            isAddingToCart={isAddingToCart}
            cartAdded={cartAdded}
            onAddToCart={handleAddToCart}
          />
        </div>
      </div>
    </div>
  );
}
