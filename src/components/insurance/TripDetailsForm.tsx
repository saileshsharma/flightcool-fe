import { TripDetails, DESTINATIONS } from '../../types/insurance';

interface TripDetailsFormProps {
  tripDetails: TripDetails;
  tripDuration: number;
  onDestinationChange: (destination: string) => void;
  onDepartureDateChange: (date: string) => void;
  onReturnDateChange: (date: string) => void;
  onAddTraveler: () => void;
  onRemoveTraveler: (id: string) => void;
  onTravelerAgeChange: (id: string, age: number) => void;
}

export function TripDetailsForm({
  tripDetails,
  tripDuration,
  onDestinationChange,
  onDepartureDateChange,
  onReturnDateChange,
  onAddTraveler,
  onRemoveTraveler,
  onTravelerAgeChange,
}: TripDetailsFormProps) {
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Trip Details</h2>
          <p className="text-sm text-gray-500">Tell us about your travel plans</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Destination */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Destination Region
          </label>
          <select
            value={tripDetails.destination}
            onChange={(e) => onDestinationChange(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-gray-900"
          >
            <option value="">Select destination...</option>
            {DESTINATIONS.map((dest) => (
              <option key={dest.code} value={dest.code}>
                {dest.name}
              </option>
            ))}
          </select>
        </div>

        {/* Date Range */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Departure Date
            </label>
            <input
              type="date"
              value={tripDetails.departureDate}
              min={today}
              onChange={(e) => onDepartureDateChange(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Return Date
            </label>
            <input
              type="date"
              value={tripDetails.returnDate}
              min={tripDetails.departureDate || today}
              onChange={(e) => onReturnDateChange(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Trip Duration Badge */}
        {tripDuration > 0 && (
          <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm text-blue-700 font-medium">
              Trip duration: {tripDuration} day{tripDuration !== 1 ? 's' : ''}
            </span>
          </div>
        )}

        {/* Travelers */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Travelers ({tripDetails.travelers.length})
            </label>
            <button
              type="button"
              onClick={onAddTraveler}
              className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Traveler
            </button>
          </div>

          <div className="space-y-3">
            {tripDetails.travelers.map((traveler, index) => (
              <div
                key={traveler.id}
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-medium text-white">
                    {index + 1}
                  </span>
                </div>
                
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-1">
                    Traveler {index + 1} Age
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={traveler.age}
                    onChange={(e) =>
                      onTravelerAgeChange(traveler.id, parseInt(e.target.value) || 0)
                    }
                    className="w-24 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
                    placeholder="Age"
                  />
                </div>

                {tripDetails.travelers.length > 1 && (
                  <button
                    type="button"
                    onClick={() => onRemoveTraveler(traveler.id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    title="Remove traveler"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Age info tooltip */}
          <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Age affects premium rates. Travelers 65+ may have higher rates.
          </p>
        </div>
      </div>
    </div>
  );
}
