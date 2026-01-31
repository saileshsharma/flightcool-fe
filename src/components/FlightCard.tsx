import { Flight } from '../types/flight';
import { StatusBadge } from './StatusBadge';
import { FlightTimeline } from './FlightTimeline';

interface FlightCardProps {
  flight: Flight;
}

function formatTime(isoString: string): string {
  return new Date(isoString).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
}

function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
}

export function FlightCard({ flight }: FlightCardProps) {
  const depTime = flight.departure.time;
  const arrTime = flight.arrival.time;
  
  const isDelayed = flight.status === 'delayed';
  const isCancelled = flight.status === 'cancelled';

  return (
    <div className={`bg-white rounded-2xl shadow-sm border transition-all duration-300 hover:shadow-lg hover:border-sky-200 overflow-hidden ${
      isCancelled ? 'border-red-200 opacity-75' : 'border-slate-200'
    }`}>
      {/* Header */}
      <div className="px-6 py-4 bg-gradient-to-r from-slate-50 to-white border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{flight.airlineLogo}</span>
            <div>
              <h3 className="text-lg font-bold text-slate-900">{flight.flightNumber}</h3>
              <p className="text-sm text-slate-500">{flight.airline}</p>
            </div>
          </div>
          <StatusBadge status={flight.status} />
        </div>
      </div>

      {/* Timeline */}
      <div className="px-6">
        <FlightTimeline flight={flight} />
      </div>

      {/* Departure & Arrival Details */}
      <div className="px-6 py-4 grid grid-cols-2 gap-6">
        {/* Departure */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
              <span className="text-emerald-600 text-sm">🛫</span>
            </div>
            <span className="text-xs font-semibold uppercase text-slate-400">Departure</span>
          </div>
          
          <div>
            <div className="flex items-baseline gap-2">
              <span className={`text-2xl font-bold ${isDelayed ? 'text-slate-400 line-through' : 'text-slate-900'}`}>
                {formatTime(depTime.scheduled)}
              </span>
              {isDelayed && depTime.estimated && (
                <span className="text-lg font-bold text-amber-600">
                  {formatTime(depTime.estimated)}
                </span>
              )}
            </div>
            <p className="text-sm text-slate-500">{formatDate(depTime.scheduled)}</p>
          </div>

          <div className="space-y-1">
            <p className="text-sm font-medium text-slate-700">
              {flight.departure.airport.name}
            </p>
            <div className="flex gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <span className="font-semibold text-slate-600">Terminal</span> {flight.departure.terminal}
              </span>
              <span className="flex items-center gap-1">
                <span className="font-semibold text-slate-600">Gate</span> {flight.departure.gate}
              </span>
            </div>
          </div>
        </div>

        {/* Arrival */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center">
              <span className="text-sky-600 text-sm">🛬</span>
            </div>
            <span className="text-xs font-semibold uppercase text-slate-400">Arrival</span>
          </div>
          
          <div>
            <div className="flex items-baseline gap-2">
              <span className={`text-2xl font-bold ${isDelayed ? 'text-slate-400 line-through' : 'text-slate-900'}`}>
                {formatTime(arrTime.scheduled)}
              </span>
              {isDelayed && arrTime.estimated && (
                <span className="text-lg font-bold text-amber-600">
                  {formatTime(arrTime.estimated)}
                </span>
              )}
            </div>
            <p className="text-sm text-slate-500">{formatDate(arrTime.scheduled)}</p>
          </div>

          <div className="space-y-1">
            <p className="text-sm font-medium text-slate-700">
              {flight.arrival.airport.name}
            </p>
            <div className="flex gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <span className="font-semibold text-slate-600">Terminal</span> {flight.arrival.terminal}
              </span>
              <span className="flex items-center gap-1">
                <span className="font-semibold text-slate-600">Gate</span> {flight.arrival.gate}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-3 bg-slate-50 border-t border-slate-100">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <span>🛩️</span> {flight.aircraft}
          </span>
          {flight.status === 'departed' && (
            <span className="text-violet-600 font-medium">
              {flight.progress}% complete
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
