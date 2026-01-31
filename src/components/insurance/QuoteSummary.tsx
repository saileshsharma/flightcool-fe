import { QuoteResult, CoverageTier, COVERAGE_OPTIONS } from '../../types/insurance';

interface QuoteSummaryProps {
  quote: QuoteResult | null;
  selectedTier: CoverageTier;
  isFormValid: boolean;
  isAddingToCart: boolean;
  cartAdded: boolean;
  onAddToCart: () => void;
}

export function QuoteSummary({
  quote,
  selectedTier,
  isFormValid,
  isAddingToCart,
  cartAdded,
  onAddToCart,
}: QuoteSummaryProps) {
  const coverage = COVERAGE_OPTIONS.find((c) => c.tier === selectedTier);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
          <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Your Quote</h2>
          <p className="text-sm text-gray-500">Real-time price estimate</p>
        </div>
      </div>

      {!isFormValid ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <p className="text-gray-500 text-sm">
            Fill in your trip details to see your personalized quote
          </p>
        </div>
      ) : quote ? (
        <>
          {/* Selected Plan */}
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Selected Plan</p>
                <p className="text-lg font-bold text-gray-900">{coverage?.name} Coverage</p>
              </div>
              <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="space-y-3 mb-6">
            <h3 className="text-sm font-medium text-gray-700">Price Breakdown</h3>
            {quote.breakdown.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{item.label}</span>
                <span className={`font-medium ${item.amount >= 0 ? 'text-gray-900' : 'text-emerald-600'}`}>
                  {item.amount >= 0 ? '+' : ''}${item.amount.toFixed(2)}
                </span>
              </div>
            ))}
            <div className="border-t border-gray-200 pt-3 mt-3">
              <div className="flex items-center justify-between">
                <span className="text-base font-semibold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-gray-900">${quote.totalPrice.toFixed(2)}</span>
              </div>
              <p className="text-xs text-gray-500 text-right mt-1">
                ${quote.pricePerTraveler.toFixed(2)} per traveler
              </p>
            </div>
          </div>

          {/* What's Included Summary */}
          <div className="mb-6 p-4 bg-gray-50 rounded-xl">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Coverage Highlights</h3>
            <ul className="space-y-2">
              {coverage?.features.filter(f => f.included).slice(0, 4).map((feature) => (
                <li key={feature.name} className="flex items-center gap-2 text-sm text-gray-600">
                  <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{feature.name}</span>
                  {feature.limit && <span className="text-gray-400">({feature.limit})</span>}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Button */}
          <button
            onClick={onAddToCart}
            disabled={isAddingToCart || cartAdded}
            className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2 ${
              cartAdded
                ? 'bg-emerald-500'
                : 'bg-blue-600 hover:bg-blue-700 active:scale-[0.98]'
            } disabled:opacity-70 disabled:cursor-not-allowed`}
          >
            {isAddingToCart ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Processing...
              </>
            ) : cartAdded ? (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Added to Cart!
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Add to Cart - ${quote.totalPrice.toFixed(2)}
              </>
            )}
          </button>

          {/* Trust badges */}
          <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Secure checkout
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Instant coverage
            </span>
          </div>
        </>
      ) : null}
    </div>
  );
}
