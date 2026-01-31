import { Flight } from '../types/flight';

interface FlightTimelineProps {
  flight: Flight;
}

export function FlightTimeline({ flight }: FlightTimelineProps) {
  const { progress, status } = flight;
  
  const getProgressColor = () => {
    if (status === 'cancelled') return 'bg-red-400';
    if (status === 'delayed') return 'bg-amber-500';
    if (status === 'arrived') return 'bg-emerald-500';
    return 'bg-sky-500';
  };

  return (
    <div className="relative py-4">
      {/* Timeline container */}
      <div className="flex items-center gap-2">
        {/* Departure point */}
        <div className="flex flex-col items-center">
          <div className={`w-4 h-4 rounded-full border-2 ${
            progress > 0 || status === 'departed' || status === 'arrived' 
              ? 'bg-emerald-500 border-emerald-500' 
              : 'bg-white border-slate-300'
          }`} />
          <span className="text-xs font-bold text-slate-700 mt-1">
            {flight.departure.airport.code}
          </span>
        </div>

        {/* Progress track */}
        <div className="flex-1 relative h-2 bg-slate-200 rounded-full overflow-hidden">
          {/* Progress fill */}
          <div 
            className={`absolute inset-y-0 left-0 rounded-full transition-all duration-500 ${getProgressColor()}`}
            style={{ width: `${progress}%` }}
          />
          
          {/* Airplane icon for in-flight */}
          {status === 'departed' && progress > 0 && progress < 100 && (
            <div 
              className="absolute top-1/2 -translate-y-1/2 transition-all duration-500"
              style={{ left: `calc(${progress}% - 10px)` }}
            >
              <span className="text-lg drop-shadow-md">✈️</span>
            </div>
          )}
        </div>

        {/* Arrival point */}
        <div className="flex flex-col items-center">
          <div className={`w-4 h-4 rounded-full border-2 ${
            progress === 100 || status === 'arrived' 
              ? 'bg-emerald-500 border-emerald-500' 
              : 'bg-white border-slate-300'
          }`} />
          <span className="text-xs font-bold text-slate-700 mt-1">
            {flight.arrival.airport.code}
          </span>
        </div>
      </div>

      {/* Flight info below timeline */}
      <div className="flex justify-between mt-3 text-xs text-slate-500">
        <span>{flight.departure.airport.city}</span>
        <span className="font-medium text-slate-600">{flight.duration}</span>
        <span>{flight.arrival.airport.city}</span>
      </div>
    </div>
  );
}
