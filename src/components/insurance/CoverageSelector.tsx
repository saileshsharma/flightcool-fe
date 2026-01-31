import { CoverageTier, COVERAGE_OPTIONS } from '../../types/insurance';

interface CoverageSelectorProps {
  selectedTier: CoverageTier;
  onSelectTier: (tier: CoverageTier) => void;
}

const tierColorClasses: Record<string, { bg: string; border: string; badge: string; check: string }> = {
  slate: {
    bg: 'bg-slate-50',
    border: 'border-slate-300',
    badge: 'bg-slate-100 text-slate-600',
    check: 'text-slate-500',
  },
  blue: {
    bg: 'bg-blue-50',
    border: 'border-blue-400',
    badge: 'bg-blue-100 text-blue-600',
    check: 'text-blue-500',
  },
  purple: {
    bg: 'bg-purple-50',
    border: 'border-purple-400',
    badge: 'bg-purple-100 text-purple-600',
    check: 'text-purple-500',
  },
};

export function CoverageSelector({ selectedTier, onSelectTier }: CoverageSelectorProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
          <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Coverage Options</h2>
          <p className="text-sm text-gray-500">Choose the protection level that fits your needs</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {COVERAGE_OPTIONS.map((option) => {
          const isSelected = selectedTier === option.tier;
          const colors = tierColorClasses[option.color];

          return (
            <button
              key={option.tier}
              onClick={() => onSelectTier(option.tier)}
              className={`relative p-5 rounded-xl border-2 text-left transition-all duration-200 ${
                isSelected
                  ? `${colors.border} ${colors.bg} ring-2 ring-offset-2 ring-${option.color}-200`
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              {/* Popular Badge */}
              {option.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Header */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-lg font-bold text-gray-900">{option.name}</h3>
                  {isSelected && (
                    <div className={`w-5 h-5 rounded-full ${colors.check}`}>
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-500">{option.description}</p>
              </div>

              {/* Price */}
              <div className="mb-4">
                <span className="text-3xl font-bold text-gray-900">${option.basePrice}</span>
                <span className="text-sm text-gray-500">/person</span>
              </div>

              {/* Features */}
              <ul className="space-y-2">
                {option.features.map((feature) => (
                  <li
                    key={feature.name}
                    className={`flex items-start gap-2 text-sm ${
                      feature.included ? 'text-gray-700' : 'text-gray-400'
                    }`}
                  >
                    {feature.included ? (
                      <svg className="w-4 h-4 mt-0.5 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 mt-0.5 text-gray-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                    <span>
                      {feature.name}
                      {feature.limit && feature.included && (
                        <span className="text-gray-500 ml-1">({feature.limit})</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>
    </div>
  );
}
