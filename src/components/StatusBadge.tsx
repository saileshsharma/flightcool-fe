import { FlightStatus } from '../types/flight';

interface StatusBadgeProps {
  status: FlightStatus;
}

const statusConfig: Record<FlightStatus, { label: string; className: string }> = {
  'on-time': {
    label: 'On Time',
    className: 'bg-emerald-100 text-emerald-700 border-emerald-200'
  },
  'delayed': {
    label: 'Delayed',
    className: 'bg-amber-100 text-amber-700 border-amber-200'
  },
  'cancelled': {
    label: 'Cancelled',
    className: 'bg-red-100 text-red-700 border-red-200'
  },
  'boarding': {
    label: 'Boarding',
    className: 'bg-blue-100 text-blue-700 border-blue-200'
  },
  'departed': {
    label: 'In Flight',
    className: 'bg-violet-100 text-violet-700 border-violet-200'
  },
  'arrived': {
    label: 'Arrived',
    className: 'bg-slate-100 text-slate-700 border-slate-200'
  }
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${config.className}`}>
      {status === 'departed' && (
        <span className="w-2 h-2 mr-1.5 rounded-full bg-violet-500 animate-pulse" />
      )}
      {status === 'boarding' && (
        <span className="w-2 h-2 mr-1.5 rounded-full bg-blue-500 animate-pulse" />
      )}
      {config.label}
    </span>
  );
}
