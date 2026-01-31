import { useState, useCallback } from 'react';
import { Flight, FlightStatus } from '../types/flight';
import { mockFlights, searchFlights } from '../data/mockFlights';
import { SearchBar } from './SearchBar';
import { FlightCard } from './FlightCard';

type FilterType = 'all' | FlightStatus;

const filterOptions: { value: FilterType; label: string }[] = [
  { value: 'all', label: 'All Flights' },
  { value: 'on-time', label: 'On Time' },
  { value: 'delayed', label: 'Delayed' },
  { value: 'boarding', label: 'Boarding' },
  { value: 'departed', label: 'In Flight' },
  { value: 'arrived', label: 'Arrived' },
  { value: 'cancelled', label: 'Cancelled' },
];

export function FlightTracker() {
  const [flights, setFlights] = useState<Flight[]>(mockFlights);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    const results = searchFlights(query);
    setFlights(results);
  }, []);

  const filteredFlights = activeFilter === 'all' 
    ? flights 
    : flights.filter(f => f.status === activeFilter);

  const statusCounts = mockFlights.reduce((acc, flight) => {
    acc[flight.status] = (acc[flight.status] || 0) + 1;
    acc['all'] = (acc['all'] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-slate-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-sky-500/25">
                <span className="text-2xl">✈️</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">FlightCool</h1>
                <p className="text-sm text-slate-500">Real-time Flight Tracker</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-slate-600">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
              <p className="text-xs text-slate-400">
                {new Date().toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })} Local Time
              </p>
            </div>
          </div>

          {/* Search */}
          <SearchBar onSearch={handleSearch} />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setActiveFilter(option.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeFilter === option.value
                  ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {option.label}
              <span className={`ml-2 px-1.5 py-0.5 rounded-full text-xs ${
                activeFilter === option.value 
                  ? 'bg-sky-400 text-white' 
                  : 'bg-slate-100 text-slate-500'
              }`}>
                {statusCounts[option.value] || 0}
              </span>
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-slate-500">
            {searchQuery && (
              <span>
                Results for "<span className="font-medium text-slate-700">{searchQuery}</span>" · 
              </span>
            )}
            Showing <span className="font-medium text-slate-700">{filteredFlights.length}</span> flight{filteredFlights.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Flight Cards Grid */}
        {filteredFlights.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredFlights.map((flight) => (
              <FlightCard key={flight.id} flight={flight} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-6 bg-slate-100 rounded-full flex items-center justify-center">
              <span className="text-4xl opacity-50">🔍</span>
            </div>
            <h3 className="text-lg font-semibold text-slate-700 mb-2">No flights found</h3>
            <p className="text-slate-500 max-w-md mx-auto">
              Try adjusting your search or filter criteria. You can search by flight number, airport code, or city name.
            </p>
          </div>
        )}

        {/* Stats Footer */}
        <div className="mt-12 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
            Flight Statistics
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            <div className="text-center p-3 bg-slate-50 rounded-xl">
              <p className="text-2xl font-bold text-slate-900">{statusCounts['all'] || 0}</p>
              <p className="text-xs text-slate-500">Total</p>
            </div>
            <div className="text-center p-3 bg-emerald-50 rounded-xl">
              <p className="text-2xl font-bold text-emerald-600">{statusCounts['on-time'] || 0}</p>
              <p className="text-xs text-emerald-600">On Time</p>
            </div>
            <div className="text-center p-3 bg-amber-50 rounded-xl">
              <p className="text-2xl font-bold text-amber-600">{statusCounts['delayed'] || 0}</p>
              <p className="text-xs text-amber-600">Delayed</p>
            </div>
            <div className="text-center p-3 bg-violet-50 rounded-xl">
              <p className="text-2xl font-bold text-violet-600">{statusCounts['departed'] || 0}</p>
              <p className="text-xs text-violet-600">In Flight</p>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-xl">
              <p className="text-2xl font-bold text-blue-600">{statusCounts['boarding'] || 0}</p>
              <p className="text-xs text-blue-600">Boarding</p>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-xl">
              <p className="text-2xl font-bold text-red-600">{statusCounts['cancelled'] || 0}</p>
              <p className="text-xs text-red-600">Cancelled</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-slate-400">
        <p>FlightCool Dashboard · Demo with mock data</p>
      </footer>
    </div>
  );
}
